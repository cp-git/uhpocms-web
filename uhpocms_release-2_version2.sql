PGDMP                          {            uhpocms    14.7    14.7 *   z           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            {           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            |           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            }           1262    84494    uhpocms    DATABASE     k   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE uhpocms;
                postgres    false                       1255    84495 ;   add_question_with_answers_mcq(json, json, json, json, json) 	   PROCEDURE       CREATE PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer)
    LANGUAGE plpgsql
    AS $$
	DECLARE question_id INTEGER;
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
        INSERT INTO public.teacher_question(
            
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
        VALUES(
            
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
        --If question insertion fails, set isCreated to false
        generatedId:= 0;
        
    ELSE
        
        DELETE FROM public.teacher_answer where questionid=(question_id)::INTEGER;
        -- inserting option 1
        
        IF option1 IS NOT NULL THEN
        INSERT INTO public.teacher_answer(
          content,
          correct,
          questionid,
          questionorderno
        )
        VALUES(
          option1 ->> 'content',
          (option1 ->> 'correct'):: BOOLEAN,
          question_id,
          (option1 ->> 'questionorderno'):: INTEGER
        );
        END IF;
        
        IF option2 IS NOT NULL THEN
        -- inserting option 2   
        INSERT INTO public.teacher_answer(
        
            content,
            correct,
            questionid,
            questionorderno
        )
        VALUES(
            
            option2 ->> 'content',
            (option2 ->> 'correct'):: BOOLEAN,
            question_id,
            (option2 ->> 'questionorderno'):: INTEGER
        );
        END IF;
        
        IF option3 IS NOT NULL THEN
        -- inserting option 3
        INSERT INTO public.teacher_answer(
            
            content,
            correct,
            questionid,
            questionorderno
        )
        VALUES(
            
            option3 ->> 'content',
            (option3 ->> 'correct'):: BOOLEAN,
            question_id,
            (option3 ->> 'questionorderno'):: INTEGER
        );
        END IF;
        
        IF option4 IS NOT NULL THEN
            
        -- inserting option 4
        INSERT INTO public.teacher_answer(
            
            content,
            correct,
            questionid,
            questionorderno
        )
        VALUES(
            
            option4 ->> 'content',
            (option4 ->> 'correct'):: BOOLEAN,
            question_id,
            (option4 ->> 'questionorderno'):: INTEGER
        );
        END IF;
        --Set isCreated to true if everything is successful
        generatedId:= question_id;
    END IF; 
END;
$$;
 �   DROP PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer);
       public          postgres    false                       1255    84496 )   delete_question_with_answers_mcq(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.delete_question_with_answers_mcq(IN question_id_to_delete integer, OUT deleted_answers_count integer, OUT deleted_question_id integer)
    LANGUAGE plpgsql
    AS $$
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
$$;
 �   DROP PROCEDURE public.delete_question_with_answers_mcq(IN question_id_to_delete integer, OUT deleted_answers_count integer, OUT deleted_question_id integer);
       public          postgres    false            �            1259    84497    instituteadmin_profile    TABLE     �  CREATE TABLE public.instituteadmin_profile (
    isactive boolean,
    id integer NOT NULL,
    userrole text NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(100),
    dob character varying(100),
    mobileno text,
    gender text,
    department integer,
    address1 text,
    address2 text,
    city text,
    state text,
    zip text,
    profile_pics character varying(100),
    createdby text,
    createddate timestamp with time zone,
    updatedby text,
    updateddate timestamp with time zone,
    institutionid_id integer,
    user_id integer NOT NULL,
    userroleid integer
);
 *   DROP TABLE public.instituteadmin_profile;
       public         heap    postgres    false            �            1259    84502    InstituteAdmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    209            ~           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    210            �            1259    84503    teacher_announcements_to_list    TABLE     �   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer NOT NULL,
    profile_id integer NOT NULL
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            �            1259    84506 $   Teacher_announcements_To_List_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_To_List_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_announcements_To_List_id_seq";
       public          postgres    false    211                       0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_announcements_To_List_id_seq" OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    212            �            1259    84507    teacher_announcements    TABLE     (  CREATE TABLE public.teacher_announcements (
    id integer NOT NULL,
    announcement_title character varying(100),
    announcement_message text,
    "to" character varying(50),
    readby character varying(50),
    createdby text,
    created_on timestamp with time zone,
    sendby integer
);
 )   DROP TABLE public.teacher_announcements;
       public         heap    postgres    false            �            1259    84512    Teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."Teacher_announcements_id_seq";
       public          postgres    false    213            �           0    0    Teacher_announcements_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Teacher_announcements_id_seq" OWNED BY public.teacher_announcements.id;
          public          postgres    false    214            �            1259    84513    teacher_category    TABLE     �   CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(250),
    isactive boolean,
    createdby character varying,
    createdon date,
    modifiedby character varying,
    modifiedon date
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            �            1259    84518    Teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    215            �           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public.teacher_category.id;
          public          postgres    false    216            �            1259    84519    teacher_course_assigntoteacher    TABLE     �   CREATE TABLE public.teacher_course_assigntoteacher (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_assigntoteacher;
       public         heap    postgres    false            �            1259    84522 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    217            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public.teacher_course_assigntoteacher.id;
          public          postgres    false    218            �            1259    84523    teacher_course    TABLE     �  CREATE TABLE public.teacher_course (
    isactive boolean,
    courseid integer NOT NULL,
    coursecode text,
    name text,
    description character varying(100),
    coursetype character varying(50),
    passingscore text,
    instid integer,
    createdby text,
    createddate timestamp with time zone,
    updatedby text,
    updateddate timestamp with time zone,
    moduleinorder boolean
);
 "   DROP TABLE public.teacher_course;
       public         heap    postgres    false            �            1259    84528    Teacher_course_CourseId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_course_CourseId_seq";
       public          postgres    false    219            �           0    0    Teacher_course_CourseId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_course_CourseId_seq" OWNED BY public.teacher_course.courseid;
          public          postgres    false    220            �            1259    84529    teacher_course_departmentid    TABLE     �   CREATE TABLE public.teacher_course_departmentid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 /   DROP TABLE public.teacher_course_departmentid;
       public         heap    postgres    false            �            1259    84532 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    221            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public.teacher_course_departmentid.id;
          public          postgres    false    222            �            1259    84533    teacher_course_enrolltostudent    TABLE     �   CREATE TABLE public.teacher_course_enrolltostudent (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_enrolltostudent;
       public         heap    postgres    false            �            1259    84536 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    223            �           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public.teacher_course_enrolltostudent.id;
          public          postgres    false    224            �            1259    84537    teacher_course_institutionid    TABLE     �   CREATE TABLE public.teacher_course_institutionid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 0   DROP TABLE public.teacher_course_institutionid;
       public         heap    postgres    false            �            1259    84540 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    225            �           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public.teacher_course_institutionid.id;
          public          postgres    false    226            �            1259    84541    teacher_email    TABLE     �  CREATE TABLE public.teacher_email (
    emailid integer NOT NULL,
    title text NOT NULL,
    subject text NOT NULL,
    content character varying(500) NOT NULL,
    createdon timestamp with time zone NOT NULL,
    createdby text NOT NULL,
    modifiedon timestamp with time zone NOT NULL,
    modifiedby text NOT NULL,
    status boolean NOT NULL,
    readstatus boolean NOT NULL,
    attachfile character varying(100) NOT NULL,
    email_from_id integer,
    isactive boolean
);
 !   DROP TABLE public.teacher_email;
       public         heap    postgres    false            �            1259    84546    Teacher_email_EmailId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    227            �           0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public.teacher_email.emailid;
          public          postgres    false    228            �            1259    84547    teacher_module    TABLE     �  CREATE TABLE public.teacher_module (
    isactive boolean,
    moduleid integer NOT NULL,
    name text NOT NULL,
    description character varying(100) NOT NULL,
    startdate date,
    enddate date,
    course integer,
    moduleorderno integer,
    createdby text,
    createddate timestamp with time zone NOT NULL,
    updatedby text,
    updateddate timestamp with time zone NOT NULL,
    courseid_id integer
);
 "   DROP TABLE public.teacher_module;
       public         heap    postgres    false            �            1259    84552    Teacher_module_ModuleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    229            �           0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public.teacher_module.moduleid;
          public          postgres    false    230            �            1259    84553    teacher_modulefile    TABLE     ;  CREATE TABLE public.teacher_modulefile (
    isactive boolean,
    id integer NOT NULL,
    file text,
    fileorderno integer,
    createdby text NOT NULL,
    createddate timestamp with time zone NOT NULL,
    updatedby text NOT NULL,
    updateddate timestamp with time zone NOT NULL,
    moduleid_id integer
);
 &   DROP TABLE public.teacher_modulefile;
       public         heap    postgres    false            �            1259    84558    Teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    231            �           0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public.teacher_modulefile.id;
          public          postgres    false    232            �            1259    84559    teacher_quiz    TABLE     V  CREATE TABLE public.teacher_quiz (
    quizid integer NOT NULL,
    title character varying(60) NOT NULL,
    description text NOT NULL,
    random_order boolean NOT NULL,
    max_questions integer,
    single_attempt boolean NOT NULL,
    pass_mark smallint NOT NULL,
    success_text text NOT NULL,
    fail_text text NOT NULL,
    quizorderno integer NOT NULL,
    courseid_id integer NOT NULL,
    module_id integer,
    category_id integer,
    isactive boolean,
    createdby character varying(255),
    createdon timestamp without time zone NOT NULL,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    set_timer integer,
    max_marks integer NOT NULL,
    CONSTRAINT "Teacher_quiz_max_questions_check" CHECK ((max_questions >= 0)),
    CONSTRAINT "Teacher_quiz_quizOrderNo_check" CHECK ((quizorderno >= 0))
);
     DROP TABLE public.teacher_quiz;
       public         heap    postgres    false            �            1259    84566    Teacher_quiz_QuizId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    233            �           0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    234            �            1259    84567    accesscontrol    TABLE     �  CREATE TABLE public.accesscontrol (
    id integer NOT NULL,
    admininstitute boolean,
    announcement boolean,
    assigncourse boolean,
    authuser boolean,
    category boolean,
    course boolean,
    department boolean,
    email boolean,
    enrollment boolean,
    module boolean,
    question boolean,
    quiz boolean,
    role boolean,
    userid integer,
    lessons boolean,
    modulefile boolean
);
 !   DROP TABLE public.accesscontrol;
       public         heap    postgres    false            �            1259    84570    accesscontrol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accesscontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.accesscontrol_id_seq;
       public          postgres    false    235            �           0    0    accesscontrol_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.accesscontrol_id_seq OWNED BY public.accesscontrol.id;
          public          postgres    false    236            �            1259    84571    admin_department    TABLE     j  CREATE TABLE public.admin_department (
    departmentid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255),
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255),
    institutionid integer
);
 $   DROP TABLE public.admin_department;
       public         heap    postgres    false            �            1259    84576 !   admin_department_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_department_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    237            �           0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    238            �            1259    84577    admin_institution    TABLE     u  CREATE TABLE public.admin_institution (
    institutionid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255),
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255),
    picture character varying(255)
);
 %   DROP TABLE public.admin_institution;
       public         heap    postgres    false            �            1259    84582 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    239            �           0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    240            �            1259    84583 
   admin_role    TABLE     �  CREATE TABLE public.admin_role (
    role_id integer NOT NULL,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    isactive boolean NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    role_description character varying(255) NOT NULL,
    role_name character varying(255) NOT NULL
);
    DROP TABLE public.admin_role;
       public         heap    postgres    false            �            1259    84588    admin_role_roleid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_role_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.admin_role_roleid_seq;
       public          postgres    false    241            �           0    0    admin_role_roleid_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.admin_role_roleid_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    242            �            1259    84589 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false            �            1259    84592    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    243            �           0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    244            �            1259    84593    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    moduleid bigint,
    permissionid bigint,
    roleid integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false            �            1259    84596    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    245            �           0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    246            �            1259    84597    auth_module    TABLE     m   CREATE TABLE public.auth_module (
    id bigint NOT NULL,
    module_name character varying(255) NOT NULL
);
    DROP TABLE public.auth_module;
       public         heap    postgres    false            �            1259    84600    auth_module_id_seq    SEQUENCE     {   CREATE SEQUENCE public.auth_module_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.auth_module_id_seq;
       public          postgres    false    247            �           0    0    auth_module_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.auth_module_id_seq OWNED BY public.auth_module.id;
          public          postgres    false    248            �            1259    84601    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            �            1259    84606    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    249            �           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    250            �            1259    84607 	   auth_user    TABLE     5  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    created_by character varying,
    created_on timestamp with time zone,
    modified_by character varying,
    modified_on timestamp with time zone
);
    DROP TABLE public.auth_user;
       public         heap    postgres    false            �            1259    84612    auth_user_groups    TABLE     �   CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    groupid bigint,
    userid bigint
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            �            1259    84615    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    252            �           0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    253            �            1259    84616    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    251            �           0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    254            �            1259    84617    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    module_id bigint,
    permission_id bigint,
    user_id bigint,
    role_id bigint
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false                        1259    84620 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    255            �           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    256                       1259    84621    teacher_answer    TABLE     �   CREATE TABLE public.teacher_answer (
    id integer NOT NULL,
    content character varying(255),
    correct boolean,
    questionid integer,
    questionorderno integer
);
 "   DROP TABLE public.teacher_answer;
       public         heap    postgres    false                       1259    84624    teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.teacher_answer_id_seq;
       public          postgres    false    257            �           0    0    teacher_answer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.teacher_answer_id_seq OWNED BY public.teacher_answer.id;
          public          postgres    false    258                       1259    84625    teacher_coursesyllabus    TABLE     _  CREATE TABLE public.teacher_coursesyllabus (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    isactive boolean NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    syllabusfile character varying(255) NOT NULL
);
 *   DROP TABLE public.teacher_coursesyllabus;
       public         heap    postgres    false                       1259    84630    teacher_coursesyllabus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_coursesyllabus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.teacher_coursesyllabus_id_seq;
       public          postgres    false    259            �           0    0    teacher_coursesyllabus_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.teacher_coursesyllabus_id_seq OWNED BY public.teacher_coursesyllabus.id;
          public          postgres    false    260                       1259    84631    teacher_question    TABLE     S  CREATE TABLE public.teacher_question (
    id integer NOT NULL,
    max_marks integer NOT NULL,
    category_id integer NOT NULL,
    content character varying(255) NOT NULL,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    explanation character varying(255) NOT NULL,
    figure character varying(255),
    is_active boolean NOT NULL,
    ismcq boolean NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    questionorderno integer NOT NULL,
    quizid_id integer NOT NULL
);
 $   DROP TABLE public.teacher_question;
       public         heap    postgres    false                       1259    84636    teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teacher_question_id_seq;
       public          postgres    false    261            �           0    0    teacher_question_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teacher_question_id_seq OWNED BY public.teacher_question.id;
          public          postgres    false    262                       1259    84637    teacher_studentcourseprogress    TABLE     <  CREATE TABLE public.teacher_studentcourseprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    currentassignno integer NOT NULL,
    currentmoduleno integer NOT NULL,
    currentunitno integer NOT NULL,
    grade real NOT NULL,
    progress integer NOT NULL,
    studentid_id integer NOT NULL
);
 1   DROP TABLE public.teacher_studentcourseprogress;
       public         heap    postgres    false                       1259    84640 $   teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentcourseprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentcourseprogress_id_seq;
       public          postgres    false    263            �           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentcourseprogress_id_seq OWNED BY public.teacher_studentcourseprogress.id;
          public          postgres    false    264            	           1259    84641 !   teacher_studentmodulefileprogress    TABLE       CREATE TABLE public.teacher_studentmodulefileprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    currentfilepageno integer NOT NULL,
    fileid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress real NOT NULL,
    studentid_id integer NOT NULL
);
 5   DROP TABLE public.teacher_studentmodulefileprogress;
       public         heap    postgres    false            
           1259    84644 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmodulefileprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.teacher_studentmodulefileprogress_id_seq;
       public          postgres    false    265            �           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.teacher_studentmodulefileprogress_id_seq OWNED BY public.teacher_studentmodulefileprogress.id;
          public          postgres    false    266                       1259    84645    teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public.teacher_studentmoduleprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress integer NOT NULL,
    studentid_id integer NOT NULL
);
 1   DROP TABLE public.teacher_studentmoduleprogress;
       public         heap    postgres    false                       1259    84648 $   teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmoduleprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentmoduleprogress_id_seq;
       public          postgres    false    267            �           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentmoduleprogress_id_seq OWNED BY public.teacher_studentmoduleprogress.id;
          public          postgres    false    268                       1259    84649    teacher_studentquizprogress    TABLE     �   CREATE TABLE public.teacher_studentquizprogress (
    id integer NOT NULL,
    completed boolean,
    num_attempts integer,
    quizid_id integer,
    score integer,
    studentid_id integer
);
 /   DROP TABLE public.teacher_studentquizprogress;
       public         heap    postgres    false                       1259    84652 "   teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.teacher_studentquizprogress_id_seq;
       public          postgres    false    269            �           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.teacher_studentquizprogress_id_seq OWNED BY public.teacher_studentquizprogress.id;
          public          postgres    false    270                       1259    84653    teacher_studentquizresult    TABLE     �  CREATE TABLE public.teacher_studentquizresult (
    id integer NOT NULL,
    answerid integer NOT NULL,
    marks integer NOT NULL,
    content character varying(20000) NOT NULL,
    questionid integer NOT NULL,
    quizid integer NOT NULL,
    selectedoption boolean NOT NULL,
    studentid integer,
    teacher_remark character varying(255),
    createdon timestamp without time zone,
    modifiedon timestamp without time zone,
    reviewstat boolean NOT NULL,
    reviwedon timestamp without time zone
);
 -   DROP TABLE public.teacher_studentquizresult;
       public         heap    postgres    false                       1259    84658     teacher_studentquizresult_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizresult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.teacher_studentquizresult_id_seq;
       public          postgres    false    271            �           0    0     teacher_studentquizresult_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.teacher_studentquizresult_id_seq OWNED BY public.teacher_studentquizresult.id;
          public          postgres    false    272                       1259    84659    test_seq    SEQUENCE     r   CREATE SEQUENCE public.test_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.test_seq;
       public          postgres    false            	           2604    84660    accesscontrol id    DEFAULT     t   ALTER TABLE ONLY public.accesscontrol ALTER COLUMN id SET DEFAULT nextval('public.accesscontrol_id_seq'::regclass);
 ?   ALTER TABLE public.accesscontrol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            
           2604    84661    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    238    237                       2604    84662    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    240    239                       2604    84663    admin_role role_id    DEFAULT     w   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_roleid_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    242    241                       2604    84664    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243                       2604    84665    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245                       2604    84666    auth_module id    DEFAULT     p   ALTER TABLE ONLY public.auth_module ALTER COLUMN id SET DEFAULT nextval('public.auth_module_id_seq'::regclass);
 =   ALTER TABLE public.auth_module ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247                       2604    84667    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249                       2604    84668    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    251                       2604    84669    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252                       2604    84670    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            �           2604    84671    instituteadmin_profile id    DEFAULT     �   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �           2604    84672    teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_id_seq"'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213            �           2604    84673     teacher_announcements_to_list id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_To_List_id_seq"'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211                       2604    84674    teacher_answer id    DEFAULT     v   ALTER TABLE ONLY public.teacher_answer ALTER COLUMN id SET DEFAULT nextval('public.teacher_answer_id_seq'::regclass);
 @   ALTER TABLE public.teacher_answer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            �           2604    84675    teacher_category id    DEFAULT     |   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    84676    teacher_course courseid    DEFAULT     �   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public."Teacher_course_CourseId_seq"'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    220    219            �           2604    84677 !   teacher_course_assigntoteacher id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_assigntoteacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217                        2604    84678    teacher_course_departmentid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_departmentid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 M   ALTER TABLE public.teacher_course_departmentid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221                       2604    84679 !   teacher_course_enrolltostudent id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_enrolltostudent ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223                       2604    84680    teacher_course_institutionid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_institutionid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 N   ALTER TABLE public.teacher_course_institutionid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225                       2604    84681    teacher_coursesyllabus id    DEFAULT     �   ALTER TABLE ONLY public.teacher_coursesyllabus ALTER COLUMN id SET DEFAULT nextval('public.teacher_coursesyllabus_id_seq'::regclass);
 H   ALTER TABLE public.teacher_coursesyllabus ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259                       2604    84682    teacher_email emailid    DEFAULT     �   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    228    227                       2604    84683    teacher_module moduleid    DEFAULT     �   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    230    229                       2604    84684    teacher_modulefile id    DEFAULT     �   ALTER TABLE ONLY public.teacher_modulefile ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 D   ALTER TABLE public.teacher_modulefile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231                       2604    84685    teacher_question id    DEFAULT     z   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public.teacher_question_id_seq'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261                       2604    84686    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    234    233                       2604    84687     teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentcourseprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentcourseprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentcourseprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263                       2604    84688 $   teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmodulefileprogress_id_seq'::regclass);
 S   ALTER TABLE public.teacher_studentmodulefileprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265                       2604    84689     teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmoduleprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmoduleprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentmoduleprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267                       2604    84690    teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizprogress_id_seq'::regclass);
 M   ALTER TABLE public.teacher_studentquizprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269                       2604    84691    teacher_studentquizresult id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizresult ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizresult_id_seq'::regclass);
 K   ALTER TABLE public.teacher_studentquizresult ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            Q          0    84567    accesscontrol 
   TABLE DATA           �   COPY public.accesscontrol (id, admininstitute, announcement, assigncourse, authuser, category, course, department, email, enrollment, module, question, quiz, role, userid, lessons, modulefile) FROM stdin;
    public          postgres    false    235   ��      S          0    84571    admin_department 
   TABLE DATA           �   COPY public.admin_department (departmentid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, institutionid) FROM stdin;
    public          postgres    false    237   ��      U          0    84577    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    239   ܾ      W          0    84583 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    241   �      Y          0    84589 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    243   ��      [          0    84593    auth_group_permissions 
   TABLE DATA           T   COPY public.auth_group_permissions (id, moduleid, permissionid, roleid) FROM stdin;
    public          postgres    false    245   ��      ]          0    84597    auth_module 
   TABLE DATA           6   COPY public.auth_module (id, module_name) FROM stdin;
    public          postgres    false    247   ��      _          0    84601    auth_permission 
   TABLE DATA           @   COPY public.auth_permission (id, name, description) FROM stdin;
    public          postgres    false    249   {�      a          0    84607 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, password, last_login, username, first_name, last_name, email, is_active, date_joined, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    251   ��      b          0    84612    auth_user_groups 
   TABLE DATA           R   COPY public.auth_user_groups (id, user_id, group_id, groupid, userid) FROM stdin;
    public          postgres    false    252   ��      e          0    84617    auth_user_user_permissions 
   TABLE DATA           d   COPY public.auth_user_user_permissions (id, module_id, permission_id, user_id, role_id) FROM stdin;
    public          postgres    false    255   ��      7          0    84497    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (isactive, id, userrole, first_name, last_name, email, dob, mobileno, gender, department, address1, address2, city, state, zip, profile_pics, createdby, createddate, updatedby, updateddate, institutionid_id, user_id, userroleid) FROM stdin;
    public          postgres    false    209   T�      ;          0    84507    teacher_announcements 
   TABLE DATA           �   COPY public.teacher_announcements (id, announcement_title, announcement_message, "to", readby, createdby, created_on, sendby) FROM stdin;
    public          postgres    false    213   ��      9          0    84503    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    211   >�      g          0    84621    teacher_answer 
   TABLE DATA           [   COPY public.teacher_answer (id, content, correct, questionid, questionorderno) FROM stdin;
    public          postgres    false    257   ��      =          0    84513    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    215   H�      A          0    84523    teacher_course 
   TABLE DATA           �   COPY public.teacher_course (isactive, courseid, coursecode, name, description, coursetype, passingscore, instid, createdby, createddate, updatedby, updateddate, moduleinorder) FROM stdin;
    public          postgres    false    219   ��      ?          0    84519    teacher_course_assigntoteacher 
   TABLE DATA           S   COPY public.teacher_course_assigntoteacher (id, course_id, profile_id) FROM stdin;
    public          postgres    false    217   ��      C          0    84529    teacher_course_departmentid 
   TABLE DATA           S   COPY public.teacher_course_departmentid (id, course_id, department_id) FROM stdin;
    public          postgres    false    221   ?�      E          0    84533    teacher_course_enrolltostudent 
   TABLE DATA           S   COPY public.teacher_course_enrolltostudent (id, course_id, profile_id) FROM stdin;
    public          postgres    false    223   ��      G          0    84537    teacher_course_institutionid 
   TABLE DATA           U   COPY public.teacher_course_institutionid (id, course_id, institution_id) FROM stdin;
    public          postgres    false    225   W�      i          0    84625    teacher_coursesyllabus 
   TABLE DATA           �   COPY public.teacher_coursesyllabus (id, courseid_id, isactive, createdby, createdon, modifiedby, modifiedon, syllabusfile) FROM stdin;
    public          postgres    false    259   ��      I          0    84541    teacher_email 
   TABLE DATA           �   COPY public.teacher_email (emailid, title, subject, content, createdon, createdby, modifiedon, modifiedby, status, readstatus, attachfile, email_from_id, isactive) FROM stdin;
    public          postgres    false    227   �      K          0    84547    teacher_module 
   TABLE DATA           �   COPY public.teacher_module (isactive, moduleid, name, description, startdate, enddate, course, moduleorderno, createdby, createddate, updatedby, updateddate, courseid_id) FROM stdin;
    public          postgres    false    229   6�      M          0    84553    teacher_modulefile 
   TABLE DATA           �   COPY public.teacher_modulefile (isactive, id, file, fileorderno, createdby, createddate, updatedby, updateddate, moduleid_id) FROM stdin;
    public          postgres    false    231   ��      k          0    84631    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, max_marks, category_id, content, created_by, created_on, explanation, figure, is_active, ismcq, modified_by, modified_on, questionorderno, quizid_id) FROM stdin;
    public          postgres    false    261   ��      O          0    84559    teacher_quiz 
   TABLE DATA             COPY public.teacher_quiz (quizid, title, description, random_order, max_questions, single_attempt, pass_mark, success_text, fail_text, quizorderno, courseid_id, module_id, category_id, isactive, createdby, createdon, modifiedby, modifiedon, set_timer, max_marks) FROM stdin;
    public          postgres    false    233   �      m          0    84637    teacher_studentcourseprogress 
   TABLE DATA           �   COPY public.teacher_studentcourseprogress (id, courseid_id, currentassignno, currentmoduleno, currentunitno, grade, progress, studentid_id) FROM stdin;
    public          postgres    false    263   u�      o          0    84641 !   teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public.teacher_studentmodulefileprogress (id, courseid_id, currentfilepageno, fileid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    265   /�      q          0    84645    teacher_studentmoduleprogress 
   TABLE DATA           m   COPY public.teacher_studentmoduleprogress (id, courseid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    267   ��      s          0    84649    teacher_studentquizprogress 
   TABLE DATA           r   COPY public.teacher_studentquizprogress (id, completed, num_attempts, quizid_id, score, studentid_id) FROM stdin;
    public          postgres    false    269   �      u          0    84653    teacher_studentquizresult 
   TABLE DATA           �   COPY public.teacher_studentquizresult (id, answerid, marks, content, questionid, quizid, selectedoption, studentid, teacher_remark, createdon, modifiedon, reviewstat, reviwedon) FROM stdin;
    public          postgres    false    271   y�      �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 162, true);
          public          postgres    false    210            �           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_announcements_To_List_id_seq"', 72, true);
          public          postgres    false    212            �           0    0    Teacher_announcements_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_announcements_id_seq"', 24, true);
          public          postgres    false    214            �           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 9, true);
          public          postgres    false    216            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 76, true);
          public          postgres    false    218            �           0    0    Teacher_course_CourseId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_course_CourseId_seq"', 207, true);
          public          postgres    false    220            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 296, true);
          public          postgres    false    222            �           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 229, true);
          public          postgres    false    224            �           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 200, true);
          public          postgres    false    226            �           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 22, true);
          public          postgres    false    228            �           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 142, true);
          public          postgres    false    230            �           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 169, true);
          public          postgres    false    232            �           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 148, true);
          public          postgres    false    234            �           0    0    accesscontrol_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.accesscontrol_id_seq', 1, false);
          public          postgres    false    236            �           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 201, true);
          public          postgres    false    238            �           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 173, true);
          public          postgres    false    240            �           0    0    admin_role_roleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_role_roleid_seq', 4, true);
          public          postgres    false    242            �           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    244            �           0    0    auth_group_permissions_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 417, true);
          public          postgres    false    246            �           0    0    auth_module_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.auth_module_id_seq', 1, false);
          public          postgres    false    248            �           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    250            �           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
          public          postgres    false    253            �           0    0    auth_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_user_id_seq', 156, true);
          public          postgres    false    254            �           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 35, true);
          public          postgres    false    256            �           0    0    teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.teacher_answer_id_seq', 1728, true);
          public          postgres    false    258            �           0    0    teacher_coursesyllabus_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.teacher_coursesyllabus_id_seq', 1, false);
          public          postgres    false    260            �           0    0    teacher_question_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.teacher_question_id_seq', 173, true);
          public          postgres    false    262            �           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.teacher_studentcourseprogress_id_seq', 125, true);
          public          postgres    false    264            �           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.teacher_studentmodulefileprogress_id_seq', 79, true);
          public          postgres    false    266            �           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentmoduleprogress_id_seq', 42, true);
          public          postgres    false    268            �           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.teacher_studentquizprogress_id_seq', 32, true);
          public          postgres    false    270            �           0    0     teacher_studentquizresult_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.teacher_studentquizresult_id_seq', 90, true);
          public          postgres    false    272            �           0    0    test_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('public.test_seq', 1, true);
          public          postgres    false    273                       2606    84693 2   instituteadmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    209                        2606    84695 9   instituteadmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 e   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    209            #           2606    84697 @   teacher_announcements_to_list Teacher_announcements_To_List_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_List_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_List_pkey";
       public            postgres    false    211            &           2606    84699 ]   teacher_announcements_to_list Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq" UNIQUE (announcements_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq";
       public            postgres    false    211    211            (           2606    84701 0   teacher_announcements Teacher_announcements_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT "Teacher_announcements_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT "Teacher_announcements_pkey";
       public            postgres    false    213            +           2606    84703 .   teacher_category Teacher_category_category_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 Z   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    215            -           2606    84705 &   teacher_category Teacher_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    215            /           2606    84707 Z   teacher_course_assigntoteacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    217    217            2           2606    84709 B   teacher_course_assigntoteacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    217            7           2606    84711 Z   teacher_course_departmentid Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    221    221            ;           2606    84713 <   teacher_course_departmentid Teacher_course_DepartmentId_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    221            =           2606    84715 Z   teacher_course_enrolltostudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    223    223            @           2606    84717 B   teacher_course_enrolltostudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    223            C           2606    84719 \   teacher_course_institutionid Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    225    225            G           2606    84721 >   teacher_course_institutionid Teacher_course_InstitutionId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    225            5           2606    84723 "   teacher_course Teacher_course_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT "Teacher_course_pkey" PRIMARY KEY (courseid);
 N   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT "Teacher_course_pkey";
       public            postgres    false    219            J           2606    84725     teacher_email Teacher_email_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY (emailid);
 L   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    227            N           2606    84727 "   teacher_module Teacher_module_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY (moduleid);
 N   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    229            Q           2606    84729 *   teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    231            V           2606    84731    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    233            Z           2606    84733     accesscontrol accesscontrol_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_pkey;
       public            postgres    false    235            \           2606    84735 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    237            ^           2606    84737 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    239            `           2606    84739    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    241            e           2606    84741    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    243            i           2606    84743 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    245            g           2606    84745    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    243            k           2606    84747    auth_module auth_module_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT auth_module_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT auth_module_pkey;
       public            postgres    false    247            o           2606    84749 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    249            w           2606    84751 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    252            z           2606    84753 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    252    252            q           2606    84755    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    251            }           2606    84757 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    255            t           2606    84759     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public            postgres    false    251            �           2606    84761 "   teacher_answer teacher_answer_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_pkey;
       public            postgres    false    257            �           2606    84763 2   teacher_coursesyllabus teacher_coursesyllabus_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_coursesyllabus
    ADD CONSTRAINT teacher_coursesyllabus_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_coursesyllabus DROP CONSTRAINT teacher_coursesyllabus_pkey;
       public            postgres    false    259            L           2606    84765 %   teacher_email teacher_email_title_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_title_key UNIQUE (title);
 O   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_title_key;
       public            postgres    false    227            �           2606    84769 &   teacher_question teacher_question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_pkey;
       public            postgres    false    261            X           2606    84771 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    233            �           2606    84773 @   teacher_studentcourseprogress teacher_studentcourseprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentcourseprogress
    ADD CONSTRAINT teacher_studentcourseprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentcourseprogress DROP CONSTRAINT teacher_studentcourseprogress_pkey;
       public            postgres    false    263            �           2606    84775 H   teacher_studentmodulefileprogress teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress
    ADD CONSTRAINT teacher_studentmodulefileprogress_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.teacher_studentmodulefileprogress DROP CONSTRAINT teacher_studentmodulefileprogress_pkey;
       public            postgres    false    265            �           2606    84777 @   teacher_studentmoduleprogress teacher_studentmoduleprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentmoduleprogress
    ADD CONSTRAINT teacher_studentmoduleprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentmoduleprogress DROP CONSTRAINT teacher_studentmoduleprogress_pkey;
       public            postgres    false    267            �           2606    84779 <   teacher_studentquizprogress teacher_studentquizprogress_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT teacher_studentquizprogress_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT teacher_studentquizprogress_pkey;
       public            postgres    false    269            �           2606    84781 8   teacher_studentquizresult teacher_studentquizresult_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.teacher_studentquizresult
    ADD CONSTRAINT teacher_studentquizresult_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.teacher_studentquizresult DROP CONSTRAINT teacher_studentquizresult_pkey;
       public            postgres    false    271            b           2606    84783 '   admin_role uk_oaw6skshjf4fahwf7ot87lb8i 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i;
       public            postgres    false    241            m           2606    84785 (   auth_module uk_rsb8pvftbmtut85ct3jlbuuun 
   CONSTRAINT     j   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun UNIQUE (module_name);
 R   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun;
       public            postgres    false    247                       1259    84786 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     �   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public.instituteadmin_profile USING btree (institutionid_id);
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    209            !           1259    84787 7   Teacher_announcements_To_List_announcements_id_cc6864cc    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_announcements_id_cc6864cc" ON public.teacher_announcements_to_list USING btree (announcements_id);
 M   DROP INDEX public."Teacher_announcements_To_List_announcements_id_cc6864cc";
       public            postgres    false    211            $           1259    84788 1   Teacher_announcements_To_List_profile_id_f1306085    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_profile_id_f1306085" ON public.teacher_announcements_to_list USING btree (profile_id);
 G   DROP INDEX public."Teacher_announcements_To_List_profile_id_f1306085";
       public            postgres    false    211            )           1259    84789 '   Teacher_category_category_2d59e72d_like    INDEX     ~   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public.teacher_category USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    215            0           1259    84790 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public.teacher_course_assigntoteacher USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    217            3           1259    84791 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public.teacher_course_assigntoteacher USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    217            8           1259    84792 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX     }   CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public.teacher_course_departmentid USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    221            9           1259    84793 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     �   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public.teacher_course_departmentid USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    221            >           1259    84794 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public.teacher_course_enrolltostudent USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    223            A           1259    84795 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public.teacher_course_enrolltostudent USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    223            D           1259    84796 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX        CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public.teacher_course_institutionid USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    225            E           1259    84797 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public.teacher_course_institutionid USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    225            H           1259    84798 $   Teacher_email_Email_From_id_acc54e41    INDEX     i   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public.teacher_email USING btree (email_from_id);
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    227            O           1259    84799 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     o   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public.teacher_modulefile USING btree (moduleid_id);
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    231            R           1259    84800 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    233            S           1259    84801    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    233            T           1259    84802 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    233            c           1259    84805    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    243            u           1259    84806 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    252            x           1259    84807 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    252            {           1259    84808 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    255            ~           1259    84809 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    255            r           1259    84810     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public            postgres    false    251            �           2606    84811 R   instituteadmin_profile InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins" FOREIGN KEY (institutionid_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins";
       public          postgres    false    3422    239    209            �           2606    84816 N   instituteadmin_profile InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id";
       public          postgres    false    3441    251    209            �           2606    84821 S   teacher_course_assigntoteacher Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c";
       public          postgres    false    217    219    3381            �           2606    84826 T   teacher_course_assigntoteacher Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute";
       public          postgres    false    217    3358    209            �           2606    84831 P   teacher_course_departmentid Teacher_course_Depar_course_id_e2919890_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c";
       public          postgres    false    3381    221    219            �           2606    84836 T   teacher_course_departmentid Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep" FOREIGN KEY (department_id) REFERENCES public.admin_department(departmentid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep";
       public          postgres    false    221    3420    237            �           2606    84841 S   teacher_course_enrolltostudent Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c";
       public          postgres    false    3381    219    223            �           2606    84846 T   teacher_course_enrolltostudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    209    3358    223            �           2606    84851 Q   teacher_course_institutionid Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c";
       public          postgres    false    3381    225    219            �           2606    84856 V   teacher_course_institutionid Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    225    239    3422            �           2606    84861 ?   teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY (email_from_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    227    3358    209            �           2606    84866 G   teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY (moduleid_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    231    3406    229            �           2606    84871 I   teacher_quiz Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId";
       public          postgres    false    233    219    3381            �           2606    84876 G   teacher_quiz Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId" FOREIGN KEY (module_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId";
       public          postgres    false    3406    229    233            �           2606    84881 E   teacher_quiz Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id";
       public          postgres    false    233    3373    215            �           2606    84886 4   admin_department admin_department_institutionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_institutionid_fkey FOREIGN KEY (institutionid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 ^   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_institutionid_fkey;
       public          postgres    false    239    237    3422            �           2606    84891 ;   auth_group_permissions auth_group_permissions_moduleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.auth_module(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 e   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_moduleid_fkey;
       public          postgres    false    3435    245    247            �           2606    84896 ?   auth_group_permissions auth_group_permissions_permissionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permissionid_fkey FOREIGN KEY (permissionid) REFERENCES public.auth_permission(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 i   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_permissionid_fkey;
       public          postgres    false    3439    249    245            �           2606    84901 9   auth_group_permissions auth_group_permissions_roleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.admin_role(role_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 c   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_roleid_fkey;
       public          postgres    false    3424    245    241            �           2606    84906 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    252    3431    243            �           2606    84911 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public          postgres    false    252    251    3441            �           2606    84916 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    255    3439    249            �           2606    84921 D   auth_user_user_permissions auth_user_user_permissions_module_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.auth_module(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_module_id_fkey;
       public          postgres    false    255    3435    247            �           2606    84926 B   auth_user_user_permissions auth_user_user_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.admin_role(role_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_role_id_fkey;
       public          postgres    false    255    241    3424            �           2606    84931 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    3441    251    255            �           2606    84936 *   teacher_course fkg4ubhja82bo0jsn69qeqgm8b8    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8 FOREIGN KEY (instid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 T   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8;
       public          postgres    false    219    3422    239            �           2606    84941 Q   teacher_announcements_to_list teacher_announcements_to_list_announcements_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_announcements_id_fkey FOREIGN KEY (announcements_id) REFERENCES public.teacher_announcements(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 {   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_announcements_id_fkey;
       public          postgres    false    211    3368    213            �           2606    84946 K   teacher_announcements_to_list teacher_announcements_to_list_profile_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 u   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_profile_id_fkey;
       public          postgres    false    209    211    3358            �           2606    84951    teacher_module teacher_module    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 G   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module;
       public          postgres    false    229    219    3381            Q      x������ � �      S   (  x����n�0E��W��<~����IղA�&5V�D
�_#�����=s=��j[�b���#`�AF�L�D4m��Op-�����[w(��5�@��쎘L
"�@���}��z[�/f� �	NT|�;W��o�4����h6Ѭ;y��O�Ҁ�*���7rIqoOw�*!%��˗o�p�}�}�,^m�1��F����o�*���nϦ�?](@�6�z+�#hH��h��ט�8������bY����X<���y�1�0�눌*bd�f���s<)��b�4e ?��$I��+X��      U   �   x���Ak�0����̨���v�t�B�-�B/�bMDc���ZK���9���{3�q�W�6�1&Q�#�!R�S�1��N��Ip7��s{�u�$�F�~��ɵSe�:�	D�q��m�6wx�Ɏ��:]"��d��u��dG�,����m���쭸{xz�Z�6��%7����p����)���}ѦV�jΞ,��n+T���2؏SY�N�Û�PQ�B���E��CD�?�s�3�O��M�<-�D���A��}�0      W   �   x����
�0E����44Ik5߲������_�9�8y����i��m0�Y�g�b�4�F�T�f��s�]�d��� r~40F�_���g��e����9�RP�"��QcI�}�b���y�'���QI��دLe�5^�4l�q�k�yOpA x��S�      Y      x������ � �      [     x�-�ˑD1ϼ`������J�����h��϶-��߰�� (D	J�MѲ���q@e\PD#ư'#��\�%(ET�2�lb9�X��X�#Jca��n��A�<�n�pt��"��HPKDHS�G#�2/I*ѓ�/��0�^�;-�nqH��Y.�-�Q��d<�C{�x4e<�2���Ʋ����e��eU�@we+b)��S�ʃ4A.Z��ؠ2��6����j@n#��$�ӈg��z��{���������m'`z      ]   �   x�-���0��ۇ1�����@�k'������J�k��W)΄��S�B	kXS|S,4k��-��������v��![�~�>����/F.J��(	�
�:�<ؖI5x昹�c�50�Hd�ZH��ϲ}C{�1�]gE?�z3��$��z��{A��8N      _   ?   x�3�truq�R\F�.�>�@>��2�p�C(.NG��0���e���&�b���� Z��      a   �  x����n�0���S�^�অ:5m
IM��@/��e-��p��#Qrk�v�c�~S_&?g(T<A��K���Jȥ�ԩ���w<L�&om��o�4s��cy��U�M�D+i��OSΧ= ����{ŉ�kB�R�0��-4�6P��������}���t�C���kBK
��n`�p�!����!�7XL������2�������A��s*>Q,��<q�ATEAm���^w.|[�Y_hd��0�L������k�YS�����z�nm��%�5�4��;k��Ѭз6/�.~��X�Y�{� �&�4x���C
r��	n��:�����X��0!϶�C��$/��z0�_�i[N9o�R�⚔���=�,D�I�Y�� �p���6�ݔ��7�0k�r�B�5Xc��hЬp�՝�M�u��Ĥ��y*9�IH� �w<��ky���6E�f�zN�{1�Z3����C2����3B6�6�>\A������Ԋ:B8G��mp����SK��T�?�i3W���ޗa��F�ZƘ������^�R%X���O��Ƿ�d)%�'�
���U���;l�wS��
�9�w�k��=í��(�O���o��;ab�i��u��\��t;f�v�p���.�D=�>�
�l7�� �m���G]��1y�F�� ����k�fkѱ_�u|���l���ۜ�ށ=+Ɔub��4�{p�H�cmC͌��69�d��v���:�������+�0v���f�-�?D�,&      b      x������ � �      e   P   x�=���0�3�
���.��֊�� �z�D'8S���w�����Ni�ȿg,���6��6�<e���`���s����>      7   O  x�ŗ]o�V��'����|WM��FI]E���J�V'�5�|Xv������Y����b<�@�����qT�Q�p_�ۤ��`��
�.�q��4��!�#̣(�B*��b�F��I\6�����y��j����ܮb�m��s����X�0¸G�Gقѐ��s_k��!'�P��� �U�`��b9���)�/��ǴX%���x���1ZP&��^��OH3�,o��.�,����@�8(��R�͗ʾ�D�.w��=�	4��9���m�VQztAd!�t1���s<G9�`=�x��&��&���ݘ�{�xL g�2�+������/��{Z"BI|&��Q�C�=B0 <�o�Q��QE���Q�H�l�D
�oK vUك��Z���02��'|v��r�2�{3�|�_�"�*�l�X��xLt�A�VX,Q�4��4�C�|�����GL�1Iۺ�⢆��&8c�$o�	�6�i�C�S�㗩��(���T�D�����ȡ :":���X��6[Ǩ�.!��hGN�MmN9`�Ψ�����z6`,���p��hy���B�t��؛/�d̾M#I���98�q4����1+r1TЦ��v�	��\4�1,����\��W��8ű�E�Y���Y\�e�����&xp��G,��#&YH��}��8�鴏�w r ��ҰO	,��N��\8%:�~�f�a��>:�<�(�������h���	<▉b\7]8�$߾7<�����8�qAϡ�_�-�g��6<�3ƣA/�v��m�:��~�`�i��S��W>uO�_6' |Aug��O̙3�өm؁� ���ю�mnk��.��	�4LΌC��2K��䫍��^�u����]�܄Ih�q�)+W%B�'T��1,2��ؙ��dռse�6�^:eb��d�+��$��&����g�L�8&�:��Щ�2)�ܼ{�|;ţ�mA[�2��A`2���#�?�8�����p����$=(��qH�Ulh��V���m��e�VN��G)}�Wؓ8��W�����û�'~�#��dԺ�S_j��8?Pؕ?������L      ;   {   x�}̱
�0 ����KCrɥ�����]Sh�I�FпW7'�͏�>d��S
�� �����%��
d�u��,!Qd�״���X�y�N���[����砀'��*����O5j��a(&#      9   i   x�-ͱ�0��(�G�P�������Fwy�X�L��8������
��e%XV���=?8��q�~��*,A�*(�񪿒PY�VB�"jXB�������%0      g   �  x�m�M�e��ǪUd��%d�I� ^@&n�:�T��?��pV��s(�6�;x�GJ�D���bO��_��|��K�O��#������/��&�!AT�?�����<}����Đ�h��%�m���E{#��1�{�!�j�pH�4Y��;��:	Z��e�z���s����A�)�+$�ㄙ\���T.k���J�i1�ǥ�!�t-���!�Kj�YO���.w��\��Q`"]�%�Jд̆���2Ec��ϵ4�1X�i1�xS&��t�&*>Q����j;�b�YKյr��� �t7P�9�J�iW���)e�Ω�j}k�v��dSN+R�V�4�:Q�0O����c��',f7����>��>��>�H�h��O�,��Wu���)*�,����n��,;2�aaΡJ�>=4Ө� �>���1�i�m �;vD�u��`NE}1�� T���4�)��-<A��њ.�f��qh��X����Z:u�ʢ�~������U�������-��O�-]����XJ:ͻ3�r�5�<�6�5Lih 3ajs�TI�d��Hlgن��yTr�k�ɮ�\3�&R͋>�jj���T�9d��b�:T����6ˡ3NC�a�v�>SXddda=������YX�򐱱����ti��tX���pP�8� )�����<`��ЂŎC�"5����@�z��$.�!Ӂ%�=��A-�2��՚	z�t`���;��܌����6$,aCƲѧ��毦T�#���%�Ja�A�P����T���V�ibȸ`j����W˓��Bg�J�lW�M8��f���`k���{KѰ`X4ulXm�G'OT�#�ʴcL���mika��n��y]�M��B(�^�HMG�(6l�d��+\�nV�cq��7#�nl5W��Em��;9��j����bhq���*ރ�@Uƥ#���؝To���o�Cق"FZk:Ae�V.Q��7�_[�Y�;�bw �����I�BA1[��� �\��؄d��eNΑ�:uX/R]���"����p�v�\�3|��1��V�?v\�S�J�B�t�!��p�Q�#!�c��c����*�nƾ���3:q�V�K���\%�lRn�DIݒ�L�6�]!��2��7ӹ��#.�z�X��<�D8l]�<tU�T�L���W�ɂt�/��g"�NHC�G�骸HwEVe��U�7fw�cq��|�^���J=�tV�+B�-�~6���7/*��W+� �"m?��F���٢��qQ	ϛ0�j�[lf�6ߩ�}�*��QM��7|����3	zx�wk1��-��ɜ�К��:[��7Ab�^��d��[�Ը�\�Ǣ�̨gz�zZ������ �O�>ݸ��߿o�1���Z�)Z�)�1������#[N�L�Ѱ���#|��as������tq�A�ӈ$�}y�w��[����F6�^v�����x����z��9���m:vQ����.���E��`�o�;�V��g�٤�8����Hʐ�>O:v��@hI<������a�l�{�#����hr�**���(	vq-�7���5�Q?ꝑ�G�Q��>�oq�Q�����0��n�MQ��n��Hc��H�_�EC9�����Z '?V��?�"�i7zz���\t/�\����cs���C��|����]_\Pv�r�B�&1.+l[Ïq)i
��aIhYQ���8p�S��k+	������
2Q'�b8��9��K��<�x����9��9�[d'��Z)(�b��B־� 嫔r�c�Q0�	�a��"�m4.)G������b��Zƶ�u���yU"�b�H9����Ъ����1
ڙ���ٛ��y�xv�o(;8$�'�$H6��-���0���6���X6�4y�,����f�S��='�='�*�ي4?~(���s�H�}]K�d\돜B�_T��^*�~�t�^1P�F������^�'6��/�󨳲Z�~�e=��X�����(IAǚc^��\�9@���ʺ�sSϳ����x8�47N����f����硽}��eU<g�����n}�:�8���;s��5�?4�GI����$5t|wI�K��K�z�>���o�	�$�������DZ��6f����i�|,���z�I�z��,����%���%cg:%������� t9sw      =   A   x�3��u�,�LL����4202�50�54���/�,)I�#J�%gHjq	g��9� W� �� �      A     x��WMo�H=7���+Z�����qD�Y�e/�1ĒcK��Q��o5N��H4���\��U�"N%ZǪ�ZMve��R1mP��K�Kj��`ƜЎiB%��*'�M1����)��l�$�:|����u��U��UQd��	I� J� ��O�E�{	��s��4y���}.�}}������#1�'W�FD��9�1��VU{��#^bFg������g�VF͒E�R'��ҋ�lB�>+c�jå�hU��!O����͊"?fe����}֤_Ԥ��q̙S�)ȗ�;���v�/���K���v�8�~�l���f�o�?��^���W�۫�8ws�uR���&B���������u�cuSF�bٕ�IM���/)8�CV���~���{�6㋾E:�oU�]"1��S��P[h@����5{c���!o��c�f��F,:�p�m
��f�,��a�hc>c']Gh�b\H����=o�L��&oFC%�s�.c!�b���pT�y���h��|�>&e���9'���c���3J�I�:��7�%�`�/ա��ԙ� ��<N^(�`���p��������P��OlG��/h���Rh��{��f�&P-�Q��A�� h5��
��`p*��Šڢ:~ߍI�TIC�Ã$�O:�e�P�~��ux���䔕��)1W'�5
�aY���Nqb�@�F��h*���	~ik���:kpR����}��+�E�� v�-'�|��b?�Q�V�G�fo�S�O��5�j>���1n���c�4�?_[ ���/&�&ƋWY�c���]`sQ~s#��[�8�] ��	̡�$:��[b:`���l���O���Kl��^�������@ʄ�/b:��>�B�Kqz�A�{�m��L`��|�c:`s�33�74�8��*{�3G~wUj~+�t��}����<T�˘no�g�����K
3$��˘<hb�ô���K�<-�6���c:�[l,����"a������ƺ_�4C?P.B�ſd�X�oJ<      ?   s   x�-��0�s<L��K���N�'�`��9�9ܚw���	���lj���O�&�5V��W�4����-5d	�yA��ST[Z�61�߈]�?�
-�DX�5�*X)�J� ?�0(�      C   m   x�-��� �7cq���b�q8+�몕A��%�SB��%��w�;�M7�%���MO̦�o<Ҵ�����zk�6�1mo�F����h�Wn��?r;�n���N�}��^��q�%�      E   �   x�5�� ��PL���_G�a�B���c6;�Y����/��g���n�i/7�d&6�of�y���r��u֕��\�/y��Q�Ν�ە���[�r�:̺�S�o�R�����n��u��8.\�������O����4l      G   �   x�-ϱ1C��s�k�^��:N����ybc��#��8�>�`�:�P�������݆}^M5�ZjzŻ3��j�n�νi�JM�������RMSMKM���o{п�A����K�.�t��K�.�t��K�.�t��K�������gfZ`?      i      x������ � �      I      x������ � �      K   �  x����n�0E��Wp_H��!Jܹ@hmZtӍ"�EJ�@���P�%[�o�1y�9�3Cu� U�Ի��\]Ѯ�ۦs{W����e��lU�[utgۂp�E�t�D�F��7WM��rn�4b��/L�ݢ�n:��$�y��*K�ټ�\u�Z8GJ#H|(#W����a*N�!�4'$E���{qEK�jG����Z�\Z�}XݼDe�UFxOFDC�bɒ5ԙ愚��./^�({���z��'�a�\,if�K�1]J@'�&OX7_���Cݸ��.�zM��C��
+c�3�#�Hv�9�e�q���l��KW����s	�g��]�>�Ffqʖ���@
��z���KڶC��}^��n۶or?з�f�i��B�M`���4���qJ~����rW���1�?�3=�E 0J�Jg�@B�	�3?��׵O~�7�6ި���{׵+;#La�/��%6\2��@�>N]���8��Z���;�M :�x�$�H3�
2Ӝ@�h�����{�w��2���(��dF�8K�A���
I|���s�wC�Ox�<�s_��A�L��"�<�$�G#���{̭^�ǧ� ����qQSPXsÒ�/$I��1�d7��0w<X���8Qb%�\��g��)?!g/��]�OF۳X��wmIs��W����'k?n��&aI��o6���Ep      M   �  x���MO�0����͊�|�"���T�H�$�=U�i:��'�S�q����\�Xݕ�v]?4Ua�*A��6ͻ I��v�� �th�R�g1H\�;��1�}�x�4i0^�#f0�j����Y��Ie��L��AR}���gهO4�I U6������b��~G0Q��`݌e� ����4h�f����G�1�Hq�T��u��07d��(o1��M���ֳ}r%��:N$�;h�O.����3���nV�x����
�m�Z���A���Y�˧�>�<(���J�?]8��}��7�/�'$'��K��KF̱
����'r�jd�
�iQ�A�^d�ݏ��sBT�%�AdӢ���Au9�-��
A>Lǝyφ��L^�4>�W㖒��J����d�AV�#E�B��#      k   h  x��XYo"G~~�<1����P�(���J+E�`��x7ίO��a.�w,�U}uw��.����i~,W����,���q�.�WǗr�P~��o�����զ@�4SvX"ըkE�'vG)Y�W����v�űxV	 N��a�z�\��n=�,��M�}ޗ���^^����MM\)t��
?��m��^�fk���dX>o�7ǹ�������~�谘kR���4,е�,V���TL�d]��0�[|M�2�����!9� �~�hׯ���4;$����
!�f���n�$�)�@rB}��8�V�Q�l!�����0��"K�%���8�(�����PYDN�6i��^DcX���W���%ȐE����U(�Ŏ)�$���+<�p� Wl�Ŗ1Iy'�~DV��ySV�2)+<�Y���ySV�B)+���"R<��Y9�SV�sԦ]�p�qNY�Q}�����K8�[Kl,j/�D�a�~(�/��KT~ȗ�L�xC�\��/M�)B%�Z�ڸ�>q��o��z��<a�"J'��z������������mZc֢ q�Y&�p����2��������n�;�&���0�	4�&�$N4x��,�lc	��^ά qJ�b��f��D�?����֢@U��5�@�+EԻ�l���&rW��%L�O�|ެ�,������霶i�
�-t��)�{� #h���, ��q��4�������-˶Q����z;_t�v���C-\���k'g@�'Ї��r�9<m�eB�X\ђ���>�-�K֢�/��ʑ�Q�IJyF��ߎ+}!F�Sku:����
��߇�~�UG���Yux���W9-B�&��+�Ft��-��6�U�\��=�sx��i�,��0���|qz�QNf#?�y���g8T'3Y�+2�D4���w��6�Q�Θ�iE9օ��ENh]�����TA��<W��XQ�u��+jmC�{k��p:���M�j�@��EP)�K�O�])��&�e�q�`����.���J��.b�P���p����'~K�]�D�T��u��[��Ģ�!��Q������KJ:d�Z-����c�l	��DKL����s�B���x&d�΄���H#�@!�#.�3�SMl6aIOP)��%.���Il� �}Q#��[<��c���9�� ���@j9��3�-r���J[���wӏ?��.Oc�0d�]%87�Ջ�wF�x�.�� ��#ؐ$��T	��s;�0���AID�7H���Ҍ���=�r�%K��)��h3q��:�!TCE��@]3'8�%�Yl!��p�P��V"}ůu�	�g
'c
�<;M������TVb(�iD�$LK)y�ʓN3���=`���� >�t�+�	�_|���*oH�-��`�R�!&�M�'�L�v��ɽ�6V.�O�'����$�>|J]���C#1�8!�Q6�\�C��z�}M�Ν��"��R��ckr;yc��ho�J�tH�i�р���Kz��~��nf~�~�$Il]��k����h7r�B6�S��`e�5�O��"HB���m�0_`Z:Ǫ���0������=��20�Yd���v�]��B��Ä�c��z��|���B&pD�`�`����d�?��w      O   F  x��W�N#I}.�� ���u�zK E�#��J@�4�I�e�~]���]MZ�������b����L��������꣝@�,����J���K���pl~x��y�P��Aۀ��n�ױ"5��huY/@�3 /�/�߯#Ppt���I��[��������?w�}�: p|[q��[���TF�F�w����������<�w����@��u�n����Ж�)�h�۟r��͹)9�@�1�%)<a�VsBmĵ���fA�w���|�� ��O���6 ����ԭ>a�K
H���w7��p���� LA�R#u��gDKe��7���/����E���Y�#���
ѱ"��?Fn#�x(�S��hdp�긚ȸ����v9��r���v���A��`��������b2^��3���v~w7]T��0U!�� �T���f��g���<'�p�L���L@oj�8�Q��b5����f�_��p��2�csªY�rb�}뿻�]�#{R�TAq��t�炋.�A�%*�t����,�<mwO�^E�WZ�u�E`d`G��#�S�1Ѭ��֭.{��J+d)�-����[i�ޓ"��G�F�e�b��'����ȉ���ڰ����r��&Y~g"�	��A�DШ�p?�������^�b��Eî5ٵ&�Vy�]�a��� wHE�1�L �V �<�8ir��ͺ��l^J���o�,#��k.q�W^*��#�4�x��!^y��@B�"3hDگ���3|�����D��GA��oGH���ޤ��ʄ��
	��a��Ba)�\������EX�h�f%D����'���2�{���H{4�O	�u+�"���@�_�M����3�ğ6�*�F:e*�i"�d���<h�o�	 ޖ�OBCZ�}�t��mb���_��'�LS�`��6�{gk�gX��+��`]�����1CK����ȹԔ�|��%M_��֥��rcNv��g�U��smu����oef�R^]N��"�LJԊLq�p���~M%f����ѹ{�`O��>��}�e:j7�ȱ�U�&m���g��-�����rME      m   �   x�e�Q�0C���LJB���c&�&Q����5����օ�n���P���z�$��Iz�!
