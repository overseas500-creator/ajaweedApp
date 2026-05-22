-- ==========================================================================
-- سكربت تهيئة قاعدة بيانات تطبيق الأجاويد (Supabase - PostgreSQL)
-- مدرسة الأجاويد الأولى المتوسطة
-- ==========================================================================

-- 1. جدول الطلاب (Students Table)
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(100) DEFAULT '',
    attendance VARCHAR(50) DEFAULT 'none',
    attendance_time VARCHAR(50) DEFAULT '',
    morning_delay_minutes INT DEFAULT 0,
    early_days_count INT DEFAULT 0,
    late_days_count INT DEFAULT 0,
    absent_days_count INT DEFAULT 0,
    attendance_history JSONB DEFAULT '[]'::jsonb,
    private_messages JSONB DEFAULT '[]'::jsonb,
    parent_name VARCHAR(255) DEFAULT '',
    parent_phone VARCHAR(50) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- فهارس تحسين أداء البحث (البحث برقم الهاتف مهم جداً لبوابة أولياء الأمور)
CREATE INDEX IF NOT EXISTS idx_students_parent_phone ON students(parent_phone);
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);

-- 2. جدول الإعلانات العامة (General Messages Table)
CREATE TABLE IF NOT EXISTS general_messages (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date VARCHAR(100) NOT NULL,
    attachment JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. جدول إحصائيات ونجوم أولياء الأمور (Parent Stats Table)
CREATE TABLE IF NOT EXISTS parent_stats (
    phone VARCHAR(50) PRIMARY KEY,
    star_count INT DEFAULT 1,
    last_login_date VARCHAR(100) DEFAULT '',
    login_count_today INT DEFAULT 0,
    daily_opens_count INT DEFAULT 0,
    daily_reads_count INT DEFAULT 0,
    daily_attendance_checks INT DEFAULT 0,
    daily_opens_stars_awarded INT DEFAULT 0,
    daily_reads_stars_awarded INT DEFAULT 0,
    daily_attendance_stars_awarded INT DEFAULT 0,
    read_message_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================================
-- مشغلات تحديث حقل التوقيت تلقائياً (Triggers for updated_at)
-- ==========================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ربط المشغل بالجداول الثلاثة
DROP TRIGGER IF EXISTS trg_update_students_updated_at ON students;
CREATE TRIGGER trg_update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_update_general_messages_updated_at ON general_messages;
CREATE TRIGGER trg_update_general_messages_updated_at
    BEFORE UPDATE ON general_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_update_parent_stats_updated_at ON parent_stats;
CREATE TRIGGER trg_update_parent_stats_updated_at
    BEFORE UPDATE ON parent_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
