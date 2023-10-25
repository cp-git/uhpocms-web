DROP DATABASE IF EXISTS uhpocms;
CREATE DATABASE uhpocms;
\c uhpocms

CREATE SEQUENCE IF NOT EXISTS public.admin_department_departmentid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.instituteAdmin_profile_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
	
CREATE SEQUENCE IF NOT EXISTS public.admin_role_roleid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.auth_user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.admin_institution_institutionid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;



CREATE TABLE IF NOT EXISTS public.instituteadmin_profile
(
    id integer NOT NULL DEFAULT nextval('instituteAdmin_profile_id_seq'::regclass),
    isactive boolean,
    address1 character varying(255) COLLATE pg_catalog."default",
    address2 character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    department integer,
    email character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    zip character varying(255) COLLATE pg_catalog."default",
    createdby character varying(255) COLLATE pg_catalog."default",
    createddate timestamp without time zone,
    dob character varying(255) COLLATE pg_catalog."default",
    first_name character varying(255) COLLATE pg_catalog."default",
    institutionid_id integer,
    last_name character varying(255) COLLATE pg_catalog."default",
    mobileno character varying(255) COLLATE pg_catalog."default",
    updatedby character varying(255) COLLATE pg_catalog."default",
    updateddate timestamp without time zone,
    profile_pics character varying(255) COLLATE pg_catalog."default",
    user_id integer,
    userrole character varying(255) COLLATE pg_catalog."default",
    userroleid integer,
    CONSTRAINT instituteadmin_profile_pkey PRIMARY KEY (id)
);

	
CREATE TABLE IF NOT EXISTS public.auth_user
(
    id integer NOT NULL DEFAULT nextval('auth_user_id_seq'::regclass),
    created_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    date_joined timestamp without time zone NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_active boolean NOT NULL,
    last_login timestamp without time zone,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    modified_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_user_pkey PRIMARY KEY (id),
    CONSTRAINT uk_t1iph3dfc25ukwcl9xemtnojn UNIQUE (username)
);


	
CREATE TABLE IF NOT EXISTS public.admin_department
(
    departmentid integer NOT NULL DEFAULT nextval('admin_department_departmentid_seq'::regclass),
    createdby character varying(255) COLLATE pg_catalog."default",
    createdon timestamp without time zone,
    description character varying(255) COLLATE pg_catalog."default",
    institutionid integer NOT NULL,
    isactive boolean,
    modifiedby character varying(255) COLLATE pg_catalog."default",
    modifiedon timestamp without time zone,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid)
);
	

	
CREATE TABLE IF NOT EXISTS public.admin_role
(
    role_id integer NOT NULL DEFAULT nextval('admin_role_roleid_seq'::regclass),
    created_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    isactive boolean NOT NULL,
    modified_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    role_description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_role_pkey PRIMARY KEY (role_id),
    CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9 UNIQUE (role_name)
);

CREATE TABLE IF NOT EXISTS public.admin_institution
(
    institutionid integer NOT NULL DEFAULT nextval('admin_institution_institutionid_seq'::regclass),
    createdby character varying(255) COLLATE pg_catalog."default",
    createdon timestamp without time zone,
    description character varying(255) COLLATE pg_catalog."default",
    isactive boolean,
    modifiedby character varying(255) COLLATE pg_catalog."default",
    modifiedon timestamp without time zone,
    name character varying(255) COLLATE pg_catalog."default",
    picture character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid)
);


ALTER SEQUENCE public.admin_department_departmentid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
	OWNED BY admin_department.departmentid;

ALTER SEQUENCE public."InstituteAdmin_profile_id_seq"
	INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY instituteadmin_profile.id;
	
ALTER SEQUENCE public.admin_role_roleid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY admin_role.role_id;

ALTER SEQUENCE public.auth_user_id_seq
	INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY auth_user.id;

ALTER SEQUENCE public.admin_institution_institutionid_seq
	INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY admin_institution.institutionid;
	
INSERT INTO instituteadmin_profile
(
    id ,
    isactive ,
    address1  ,
    address2  ,
    city  ,
    department,
    email  ,
    gender  ,
    state ,
    zip ,
    createdby ,
    createddate ,
    dob ,
    first_name ,
    institutionid_id,
    last_name,mobileno,    updatedby,
    updateddate,
    profile_pics,
    user_id ,
    userrole ,
    userroleid )
    
