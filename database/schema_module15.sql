-- EXIM.IM SaaS Platform - Module 15: Multi-Modal AI Copilot Workspace
-- PostgreSQL Database Schemas (ai_sys extensions)

CREATE SCHEMA IF NOT EXISTS ai_sys;

-- 1. Copilot Sessions Table
CREATE TABLE IF NOT EXISTS ai_sys.copilot_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    session_title VARCHAR(255) NOT NULL DEFAULT 'Exim Copilot Session',
    interaction_type VARCHAR(30) DEFAULT 'TEXT_CHAT' CHECK (interaction_type IN ('TEXT_CHAT', 'VOICE_COMMAND', 'DOCUMENT_RAG')),
    chat_history JSONB DEFAULT '[]'::jsonb,
    suggested_actions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Label Vision Audits Table
CREATE TABLE IF NOT EXISTS ai_sys.label_vision_audits (
    audit_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url VARCHAR(500) NOT NULL,
    target_market VARCHAR(50) NOT NULL DEFAULT 'GCC' CHECK (target_market IN ('FDA_USA', 'EU_EFSA', 'GCC_GSO', 'FSSAI_INDIA')),
    detected_languages JSONB DEFAULT '[]'::jsonb,
    has_net_weight BOOLEAN DEFAULT TRUE,
    has_country_of_origin BOOLEAN DEFAULT TRUE,
    has_allergen_warning BOOLEAN DEFAULT TRUE,
    is_compliant BOOLEAN NOT NULL DEFAULT TRUE,
    audit_findings JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_copilot_user ON ai_sys.copilot_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_vision_audit ON ai_sys.label_vision_audits(audit_id);
