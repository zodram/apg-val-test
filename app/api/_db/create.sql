CREATE TABLE configs (
    id serial PRIMARY KEY,
    system_prompt text NOT NULL,
    max_tokens integer NOT NULL,
    temperature float NOT NULL,
    top_p float NOT NULL,
    model_id char(64) NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'utc') NOT NULL
);


CREATE TABLE prompts (
    id bigserial PRIMARY KEY,
    lang char(2) NOT NULL,
    prompt text NOT NULL,
    response text NULL,
    prompted_at timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    response_started_at timestamp without time zone NULL,
    response_completed_at timestamp  without time zone NULL,
    flagged boolean NULL,
    score smallint NULL,
    config_id integer,
    CONSTRAINT fk_config FOREIGN KEY(config_id) REFERENCES configs(id),
    -- newly added
    expected_response text NULL,
    parent_id integer NULL,
    accuracy_score text NULL,
    sympathy_score text NULL,
    -- not yet added
    evaluation_model text NULL
);


CREATE TABLE testcases (
    id bigserial PRIMARY KEY,
    lang char(2) NOT NULL,
    prompt text NOT NULL,
    response text NULL,
    prompted_at timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    response_started_at timestamp without time zone NULL,
    response_completed_at timestamp without time zone NULL,
    flagged boolean NULL,
    score smallint NULL,
    config_id integer,
    CONSTRAINT fk_config FOREIGN KEY(config_id) REFERENCES configs(id),
    -- newly added
    expected_response text NULL,
    accuracy_score text NULL,
    sympathy_score text NULL
);