VALUES(1,true,'PUNE','PUNE','PUNE',1,'admin@gmail.com','female','MH','411033','admin','2023-07-12 21:24:16.157+05:30','2023-07-12 21:24:16.157+05:30','Super',1,'ADMIN',9860622624,'admin','2023-07-12 21:24:16.157+05:30','user_logo.jpeg',1,'admin','1');




Insert INTO auth_user
(
    id ,
    created_by ,
    created_on ,
    date_joined ,
    email ,
    first_name ,
    is_active ,
    last_login ,
    last_name ,
    modified_by ,
    modified_on ,
    username ,
    password 
   
)VALUES('1','admin','8-09-2023','8-09-2023','admin@gmail.com','Super','true','8-09-2023','Admin','admin','8-09-2023','admin','pass');

INSERT INTO admin_department
(
    departmentid ,
    createdby ,
    createdon ,
    description ,
    institutionid ,
    isactive ,
    modifiedby ,
    modifiedon ,
    name 
   
)VALUES('1','admin','2023-07-12 21:24:16.157+05:30','dept',1,true,'admin','2023-07-12 21:24:16.157+05:30','department');


insert into admin_role
(
    role_id ,
    created_by ,
    created_on ,
    isactive ,
    modified_by ,
    modified_on ,
    role_description ,
    role_name
)
VALUES(1,'admin','2023-07-12 21:24:16.157+05:30',true,'admin','2023-07-12 21:24:16.157+05:30','admin','admin');



INSERT INTO admin_institution
(
    institutionid,
    createdby ,
    createdon,
    description ,
    isactive ,
    modifiedby ,
    modifiedon ,
    name ,
    picture 
   
)VALUES('1','admin','2023-07-12 21:24:16.157+05:30','desc',true,'admin','2023-07-12 21:24:16.157+05:30','abc','abc.jpg');


CREATE SEQUENCE IF NOT EXISTS public.auth_module_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.auth_module
(
    id bigint NOT NULL DEFAULT nextval('auth_module_id_seq'::regclass),
    module_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_module_pkey PRIMARY KEY (id),
    CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun UNIQUE (module_name)
);

ALTER SEQUENCE public.auth_module_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY auth_module.id;

 INSERT INTO auth_module(id,module_name) VALUES(1,'ROLE'),(2,'AUTH_USER'),(3,'PROFILE'),(4,'INSTITUTION'),
 (5,'DEPARTMENT'),(6,'COURSE'),(7,'MODULE'),(8,'MODULE_FILE'),(9,'QUIZ'),(10,'QUESTION_ANSWER'),
 (11,'ASSIGN_TEACHERS'),(12,'ENROLL_STUDENTS'),(13,'ANNOUNCEMENT'),(14,'LESSONS'),
 (15,'REVIEW_ANSWERS'),(16,'CATEGORY'),(17,'ANALYTICS');
 
 
 CREATE SEQUENCE IF NOT EXISTS public.auth_permission_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    ;
	
 CREATE TABLE IF NOT EXISTS public.auth_permission