UR�5�T�]cH����M+��y��l�w�):҆��h�2��s���M�F΃6�a�y������-�)TZ�E��.)���T�9��8J�C��==6��̓߯1��2S�      o   g   x�m�K� �5���@������61&]!��,'�F�x��n��dt~�-It����߂��)�`�-(k�@�|rs毄�^A#3f{�0W��b�MD$�      q   Q   x�=��� ��0L�������hl{~���1�H��n9~j��D�P0��:��-Z#8;�Dh�ď��}Y�V=I���Z6^      s   b   x�=�A�0D��p��zמ��Gڢ銗O(7���ē�����}CFb������(��_�R"RNṄ
�ג����VM�/�\���d�      u   �  x����n�0���S�b��%���	zI��@�`�ۏ��XI,�������ϔ%JZ��o- ;V�ח�ꕢ`�:�Ƶ5�S�H�+:�M��nPQ��С n��_O��n^�D]%j&�L�
�q��Fy�ބQ��JT����O��-�`���@-P-��$�Ë��>_j�S�13ՠcp�c�d�>����W����5�y�����6xS��j��݈����"8IY`��
�*5WE��)RF$ů��,;�Z��
Zu����㜑��2\R��������+
�#�W2���;�l\�Z�ԞNU�
�ͪ����C��۲i�"�h|���OH�\�	nȰ�<5�bXn�z	�C�H�}'<�B��A<g�34JE����a	��H�2u��6L��Tަ*Tަ�γ���4��͙U�K�8� m�r��d$]KH����r�H�/�O;_4w>t����Ra����V�ZF���:�Xc�f� M����-�a����M�ĳ�ztԶ��;�9#}^���"�D���c�-��qF���o�`}�\�K?4O���0��ڷ�[�P�H���v<���{�/D�ӂ|r��3m�^��򱤮�ͷ�yꆡ;,c��Rʿ�cq     