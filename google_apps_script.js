function doGet(e) {
  var route = e.parameter.route;
  
  if (route === 'get_students') {
    return jsonResponse(getStudents());
  } else if (route === 'get_student') {
    return jsonResponse(getStudentById(e.parameter.id));
  } else if (route === 'get_students_by_phone') {
    return jsonResponse(getStudentsByPhone(e.parameter.phone));
  } else if (route === 'get_general_messages') {
    return jsonResponse(getGeneralMessages());
  } else if (route === 'get_parent_stats') {
    return jsonResponse(getParentStats(e.parameter.phone));
  } else if (route === 'init') {
    initSheets();
    return jsonResponse({message: "تم تهيئة جداول البيانات بنجاح"});
  }
  
  return jsonResponse({error: 'Route not found'}, 404);
}

function doPost(e) {
  try {
    // Handling cross-origin POST requests properly by parsing text/plain payload
    var payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter;
    }
    
    var route = e.parameter.route || payload.route;
    
    if (route === 'bulk_upsert') {
      return jsonResponse(bulkUpsertStudents(payload.students));
    } else if (route === 'post_general_message') {
      return jsonResponse(addGeneralMessage(payload.message));
    } else if (route === 'reset_database') {
      return jsonResponse(resetDatabase(payload.confirmCode));
    } else if (route === 'reset_attendance') {
      return jsonResponse(resetTodayAttendance());
    } else if (route === 'update_parent_stats') {
      return jsonResponse(updateParentStats(payload.phone, payload.stats));
    }
    
    return jsonResponse({error: 'Route not found'}, 404);
  } catch (error) {
    return jsonResponse({error: error.toString()}, 500);
  }
}

// --------------------------------------------------------------------------
// Helper: JSON Response
// --------------------------------------------------------------------------
function jsonResponse(data, code) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// --------------------------------------------------------------------------
// Database Operations
// --------------------------------------------------------------------------
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(name) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function initSheets() {
  var studentsSheet = getSheet('Students');
  if (studentsSheet.getLastRow() === 0) {
    studentsSheet.appendRow(['id', 'name', 'grade', 'parent_phone', 'parent_name', 'attendance', 'attendance_time', 'morning_delay_minutes', 'history']);
  }
  
  var messagesSheet = getSheet('GeneralMessages');
  if (messagesSheet.getLastRow() === 0) {
    messagesSheet.appendRow(['id', 'title', 'text', 'date']);
  }
  
  var statsSheet = getSheet('ParentStats');
  if (statsSheet.getLastRow() === 0) {
    statsSheet.appendRow(['parent_phone', 'stars', 'messages', 'points']);
  }
}

function getRowsAsObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    rows.push(obj);
  }
  return rows;
}

function getStudents() {
  var sheet = getSheet('Students');
  var rows = getRowsAsObjects(sheet);
  
  return rows.map(function(row) {
    return {
      id: String(row.id),
      name: row.name,
      grade: row.grade,
      parentPhone: String(row.parent_phone),
      parentName: row.parent_name,
      attendance: row.attendance,
      attendanceTime: row.attendance_time,
      morningDelayMinutes: Number(row.morning_delay_minutes) || 0,
      history: row.history ? JSON.parse(row.history) : []
    };
  });
}

function getStudentById(id) {
  var students = getStudents();
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === String(id)) return students[i];
  }
  return null;
}

function getStudentsByPhone(phone) {
  if (!phone) return [];
  var digits = String(phone).replace(/\D/g, '');
  if (digits.length < 9) return [];
  var suffix = digits.slice(-9);
  
  var students = getStudents();
  return students.filter(function(s) {
    var sPhoneDigits = String(s.parentPhone).replace(/\D/g, '');
    return sPhoneDigits.slice(-9) === suffix;
  });
}

