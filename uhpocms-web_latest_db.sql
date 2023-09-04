PGDMP     ;                    {            uhpocms    14.6    14.6 /   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    187339    uhpocms    DATABASE     c   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE uhpocms;
                postgres    false                       1255    187340 ;   add_question_with_answers_mcq(json, json, json, json, json) 	   PROCEDURE       CREATE PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer)
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
       public          postgres    false                        1255    187341 )   delete_question_with_answers_mcq(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.delete_question_with_answers_mcq(IN question_id_to_delete integer, OUT deleted_answers_count integer, OUT deleted_question_id integer)
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
       public          postgres    false            �            1259    187342    instituteadmin_profile    TABLE     �  CREATE TABLE public.instituteadmin_profile (
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
       public         heap    postgres    false            �            1259    187347    InstituteAdmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    209            �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    210            �            1259    187348    teacher_announcements_to_list    TABLE     �   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer NOT NULL,
    profile_id integer NOT NULL
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            �            1259    187351 $   Teacher_announcements_To_List_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_To_List_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_announcements_To_List_id_seq";
       public          postgres    false    211            �           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_announcements_To_List_id_seq" OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    212            �            1259    187352    teacher_announcements    TABLE     (  CREATE TABLE public.teacher_announcements (
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
       public         heap    postgres    false            �            1259    187357    Teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."Teacher_announcements_id_seq";
       public          postgres    false    213            �           0    0    Teacher_announcements_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Teacher_announcements_id_seq" OWNED BY public.teacher_announcements.id;
          public          postgres    false    214            �            1259    187358    teacher_category    TABLE     �   CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(250),
    isactive boolean,
    createdby character varying,
    createdon date,
    modifiedby character varying,
    modifiedon date
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            �            1259    187363    Teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    215            �           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public.teacher_category.id;
          public          postgres    false    216            �            1259    187364    teacher_course_assigntoteacher    TABLE     �   CREATE TABLE public.teacher_course_assigntoteacher (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_assigntoteacher;
       public         heap    postgres    false            �            1259    187367 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    217            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public.teacher_course_assigntoteacher.id;
          public          postgres    false    218            �            1259    187368    teacher_course    TABLE     �  CREATE TABLE public.teacher_course (
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
       public         heap    postgres    false            �            1259    187373    Teacher_course_CourseId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_course_CourseId_seq";
       public          postgres    false    219            �           0    0    Teacher_course_CourseId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_course_CourseId_seq" OWNED BY public.teacher_course.courseid;
          public          postgres    false    220            �            1259    187374    teacher_course_departmentid    TABLE     �   CREATE TABLE public.teacher_course_departmentid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 /   DROP TABLE public.teacher_course_departmentid;
       public         heap    postgres    false            �            1259    187377 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    221            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public.teacher_course_departmentid.id;
          public          postgres    false    222            �            1259    187378    teacher_course_enrolltostudent    TABLE     �   CREATE TABLE public.teacher_course_enrolltostudent (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_enrolltostudent;
       public         heap    postgres    false            �            1259    187381 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    223            �           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public.teacher_course_enrolltostudent.id;
          public          postgres    false    224            �            1259    187382    teacher_course_institutionid    TABLE     �   CREATE TABLE public.teacher_course_institutionid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 0   DROP TABLE public.teacher_course_institutionid;
       public         heap    postgres    false            �            1259    187385 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    225            �           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public.teacher_course_institutionid.id;
          public          postgres    false    226            �            1259    187386    teacher_email    TABLE     �  CREATE TABLE public.teacher_email (
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
       public         heap    postgres    false            �            1259    187391    Teacher_email_EmailId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    227            �           0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public.teacher_email.emailid;
          public          postgres    false    228            �            1259    187392    teacher_module    TABLE     �  CREATE TABLE public.teacher_module (
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
       public         heap    postgres    false            �            1259    187397    Teacher_module_ModuleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    229            �           0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public.teacher_module.moduleid;
          public          postgres    false    230            �            1259    187398    teacher_modulefile    TABLE     ;  CREATE TABLE public.teacher_modulefile (
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
       public         heap    postgres    false            �            1259    187403    Teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    231            �           0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public.teacher_modulefile.id;
          public          postgres    false    232            �            1259    187404    teacher_quiz    TABLE     V  CREATE TABLE public.teacher_quiz (
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
       public         heap    postgres    false            �            1259    187411    Teacher_quiz_QuizId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    233            �           0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    234            �            1259    187412    accesscontrol    TABLE     �  CREATE TABLE public.accesscontrol (
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
       public         heap    postgres    false            �            1259    187415    accesscontrol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accesscontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.accesscontrol_id_seq;
       public          postgres    false    235            �           0    0    accesscontrol_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.accesscontrol_id_seq OWNED BY public.accesscontrol.id;
          public          postgres    false    236            �            1259    187416    admin_department    TABLE     j  CREATE TABLE public.admin_department (
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
       public         heap    postgres    false            �            1259    187421 !   admin_department_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_department_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    237            �           0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    238            �            1259    187422    admin_institution    TABLE     u  CREATE TABLE public.admin_institution (
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
       public         heap    postgres    false            �            1259    187427 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    239            �           0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    240            �            1259    187428 
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
       public         heap    postgres    false            �            1259    187433    admin_role_roleid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_role_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.admin_role_roleid_seq;
       public          postgres    false    241            �           0    0    admin_role_roleid_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.admin_role_roleid_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    242            �            1259    187434 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false            �            1259    187437    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    243            �           0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    244            �            1259    187438    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    moduleid bigint,
    permissionid bigint,
    roleid integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false            �            1259    187441    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    245            �           0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    246            �            1259    187442    auth_module    TABLE     m   CREATE TABLE public.auth_module (
    id bigint NOT NULL,
    module_name character varying(255) NOT NULL
);
    DROP TABLE public.auth_module;
       public         heap    postgres    false            �            1259    187445    auth_module_id_seq    SEQUENCE     {   CREATE SEQUENCE public.auth_module_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.auth_module_id_seq;
       public          postgres    false    247            �           0    0    auth_module_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.auth_module_id_seq OWNED BY public.auth_module.id;
          public          postgres    false    248            �            1259    187446    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            �            1259    187451    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    249            �           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    250            �            1259    187452 	   auth_user    TABLE     5  CREATE TABLE public.auth_user (
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
       public         heap    postgres    false            �            1259    187457    auth_user_groups    TABLE     �   CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    groupid bigint,
    userid bigint
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            �            1259    187460    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    252            �           0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    253            �            1259    187461    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    251            �           0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    254            �            1259    187462    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    module_id bigint,
    permission_id bigint,
    user_id bigint,
    role_id bigint
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false                        1259    187465 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    255            �           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    256                       1259    187873    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public          postgres    false                       1259    187814    student_course_grade    TABLE     �   CREATE TABLE public.student_course_grade (
    id integer NOT NULL,
    max_marks integer,
    obtain_marks integer,
    studentid_id integer,
    course_id integer,
    percentage integer,
    grade character varying(255)
);
 (   DROP TABLE public.student_course_grade;
       public         heap    postgres    false                       1259    187466    teacher_answer    TABLE     �   CREATE TABLE public.teacher_answer (
    id integer NOT NULL,
    content character varying(255),
    correct boolean,
    questionid integer,
    questionorderno integer
);
 "   DROP TABLE public.teacher_answer;
       public         heap    postgres    false                       1259    187469    teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.teacher_answer_id_seq;
       public          postgres    false    257            �           0    0    teacher_answer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.teacher_answer_id_seq OWNED BY public.teacher_answer.id;
          public          postgres    false    258                       1259    187470    teacher_coursesyllabus    TABLE     _  CREATE TABLE public.teacher_coursesyllabus (
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
       public         heap    postgres    false                       1259    187475    teacher_coursesyllabus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_coursesyllabus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.teacher_coursesyllabus_id_seq;
       public          postgres    false    259            �           0    0    teacher_coursesyllabus_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.teacher_coursesyllabus_id_seq OWNED BY public.teacher_coursesyllabus.id;
          public          postgres    false    260                       1259    187476    teacher_question    TABLE     S  CREATE TABLE public.teacher_question (
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
       public         heap    postgres    false                       1259    187481    teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teacher_question_id_seq;
       public          postgres    false    261            �           0    0    teacher_question_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teacher_question_id_seq OWNED BY public.teacher_question.id;
          public          postgres    false    262                       1259    187482    teacher_studentcourseprogress    TABLE     <  CREATE TABLE public.teacher_studentcourseprogress (
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
       public         heap    postgres    false                       1259    187485 $   teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentcourseprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentcourseprogress_id_seq;
       public          postgres    false    263            �           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentcourseprogress_id_seq OWNED BY public.teacher_studentcourseprogress.id;
          public          postgres    false    264            	           1259    187486 !   teacher_studentmodulefileprogress    TABLE       CREATE TABLE public.teacher_studentmodulefileprogress (
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
           1259    187489 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmodulefileprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.teacher_studentmodulefileprogress_id_seq;
       public          postgres    false    265            �           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.teacher_studentmodulefileprogress_id_seq OWNED BY public.teacher_studentmodulefileprogress.id;
          public          postgres    false    266                       1259    187490    teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public.teacher_studentmoduleprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress integer NOT NULL,
    studentid_id integer NOT NULL
);
 1   DROP TABLE public.teacher_studentmoduleprogress;
       public         heap    postgres    false                       1259    187493 $   teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmoduleprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentmoduleprogress_id_seq;
       public          postgres    false    267            �           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentmoduleprogress_id_seq OWNED BY public.teacher_studentmoduleprogress.id;
          public          postgres    false    268                       1259    187494    teacher_studentquizprogress    TABLE     �   CREATE TABLE public.teacher_studentquizprogress (
    id integer NOT NULL,
    completed boolean,
    num_attempts integer,
    quizid_id integer,
    score integer,
    studentid_id integer,
    courseid_id integer
);
 /   DROP TABLE public.teacher_studentquizprogress;
       public         heap    postgres    false                       1259    187497 "   teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.teacher_studentquizprogress_id_seq;
       public          postgres    false    269            �           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.teacher_studentquizprogress_id_seq OWNED BY public.teacher_studentquizprogress.id;
          public          postgres    false    270                       1259    187498    teacher_studentquizresult    TABLE     �  CREATE TABLE public.teacher_studentquizresult (
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
       public         heap    postgres    false                       1259    187503     teacher_studentquizresult_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizresult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.teacher_studentquizresult_id_seq;
       public          postgres    false    271            �           0    0     teacher_studentquizresult_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.teacher_studentquizresult_id_seq OWNED BY public.teacher_studentquizresult.id;
          public          postgres    false    272                       1259    187504    test_seq    SEQUENCE     r   CREATE SEQUENCE public.test_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.test_seq;
       public          postgres    false                       2604    187505    accesscontrol id    DEFAULT     t   ALTER TABLE ONLY public.accesscontrol ALTER COLUMN id SET DEFAULT nextval('public.accesscontrol_id_seq'::regclass);
 ?   ALTER TABLE public.accesscontrol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235                       2604    187506    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    238    237                       2604    187507    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    240    239                       2604    187508    admin_role role_id    DEFAULT     w   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_roleid_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    242    241                       2604    187509    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243                       2604    187510    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245                       2604    187511    auth_module id    DEFAULT     p   ALTER TABLE ONLY public.auth_module ALTER COLUMN id SET DEFAULT nextval('public.auth_module_id_seq'::regclass);
 =   ALTER TABLE public.auth_module ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247                       2604    187512    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249                       2604    187513    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    251                       2604    187514    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252                       2604    187515    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            �           2604    187516    instituteadmin_profile id    DEFAULT     �   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209                       2604    187517    teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_id_seq"'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213                        2604    187518     teacher_announcements_to_list id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_To_List_id_seq"'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211                       2604    187519    teacher_answer id    DEFAULT     v   ALTER TABLE ONLY public.teacher_answer ALTER COLUMN id SET DEFAULT nextval('public.teacher_answer_id_seq'::regclass);
 @   ALTER TABLE public.teacher_answer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257                       2604    187520    teacher_category id    DEFAULT     |   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215                       2604    187521    teacher_course courseid    DEFAULT     �   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public."Teacher_course_CourseId_seq"'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    220    219                       2604    187522 !   teacher_course_assigntoteacher id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_assigntoteacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217                       2604    187523    teacher_course_departmentid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_departmentid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 M   ALTER TABLE public.teacher_course_departmentid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221                       2604    187524 !   teacher_course_enrolltostudent id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_enrolltostudent ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223                       2604    187525    teacher_course_institutionid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_institutionid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 N   ALTER TABLE public.teacher_course_institutionid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225                       2604    187526    teacher_coursesyllabus id    DEFAULT     �   ALTER TABLE ONLY public.teacher_coursesyllabus ALTER COLUMN id SET DEFAULT nextval('public.teacher_coursesyllabus_id_seq'::regclass);
 H   ALTER TABLE public.teacher_coursesyllabus ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259                       2604    187527    teacher_email emailid    DEFAULT     �   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    228    227            	           2604    187528    teacher_module moduleid    DEFAULT     �   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    230    229            
           2604    187529    teacher_modulefile id    DEFAULT     �   ALTER TABLE ONLY public.teacher_modulefile ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 D   ALTER TABLE public.teacher_modulefile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231                       2604    187530    teacher_question id    DEFAULT     z   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public.teacher_question_id_seq'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261                       2604    187531    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    234    233                       2604    187532     teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentcourseprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentcourseprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentcourseprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263                       2604    187533 $   teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmodulefileprogress_id_seq'::regclass);
 S   ALTER TABLE public.teacher_studentmodulefileprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265                       2604    187534     teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmoduleprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmoduleprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentmoduleprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267                       2604    187535    teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizprogress_id_seq'::regclass);
 M   ALTER TABLE public.teacher_studentquizprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269                        2604    187536    teacher_studentquizresult id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizresult ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizresult_id_seq'::regclass);
 K   ALTER TABLE public.teacher_studentquizresult ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            X          0    187412    accesscontrol 
   TABLE DATA           �   COPY public.accesscontrol (id, admininstitute, announcement, assigncourse, authuser, category, course, department, email, enrollment, module, question, quiz, role, userid, lessons, modulefile) FROM stdin;
    public          postgres    false    235   ��      Z          0    187416    admin_department 
   TABLE DATA           �   COPY public.admin_department (departmentid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, institutionid) FROM stdin;
    public          postgres    false    237   ��      \          0    187422    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    239   ?�      ^          0    187428 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    241   L�      `          0    187434 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    243   ��      b          0    187438    auth_group_permissions 
   TABLE DATA           T   COPY public.auth_group_permissions (id, moduleid, permissionid, roleid) FROM stdin;
    public          postgres    false    245   �      d          0    187442    auth_module 
   TABLE DATA           6   COPY public.auth_module (id, module_name) FROM stdin;
    public          postgres    false    247   (�      f          0    187446    auth_permission 
   TABLE DATA           @   COPY public.auth_permission (id, name, description) FROM stdin;
    public          postgres    false    249   ��      h          0    187452 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, password, last_login, username, first_name, last_name, email, is_active, date_joined, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    251   -�      i          0    187457    auth_user_groups 
   TABLE DATA           R   COPY public.auth_user_groups (id, user_id, group_id, groupid, userid) FROM stdin;
    public          postgres    false    252   {�      l          0    187462    auth_user_user_permissions 
   TABLE DATA           d   COPY public.auth_user_user_permissions (id, module_id, permission_id, user_id, role_id) FROM stdin;
    public          postgres    false    255   ��      >          0    187342    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (isactive, id, userrole, first_name, last_name, email, dob, mobileno, gender, department, address1, address2, city, state, zip, profile_pics, createdby, createddate, updatedby, updateddate, institutionid_id, user_id, userroleid) FROM stdin;
    public          postgres    false    209   ��                0    187814    student_course_grade 
   TABLE DATA           w   COPY public.student_course_grade (id, max_marks, obtain_marks, studentid_id, course_id, percentage, grade) FROM stdin;
    public          postgres    false    274   ��      B          0    187352    teacher_announcements 
   TABLE DATA           �   COPY public.teacher_announcements (id, announcement_title, announcement_message, "to", readby, createdby, created_on, sendby) FROM stdin;
    public          postgres    false    213   �      @          0    187348    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    211   ��      n          0    187466    teacher_answer 
   TABLE DATA           [   COPY public.teacher_answer (id, content, correct, questionid, questionorderno) FROM stdin;
    public          postgres    false    257   �      D          0    187358    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    215   ��      H          0    187368    teacher_course 
   TABLE DATA           �   COPY public.teacher_course (isactive, courseid, coursecode, name, description, coursetype, passingscore, instid, createdby, createddate, updatedby, updateddate, moduleinorder) FROM stdin;
    public          postgres    false    219   ��      F          0    187364    teacher_course_assigntoteacher 
   TABLE DATA           S   COPY public.teacher_course_assigntoteacher (id, course_id, profile_id) FROM stdin;
    public          postgres    false    217   "�      J          0    187374    teacher_course_departmentid 
   TABLE DATA           S   COPY public.teacher_course_departmentid (id, course_id, department_id) FROM stdin;
    public          postgres    false    221   ��      L          0    187378    teacher_course_enrolltostudent 
   TABLE DATA           S   COPY public.teacher_course_enrolltostudent (id, course_id, profile_id) FROM stdin;
    public          postgres    false    223   )�      N          0    187382    teacher_course_institutionid 
   TABLE DATA           U   COPY public.teacher_course_institutionid (id, course_id, institution_id) FROM stdin;
    public          postgres    false    225   ��      p          0    187470    teacher_coursesyllabus 
   TABLE DATA           �   COPY public.teacher_coursesyllabus (id, courseid_id, isactive, createdby, createdon, modifiedby, modifiedon, syllabusfile) FROM stdin;
    public          postgres    false    259   w�      P          0    187386    teacher_email 
   TABLE DATA           �   COPY public.teacher_email (emailid, title, subject, content, createdon, createdby, modifiedon, modifiedby, status, readstatus, attachfile, email_from_id, isactive) FROM stdin;
    public          postgres    false    227   ��      R          0    187392    teacher_module 
   TABLE DATA           �   COPY public.teacher_module (isactive, moduleid, name, description, startdate, enddate, course, moduleorderno, createdby, createddate, updatedby, updateddate, courseid_id) FROM stdin;
    public          postgres    false    229   ��      T          0    187398    teacher_modulefile 
   TABLE DATA           �   COPY public.teacher_modulefile (isactive, id, file, fileorderno, createdby, createddate, updatedby, updateddate, moduleid_id) FROM stdin;
    public          postgres    false    231   5�      r          0    187476    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, max_marks, category_id, content, created_by, created_on, explanation, figure, is_active, ismcq, modified_by, modified_on, questionorderno, quizid_id) FROM stdin;
    public          postgres    false    261   ��      V          0    187404    teacher_quiz 
   TABLE DATA             COPY public.teacher_quiz (quizid, title, description, random_order, max_questions, single_attempt, pass_mark, success_text, fail_text, quizorderno, courseid_id, module_id, category_id, isactive, createdby, createdon, modifiedby, modifiedon, set_timer, max_marks) FROM stdin;
    public          postgres    false    233   ?�      t          0    187482    teacher_studentcourseprogress 
   TABLE DATA           �   COPY public.teacher_studentcourseprogress (id, courseid_id, currentassignno, currentmoduleno, currentunitno, grade, progress, studentid_id) FROM stdin;
    public          postgres    false    263   l�      v          0    187486 !   teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public.teacher_studentmodulefileprogress (id, courseid_id, currentfilepageno, fileid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    265   @�      x          0    187490    teacher_studentmoduleprogress 
   TABLE DATA           m   COPY public.teacher_studentmoduleprogress (id, courseid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    267   u�      z          0    187494    teacher_studentquizprogress 
   TABLE DATA              COPY public.teacher_studentquizprogress (id, completed, num_attempts, quizid_id, score, studentid_id, courseid_id) FROM stdin;
    public          postgres    false    269   ��      |          0    187498    teacher_studentquizresult 
   TABLE DATA           �   COPY public.teacher_studentquizresult (id, answerid, marks, content, questionid, quizid, selectedoption, studentid, teacher_remark, createdon, modifiedon, reviewstat, reviwedon) FROM stdin;
    public          postgres    false    271   ��      �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 169, true);
          public          postgres    false    210            �           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_announcements_To_List_id_seq"', 72, true);
          public          postgres    false    212            �           0    0    Teacher_announcements_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_announcements_id_seq"', 24, true);
          public          postgres    false    214            �           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 9, true);
          public          postgres    false    216            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 78, true);
          public          postgres    false    218            �           0    0    Teacher_course_CourseId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_course_CourseId_seq"', 207, true);
          public          postgres    false    220            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 296, true);
          public          postgres    false    222            �           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 233, true);
          public          postgres    false    224            �           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 200, true);
          public          postgres    false    226            �           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 22, true);
          public          postgres    false    228            �           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 148, true);
          public          postgres    false    230            �           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 177, true);
          public          postgres    false    232            �           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 161, true);
          public          postgres    false    234            �           0    0    accesscontrol_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.accesscontrol_id_seq', 1, false);
          public          postgres    false    236            �           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 203, true);
          public          postgres    false    238            �           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 173, true);
          public          postgres    false    240            �           0    0    admin_role_roleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_role_roleid_seq', 4, true);
          public          postgres    false    242            �           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    244            �           0    0    auth_group_permissions_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 417, true);
          public          postgres    false    246            �           0    0    auth_module_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.auth_module_id_seq', 1, false);
          public          postgres    false    248            �           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    250            �           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
          public          postgres    false    253            �           0    0    auth_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_user_id_seq', 164, true);
          public          postgres    false    254            �           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 35, true);
          public          postgres    false    256            �           0    0    hibernate_sequence    SEQUENCE SET     B   SELECT pg_catalog.setval('public.hibernate_sequence', 180, true);
          public          postgres    false    275            �           0    0    teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.teacher_answer_id_seq', 2426, true);
          public          postgres    false    258            �           0    0    teacher_coursesyllabus_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.teacher_coursesyllabus_id_seq', 1, false);
          public          postgres    false    260            �           0    0    teacher_question_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.teacher_question_id_seq', 232, true);
          public          postgres    false    262            �           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.teacher_studentcourseprogress_id_seq', 129, true);
          public          postgres    false    264            �           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.teacher_studentmodulefileprogress_id_seq', 84, true);
          public          postgres    false    266            �           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentmoduleprogress_id_seq', 47, true);
          public          postgres    false    268            �           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.teacher_studentquizprogress_id_seq', 203, true);
          public          postgres    false    270            �           0    0     teacher_studentquizresult_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.teacher_studentquizresult_id_seq', 107, true);
          public          postgres    false    272            �           0    0    test_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('public.test_seq', 1, true);
          public          postgres    false    273            #           2606    187538 2   instituteadmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    209            %           2606    187540 9   instituteadmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 e   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    209            (           2606    187542 @   teacher_announcements_to_list Teacher_announcements_To_List_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_List_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_List_pkey";
       public            postgres    false    211            +           2606    187544 ]   teacher_announcements_to_list Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq" UNIQUE (announcements_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq";
       public            postgres    false    211    211            -           2606    187546 0   teacher_announcements Teacher_announcements_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT "Teacher_announcements_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT "Teacher_announcements_pkey";
       public            postgres    false    213            0           2606    187548 .   teacher_category Teacher_category_category_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 Z   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    215            2           2606    187550 &   teacher_category Teacher_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    215            4           2606    187552 Z   teacher_course_assigntoteacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    217    217            7           2606    187554 B   teacher_course_assigntoteacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    217            <           2606    187556 Z   teacher_course_departmentid Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    221    221            @           2606    187558 <   teacher_course_departmentid Teacher_course_DepartmentId_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    221            B           2606    187560 Z   teacher_course_enrolltostudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    223    223            E           2606    187562 B   teacher_course_enrolltostudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    223            H           2606    187564 \   teacher_course_institutionid Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    225    225            L           2606    187566 >   teacher_course_institutionid Teacher_course_InstitutionId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    225            :           2606    187568 "   teacher_course Teacher_course_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT "Teacher_course_pkey" PRIMARY KEY (courseid);
 N   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT "Teacher_course_pkey";
       public            postgres    false    219            O           2606    187570     teacher_email Teacher_email_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY (emailid);
 L   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    227            S           2606    187572 "   teacher_module Teacher_module_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY (moduleid);
 N   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    229            V           2606    187574 *   teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    231            [           2606    187576    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    233            _           2606    187578     accesscontrol accesscontrol_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_pkey;
       public            postgres    false    235            a           2606    187580 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    237            c           2606    187582 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    239            e           2606    187584    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    241            j           2606    187586    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    243            n           2606    187588 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    245            l           2606    187590    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    243            p           2606    187592    auth_module auth_module_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT auth_module_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT auth_module_pkey;
       public            postgres    false    247            t           2606    187594 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    249            |           2606    187596 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    252                       2606    187598 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    252    252            v           2606    187600    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    251            �           2606    187602 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    255            y           2606    187604     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public            postgres    false    251            �           2606    187818 *   student_course_grade student_progress_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.student_course_grade
    ADD CONSTRAINT student_progress_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.student_course_grade DROP CONSTRAINT student_progress_pkey;
       public            postgres    false    274            �           2606    187606 "   teacher_answer teacher_answer_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_pkey;
       public            postgres    false    257            �           2606    187608 2   teacher_coursesyllabus teacher_coursesyllabus_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_coursesyllabus
    ADD CONSTRAINT teacher_coursesyllabus_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_coursesyllabus DROP CONSTRAINT teacher_coursesyllabus_pkey;
       public            postgres    false    259            Q           2606    187610 %   teacher_email teacher_email_title_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_title_key UNIQUE (title);
 O   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_title_key;
       public            postgres    false    227            �           2606    187612 &   teacher_question teacher_question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_pkey;
       public            postgres    false    261            ]           2606    187614 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    233            �           2606    187616 @   teacher_studentcourseprogress teacher_studentcourseprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentcourseprogress
    ADD CONSTRAINT teacher_studentcourseprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentcourseprogress DROP CONSTRAINT teacher_studentcourseprogress_pkey;
       public            postgres    false    263            �           2606    187618 H   teacher_studentmodulefileprogress teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress
    ADD CONSTRAINT teacher_studentmodulefileprogress_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.teacher_studentmodulefileprogress DROP CONSTRAINT teacher_studentmodulefileprogress_pkey;
       public            postgres    false    265            �           2606    187620 @   teacher_studentmoduleprogress teacher_studentmoduleprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentmoduleprogress
    ADD CONSTRAINT teacher_studentmoduleprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentmoduleprogress DROP CONSTRAINT teacher_studentmoduleprogress_pkey;
       public            postgres    false    267            �           2606    187622 <   teacher_studentquizprogress teacher_studentquizprogress_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT teacher_studentquizprogress_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT teacher_studentquizprogress_pkey;
       public            postgres    false    269            �           2606    187624 8   teacher_studentquizresult teacher_studentquizresult_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.teacher_studentquizresult
    ADD CONSTRAINT teacher_studentquizresult_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.teacher_studentquizresult DROP CONSTRAINT teacher_studentquizresult_pkey;
       public            postgres    false    271            g           2606    187626 '   admin_role uk_oaw6skshjf4fahwf7ot87lb8i 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i;
       public            postgres    false    241            r           2606    187628 (   auth_module uk_rsb8pvftbmtut85ct3jlbuuun 
   CONSTRAINT     j   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun UNIQUE (module_name);
 R   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun;
       public            postgres    false    247            !           1259    187629 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     �   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public.instituteadmin_profile USING btree (institutionid_id);
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    209            &           1259    187630 7   Teacher_announcements_To_List_announcements_id_cc6864cc    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_announcements_id_cc6864cc" ON public.teacher_announcements_to_list USING btree (announcements_id);
 M   DROP INDEX public."Teacher_announcements_To_List_announcements_id_cc6864cc";
       public            postgres    false    211            )           1259    187631 1   Teacher_announcements_To_List_profile_id_f1306085    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_profile_id_f1306085" ON public.teacher_announcements_to_list USING btree (profile_id);
 G   DROP INDEX public."Teacher_announcements_To_List_profile_id_f1306085";
       public            postgres    false    211            .           1259    187632 '   Teacher_category_category_2d59e72d_like    INDEX     ~   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public.teacher_category USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    215            5           1259    187633 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public.teacher_course_assigntoteacher USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    217            8           1259    187634 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public.teacher_course_assigntoteacher USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    217            =           1259    187635 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX     }   CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public.teacher_course_departmentid USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    221            >           1259    187636 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     �   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public.teacher_course_departmentid USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    221            C           1259    187637 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public.teacher_course_enrolltostudent USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    223            F           1259    187638 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public.teacher_course_enrolltostudent USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    223            I           1259    187639 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX        CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public.teacher_course_institutionid USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    225            J           1259    187640 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public.teacher_course_institutionid USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    225            M           1259    187641 $   Teacher_email_Email_From_id_acc54e41    INDEX     i   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public.teacher_email USING btree (email_from_id);
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    227            T           1259    187642 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     o   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public.teacher_modulefile USING btree (moduleid_id);
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    231            W           1259    187643 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    233            X           1259    187644    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    233            Y           1259    187645 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    233            h           1259    187646    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    243            z           1259    187647 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    252            }           1259    187648 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    252            �           1259    187649 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    255            �           1259    187650 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    255            w           1259    187651     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public            postgres    false    251            �           2606    187652 R   instituteadmin_profile InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins" FOREIGN KEY (institutionid_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins";
       public          postgres    false    209    3427    239            �           2606    187657 N   instituteadmin_profile InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id";
       public          postgres    false    3446    209    251            �           2606    187662 S   teacher_course_assigntoteacher Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c";
       public          postgres    false    219    3386    217            �           2606    187667 T   teacher_course_assigntoteacher Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute";
       public          postgres    false    217    3363    209            �           2606    187672 P   teacher_course_departmentid Teacher_course_Depar_course_id_e2919890_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c";
       public          postgres    false    221    3386    219            �           2606    187677 T   teacher_course_departmentid Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep" FOREIGN KEY (department_id) REFERENCES public.admin_department(departmentid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep";
       public          postgres    false    3425    221    237            �           2606    187682 S   teacher_course_enrolltostudent Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c";
       public          postgres    false    223    3386    219            �           2606    187687 T   teacher_course_enrolltostudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    223    3363    209            �           2606    187692 Q   teacher_course_institutionid Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c";
       public          postgres    false    225    3386    219            �           2606    187697 V   teacher_course_institutionid Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    225    3427    239            �           2606    187702 ?   teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY (email_from_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    227    3363    209            �           2606    187707 G   teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY (moduleid_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    231    3411    229            �           2606    187712 I   teacher_quiz Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId";
       public          postgres    false    233    3386    219            �           2606    187717 G   teacher_quiz Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId" FOREIGN KEY (module_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId";
       public          postgres    false    233    3411    229            �           2606    187722 E   teacher_quiz Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id";
       public          postgres    false    233    3378    215            �           2606    187727 4   admin_department admin_department_institutionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_institutionid_fkey FOREIGN KEY (institutionid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 ^   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_institutionid_fkey;
       public          postgres    false    237    3427    239            �           2606    187732 ;   auth_group_permissions auth_group_permissions_moduleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.auth_module(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 e   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_moduleid_fkey;
       public          postgres    false    247    3440    245            �           2606    187737 ?   auth_group_permissions auth_group_permissions_permissionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permissionid_fkey FOREIGN KEY (permissionid) REFERENCES public.auth_permission(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 i   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_permissionid_fkey;
       public          postgres    false    249    3444    245            �           2606    187742 9   auth_group_permissions auth_group_permissions_roleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.admin_role(role_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 c   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_roleid_fkey;
       public          postgres    false    3429    245    241            �           2606    187747 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    243    252    3436            �           2606    187752 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public          postgres    false    252    3446    251            �           2606    187757 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    249    255    3444            �           2606    187762 D   auth_user_user_permissions auth_user_user_permissions_module_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.auth_module(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_module_id_fkey;
       public          postgres    false    255    3440    247            �           2606    187767 B   auth_user_user_permissions auth_user_user_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.admin_role(role_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_role_id_fkey;
       public          postgres    false    241    3429    255            �           2606    187772 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    3446    255    251            �           2606    187777 *   teacher_course fkg4ubhja82bo0jsn69qeqgm8b8    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8 FOREIGN KEY (instid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 T   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8;
       public          postgres    false    3427    219    239            �           2606    187782 Q   teacher_announcements_to_list teacher_announcements_to_list_announcements_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_announcements_id_fkey FOREIGN KEY (announcements_id) REFERENCES public.teacher_announcements(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 {   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_announcements_id_fkey;
       public          postgres    false    211    3373    213            �           2606    187787 K   teacher_announcements_to_list teacher_announcements_to_list_profile_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 u   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_profile_id_fkey;
       public          postgres    false    209    211    3363            �           2606    187792    teacher_module teacher_module    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 G   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module;
       public          postgres    false    219    3386    229            X      x������ � �      Z   `  x����r�0���)�fra�B�uәn�ʌ�qѷ�)��"�:���Kfʶeq@�r1�f�8�,�a�Bb$�V���]�_��r����"?	Ĵ	�U�)I��(�������<�_̺7�h$�p��\9���S ��ן`�`6�<�0)ц�2�!�\� /����%�"
z����վ��iY���DS�J��|%W@f��=sJ��C�D�-8�����b����2Y�Vx`F@։q�,RFT�B4���8��I�'�7U���_(���2��X���5~�ʪc��s*�QOiS��[���:h�Y�����I�и�M{�z�'U�Hْ e�	��Ԏ�\      \   �   x���Ak�0����̨���v�t�B�-�B/�bMDc���ZK���9���{3�q�W�6�1&Q�#�!R�S�1��N��Ip7��s{�u�$�F�~��ɵSe�:�	D�q��m�6wx�Ɏ��:]"��d��u��dG�,����m���쭸{xz�Z�6��%7����p����)���}ѦV�jΞ,��n+T���2؏SY�N�Û�PQ�B���E��CD�?�s�3�O��M�<-�D���A��}�0      ^   �   x����
�0E����44Ik5߲������_�9�8y����i��m0�Y�g�b�4�F�T�f��s�]�d��� r~40F�_���g��e����9�RP�"��QcI�}�b���y�'���QI��دLe�5^�4l�q�k�yOpA x��S�      `      x������ � �      b     x�-�ˑD1ϼ`������J�����h��϶-��߰�� (D	J�MѲ���q@e\PD#ư'#��\�%(ET�2�lb9�X��X�#Jca��n��A�<�n�pt��"��HPKDHS�G#�2/I*ѓ�/��0�^�;-�nqH��Y.�-�Q��d<�C{�x4e<�2���Ʋ����e��eU�@we+b)��S�ʃ4A.Z��ؠ2��6����j@n#��$�ӈg��z��{���������m'`z      d   �   x�-���0��ۇ1�����@�k'������J�k��W)΄��S�B	kXS|S,4k��-��������v��![�~�>����/F.J��(	�
�:�<ؖI5x昹�c�50�Hd�ZH��ϲ}C{�1�]gE?�z3��$��z��{A��8N      f   ?   x�3�truq�R\F�.�>�@>��2�p�C(.NG��0���e���&�b���� Z��      h   >  x���Mo�H���W��r���hN;;i5ّ��H���R���p"��o5Nl��=��r�����B�$x��$�j�㍐k)R�S1ƿ�0U<�5e[�܎�<C3Y�UA�g�*��u��4��)���Ue}�O�8Q�>+���T*3'���l��<]ݗ����		Ε��)����g%���Ol�nr��F:��,�����
�<���vo�'wO���*>Q,�K���AT���C�kݻ�[^g���������3�:b�1�>Ȭ}�am|ƛ�-��pF2�܏7�c����Y#?)ۢܡ����|����7I������ r�\Al�/�xjx��G-�mh������ac/-�Un�য�x؏6�7�(������E�� �Wn���O$�/Ǯ+`2ӂ�����3���>�L���Q���$�3C�Of:���Yk&�b^;�Af�gxB�P��g��-���V��s|�����g%��ʡ�%/�0m��a�2�ˎVgw�#��ުtn�*��(��A��ʜ��D��\�5���h����q��
��J+�fb��v8|&Ĕ"_V���f���i�����>�즛Ow��}�٭�� �ǅ��^fb
��,��Dw������=M�s�%僰��)��P�b��q��=d�Vv�S��sV�	k�pP>�{V�lY�b�m��1�ܦ�rv�i���.hm���L/О�0���ec�i�sZ�[�\3q�U�]�0tE�Z!�5�d#�j}1�)��� jB�jeu�]vP�nx&�R�P��H*J�3>Hi�(����ԩ��Ѝ��6]����e��bv�!Lg*��}V"����#�d��̨���]O�8���*�
�;2����]쇤��K˕�A`y�:M�_i`[VUl�0�Ʋ����4�[�6�N��� S>�+H^��������>wF�����I�-/S!0�S�،���p-P�q�%�/��9�·C����c�X�����F9��O�WY��|p���p�
h��ND�B���
[LC9��P>]u]���}	�T_j��c6}Y��<b<l��Ԇ�ef|V��j���s�      i      x������ � �      l   P   x�=���0�3�
���.��֊�� �z�D'8S���w�����Ni�ȿg,���6��6�<e���`���s����>      >   �  x�Ř�n�F���O���Ğ�j�I��E���dDJ"eP���;�K��D�r���-r��<�g�Y7�p�lZ���m^Y4���F�`}�(m���6%��ӈ(D(�B*m0*�:C��c�U�-�]w}�?ڲX�b��#� *J��xt_o��,��] Sa:�$�2a,VJ|�E��E>DBlL#r� �@Mf!������.m�n�j������#ƨˈ*�8�B���ʶ�4���;^Z�K�8M��dg�}�A�C�����ˎh�q�0|`D52Z���Q��p�͋:-.�,�.�a	W1��ρ����Q=ϵ�/��u��V�n��"�#����4������{?�����'ǔ�s>�t�G��<�1��v��.��7�UF","�!-��Ր�좶{/�����b�cv��|�4 �:��|�E�B�m�--�;{L�}� �k�'��zF%XƂ�3L��3R��p`m�6ͪ�Z�m5���v�#��q��">�8vYװ�t�Ē<ODM��4�'"=ѵm!��ݮWt��FH�S1C JN�v�s.�0^�=Wl>Cv�Ǹ�����Ӏ�������� 7{ZvI�=O#p�tl�98�	4��aC�U%�t��f��7�xd��A�(� _&���pT���`�.�Eu,|`I�fga�o���>˽1��uXb����	�1��ǁ��}�� "z���s�nڦ�A΂9�*d���7KM8�A9�3�|����I�L���l��[�2i�ƛSL���%D���s>�Cw���ٮ@�a?
�v�ќ1�]S�A3��4���錢���P����*��'������͈�R�clN�I�- �do��9���m�F�5���0TFM@��mVTw��M�܁��}���Yܘ
�n���z�� TvD�g�B�����'V�I��W�06��:��V3�]�!�z����D��
q�L0��XȔ�}��o�ڡ�o�h	�S<�����I�1'�I���C���P�;�jͦ
����9�L��n�Jڧ��օE������X�8B"!h��K֫�@p�=Qܽ�y?��H@b��P� C�5u�9��@vYa=BY�V�仭K
�8]C�I'�~�x;xqG�y��觻M�����~J���(�a���z?�2���:�aXY��_�0$��,%���Mќ��Z�Zr��O�����"����4<d3�-����
�&���}�L��2 �C&����t5M�x٭0r�K�$,�iV��Zey���#�/�}�K�Kq`�C���g�S8>�����H]t��]�o'H(�"��g��=�`���>�熸�Q��tg��g������q�������|��^F����9���x:-�>������a�W��!ٛӺE	�5�i�LI����u����)Nh���i씏#�M�?㫫�� Γs�         <   x�Eȱ�0���!�����?"M���Yh�y\�p�9W��K�¹;7߃���d      B   {   x�}̱
�0 ����KCrɥ�����]Sh�I�FпW7'�͏�>d��S
�� �����%��
d�u��,!Qd�״���X�y�N���[����砀'��*����O5j��a(&#      @   i   x�-ͱ�0��(�G�P�������Fwy�X�L��8������
��e%XV���=?8��q�~��*,A�*(�񪿒PY�VB�"jXB�������%0      n   �  x�m�Mo]�����fV-��%t;����q�7�ǉ�$�	� ��$ߗ:��܅��:�$���s{
�����9\C.!�ŞOA7A	}y�^>�h�$�����t��_.�.���Pb��жgK�g��W�7BoC�h�O[���M#�㄄N� �������x�X�ݐ��8Ü��4BU����y��zH2�cu�2�C����,��G���zcqkk��M=�`��u�&1HMB�I>�"*ґ90�`(@�P��e6�Q::�	�\29��K�f,n�2��5&�m�NT}'Ŋ����8k4u�MK@ˤ�I�WS�MВluM�R��H��!rkH�SZ�)'����H��C�)MM��1m�MNP�]P�gT�4�t��G��EK�)�#����$S>�X/�rQQ�٭k�&�N�l��&�:BE��д}���3Eە�Ih̥Z�})����x�q>V�U򋂺�@�>�N�>E�]�DuO!���� �uj64h��b�FO�����@?�$~�H�f����{�>+F]���lj�ґ��Y[���̻[t� [�< 6�
L�������a�w��s���H��K7lX�8�&�-�d�`l�4��l���]�V&���M���IMf��"t��0� L�]�O�3�Da=*�+�Ί&MY6v�01�A:0 {:�mrBh4�b� ��~�=+J�v�NfA�;�^�)x0�����'D[��;ɖ@�f@B	��P1�F]��~�� =�?a�'�9���Y���mA�%,Ȳl�SU���;mT��$0tK���܋9%��I��!�:V�Mŀr��"$N^N�x�8��_��Y�����X$�v=�s�i�!�����'AC��i����d�v�Z>�]�z�![i{�gM�c��.���8�6�!h2�5���d+���V�5��j�p�0�b�5�S���u���\55n�ԇ��T��f��Rt$�,���ƒ���r(�S�h�N�lu�S�����M3[]��[��f��lg��X\��N�p�T�M`K�K :E2O�VeN�����a�$ꔰ� �����Z� ��v���һ��X�'�����R�ڐ�e���\�f�8�X��a�V�iX��8c_XҴ3:��5���S�\!��H�$�$uIbg� ZB�!�0C�����\F��h���R 9l���<P*EUc$B�d	���Ny��=�h'Ib=(dP):�TtB���G��l�H�3�O,4�b�̇�U����#π�\�U��j��N����
���������Lm3��N3�l��S	�E2��E�.6[�6�c�TE�j�*��,?Ӈ��s*��*����sZ̨kMs��w�%�ߛ Y�vA�`�ƫ���A��1(1�)�l�Ӟ�k�S��O� ����o\�ׯ_ט�p�zEr��o�Xu�d��5�{6Ùbp_�Gx����*�{���H��0��������&��Kص���t:Z^vI���ƃ ���Ǎ�2L��'��h�^���9(��$Ŝ��%�RZ��6�n�4����!M&q�yڡ�����Cˎ�'O-�Ng�mq/<��B(��M����<F�D����ƍ���f�䏺�����%7��6��}���_�l(s����������fnP���[��#� *�_^ �x���z���Y���S��.\\�U��b����3��EA)|���\�W~���E\��R��\�,�[��4�=t,%��(�~�x
��[���ql��H$�u���O\��3������#��ջV�UXQ ���/H�*�l�~�h&��CM����lI9��:��v�P��gz5b�ay�:��g"r�L�O�qT3����kL���.���
ǹ	��xZ�7I�9 ���A�t��K �;69����/��$"_,��4�<]��`��f�SJ�m͉�~�qUW4��&�B6�q�G_�I��/r�^Q9�.E֓�Ɍ!��n����+�Ol�b�d�K���j�G,~�K�b)"?��f�p��;��� )pRM��M\�}���/h6N�riq��E���z�w_��s�G�����e�jo�'�g{w��&Y�e�|C{�D��>.���o�4-��.��z������%�����a �$��cO�|��|j���7IE/Փ�������+�d�Hw�D��&�ds�Б��+�v�x	����f�9��w�8}{C���u���d��k�b������q���~}��@"�|
��Ĵ{���b�d��Pq?�o��8v���d���������{�`�$P^�]e2�,�S����r5m��վ�\(ߞ�������?�il�T2ړ�����r#m��g���F޹1�f4ju����M����j�эe���D�L���ra����⠈Xg�J���t�>����r���:&}o�5���w0>�W8��΍~���e��d|-�w��A@V�[�8�9����Û{;�&�I��?�.����t���w���۞�G���WVg�<D�'��l0�����������Xؗ_W�qđ�����&R���<��C���u1>��wNÂJÑwQG^Fy���B�LǼ��RY��'ĉ��1��ɉo���ݝ7�%vXn��F\:mu��[%�	�-�>�*�r��/�q=Y�� �����DN����y1�cq螀#�7qrl`>86[;�m�3x�,L�K��K,�O���/��/��/qp��<}��r���Q+���E���%�B�ޟ���8���C8Z6>�D�u�����lD7��F,\:<�Vn��Ft��	/��
��3��DW!WT	oyG�W�c;V�m�R˴�B�x״�о�\OF�a_�餎tRb�����a7?�)�}l��Ck�z�B����a����E�M�9�ns�x	���B�:��)�>���j
�₩�Hm�w�n�C@�:��;'��Y�i�E,)���խ����N�w�j%��W��pb����g���[���Bw=�������_/�~�C�/ZNPZv�piݥ�VC5��7(��(M���V��V��V�;f�[��[��[�y���z��h�4�j���[��[��z����hpi���RO���XDO���Ԛ�����m���t:G:P�^ن�LfC�[�w!���#��aJ��Cf?Gf ��i(���www�I.��      D   A   x�3��u�,�LL����4202�50�54���/�,)I�#J�%gHjq	g��9� W� �� �      H     x��WMo�H=7���+Z�����qD�Y�e/�1ĒcK��Q��o5N��H4���\��U�"N%ZǪ�ZMve��R1mP��K�Kj��`ƜЎiB%��*'�M1����)��l�$�:|����u��U��UQd��	I� J� ��O�E�{	��s��4y���}.�}}������#1�'W�FD��9�1��VU{��#^bFg������g�VF͒E�R'��ҋ�lB�>+c�jå�hU��!O����͊"?fe����}֤_Ԥ��q̙S�)ȗ�;���v�/���K���v�8�~�l���f�o�?��^���W�۫�8ws�uR���&B���������u�cuSF�bٕ�IM���/)8�CV���~���{�6㋾E:�oU�]"1��S��P[h@����5{c���!o��c�f��F,:�p�m
��f�,��a�hc>c']Gh�b\H����=o�L��&oFC%�s�.c!�b���pT�y���h��|�>&e���9'���c���3J�I�:��7�%�`�/ա��ԙ� ��<N^(�`���p��������P��OlG��/h���Rh��{��f�&P-�Q��A�� h5��
��`p*��Šڢ:~ߍI�TIC�Ã$�O:�e�P�~��ux���䔕��)1W'�5
�aY���Nqb�@�F��h*���	~ik���:kpR����}��+�E�� v�-'�|��b?�Q�V�G�fo�S�O��5�j>���1n���c�4�?_[ ���/&�&ƋWY�c���]`sQ~s#��[�8�] ��	̡�$:��[b:`���l���O���Kl��^�������@ʄ�/b:��>�B�Kqz�A�{�m��L`��|�c:`s�33�74�8��*{�3G~wUj~+�t��}����<T�˘no�g�����K
3$��˘<hb�ô���K�<-�6���c:�[l,����"a������ƺ_�4C?P.B�ſd�X�oJ<      F   z   x�-��0�s<L��K���N�'�`��9�9ܚw���	���lj���O�&�5V��W�4����-5d	�yA��ST[Z�61�߈]�?�
-�DX�5�*X)�/�Zƃ�
��y,b      J   m   x�-��� �7cq���b�q8+�몕A��%�SB��%��w�;�M7�%���MO̦�o<Ҵ�����zk�6�1mo�F����h�Wn��?r;�n���N�}��^��q�%�      L   �   x�5��C!ϸ���^����>���aۗV-�FV�_��{io�S��/W���Hp������1t*�:�K'r5z����s���\/��ئ�L����`֌����v
̇�m|��_�����}<�ϛ���ߍ�=��%ߏ�� ��:0      N   �   x�-ϱ1C��s�k�^��:N����ybc��#��8�>�`�:�P�������݆}^M5�ZjzŻ3��j�n�νi�JM�������RMSMKM���o{п�A����K�.�t��K�.�t��K�.�t��K�������gfZ`?      p      x������ � �      P      x������ � �      R   t  x��VKo�&]�_����a0���E��,ڴ��C&�ة�Q�ߋgƯ�V6�#���t�$OU�ԇsم��]M�M�B��%:���J�]=��$���f�2�IN8R>B5�*���	`��_�v���}�� �<�{�<��M����T��A�j�a'4Ji:��fVÖ��&I���ѽ���Eu�������z�t���8���U���99�i�)�϶�.07�y���Eʿg����\�Ȯ�<Z���I���4���zI��`�b��8�&t�mrr�kz���Z*��q��<���17i9yl¥ �;���S(��߮��E�Ctײ�rf��}��E��~��+O��m�;��~?��}�}۞�"��`��XGz%�(M9�L�M�0��ؒ���g��G����᧝�� pZ2m�mAR�L���@�:����&����[�ڍ�A�ä>{�%&\*�/��{}�<���_�N�j�3�7�G!&�x�a�l
Y`nB�`�P���=�X�M$R��Qq'����Ā��V*��_�s���X����=7�8�ōe*yH�M������ܚ�a���a$�q�<9N
c�x��
y
ύ܊�;G�,��ƲQ,�r�|����R1�+dҩ��&�3ڞ3)R����.6ؗg��M,7-R����f���'�Ԅ��Ac_�L6,O�=&m���dW��/�.&���|���3��̜��N�|����paG+_�~�|������X0.Swƀ�V���6#��*N��(`5��U��b�gR�#=`$6�LN�c�	�g����T*�&����"Ɠ}n��N�E%��K�w�ڮ��1������w��2cW����`Z�	�?����z�      T   f  x����n�@E��W�<�y�tk$��U�R%�(H��}�KS�%i���9�;��B#�v[׫�jwخ6�u��(R�j��+��7�� -����c��6���4H�8'�Q�u���B��d��&t4-���ñ~���±�b��L�Irt��V�U>b���@�d��������������"!8?C�h�L��+�Fs`���t��#���n�:��VosEvQ<OӔ�����Q�_��Y�|D$����f���#1x���Ѵ�Y}�<�����d�S���y�i�\.7�m�8듉@�d�C�?pVԯ���?�2	�'�MC:��,�)�5 ��lt��aT� c�t���\�6�� <�QQӂ\4�(,����.�I��T�������i̵�ń��f�o4/�HG���� ��P���eZ�3@z���siͥvӠ4 �]�~
�~�F��58)Y5�A����o�� K�Ӹ10�M*kP�8�'����8G�Aa��$������\pg��v�A��!�,^�F#9�ʢ&:��Iyd�)d�}i��I��I����'�B2��S����XZ�W��D���*�z�.V*M�}?ԁF�*hP��7,��m;?b      r   �   x�m�A� E��)� dfh�tG=@W�LciC��Pb��Ž�����f`�3ܧ5�
�%Z�t���Z�Z�hZ �\cx�����<ǜ�$_iI�ݥ��9Cr�����#�j���~�]����6�7%���&�      V     x���MK�0���_�?���$���	�YA�⥲�Pp?�ً��i\\u#B
m^�'�;e�ܼN�����8�3܍�+0p����n�q��� $nEi%�g��2�(�T���T��,�X#�nv��+zm�}���'���~�*)�ӘU�\��<�M�l���lt�W�R���if��
�h)I����4��{gj��������gk={��M<P��@�ڽ����Mm�H��
ʹV�A�r��]f^_�v�Oj�75��z��<gP���ⲓ,ٌ8U�g��c��      t   �   x�e�Q�0C���L����e�?�LVm��?Փkl�{_X��y��7���DAJ��h ��D'頃'��$k>��r� �Q;�VH���̋Y2��NBt,��Q�E`+�_;��K��e4��*�D��j�nl	w��P)�)J��tv�Q�뤳rcO1�$���Ė�}�8�H'��1�_����u'�H7z<ޯ���`r      v   %   x��0�4�0�43�447�441�44 �f�\1z\\\ O��      x   /   x�31�4�0�441�43�443�21���ADL��,�cc�H� �	$      z   -   x�320�,�4�445�44�443�4�0�220�
�s!�c���� ��
      |   �  x����n�8���S�"p��:���<A/�#�i�V��],���IےN�zkǇ�#��3�|�Z��� �� ��Ǉ�E��N�;�ug�3�5���"1��63ܸ���5�Xg����䞢'�_��,Q�DMDW������x%͗��$���>���9Z���r�Ϗ�̓3�n�t�t�[���1H�'�Y��Q=�`n�`��mܤ��Q�Y!m���@�n�.��)d>�����ilc0����HE�F.���]g$����u�y	�*U����$�Ez�_�oIóa�NA��=_�q�H��0\���(/�W;uZg$�T�<�\u�����S{:D�$�xn�z����xޖM�Cՙ���駂���W��f1ۖY_CPɰ�E��Pet���:��4�p=�Ƞ
u�g�0Q׿�Ҙb�4��?f_�=9���΀���0�:Ha�h����3m��h��P��8�>4u>t����T�Y�Zm��g��[O�1Yfs������T�͂)�=�)�ĳl<�Ӷ����WJG�����RY�)��Ԓ���Yd���h��y�J8�ؼ[�]��6��N�6P�9��\n������Jd<|�h��qBV��o8�g�㜺�6�C��~w��%'���A�Yz��t-��l�C���N�VO�wi��ʈ�kX�Gʊ�Mmv�.��I�R�h=�A�-D-S=�fj�֤4�V�mX,2�>u������ycy$��Izf�<Yd,����M�p�qD'c�J��
҄N��j�_�.(��w��hW
H��D�9��*�딋�7��莭Ҙ��X^����ex�l*�-2BͿ��ѯ6�m�}�"#V��M�{}�GK��.�����[��'%6En��Q�k��Z��Bؒ5_V?V����w���,	\:9I��J�N�S�����B�C:җc2N�Y��#�!!�����7�4[��zX,,IM1�y��i���R�ۙih     