(
    id integer NOT NULL DEFAULT nextval('auth_permission_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT auth_permission_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE public.auth_permission_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY auth_permission.id;
	
INSERT INTO auth_permission(name,description) VALUES('CREATE','CREATE'),('DELETE','DELETE'),
('UPDATE','UPDATE'),('ACTIVATE','ACTIVATE'),('VIEW','VIEW');
CREATE SEQUENCE IF NOT EXISTS public.auth_user_user_permissions_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.auth_user_user_permissions
(
    id integer NOT NULL DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass),
    module_id bigint,
    permission_id bigint,
    user_id bigint,
    role_id bigint,
    CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id)
        REFERENCES public.auth_permission (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT auth_user_user_permissions_module_id_fkey FOREIGN KEY (module_id)
        REFERENCES public.auth_module (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT auth_user_user_permissions_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.admin_role (role_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id)
        REFERENCES public.auth_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
);

ALTER SEQUENCE public.auth_user_user_permissions_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY auth_user_user_permissions.id;
	
INSERT INTO auth_user_user_permissions(module_id,permission_id,user_id,role_id)
VALUES(2,1,1,1),(17,1,1,1),(3,1,1,1),(1,1,1,1),(4,1,1,1),(5,1,1,1),(11,1,1,1),(12,1,1,1),(16,1,1,1),(13,1,1,1),
(2,2,1,1),(17,2,1,1),(3,2,1,1),(1,2,1,1),(4,2,1,1),(5,2,1,1),(11,2,1,1),(12,2,1,1),(16,2,1,1),(13,2,1,1),
(2,3,1,1),(17,3,1,1),(3,3,1,1),(1,3,1,1),(4,3,1,1),(5,3,1,1),(11,3,1,1),(12,3,1,1),(16,3,1,1),(13,3,1,1),
(2,4,1,1),(17,4,1,1),(3,4,1,1),(1,4,1,1),(4,4,1,1),(5,4,1,1),(11,4,1,1),(12,4,1,1),(16,4,1,1),(13,4,1,1),
(2,5,1,1),(17,5,1,1),(3,5,1,1),(1,5,1,1),(4,5,1,1),(5,5,1,1),(11,5,1,1),(12,5,1,1),(16,5,1,1),(13,5,1,1);
	
-- Define the procedure
CREATE OR REPLACE PROCEDURE public.add_question_with_answers_mcq(
    IN question json,
    IN option1 json,
    IN option2 json,
    IN option3 json,
    IN option4 json,
    OUT generatedid integer)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    question_id INTEGER;
    created_on TIMESTAMP := CURRENT_TIMESTAMP;
    update_on TIMESTAMP := CURRENT_TIMESTAMP;
BEGIN
    -- Check if the question ID already exists in the database
    IF EXISTS (SELECT 1 FROM public.teacher_question WHERE id = (question->>'questionId')::INTEGER) THEN
        -- Update the existing question
        UPDATE public.teacher_question SET
            figure = question->>'questionFigure',
            content = question->>'questionContent',
            explanation = question->>'questionExplanation',
            questionorderno = (question->>'questionOrderNo')::INTEGER,
            ismcq = (question->>'questionIsMCQ')::BOOLEAN,
            max_marks = (question->>'maxMarks')::INTEGER,
            quizid_id = (question->>'questionQuizId')::INTEGER,
            category_id = (question->>'questionCategoryId')::INTEGER,
            is_active = (question->>'questionIsActive')::BOOLEAN,
            modified_by = question->>'questionModifiedBy',
            modified_on = update_on
        WHERE id = (question->>'questionId')::INTEGER
        RETURNING id INTO question_id; -- Return the updated question_id
    ELSE
        -- Insert a new question and capture the generated question_id
        INSERT INTO public.teacher_question (
            figure,
            max_marks,
            content,
            explanation,
            questionorderno,
            ismcq,
            quizid_id,
            category_id,
            is_active,
            created_by,
            created_on,
            modified_by,
            modified_on
        ) 
        VALUES (
            question->>'questionFigure',
            (question->>'maxMarks')::INTEGER,
            question->>'questionContent',
            question->>'questionExplanation',
            (question->>'questionOrderNo')::INTEGER,
            (question->>'questionIsMCQ')::BOOLEAN,
            (question->>'questionQuizId')::INTEGER,
            (question->>'questionCategoryId')::INTEGER,
            (question->>'questionIsActive')::BOOLEAN,
            question->>'questionCreatedBy',
            created_on,
            question->>'questionModifiedBy',
            update_on
        )
        RETURNING id INTO question_id; -- Return the generated question_id
    END IF;
    IF question_id IS NULL THEN
        -- If question insertion fails, set generatedid to 0
        generatedid := 0;
    ELSE
        -- Delete existing answers for the question
        DELETE FROM public.teacher_answer WHERE questionid = question_id;
        
        -- Insert option 1
        IF option1 IS NOT NULL THEN
            INSERT INTO public.teacher_answer (
                content,
                correct,
                questionid,
                questionorderno
            )
            VALUES (
                option1 ->> 'content',
                (option1 ->> 'correct')::BOOLEAN,
                question_id,
                (option1 ->> 'questionorderno')::INTEGER
            );
        END IF;

        -- Insert option 2
        IF option2 IS NOT NULL THEN
            INSERT INTO public.teacher_answer (
                content,
                correct,
                questionid,
                questionorderno
            )
            VALUES (
                option2 ->> 'content',
                (option2 ->> 'correct')::BOOLEAN,
                question_id,
                (option2 ->> 'questionorderno')::INTEGER
            );
        END IF;

        -- Insert option 3
        IF option3 IS NOT NULL THEN
            INSERT INTO public.teacher_answer (
                content,
                correct,
                questionid,
                questionorderno
            )
            VALUES (
                option3 ->> 'content',
                (option3 ->> 'correct')::BOOLEAN,
                question_id,
                (option3 ->> 'questionorderno')::INTEGER
            );
        END IF;

        -- Insert option 4
        IF option4 IS NOT NULL THEN
            INSERT INTO public.teacher_answer (
                content,
                correct,
                questionid,
                questionorderno
            )
            VALUES (
                option4 ->> 'content',
                (option4 ->> 'correct')::BOOLEAN,
                question_id,
                (option4 ->> 'questionorderno')::INTEGER
            );
        END IF;

        -- Set generatedid to the question_id
        generatedid := question_id;
    END IF;
END;
$BODY$;
ALTER PROCEDURE public.add_question_with_answers_mcq(json, json, json, json, json)
    OWNER TO postgres;

CREATE OR REPLACE PROCEDURE public.delete_question_with_answers_mcq(
	IN question_id_to_delete integer,
	OUT deleted_answers_count integer,
	OUT deleted_question_id integer)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    -- Initialize the OUT parameters to 0 and NULL, respectively
    deleted_answers_count := 0;
    deleted_question_id := NULL;

    -- Check if the question ID exists in the database
    IF EXISTS (SELECT 1 FROM public.teacher_question WHERE id = question_id_to_delete) THEN

        -- Delete the answers related to the question and store the count of deleted rows
        WITH deleted_answers AS (
            DELETE FROM public.teacher_answer WHERE questionid = question_id_to_delete
            RETURNING id
        )
        SELECT COUNT(*) INTO deleted_answers_count FROM deleted_answers;
        
        -- Delete the question and store its ID
        DELETE FROM public.teacher_question WHERE id = question_id_to_delete
        RETURNING id INTO deleted_question_id;
    END IF;
END;
$BODY$;
ALTER PROCEDURE public.delete_question_with_answers_mcq(integer)
    OWNER TO postgres;

SELECT setval('admin_department_departmentid_seq', (SELECT MAX(departmentid) FROM admin_department)+1);

SELECT setval('instituteAdmin_profile_id_seq', (SELECT MAX(id) FROM instituteadmin_profile)+1);

SELECT setval('admin_role_roleid_seq', (SELECT MAX(role_id) FROM admin_role)+1);

SELECT setval('auth_user_id_seq', (SELECT MAX(id) FROM auth_user)+1);

SELECT setval('admin_institution_institutionid_seq', (SELECT MAX(institutionid) FROM admin_institution)+1);


CREATE SEQUENCE IF NOT EXISTS public."Teacher_question_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    ;

	

	

CREATE TABLE public.teacher_question
(
    id integer NOT NULL DEFAULT nextval('"Teacher_question_id_seq"'::regclass),
    figure character varying(100) COLLATE pg_catalog."default",
    content character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    explanation text COLLATE pg_catalog."default" NOT NULL,
    questionorderno integer NOT NULL,
    ismcq boolean NOT NULL,
    quizid_id integer NOT NULL,
    category_id integer,
    is_active boolean,
    created_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    modified_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    CONSTRAINT "Teacher_question_pkey" PRIMARY KEY (id),
    CONSTRAINT teacher_question_figure_key UNIQUE (figure)
);

CREATE SEQUENCE IF NOT EXISTS public."Teacher_answer_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    ;


	CREATE TABLE public.teacher_answer
(
    id integer NOT NULL DEFAULT nextval('"Teacher_answer_id_seq"'::regclass),
    content character varying(255) COLLATE pg_catalog."default",
    correct boolean,
    questionid integer,
    questionorderno integer,
    CONSTRAINT teacher_answer_pkey PRIMARY KEY (id)
);