function bulkUpsertStudents(studentsList) {
  if (!studentsList || studentsList.length === 0) return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
  
  var sheet = getSheet('Students');
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idIndex = headers.indexOf('id');
  
  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    existingIds[String(data[i][idIndex])] = i + 1; // row number (1-indexed)
  }
  
  var matchedCount = 0;
  var modifiedCount = 0;
  var upsertedCount = 0;
  
  for (var j = 0; j < studentsList.length; j++) {
    var s = studentsList[j];
    var sId = String(s.id);
    var rowData = [
      sId, 
      s.name, 
      s.grade, 
      s.parentPhone, 
      s.parentName, 
      s.attendance, 
      s.attendanceTime, 
      s.morningDelayMinutes, 
      JSON.stringify(s.history || [])
    ];
    
    if (existingIds[sId]) {
      var rowNum = existingIds[sId];
      // Optional: don't overwrite phone if empty in new data
      var existingRowData = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
      var oldPhone = String(existingRowData[headers.indexOf('parent_phone')]);
      var oldParentName = String(existingRowData[headers.indexOf('parent_name')]);
      
      if (!s.parentPhone || s.parentPhone.trim() === "") rowData[3] = oldPhone;
      if (!s.parentName || s.parentName.trim() === "") rowData[4] = oldParentName;
      
      sheet.getRange(rowNum, 1, 1, rowData.length).setValues([rowData]);
      matchedCount++;
      modifiedCount++;
    } else {
      sheet.appendRow(rowData);
      upsertedCount++;
    }
  }
  
  return { matchedCount: matchedCount, modifiedCount: modifiedCount, upsertedCount: upsertedCount };
}

function resetTodayAttendance() {
  var sheet = getSheet('Students');
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { message: 'تم' };
  
  var headers = data[0];
  var attIdx = headers.indexOf('attendance');
  var timeIdx = headers.indexOf('attendance_time');
  var delayIdx = headers.indexOf('morning_delay_minutes');
  
  for (var i = 1; i < data.length; i++) {
    data[i][attIdx] = 'none';
    data[i][timeIdx] = '';
    data[i][delayIdx] = 0;
  }
  
  sheet.getRange(1, 1, data.length, headers.length).setValues(data);
  return { message: 'تم تصفير حضور اليوم لجميع الطلاب' };
}

function getGeneralMessages() {
  var sheet = getSheet('GeneralMessages');
  return getRowsAsObjects(sheet).reverse();
}

function addGeneralMessage(msg) {
  var sheet = getSheet('GeneralMessages');
  sheet.appendRow([msg.id || Date.now().toString(), msg.title, msg.text, msg.date]);
  return { message: 'تم النشر بنجاح' };
}

function getParentStats(phone) {
  if (!phone) return { stars: 0, messages: [], points: 0 };
  var suffix = String(phone).replace(/\D/g, '').slice(-9);
  
  var sheet = getSheet('ParentStats');
  var rows = getRowsAsObjects(sheet);
  
  for (var i = 0; i < rows.length; i++) {
    var rowSuffix = String(rows[i].parent_phone).replace(/\D/g, '').slice(-9);
    if (rowSuffix === suffix) {
      return {
        stars: Number(rows[i].stars) || 0,
        messages: rows[i].messages ? JSON.parse(rows[i].messages) : [],
        points: Number(rows[i].points) || 0
      };
    }
  }
  return { stars: 0, messages: [], points: 0 };
}

function updateParentStats(phone, stats) {
  if (!phone) return stats;
  var suffix = String(phone).replace(/\D/g, '').slice(-9);
  
  var sheet = getSheet('ParentStats');
  var data = sheet.getDataRange().getValues();
  var headers = data.length > 0 ? data[0] : ['parent_phone', 'stars', 'messages', 'points'];
  
  var phoneIdx = headers.indexOf('parent_phone');
  
  for (var i = 1; i < data.length; i++) {
    var rowSuffix = String(data[i][phoneIdx]).replace(/\D/g, '').slice(-9);
    if (rowSuffix === suffix) {
      sheet.getRange(i + 1, headers.indexOf('stars') + 1).setValue(stats.stars);
      sheet.getRange(i + 1, headers.indexOf('messages') + 1).setValue(JSON.stringify(stats.messages || []));
      sheet.getRange(i + 1, headers.indexOf('points') + 1).setValue(stats.points || 0);
      return stats;
    }
  }
  
  // Not found, append new
  sheet.appendRow([
    phone, 
    stats.stars || 0, 
    JSON.stringify(stats.messages || []), 
    stats.points || 0
  ]);
  return stats;
}

function resetDatabase(code) {
  if (code !== '20252026') throw new Error('Unauthorized reset code');
  
  ['Students', 'GeneralMessages', 'ParentStats'].forEach(function(sheetName) {
    var sheet = getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
    }
  });
  
  return { success: true };
}
