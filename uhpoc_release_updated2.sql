PGDMP                         {            uhpocms    14.6    14.6 =   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    61008    uhpocms    DATABASE     c   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE uhpocms;
                postgres    false            K           1255    61009 ;   add_question_with_answers_mcq(json, json, json, json, json) 	   PROCEDURE     �  CREATE PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer)
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
       public          postgres    false            �            1259    61010    Admin_department    TABLE     .  CREATE TABLE public."Admin_department" (
    "isActive" boolean,
    "DepartmentId" integer NOT NULL,
    "Name" text,
    "Description" text,
    "CreatedBy" text,
    "CreatedOn" timestamp with time zone,
    "ModifiedBy" text,
    "ModifiedOn" timestamp with time zone,
    institutionid integer
);
 &   DROP TABLE public."Admin_department";
       public         heap    postgres    false            �            1259    61015 !   Admin_department_DepartmentId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_department_DepartmentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."Admin_department_DepartmentId_seq";
       public          postgres    false    209            �           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Admin_department_DepartmentId_seq" OWNED BY public."Admin_department"."DepartmentId";
          public          postgres    false    210            �            1259    61016    Admin_institution    TABLE     9  CREATE TABLE public."Admin_institution" (
    "isActive" boolean,
    "InstitutionId" integer NOT NULL,
    "Name" text,
    "Description" text,
    "CreatedBy" text,
    "CreatedOn" timestamp with time zone,
    "ModifiedBy" text,
    "ModifiedOn" timestamp with time zone,
    picture character varying(100)
);
 '   DROP TABLE public."Admin_institution";
       public         heap    postgres    false            �            1259    61021 #   Admin_institution_InstitutionId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_institution_InstitutionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Admin_institution_InstitutionId_seq";
       public          postgres    false    211            �           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Admin_institution_InstitutionId_seq" OWNED BY public."Admin_institution"."InstitutionId";
          public          postgres    false    212            �            1259    61022    Admin_userinstitutionmap    TABLE     5  CREATE TABLE public."Admin_userinstitutionmap" (
    "isActive" boolean,
    "Id" integer NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL,
    "InstitutionId_id" integer NOT NULL
);
 .   DROP TABLE public."Admin_userinstitutionmap";
       public         heap    postgres    false            �            1259    61027    Admin_userinstitutionmap_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_userinstitutionmap_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Admin_userinstitutionmap_Id_seq";
       public          postgres    false    213            �           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Admin_userinstitutionmap_Id_seq" OWNED BY public."Admin_userinstitutionmap"."Id";
          public          postgres    false    214            �            1259    61028    instituteadmin_profile    TABLE     y  CREATE TABLE public.instituteadmin_profile (
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
    user_id integer NOT NULL
);
 *   DROP TABLE public.instituteadmin_profile;
       public         heap    postgres    false            �            1259    61033    InstituteAdmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    215            �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    216            �            1259    61034    Teacher_answer    TABLE     0  CREATE TABLE public."Teacher_answer" (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    correct boolean NOT NULL,
    "questionOrderNo" integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    CONSTRAINT "Teacher_answer_questionOrderNo_check" CHECK (("questionOrderNo" >= 0))
);
 $   DROP TABLE public."Teacher_answer";
       public         heap    postgres    false            �            1259    61040    Teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Teacher_answer_id_seq";
       public          postgres    false    217            �           0    0    Teacher_answer_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Teacher_answer_id_seq" OWNED BY public."Teacher_answer".id;
          public          postgres    false    218            �            1259    61041    Teacher_assignment    TABLE       CREATE TABLE public."Teacher_assignment" (
    "CourseId" integer,
    "Assignment_id" integer NOT NULL,
    "Assignment_Name" character varying(200),
    "File" character varying(100),
    "Created_on" timestamp with time zone NOT NULL,
    "ModuleId_id" integer
);
 (   DROP TABLE public."Teacher_assignment";
       public         heap    postgres    false            �            1259    61044 $   Teacher_assignment_Assignment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignment_Assignment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_assignment_Assignment_id_seq";
       public          postgres    false    219            �           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_assignment_Assignment_id_seq" OWNED BY public."Teacher_assignment"."Assignment_id";
          public          postgres    false    220            �            1259    61045    Teacher_assignmentupload    TABLE     �  CREATE TABLE public."Teacher_assignmentupload" (
    "AssignmentUpload_id" integer NOT NULL,
    "Assignment_Name" character varying(100),
    "CourseId" character varying(100),
    "InstitutionId" character varying(100),
    "DepartmentId" character varying(100),
    "ModuleId" character varying(100),
    "Upload_Assignment" character varying(100),
    "AssignmentId_id" integer
);
 .   DROP TABLE public."Teacher_assignmentupload";
       public         heap    postgres    false            �            1259    61050 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq";
       public          postgres    false    221            �           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq" OWNED BY public."Teacher_assignmentupload"."AssignmentUpload_id";
          public          postgres    false    222            �            1259    61051    teacher_category    TABLE     �   CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(250),
    isactive boolean,
    createdby character varying,
    createdon date,
    modifiedby character varying,
    modifiedon date
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            �            1259    61056    Teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    223            �           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public.teacher_category.id;
          public          postgres    false    224            �            1259    61057    Teacher_course_AssignToTeacher    TABLE     �   CREATE TABLE public."Teacher_course_AssignToTeacher" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 4   DROP TABLE public."Teacher_course_AssignToTeacher";
       public         heap    postgres    false            �            1259    61060 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    225            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public."Teacher_course_AssignToTeacher".id;
          public          postgres    false    226            �            1259    61061    teacher_course    TABLE     u  CREATE TABLE public.teacher_course (
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
    updateddate timestamp with time zone
);
 "   DROP TABLE public.teacher_course;
       public         heap    postgres    false            �            1259    61066    Teacher_course_CourseId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_course_CourseId_seq";
       public          postgres    false    227                        0    0    Teacher_course_CourseId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_course_CourseId_seq" OWNED BY public.teacher_course.courseid;
          public          postgres    false    228            �            1259    61067    Teacher_course_DepartmentId    TABLE     �   CREATE TABLE public."Teacher_course_DepartmentId" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 1   DROP TABLE public."Teacher_course_DepartmentId";
       public         heap    postgres    false            �            1259    61070 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    229                       0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public."Teacher_course_DepartmentId".id;
          public          postgres    false    230            �            1259    61071    Teacher_course_EnrollToStudent    TABLE     �   CREATE TABLE public."Teacher_course_EnrollToStudent" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 4   DROP TABLE public."Teacher_course_EnrollToStudent";
       public         heap    postgres    false            �            1259    61074 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    231                       0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public."Teacher_course_EnrollToStudent".id;
          public          postgres    false    232            �            1259    61075    teacher_course_institutionid    TABLE     �   CREATE TABLE public.teacher_course_institutionid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 0   DROP TABLE public.teacher_course_institutionid;
       public         heap    postgres    false            �            1259    61078 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    233                       0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public.teacher_course_institutionid.id;
          public          postgres    false    234            �            1259    61079    Teacher_courseassessment    TABLE     `  CREATE TABLE public."Teacher_courseassessment" (
    "isActive" boolean,
    "CourseAssessmentId" integer NOT NULL,
    "Score" integer NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text NOT NULL,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "CourseId_id" integer NOT NULL
);
 .   DROP TABLE public."Teacher_courseassessment";
       public         heap    postgres    false            �            1259    61084    Teacher_courseregistration    TABLE     �  CREATE TABLE public."Teacher_courseregistration" (
    "isActive" boolean,
    "Student_Name" character varying(100),
    "Instructor_Name" character varying(100),
    "CourseRegistrationId" integer NOT NULL,
    "EnrollmentStatus" text,
    "CreatedBy" text NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text NOT NULL,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "CourseId_id" integer NOT NULL,
    "Name_id" integer
);
 0   DROP TABLE public."Teacher_courseregistration";
       public         heap    postgres    false            �            1259    61089    Teacher_coursesyllabus    TABLE     �   CREATE TABLE public."Teacher_coursesyllabus" (
    "Id" integer NOT NULL,
    "syllabusFile" character varying(100),
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_coursesyllabus";
       public         heap    postgres    false            �            1259    61092    Teacher_coursesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_coursesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_coursesyllabus_Id_seq";
       public          postgres    false    237                       0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_coursesyllabus_Id_seq" OWNED BY public."Teacher_coursesyllabus"."Id";
          public          postgres    false    238            �            1259    61093    Teacher_csvupload    TABLE     �   CREATE TABLE public."Teacher_csvupload" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    file character varying(100) NOT NULL,
    completed boolean NOT NULL,
    user_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_csvupload";
       public         heap    postgres    false            �            1259    61096    Teacher_csvupload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_csvupload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_csvupload_id_seq";
       public          postgres    false    239                       0    0    Teacher_csvupload_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_csvupload_id_seq" OWNED BY public."Teacher_csvupload".id;
          public          postgres    false    240            �            1259    61097    Teacher_email_BCC    TABLE     �   CREATE TABLE public."Teacher_email_BCC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_email_BCC";
       public         heap    postgres    false            �            1259    61100    Teacher_email_BCC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_BCC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_email_BCC_id_seq";
       public          postgres    false    241                       0    0    Teacher_email_BCC_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_BCC_id_seq" OWNED BY public."Teacher_email_BCC".id;
          public          postgres    false    242            �            1259    61101    Teacher_email_CC    TABLE     �   CREATE TABLE public."Teacher_email_CC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_email_CC";
       public         heap    postgres    false            �            1259    61104    Teacher_email_CC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_CC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_email_CC_id_seq";
       public          postgres    false    243                       0    0    Teacher_email_CC_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_email_CC_id_seq" OWNED BY public."Teacher_email_CC".id;
          public          postgres    false    244            �            1259    61105    teacher_email    TABLE     �  CREATE TABLE public.teacher_email (
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
       public         heap    postgres    false            �            1259    61110    Teacher_email_EmailId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    245                       0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public.teacher_email.emailid;
          public          postgres    false    246            �            1259    61111    Teacher_email_Email_To    TABLE     �   CREATE TABLE public."Teacher_email_Email_To" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 ,   DROP TABLE public."Teacher_email_Email_To";
       public         heap    postgres    false            �            1259    61114    Teacher_email_Email_To_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_Email_To_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_email_Email_To_id_seq";
       public          postgres    false    247            	           0    0    Teacher_email_Email_To_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."Teacher_email_Email_To_id_seq" OWNED BY public."Teacher_email_Email_To".id;
          public          postgres    false    248            �            1259    61115    Teacher_folder    TABLE     }   CREATE TABLE public."Teacher_folder" (
    "FolderId" integer NOT NULL,
    "Name" text NOT NULL,
    "UserId_id" integer
);
 $   DROP TABLE public."Teacher_folder";
       public         heap    postgres    false            �            1259    61120    Teacher_folder_FolderId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_folder_FolderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_folder_FolderId_seq";
       public          postgres    false    249            
           0    0    Teacher_folder_FolderId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_folder_FolderId_seq" OWNED BY public."Teacher_folder"."FolderId";
          public          postgres    false    250            �            1259    61121    teacher_module    TABLE     �  CREATE TABLE public.teacher_module (
    isactive boolean,
    moduleid integer NOT NULL,
    name text NOT NULL,
    description character varying(100) NOT NULL,
    startdate timestamp with time zone,
    enddate timestamp with time zone,
    course integer,
    moduleorderno integer,
    createdby text,
    createddate timestamp with time zone NOT NULL,
    updatedby text,
    updateddate timestamp with time zone NOT NULL,
    courseid_id integer
);
 "   DROP TABLE public.teacher_module;
       public         heap    postgres    false            �            1259    61126    Teacher_module_ModuleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    251                       0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public.teacher_module.moduleid;
          public          postgres    false    252            �            1259    61127    Teacher_modulefile    TABLE     M  CREATE TABLE public."Teacher_modulefile" (
    "isActive" boolean,
    id integer NOT NULL,
    "File" text,
    "FileOrderNo" integer,
    "CreatedBy" text NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text NOT NULL,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "ModuleId_id" integer
);
 (   DROP TABLE public."Teacher_modulefile";
       public         heap    postgres    false            �            1259    61132    Teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    253                       0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public."Teacher_modulefile".id;
          public          postgres    false    254            �            1259    61133    Teacher_modulefilecontent    TABLE       CREATE TABLE public."Teacher_modulefilecontent" (
    "isActive" boolean,
    id integer NOT NULL,
    "Slide" text,
    "SlideOrderNo" integer,
    "TextContent" text,
    "SlideText" character varying(100),
    "SlideImage" character varying(100),
    "SlideVideos" character varying(100),
    "SlideAudio" character varying(100),
    "CreatedBy" text NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text NOT NULL,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "ModuleFileId_id" integer
);
 /   DROP TABLE public."Teacher_modulefilecontent";
       public         heap    postgres    false                        1259    61138     Teacher_modulefilecontent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefilecontent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Teacher_modulefilecontent_id_seq";
       public          postgres    false    255                       0    0     Teacher_modulefilecontent_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Teacher_modulefilecontent_id_seq" OWNED BY public."Teacher_modulefilecontent".id;
          public          postgres    false    256                       1259    61139    Teacher_modulesyllabus    TABLE     7  CREATE TABLE public."Teacher_modulesyllabus" (
    "Id" integer NOT NULL,
    "oneDriveLink" character varying(1000),
    "syllabusFile" character varying(100),
    "imgFilePath" character varying(1000),
    "imgCount" integer NOT NULL,
    "fileOrderNo" integer NOT NULL,
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_modulesyllabus";
       public         heap    postgres    false                       1259    61144    Teacher_modulesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_modulesyllabus_Id_seq";
       public          postgres    false    257                       0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_modulesyllabus_Id_seq" OWNED BY public."Teacher_modulesyllabus"."Id";
          public          postgres    false    258                       1259    61145    Teacher_progress    TABLE     �   CREATE TABLE public."Teacher_progress" (
    id integer NOT NULL,
    score character varying(1024) NOT NULL,
    correct_answer character varying(10) NOT NULL,
    wrong_answer character varying(10) NOT NULL,
    user_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_progress";
       public         heap    postgres    false                       1259    61150    Teacher_progress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_progress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_progress_id_seq";
       public          postgres    false    259                       0    0    Teacher_progress_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_progress_id_seq" OWNED BY public."Teacher_progress".id;
          public          postgres    false    260                       1259    61151    teacher_question    TABLE     V  CREATE TABLE public.teacher_question (
    id integer NOT NULL,
    figure character varying(100),
    content character varying(1000) NOT NULL,
    explanation text NOT NULL,
    questionorderno integer NOT NULL,
    ismcq boolean NOT NULL,
    quizid_id integer NOT NULL,
    category_id integer,
    is_active boolean,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone,
    CONSTRAINT "Teacher_question_questionOrderNo_check" CHECK ((questionorderno >= 0))
);
 $   DROP TABLE public.teacher_question;
       public         heap    postgres    false                       1259    61157    Teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_question_id_seq";
       public          postgres    false    261                       0    0    Teacher_question_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_question_id_seq" OWNED BY public.teacher_question.id;
          public          postgres    false    262                       1259    61158    teacher_quiz    TABLE     �  CREATE TABLE public.teacher_quiz (
    quizid integer NOT NULL,
    title character varying(60) NOT NULL,
    description text NOT NULL,
    url character varying(60) NOT NULL,
    random_order boolean NOT NULL,
    max_questions integer,
    answers_at_end boolean NOT NULL,
    exam_paper boolean NOT NULL,
    single_attempt boolean NOT NULL,
    pass_mark smallint NOT NULL,
    success_text text NOT NULL,
    fail_text text NOT NULL,
    draft boolean NOT NULL,
    quizorderno integer NOT NULL,
    courseid_id integer NOT NULL,
    module_id integer,
    category_id integer,
    isactive boolean,
    createdby character varying(255),
    createdon timestamp without time zone NOT NULL,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    CONSTRAINT "Teacher_quiz_max_questions_check" CHECK ((max_questions >= 0)),
    CONSTRAINT "Teacher_quiz_quizOrderNo_check" CHECK ((quizorderno >= 0))
);
     DROP TABLE public.teacher_quiz;
       public         heap    postgres    false                       1259    61165    Teacher_quiz_QuizId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    263                       0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    264            	           1259    61166    Teacher_sitting    TABLE     �  CREATE TABLE public."Teacher_sitting" (
    id integer NOT NULL,
    question_order character varying(1024) NOT NULL,
    question_list character varying(1024) NOT NULL,
    incorrect_questions character varying(1024) NOT NULL,
    current_score integer NOT NULL,
    complete boolean NOT NULL,
    user_answers text NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone,
    quiz_id integer NOT NULL,
    user_id integer NOT NULL
);
 %   DROP TABLE public."Teacher_sitting";
       public         heap    postgres    false            
           1259    61171    Teacher_sitting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_sitting_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Teacher_sitting_id_seq";
       public          postgres    false    265                       0    0    Teacher_sitting_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_sitting_id_seq" OWNED BY public."Teacher_sitting".id;
          public          postgres    false    266                       1259    61172    Teacher_studentcourseprogress    TABLE     3  CREATE TABLE public."Teacher_studentcourseprogress" (
    id integer NOT NULL,
    "Grade" numeric(5,2) NOT NULL,
    "CurrentModuleNo" integer NOT NULL,
    "CurrentUnitNo" integer NOT NULL,
    "CurrentAssignNo" integer NOT NULL,
    "CourseId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentcourseprogress";
       public         heap    postgres    false                       1259    61175 $   Teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentcourseprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentcourseprogress_id_seq";
       public          postgres    false    267                       0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentcourseprogress_id_seq" OWNED BY public."Teacher_studentcourseprogress".id;
          public          postgres    false    268                       1259    61176 !   Teacher_studentmodulefileprogress    TABLE       CREATE TABLE public."Teacher_studentmodulefileprogress" (
    id integer NOT NULL,
    "fileCompleted" boolean NOT NULL,
    "CurrentFilePageNo" integer NOT NULL,
    "FileId_id" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 7   DROP TABLE public."Teacher_studentmodulefileprogress";
       public         heap    postgres    false                       1259    61179 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmodulefileprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public."Teacher_studentmodulefileprogress_id_seq";
       public          postgres    false    269                       0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public."Teacher_studentmodulefileprogress_id_seq" OWNED BY public."Teacher_studentmodulefileprogress".id;
          public          postgres    false    270                       1259    61180    Teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public."Teacher_studentmoduleprogress" (
    id integer NOT NULL,
    "CurrentFileNo" integer NOT NULL,
    "CurrentQuizNo" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentmoduleprogress";
       public         heap    postgres    false                       1259    61183 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmoduleprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentmoduleprogress_id_seq";
       public          postgres    false    271                       0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentmoduleprogress_id_seq" OWNED BY public."Teacher_studentmoduleprogress".id;
          public          postgres    false    272                       1259    61184    teacher_studentquizprogress    TABLE     Q  CREATE TABLE public.teacher_studentquizprogress (
    id integer NOT NULL,
    score numeric(5,2) NOT NULL,
    completed boolean NOT NULL,
    num_attempts integer NOT NULL,
    quizid_id integer NOT NULL,
    studentid_id integer NOT NULL,
    CONSTRAINT "Teacher_studentquizprogress_num_attempts_check" CHECK ((num_attempts >= 0))
);
 /   DROP TABLE public.teacher_studentquizprogress;
       public         heap    postgres    false                       1259    61188 "   Teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentquizprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_studentquizprogress_id_seq";
       public          postgres    false    273                       0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Teacher_studentquizprogress_id_seq" OWNED BY public.teacher_studentquizprogress.id;
          public          postgres    false    274                       1259    61189    Teacher_units    TABLE     �  CREATE TABLE public."Teacher_units" (
    "isActive" boolean,
    "UnitId" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" character varying(100) NOT NULL,
    "StartDate" date,
    "EndDate" date,
    "File" character varying(100) NOT NULL,
    "CreatedBy" text,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "CourseId_id" integer,
    "ModuleId_id" integer
);
 #   DROP TABLE public."Teacher_units";
       public         heap    postgres    false                       1259    61194    Teacher_units_UnitId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_units_UnitId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_units_UnitId_seq";
       public          postgres    false    275                       0    0    Teacher_units_UnitId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_units_UnitId_seq" OWNED BY public."Teacher_units"."UnitId";
          public          postgres    false    276                       1259    61195    accesscontrol    TABLE     t  CREATE TABLE public.accesscontrol (
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
    userid integer
);
 !   DROP TABLE public.accesscontrol;
       public         heap    postgres    false                       1259    61198    accesscontrol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accesscontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.accesscontrol_id_seq;
       public          postgres    false    277                       0    0    accesscontrol_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.accesscontrol_id_seq OWNED BY public.accesscontrol.id;
          public          postgres    false    278                       1259    61199    admin_department    TABLE     �  CREATE TABLE public.admin_department (
    departmentid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255),
    institutionid integer,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255),
    institutionid_id integer
);
 $   DROP TABLE public.admin_department;
       public         heap    postgres    false                       1259    61204 !   admin_department_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_department_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    279                       0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    280                       1259    61205    admin_institution    TABLE     �  CREATE TABLE public.admin_institution (
    institutionid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255) NOT NULL,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255) NOT NULL,
    picture character varying(255) NOT NULL
);
 %   DROP TABLE public.admin_institution;
       public         heap    postgres    false                       1259    61210 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    281                       0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    282                       1259    61211 
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
       public         heap    postgres    false                       1259    61216    admin_role_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.admin_role_role_id_seq;
       public          postgres    false    283                       0    0    admin_role_role_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.admin_role_role_id_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    284                       1259    61217 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false                       1259    61220    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    285                       0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    286                       1259    61221    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false                        1259    61224    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    287                       0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    288            !           1259    61225    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            "           1259    61228    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    289                       0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    290            #           1259    61229 	   auth_user    TABLE     w  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    created_by character varying,
    created_on timestamp with time zone,
    modified_by character varying,
    modified_on timestamp with time zone
);
    DROP TABLE public.auth_user;
       public         heap    postgres    false            $           1259    61234    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            %           1259    61237    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    292                       0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    293            &           1259    61238    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    291                        0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    294            '           1259    61239    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false            (           1259    61242 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    295            !           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    296            )           1259    61243    django_admin_log    TABLE     �  CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
 $   DROP TABLE public.django_admin_log;
       public         heap    postgres    false            *           1259    61249    django_admin_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public          postgres    false    297            "           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
          public          postgres    false    298            +           1259    61250    django_content_type    TABLE     �   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         heap    postgres    false            ,           1259    61253    django_content_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public          postgres    false    299            #           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
          public          postgres    false    300            -           1259    61254    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap    postgres    false            .           1259    61259    django_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public          postgres    false    301            $           0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
          public          postgres    false    302            /           1259    61260    django_session    TABLE     �   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         heap    postgres    false            0           1259    61265    files    TABLE     |   CREATE TABLE public.files (
    id bigint NOT NULL,
    filename character varying(255),
    path character varying(255)
);
    DROP TABLE public.files;
       public         heap    postgres    false            1           1259    61270    files_id_seq    SEQUENCE     u   CREATE SEQUENCE public.files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public          postgres    false    304            %           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
          public          postgres    false    305            2           1259    61271    teacher_announcements    TABLE     Q  CREATE TABLE public.teacher_announcements (
    id integer NOT NULL,
    createdby character varying(255),
    created_on timestamp without time zone,
    announcement_message character varying(255),
    sendby integer,
    announcement_title character varying(255),
    "to" character varying(255),
    readby character varying(255)
);
 )   DROP TABLE public.teacher_announcements;
       public         heap    postgres    false            3           1259    61276    teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_announcements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.teacher_announcements_id_seq;
       public          postgres    false    306            &           0    0    teacher_announcements_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.teacher_announcements_id_seq OWNED BY public.teacher_announcements.id;
          public          postgres    false    307            4           1259    61277    teacher_announcements_to_list    TABLE     �   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer,
    profile_id integer
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            5           1259    61280 $   teacher_announcements_to_list_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_announcements_to_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_announcements_to_list_id_seq;
       public          postgres    false    308            '           0    0 $   teacher_announcements_to_list_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_announcements_to_list_id_seq OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    309            6           1259    61281    teacher_answer    TABLE     �   CREATE TABLE public.teacher_answer (
    id integer NOT NULL,
    content character varying(255),
    correct boolean,
    questionid integer,
    questionorderno integer
);
 "   DROP TABLE public.teacher_answer;
       public         heap    postgres    false            7           1259    61284    teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.teacher_answer_id_seq;
       public          postgres    false    310            (           0    0    teacher_answer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.teacher_answer_id_seq OWNED BY public.teacher_answer.id;
          public          postgres    false    311            8           1259    61285    teacher_course_assigntoteacher    TABLE     �   CREATE TABLE public.teacher_course_assigntoteacher (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_assigntoteacher;
       public         heap    postgres    false            9           1259    61288 %   teacher_course_assigntoteacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_assigntoteacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.teacher_course_assigntoteacher_id_seq;
       public          postgres    false    312            )           0    0 %   teacher_course_assigntoteacher_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.teacher_course_assigntoteacher_id_seq OWNED BY public.teacher_course_assigntoteacher.id;
          public          postgres    false    313            :           1259    61289    teacher_course_departmentid    TABLE        CREATE TABLE public.teacher_course_departmentid (
    id integer NOT NULL,
    course_id integer,
    department_id integer
);
 /   DROP TABLE public.teacher_course_departmentid;
       public         heap    postgres    false            ;           1259    61292 "   teacher_course_departmentid_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_departmentid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.teacher_course_departmentid_id_seq;
       public          postgres    false    314            *           0    0 "   teacher_course_departmentid_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.teacher_course_departmentid_id_seq OWNED BY public.teacher_course_departmentid.id;
          public          postgres    false    315            <           1259    61293    teacher_course_enrolltostudent    TABLE     �   CREATE TABLE public.teacher_course_enrolltostudent (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_enrolltostudent;
       public         heap    postgres    false            =           1259    61296 %   teacher_course_enrolltostudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_enrolltostudent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.teacher_course_enrolltostudent_id_seq;
       public          postgres    false    316            +           0    0 %   teacher_course_enrolltostudent_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.teacher_course_enrolltostudent_id_seq OWNED BY public.teacher_course_enrolltostudent.id;
          public          postgres    false    317            >           1259    61297    teacher_coursesyllabus    TABLE     _  CREATE TABLE public.teacher_coursesyllabus (
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
       public         heap    postgres    false            ?           1259    61302    teacher_coursesyllabus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_coursesyllabus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.teacher_coursesyllabus_id_seq;
       public          postgres    false    318            ,           0    0    teacher_coursesyllabus_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.teacher_coursesyllabus_id_seq OWNED BY public.teacher_coursesyllabus.id;
          public          postgres    false    319            @           1259    61303    teacher_modulefile    TABLE     n  CREATE TABLE public.teacher_modulefile (
    id integer NOT NULL,
    file character varying(255) NOT NULL,
    createdby character varying(255),
    createddate timestamp without time zone NOT NULL,
    isactive boolean,
    fileorderno integer,
    updatedby character varying(255),
    updateddate timestamp without time zone NOT NULL,
    moduleid_id integer
);
 &   DROP TABLE public.teacher_modulefile;
       public         heap    postgres    false            A           1259    61308    teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_modulefile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.teacher_modulefile_id_seq;
       public          postgres    false    320            -           0    0    teacher_modulefile_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.teacher_modulefile_id_seq OWNED BY public.teacher_modulefile.id;
          public          postgres    false    321            B           1259    61309    teacher_studentcourseprogress    TABLE     <  CREATE TABLE public.teacher_studentcourseprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    currentassignno integer NOT NULL,
    currentmoduleno integer NOT NULL,
    currentunitno integer NOT NULL,
    grade real NOT NULL,
    studentid_id integer NOT NULL,
    progress integer NOT NULL
);
 1   DROP TABLE public.teacher_studentcourseprogress;
       public         heap    postgres    false            C           1259    61312 $   teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentcourseprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentcourseprogress_id_seq;
       public          postgres    false    322            .           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentcourseprogress_id_seq OWNED BY public.teacher_studentcourseprogress.id;
          public          postgres    false    323            D           1259    61313 !   teacher_studentmodulefileprogress    TABLE     �   CREATE TABLE public.teacher_studentmodulefileprogress (
    id integer NOT NULL,
    currentfilepageno integer NOT NULL,
    fileid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress real NOT NULL,
    studentid_id integer NOT NULL
);
 5   DROP TABLE public.teacher_studentmodulefileprogress;
       public         heap    postgres    false            E           1259    61316 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmodulefileprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.teacher_studentmodulefileprogress_id_seq;
       public          postgres    false    324            /           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.teacher_studentmodulefileprogress_id_seq OWNED BY public.teacher_studentmodulefileprogress.id;
          public          postgres    false    325            F           1259    61317    teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public.teacher_studentmoduleprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress integer NOT NULL,
    studentid_id integer NOT NULL
);
 1   DROP TABLE public.teacher_studentmoduleprogress;
       public         heap    postgres    false            G           1259    61320 $   teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmoduleprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentmoduleprogress_id_seq;
       public          postgres    false    326            0           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentmoduleprogress_id_seq OWNED BY public.teacher_studentmoduleprogress.id;
          public          postgres    false    327            �           2604    61321    Admin_department DepartmentId    DEFAULT     �   ALTER TABLE ONLY public."Admin_department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('public."Admin_department_DepartmentId_seq"'::regclass);
 P   ALTER TABLE public."Admin_department" ALTER COLUMN "DepartmentId" DROP DEFAULT;
       public          postgres    false    210    209            �           2604    61322    Admin_institution InstitutionId    DEFAULT     �   ALTER TABLE ONLY public."Admin_institution" ALTER COLUMN "InstitutionId" SET DEFAULT nextval('public."Admin_institution_InstitutionId_seq"'::regclass);
 R   ALTER TABLE public."Admin_institution" ALTER COLUMN "InstitutionId" DROP DEFAULT;
       public          postgres    false    212    211            �           2604    61323    Admin_userinstitutionmap Id    DEFAULT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_userinstitutionmap_Id_seq"'::regclass);
 N   ALTER TABLE public."Admin_userinstitutionmap" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    214    213            �           2604    61324    Teacher_answer id    DEFAULT     z   ALTER TABLE ONLY public."Teacher_answer" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_answer_id_seq"'::regclass);
 B   ALTER TABLE public."Teacher_answer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    61325     Teacher_assignment Assignment_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignment" ALTER COLUMN "Assignment_id" SET DEFAULT nextval('public."Teacher_assignment_Assignment_id_seq"'::regclass);
 S   ALTER TABLE public."Teacher_assignment" ALTER COLUMN "Assignment_id" DROP DEFAULT;
       public          postgres    false    220    219            �           2604    61326 ,   Teacher_assignmentupload AssignmentUpload_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" SET DEFAULT nextval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"'::regclass);
 _   ALTER TABLE public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" DROP DEFAULT;
       public          postgres    false    222    221            �           2604    61327 !   Teacher_course_AssignToTeacher id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 R   ALTER TABLE public."Teacher_course_AssignToTeacher" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    61328    Teacher_course_DepartmentId id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_course_DepartmentId" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 O   ALTER TABLE public."Teacher_course_DepartmentId" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    61329 !   Teacher_course_EnrollToStudent id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 R   ALTER TABLE public."Teacher_course_EnrollToStudent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    61330    Teacher_coursesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_coursesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_coursesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_coursesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    238    237            �           2604    61331    Teacher_csvupload id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_csvupload" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_csvupload_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_csvupload" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239            �           2604    61332    Teacher_email_BCC id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_BCC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_BCC_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_email_BCC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241            �           2604    61333    Teacher_email_CC id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_email_CC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_CC_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_email_CC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    61334    Teacher_email_Email_To id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_Email_To" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_Email_To_id_seq"'::regclass);
 J   ALTER TABLE public."Teacher_email_Email_To" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            �           2604    61335    Teacher_folder FolderId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_folder" ALTER COLUMN "FolderId" SET DEFAULT nextval('public."Teacher_folder_FolderId_seq"'::regclass);
 J   ALTER TABLE public."Teacher_folder" ALTER COLUMN "FolderId" DROP DEFAULT;
       public          postgres    false    250    249            �           2604    61336    Teacher_modulefile id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulefile" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 F   ALTER TABLE public."Teacher_modulefile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253            �           2604    61337    Teacher_modulefilecontent id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefilecontent_id_seq"'::regclass);
 M   ALTER TABLE public."Teacher_modulefilecontent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            �           2604    61338    Teacher_modulesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_modulesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_modulesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    258    257            �           2604    61339    Teacher_progress id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_progress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_progress_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_progress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            �           2604    61340    Teacher_sitting id    DEFAULT     |   ALTER TABLE ONLY public."Teacher_sitting" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_sitting_id_seq"'::regclass);
 C   ALTER TABLE public."Teacher_sitting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265            �           2604    61341     Teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentcourseprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentcourseprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267            �           2604    61342 $   Teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmodulefileprogress_id_seq"'::regclass);
 U   ALTER TABLE public."Teacher_studentmodulefileprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            �           2604    61343     Teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmoduleprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentmoduleprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            �           2604    61344    Teacher_units UnitId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_units" ALTER COLUMN "UnitId" SET DEFAULT nextval('public."Teacher_units_UnitId_seq"'::regclass);
 G   ALTER TABLE public."Teacher_units" ALTER COLUMN "UnitId" DROP DEFAULT;
       public          postgres    false    276    275            �           2604    61345    accesscontrol id    DEFAULT     t   ALTER TABLE ONLY public.accesscontrol ALTER COLUMN id SET DEFAULT nextval('public.accesscontrol_id_seq'::regclass);
 ?   ALTER TABLE public.accesscontrol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    277            �           2604    61346    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    280    279            �           2604    61347    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    282    281            �           2604    61348    admin_role role_id    DEFAULT     x   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_role_id_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    284    283            �           2604    61349    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    286    285            �           2604    61350    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            �           2604    61351    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            �           2604    61352    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    294    291            �           2604    61353    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    293    292            �           2604    61354    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    295            �           2604    61355    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            �           2604    61356    django_content_type id    DEFAULT     �   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            �           2604    61357    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    302    301            �           2604    61358    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    305    304            �           2604    61359    instituteadmin_profile id    DEFAULT     �   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    61360    teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public.teacher_announcements_id_seq'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    307    306            �           2604    61361     teacher_announcements_to_list id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public.teacher_announcements_to_list_id_seq'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    309    308            �           2604    61362    teacher_answer id    DEFAULT     v   ALTER TABLE ONLY public.teacher_answer ALTER COLUMN id SET DEFAULT nextval('public.teacher_answer_id_seq'::regclass);
 @   ALTER TABLE public.teacher_answer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    311    310            �           2604    61363    teacher_category id    DEFAULT     |   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    61364    teacher_course courseid    DEFAULT     �   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public."Teacher_course_CourseId_seq"'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    228    227            �           2604    61365 !   teacher_course_assigntoteacher id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher ALTER COLUMN id SET DEFAULT nextval('public.teacher_course_assigntoteacher_id_seq'::regclass);
 P   ALTER TABLE public.teacher_course_assigntoteacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    313    312            �           2604    61366    teacher_course_departmentid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_departmentid ALTER COLUMN id SET DEFAULT nextval('public.teacher_course_departmentid_id_seq'::regclass);
 M   ALTER TABLE public.teacher_course_departmentid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    315    314            �           2604    61367 !   teacher_course_enrolltostudent id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent ALTER COLUMN id SET DEFAULT nextval('public.teacher_course_enrolltostudent_id_seq'::regclass);
 P   ALTER TABLE public.teacher_course_enrolltostudent ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    317    316            �           2604    61368    teacher_course_institutionid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_institutionid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 N   ALTER TABLE public.teacher_course_institutionid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    61369    teacher_coursesyllabus id    DEFAULT     �   ALTER TABLE ONLY public.teacher_coursesyllabus ALTER COLUMN id SET DEFAULT nextval('public.teacher_coursesyllabus_id_seq'::regclass);
 H   ALTER TABLE public.teacher_coursesyllabus ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    319    318            �           2604    61370    teacher_email emailid    DEFAULT     �   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    246    245            �           2604    61371    teacher_module moduleid    DEFAULT     �   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    252    251            �           2604    61372    teacher_modulefile id    DEFAULT     ~   ALTER TABLE ONLY public.teacher_modulefile ALTER COLUMN id SET DEFAULT nextval('public.teacher_modulefile_id_seq'::regclass);
 D   ALTER TABLE public.teacher_modulefile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    321    320            �           2604    61373    teacher_question id    DEFAULT     |   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public."Teacher_question_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261            �           2604    61374    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    264    263            �           2604    61375     teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentcourseprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentcourseprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentcourseprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    323    322            �           2604    61376 $   teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmodulefileprogress_id_seq'::regclass);
 S   ALTER TABLE public.teacher_studentmodulefileprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    325    324            �           2604    61377     teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmoduleprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmoduleprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentmoduleprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    327    326            �           2604    61378    teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizprogress ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentquizprogress_id_seq"'::regclass);
 M   ALTER TABLE public.teacher_studentquizprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    274    273            z          0    61010    Admin_department 
   TABLE DATA           �   COPY public."Admin_department" ("isActive", "DepartmentId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", institutionid) FROM stdin;
    public          postgres    false    209   jN      |          0    61016    Admin_institution 
   TABLE DATA           �   COPY public."Admin_institution" ("isActive", "InstitutionId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", picture) FROM stdin;
    public          postgres    false    211   �N      ~          0    61022    Admin_userinstitutionmap 
   TABLE DATA           �   COPY public."Admin_userinstitutionmap" ("isActive", "Id", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    213   O      �          0    61034    Teacher_answer 
   TABLE DATA           `   COPY public."Teacher_answer" (id, content, correct, "questionOrderNo", "QuizId_id") FROM stdin;
    public          postgres    false    217   $O      �          0    61041    Teacher_assignment 
   TABLE DATA           �   COPY public."Teacher_assignment" ("CourseId", "Assignment_id", "Assignment_Name", "File", "Created_on", "ModuleId_id") FROM stdin;
    public          postgres    false    219   AO      �          0    61045    Teacher_assignmentupload 
   TABLE DATA           �   COPY public."Teacher_assignmentupload" ("AssignmentUpload_id", "Assignment_Name", "CourseId", "InstitutionId", "DepartmentId", "ModuleId", "Upload_Assignment", "AssignmentId_id") FROM stdin;
    public          postgres    false    221   ^O      �          0    61057    Teacher_course_AssignToTeacher 
   TABLE DATA           U   COPY public."Teacher_course_AssignToTeacher" (id, course_id, profile_id) FROM stdin;
    public          postgres    false    225   {O      �          0    61067    Teacher_course_DepartmentId 
   TABLE DATA           U   COPY public."Teacher_course_DepartmentId" (id, course_id, department_id) FROM stdin;
    public          postgres    false    229   �O      �          0    61071    Teacher_course_EnrollToStudent 
   TABLE DATA           U   COPY public."Teacher_course_EnrollToStudent" (id, course_id, profile_id) FROM stdin;
    public          postgres    false    231   �O      �          0    61079    Teacher_courseassessment 
   TABLE DATA           �   COPY public."Teacher_courseassessment" ("isActive", "CourseAssessmentId", "Score", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id") FROM stdin;
    public          postgres    false    235   �O      �          0    61084    Teacher_courseregistration 
   TABLE DATA           �   COPY public."Teacher_courseregistration" ("isActive", "Student_Name", "Instructor_Name", "CourseRegistrationId", "EnrollmentStatus", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "Name_id") FROM stdin;
    public          postgres    false    236   �O      �          0    61089    Teacher_coursesyllabus 
   TABLE DATA           W   COPY public."Teacher_coursesyllabus" ("Id", "syllabusFile", "courseId_id") FROM stdin;
    public          postgres    false    237   P      �          0    61093    Teacher_csvupload 
   TABLE DATA           R   COPY public."Teacher_csvupload" (id, title, file, completed, user_id) FROM stdin;
    public          postgres    false    239   )P      �          0    61097    Teacher_email_BCC 
   TABLE DATA           G   COPY public."Teacher_email_BCC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    241   FP      �          0    61101    Teacher_email_CC 
   TABLE DATA           F   COPY public."Teacher_email_CC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    243   cP      �          0    61111    Teacher_email_Email_To 
   TABLE DATA           L   COPY public."Teacher_email_Email_To" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    247   �P      �          0    61115    Teacher_folder 
   TABLE DATA           K   COPY public."Teacher_folder" ("FolderId", "Name", "UserId_id") FROM stdin;
    public          postgres    false    249   �P      �          0    61127    Teacher_modulefile 
   TABLE DATA           �   COPY public."Teacher_modulefile" ("isActive", id, "File", "FileOrderNo", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleId_id") FROM stdin;
    public          postgres    false    253   �P      �          0    61133    Teacher_modulefilecontent 
   TABLE DATA           �   COPY public."Teacher_modulefilecontent" ("isActive", id, "Slide", "SlideOrderNo", "TextContent", "SlideText", "SlideImage", "SlideVideos", "SlideAudio", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleFileId_id") FROM stdin;
    public          postgres    false    255   �P      �          0    61139    Teacher_modulesyllabus 
   TABLE DATA           �   COPY public."Teacher_modulesyllabus" ("Id", "oneDriveLink", "syllabusFile", "imgFilePath", "imgCount", "fileOrderNo", "courseId_id") FROM stdin;
    public          postgres    false    257   �P      �          0    61145    Teacher_progress 
   TABLE DATA           ^   COPY public."Teacher_progress" (id, score, correct_answer, wrong_answer, user_id) FROM stdin;
    public          postgres    false    259   Q      �          0    61166    Teacher_sitting 
   TABLE DATA           �   COPY public."Teacher_sitting" (id, question_order, question_list, incorrect_questions, current_score, complete, user_answers, start, "end", quiz_id, user_id) FROM stdin;
    public          postgres    false    265   .Q      �          0    61172    Teacher_studentcourseprogress 
   TABLE DATA           �   COPY public."Teacher_studentcourseprogress" (id, "Grade", "CurrentModuleNo", "CurrentUnitNo", "CurrentAssignNo", "CourseId_id", "StudentId_id") FROM stdin;
    public          postgres    false    267   KQ      �          0    61176 !   Teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public."Teacher_studentmodulefileprogress" (id, "fileCompleted", "CurrentFilePageNo", "FileId_id", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    269   hQ      �          0    61180    Teacher_studentmoduleprogress 
   TABLE DATA           ~   COPY public."Teacher_studentmoduleprogress" (id, "CurrentFileNo", "CurrentQuizNo", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    271   �Q      �          0    61189    Teacher_units 
   TABLE DATA           �   COPY public."Teacher_units" ("isActive", "UnitId", "Name", "Description", "StartDate", "EndDate", "File", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "ModuleId_id") FROM stdin;
    public          postgres    false    275   �Q      �          0    61195    accesscontrol 
   TABLE DATA           �   COPY public.accesscontrol (id, admininstitute, announcement, assigncourse, authuser, category, course, department, email, enrollment, module, question, quiz, role, userid) FROM stdin;
    public          postgres    false    277   �Q      �          0    61199    admin_department 
   TABLE DATA           �   COPY public.admin_department (departmentid, createdby, createdon, description, institutionid, isactive, modifiedby, modifiedon, name, institutionid_id) FROM stdin;
    public          postgres    false    279   �Q      �          0    61205    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    281   SR      �          0    61211 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    283   ,S      �          0    61217 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    285   �S      �          0    61221    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          postgres    false    287   �S      �          0    61225    auth_permission 
   TABLE DATA           N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public          postgres    false    289   �S      �          0    61229 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    291   �Y      �          0    61234    auth_user_groups 
   TABLE DATA           A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public          postgres    false    292   �Z      �          0    61239    auth_user_user_permissions 
   TABLE DATA           P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public          postgres    false    295   �Z      �          0    61243    django_admin_log 
   TABLE DATA           �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          postgres    false    297   �Z      �          0    61250    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          postgres    false    299   �Z      �          0    61254    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          postgres    false    301   O\      �          0    61260    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          postgres    false    303   <^      �          0    61265    files 
   TABLE DATA           3   COPY public.files (id, filename, path) FROM stdin;
    public          postgres    false    304   �_      �          0    61028    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (isactive, id, userrole, first_name, last_name, email, dob, mobileno, gender, department, address1, address2, city, state, zip, profile_pics, createdby, createddate, updatedby, updateddate, institutionid_id, user_id) FROM stdin;
    public          postgres    false    215   <`      �          0    61271    teacher_announcements 
   TABLE DATA           �   COPY public.teacher_announcements (id, createdby, created_on, announcement_message, sendby, announcement_title, "to", readby) FROM stdin;
    public          postgres    false    306   Ya      �          0    61277    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    308   va      �          0    61281    teacher_answer 
   TABLE DATA           [   COPY public.teacher_answer (id, content, correct, questionid, questionorderno) FROM stdin;
    public          postgres    false    310   �a      �          0    61051    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    223   �a      �          0    61061    teacher_course 
   TABLE DATA           �   COPY public.teacher_course (isactive, courseid, coursecode, name, description, coursetype, passingscore, instid, createdby, createddate, updatedby, updateddate) FROM stdin;
    public          postgres    false    227   =b      �          0    61285    teacher_course_assigntoteacher 
   TABLE DATA           S   COPY public.teacher_course_assigntoteacher (id, course_id, profile_id) FROM stdin;
    public          postgres    false    312   vc      �          0    61289    teacher_course_departmentid 
   TABLE DATA           S   COPY public.teacher_course_departmentid (id, course_id, department_id) FROM stdin;
    public          postgres    false    314   �c      �          0    61293    teacher_course_enrolltostudent 
   TABLE DATA           S   COPY public.teacher_course_enrolltostudent (id, course_id, profile_id) FROM stdin;
    public          postgres    false    316   d      �          0    61075    teacher_course_institutionid 
   TABLE DATA           U   COPY public.teacher_course_institutionid (id, course_id, institution_id) FROM stdin;
    public          postgres    false    233   �d      �          0    61297    teacher_coursesyllabus 
   TABLE DATA           �   COPY public.teacher_coursesyllabus (id, courseid_id, isactive, createdby, createdon, modifiedby, modifiedon, syllabusfile) FROM stdin;
    public          postgres    false    318   �d      �          0    61105    teacher_email 
   TABLE DATA           �   COPY public.teacher_email (emailid, title, subject, content, createdon, createdby, modifiedon, modifiedby, status, readstatus, attachfile, email_from_id, isactive) FROM stdin;
    public          postgres    false    245   !e      �          0    61121    teacher_module 
   TABLE DATA           �   COPY public.teacher_module (isactive, moduleid, name, description, startdate, enddate, course, moduleorderno, createdby, createddate, updatedby, updateddate, courseid_id) FROM stdin;
    public          postgres    false    251   >e      �          0    61303    teacher_modulefile 
   TABLE DATA           �   COPY public.teacher_modulefile (id, file, createdby, createddate, isactive, fileorderno, updatedby, updateddate, moduleid_id) FROM stdin;
    public          postgres    false    320   �e      �          0    61151    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, figure, content, explanation, questionorderno, ismcq, quizid_id, category_id, is_active, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    261   kf      �          0    61158    teacher_quiz 
   TABLE DATA           %  COPY public.teacher_quiz (quizid, title, description, url, random_order, max_questions, answers_at_end, exam_paper, single_attempt, pass_mark, success_text, fail_text, draft, quizorderno, courseid_id, module_id, category_id, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    263   �f      �          0    61309    teacher_studentcourseprogress 
   TABLE DATA           �   COPY public.teacher_studentcourseprogress (id, courseid_id, currentassignno, currentmoduleno, currentunitno, grade, studentid_id, progress) FROM stdin;
    public          postgres    false    322   �f      �          0    61313 !   teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public.teacher_studentmodulefileprogress (id, currentfilepageno, fileid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    324   �f      �          0    61317    teacher_studentmoduleprogress 
   TABLE DATA           m   COPY public.teacher_studentmoduleprogress (id, courseid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    326   Ng      �          0    61184    teacher_studentquizprogress 
   TABLE DATA           r   COPY public.teacher_studentquizprogress (id, score, completed, num_attempts, quizid_id, studentid_id) FROM stdin;
    public          postgres    false    273   �g      1           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."Admin_department_DepartmentId_seq"', 1, true);
          public          postgres    false    210            2           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Admin_institution_InstitutionId_seq"', 1, true);
          public          postgres    false    212            3           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Admin_userinstitutionmap_Id_seq"', 1, false);
          public          postgres    false    214            4           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 159, true);
          public          postgres    false    216            5           0    0    Teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Teacher_answer_id_seq"', 10, true);
          public          postgres    false    218            6           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_assignment_Assignment_id_seq"', 1, false);
          public          postgres    false    220            7           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"', 1, false);
          public          postgres    false    222            8           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 3, true);
          public          postgres    false    224            9           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 1, true);
          public          postgres    false    226            :           0    0    Teacher_course_CourseId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_course_CourseId_seq"', 202, true);
          public          postgres    false    228            ;           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 1, true);
          public          postgres    false    230            <           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 1, true);
          public          postgres    false    232            =           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 202, true);
          public          postgres    false    234            >           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_coursesyllabus_Id_seq"', 1, true);
          public          postgres    false    238            ?           0    0    Teacher_csvupload_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_csvupload_id_seq"', 1, false);
          public          postgres    false    240            @           0    0    Teacher_email_BCC_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_email_BCC_id_seq"', 1, false);
          public          postgres    false    242            A           0    0    Teacher_email_CC_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_email_CC_id_seq"', 1, false);
          public          postgres    false    244            B           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 22, true);
          public          postgres    false    246            C           0    0    Teacher_email_Email_To_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_email_Email_To_id_seq"', 1, false);
          public          postgres    false    248            D           0    0    Teacher_folder_FolderId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_folder_FolderId_seq"', 1, false);
          public          postgres    false    250            E           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 103, true);
          public          postgres    false    252            F           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 1, true);
          public          postgres    false    254            G           0    0     Teacher_modulefilecontent_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Teacher_modulefilecontent_id_seq"', 1, true);
          public          postgres    false    256            H           0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_modulesyllabus_Id_seq"', 1, false);
          public          postgres    false    258            I           0    0    Teacher_progress_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_progress_id_seq"', 1, false);
          public          postgres    false    260            J           0    0    Teacher_question_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_question_id_seq"', 62, true);
          public          postgres    false    262            K           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 101, true);
          public          postgres    false    264            L           0    0    Teacher_sitting_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_sitting_id_seq"', 1, false);
          public          postgres    false    266            M           0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_studentcourseprogress_id_seq"', 1, true);
          public          postgres    false    268            N           0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."Teacher_studentmodulefileprogress_id_seq"', 1, false);
          public          postgres    false    270            O           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_studentmoduleprogress_id_seq"', 1, false);
          public          postgres    false    272            P           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Teacher_studentquizprogress_id_seq"', 13, true);
          public          postgres    false    274            Q           0    0    Teacher_units_UnitId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_units_UnitId_seq"', 1, false);
          public          postgres    false    276            R           0    0    accesscontrol_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.accesscontrol_id_seq', 1, false);
          public          postgres    false    278            S           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 93, true);
          public          postgres    false    280            T           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 91, true);
          public          postgres    false    282            U           0    0    admin_role_role_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.admin_role_role_id_seq', 5, true);
          public          postgres    false    284            V           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    286            W           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
          public          postgres    false    288            X           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    290            Y           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
          public          postgres    false    293            Z           0    0    auth_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_user_id_seq', 139, true);
          public          postgres    false    294            [           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
          public          postgres    false    296            \           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 10, true);
          public          postgres    false    298            ]           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 36, true);
          public          postgres    false    300            ^           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 21, true);
          public          postgres    false    302            _           0    0    files_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.files_id_seq', 9, true);
          public          postgres    false    305            `           0    0    teacher_announcements_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.teacher_announcements_id_seq', 7, true);
          public          postgres    false    307            a           0    0 $   teacher_announcements_to_list_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_announcements_to_list_id_seq', 16, true);
          public          postgres    false    309            b           0    0    teacher_answer_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.teacher_answer_id_seq', 81, true);
          public          postgres    false    311            c           0    0 %   teacher_course_assigntoteacher_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.teacher_course_assigntoteacher_id_seq', 61, true);
          public          postgres    false    313            d           0    0 "   teacher_course_departmentid_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.teacher_course_departmentid_id_seq', 171, true);
          public          postgres    false    315            e           0    0 %   teacher_course_enrolltostudent_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.teacher_course_enrolltostudent_id_seq', 59, true);
          public          postgres    false    317            f           0    0    teacher_coursesyllabus_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.teacher_coursesyllabus_id_seq', 1, true);
          public          postgres    false    319            g           0    0    teacher_modulefile_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.teacher_modulefile_id_seq', 201, true);
          public          postgres    false    321            h           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentcourseprogress_id_seq', 15, true);
          public          postgres    false    323            i           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.teacher_studentmodulefileprogress_id_seq', 116, true);
          public          postgres    false    325            j           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentmoduleprogress_id_seq', 25, true);
          public          postgres    false    327            �           2606    61380 &   Admin_department Admin_department_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_pkey" PRIMARY KEY ("DepartmentId");
 T   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_pkey";
       public            postgres    false    209            �           2606    61382 (   Admin_institution Admin_institution_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."Admin_institution"
    ADD CONSTRAINT "Admin_institution_pkey" PRIMARY KEY ("InstitutionId");
 V   ALTER TABLE ONLY public."Admin_institution" DROP CONSTRAINT "Admin_institution_pkey";
       public            postgres    false    211            �           2606    61384 6   Admin_userinstitutionmap Admin_userinstitutionmap_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutionmap_pkey" PRIMARY KEY ("Id");
 d   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutionmap_pkey";
       public            postgres    false    213            �           2606    61386 2   instituteadmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    215            �           2606    61388 9   instituteadmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 e   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    215            �           2606    61390 "   Teacher_answer Teacher_answer_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_pkey";
       public            postgres    false    217            �           2606    61392 *   Teacher_assignment Teacher_assignment_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_pkey" PRIMARY KEY ("Assignment_id");
 X   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_pkey";
       public            postgres    false    219            �           2606    61394 6   Teacher_assignmentupload Teacher_assignmentupload_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentupload_pkey" PRIMARY KEY ("AssignmentUpload_id");
 d   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentupload_pkey";
       public            postgres    false    221            �           2606    61396 .   teacher_category Teacher_category_category_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 Z   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    223            �           2606    61398 &   teacher_category Teacher_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    223            �           2606    61400 Z   Teacher_course_AssignToTeacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    225    225            �           2606    61402 B   Teacher_course_AssignToTeacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 p   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    225            �           2606    61404 Z   Teacher_course_DepartmentId Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 �   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    229    229            �           2606    61406 <   Teacher_course_DepartmentId Teacher_course_DepartmentId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    229            �           2606    61408 Z   Teacher_course_EnrollToStudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    231    231            �           2606    61410 B   Teacher_course_EnrollToStudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 p   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    231            �           2606    61412 \   teacher_course_institutionid Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    233    233            �           2606    61414 >   teacher_course_institutionid Teacher_course_InstitutionId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    233            �           2606    61416 "   teacher_course Teacher_course_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT "Teacher_course_pkey" PRIMARY KEY (courseid);
 N   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT "Teacher_course_pkey";
       public            postgres    false    227            �           2606    61418 6   Teacher_courseassessment Teacher_courseassessment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassessment_pkey" PRIMARY KEY ("CourseAssessmentId");
 d   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassessment_pkey";
       public            postgres    false    235                       2606    61420 :   Teacher_courseregistration Teacher_courseregistration_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregistration_pkey" PRIMARY KEY ("CourseRegistrationId");
 h   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregistration_pkey";
       public            postgres    false    236                       2606    61422 2   Teacher_coursesyllabus Teacher_coursesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllabus_pkey";
       public            postgres    false    237                       2606    61424 (   Teacher_csvupload Teacher_csvupload_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_pkey";
       public            postgres    false    239            
           2606    61426 E   Teacher_email_BCC Teacher_email_BCC_email_id_profile_id_79a54781_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq" UNIQUE (email_id, profile_id);
 s   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq";
       public            postgres    false    241    241                       2606    61428 (   Teacher_email_BCC Teacher_email_BCC_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_pkey";
       public            postgres    false    241                       2606    61430 C   Teacher_email_CC Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq" UNIQUE (email_id, profile_id);
 q   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq";
       public            postgres    false    243    243                       2606    61432 &   Teacher_email_CC Teacher_email_CC_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_pkey";
       public            postgres    false    243                       2606    61434 O   Teacher_email_Email_To Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq" UNIQUE (email_id, profile_id);
 }   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq";
       public            postgres    false    247    247                       2606    61436 2   Teacher_email_Email_To Teacher_email_Email_To_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_pkey";
       public            postgres    false    247                       2606    61438     teacher_email Teacher_email_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY (emailid);
 L   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    245            !           2606    61440 "   Teacher_folder Teacher_folder_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_pkey" PRIMARY KEY ("FolderId");
 P   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_pkey";
       public            postgres    false    249            $           2606    61442 "   teacher_module Teacher_module_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY (moduleid);
 N   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    251            '           2606    61444 *   Teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    253            *           2606    61446 8   Teacher_modulefilecontent Teacher_modulefilecontent_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefilecontent_pkey" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefilecontent_pkey";
       public            postgres    false    255            -           2606    61448 2   Teacher_modulesyllabus Teacher_modulesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllabus_pkey";
       public            postgres    false    257            /           2606    61450 &   Teacher_progress Teacher_progress_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_pkey";
       public            postgres    false    259            1           2606    61452 -   Teacher_progress Teacher_progress_user_id_key 
   CONSTRAINT     o   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_key" UNIQUE (user_id);
 [   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_key";
       public            postgres    false    259            5           2606    61454 &   teacher_question Teacher_question_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_pkey";
       public            postgres    false    261            <           2606    61456    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    263            B           2606    61458 $   Teacher_sitting Teacher_sitting_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_pkey";
       public            postgres    false    265            H           2606    61460 @   Teacher_studentcourseprogress Teacher_studentcourseprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcourseprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcourseprogress_pkey";
       public            postgres    false    267            M           2606    61462 H   Teacher_studentmodulefileprogress Teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodulefileprogress_pkey" PRIMARY KEY (id);
 v   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodulefileprogress_pkey";
       public            postgres    false    269            Q           2606    61464 @   Teacher_studentmoduleprogress Teacher_studentmoduleprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmoduleprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmoduleprogress_pkey";
       public            postgres    false    271            U           2606    61466 <   teacher_studentquizprogress Teacher_studentquizprogress_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT "Teacher_studentquizprogress_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT "Teacher_studentquizprogress_pkey";
       public            postgres    false    273            Y           2606    61468     Teacher_units Teacher_units_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_pkey" PRIMARY KEY ("UnitId");
 N   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_pkey";
       public            postgres    false    275            [           2606    61470     accesscontrol accesscontrol_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_pkey;
       public            postgres    false    277            ]           2606    61472 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    279            a           2606    61474 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    281            c           2606    61476    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    283            h           2606    61478    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    285            m           2606    61480 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public            postgres    false    287    287            p           2606    61482 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    287            j           2606    61484    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    285            s           2606    61486 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public            postgres    false    289    289            u           2606    61488 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    289            }           2606    61490 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    292            �           2606    61492 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    292    292            w           2606    61494    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    291            �           2606    61496 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    295            �           2606    61498 Y   auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
       public            postgres    false    295    295            z           2606    61500     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public            postgres    false    291            �           2606    61502 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public            postgres    false    297            �           2606    61504 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public            postgres    false    299    299            �           2606    61506 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public            postgres    false    299            �           2606    61508 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public            postgres    false    301            �           2606    61510 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public            postgres    false    303            �           2606    61512    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            postgres    false    304            �           2606    61514 0   teacher_announcements teacher_announcements_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT teacher_announcements_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT teacher_announcements_pkey;
       public            postgres    false    306            �           2606    61516 @   teacher_announcements_to_list teacher_announcements_to_list_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_pkey;
       public            postgres    false    308            �           2606    61518 "   teacher_answer teacher_answer_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_pkey;
       public            postgres    false    310            �           2606    61520 B   teacher_course_assigntoteacher teacher_course_assigntoteacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT teacher_course_assigntoteacher_pkey PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT teacher_course_assigntoteacher_pkey;
       public            postgres    false    312            �           2606    61522 <   teacher_course_departmentid teacher_course_departmentid_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT teacher_course_departmentid_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT teacher_course_departmentid_pkey;
       public            postgres    false    314            �           2606    61524 B   teacher_course_enrolltostudent teacher_course_enrolltostudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT teacher_course_enrolltostudent_pkey PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT teacher_course_enrolltostudent_pkey;
       public            postgres    false    316            �           2606    61526 2   teacher_coursesyllabus teacher_coursesyllabus_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_coursesyllabus
    ADD CONSTRAINT teacher_coursesyllabus_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_coursesyllabus DROP CONSTRAINT teacher_coursesyllabus_pkey;
       public            postgres    false    318                       2606    61528 %   teacher_email teacher_email_title_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_title_key UNIQUE (title);
 O   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_title_key;
       public            postgres    false    245            �           2606    61530 *   teacher_modulefile teacher_modulefile_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT teacher_modulefile_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT teacher_modulefile_pkey;
       public            postgres    false    320            7           2606    61532 ,   teacher_question teacher_question_figure_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_figure_key UNIQUE (figure);
 V   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_figure_key;
       public            postgres    false    261            @           2606    61534 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    263            �           2606    61536 @   teacher_studentcourseprogress teacher_studentcourseprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentcourseprogress
    ADD CONSTRAINT teacher_studentcourseprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentcourseprogress DROP CONSTRAINT teacher_studentcourseprogress_pkey;
       public            postgres    false    322            �           2606    61538 H   teacher_studentmodulefileprogress teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress
    ADD CONSTRAINT teacher_studentmodulefileprogress_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.teacher_studentmodulefileprogress DROP CONSTRAINT teacher_studentmodulefileprogress_pkey;
       public            postgres    false    324            �           2606    61540 @   teacher_studentmoduleprogress teacher_studentmoduleprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentmoduleprogress
    ADD CONSTRAINT teacher_studentmoduleprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentmoduleprogress DROP CONSTRAINT teacher_studentmoduleprogress_pkey;
       public            postgres    false    326            e           2606    61542 '   admin_role uk_96hyed6ttsaookaqmdmxldkr9 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9 UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9;
       public            postgres    false    283            _           2606    61544 ,   admin_department uka2yugb0vvuuxnnl99in07kex3 
   CONSTRAINT     v   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT uka2yugb0vvuuxnnl99in07kex3 UNIQUE (institutionid, name);
 V   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT uka2yugb0vvuuxnnl99in07kex3;
       public            postgres    false    279    279            �           1259    61545 *   Admin_department_InstitutionId_id_3ace7e32    INDEX     t   CREATE INDEX "Admin_department_InstitutionId_id_3ace7e32" ON public."Admin_department" USING btree (institutionid);
 @   DROP INDEX public."Admin_department_InstitutionId_id_3ace7e32";
       public            postgres    false    209            �           1259    61546 2   Admin_userinstitutionmap_InstitutionId_id_8c9feb65    INDEX     �   CREATE INDEX "Admin_userinstitutionmap_InstitutionId_id_8c9feb65" ON public."Admin_userinstitutionmap" USING btree ("InstitutionId_id");
 H   DROP INDEX public."Admin_userinstitutionmap_InstitutionId_id_8c9feb65";
       public            postgres    false    213            �           1259    61547 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     �   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public.instituteadmin_profile USING btree (institutionid_id);
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    215            �           1259    61548 !   Teacher_answer_QuizId_id_8a8f554b    INDEX     g   CREATE INDEX "Teacher_answer_QuizId_id_8a8f554b" ON public."Teacher_answer" USING btree ("QuizId_id");
 7   DROP INDEX public."Teacher_answer_QuizId_id_8a8f554b";
       public            postgres    false    217            �           1259    61549 '   Teacher_assignment_ModuleId_id_10a5fe63    INDEX     s   CREATE INDEX "Teacher_assignment_ModuleId_id_10a5fe63" ON public."Teacher_assignment" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_assignment_ModuleId_id_10a5fe63";
       public            postgres    false    219            �           1259    61550 1   Teacher_assignmentupload_AssignmentId_id_a4c12c1c    INDEX     �   CREATE INDEX "Teacher_assignmentupload_AssignmentId_id_a4c12c1c" ON public."Teacher_assignmentupload" USING btree ("AssignmentId_id");
 G   DROP INDEX public."Teacher_assignmentupload_AssignmentId_id_a4c12c1c";
       public            postgres    false    221            �           1259    61551 '   Teacher_category_category_2d59e72d_like    INDEX     ~   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public.teacher_category USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    223            �           1259    61552 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public."Teacher_course_AssignToTeacher" USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    225            �           1259    61553 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public."Teacher_course_AssignToTeacher" USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    225            �           1259    61554 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX        CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public."Teacher_course_DepartmentId" USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    229            �           1259    61555 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     �   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public."Teacher_course_DepartmentId" USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    229            �           1259    61556 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public."Teacher_course_EnrollToStudent" USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    231            �           1259    61557 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public."Teacher_course_EnrollToStudent" USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    231            �           1259    61558 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX        CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public.teacher_course_institutionid USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    233            �           1259    61559 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public.teacher_course_institutionid USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    233            �           1259    61560 -   Teacher_courseassessment_CourseId_id_893c01bd    INDEX        CREATE INDEX "Teacher_courseassessment_CourseId_id_893c01bd" ON public."Teacher_courseassessment" USING btree ("CourseId_id");
 C   DROP INDEX public."Teacher_courseassessment_CourseId_id_893c01bd";
       public            postgres    false    235            �           1259    61561 /   Teacher_courseregistration_CourseId_id_9e1bb196    INDEX     �   CREATE INDEX "Teacher_courseregistration_CourseId_id_9e1bb196" ON public."Teacher_courseregistration" USING btree ("CourseId_id");
 E   DROP INDEX public."Teacher_courseregistration_CourseId_id_9e1bb196";
       public            postgres    false    236            �           1259    61562 +   Teacher_courseregistration_Name_id_92c9d933    INDEX     {   CREATE INDEX "Teacher_courseregistration_Name_id_92c9d933" ON public."Teacher_courseregistration" USING btree ("Name_id");
 A   DROP INDEX public."Teacher_courseregistration_Name_id_92c9d933";
       public            postgres    false    236                       1259    61563 +   Teacher_coursesyllabus_courseId_id_6d1f2a8b    INDEX     {   CREATE INDEX "Teacher_coursesyllabus_courseId_id_6d1f2a8b" ON public."Teacher_coursesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_coursesyllabus_courseId_id_6d1f2a8b";
       public            postgres    false    237                       1259    61564 "   Teacher_csvupload_user_id_42769c97    INDEX     g   CREATE INDEX "Teacher_csvupload_user_id_42769c97" ON public."Teacher_csvupload" USING btree (user_id);
 8   DROP INDEX public."Teacher_csvupload_user_id_42769c97";
       public            postgres    false    239                       1259    61565 #   Teacher_email_BCC_email_id_5ed1e5b8    INDEX     i   CREATE INDEX "Teacher_email_BCC_email_id_5ed1e5b8" ON public."Teacher_email_BCC" USING btree (email_id);
 9   DROP INDEX public."Teacher_email_BCC_email_id_5ed1e5b8";
       public            postgres    false    241                       1259    61566 %   Teacher_email_BCC_profile_id_bde0e3ff    INDEX     m   CREATE INDEX "Teacher_email_BCC_profile_id_bde0e3ff" ON public."Teacher_email_BCC" USING btree (profile_id);
 ;   DROP INDEX public."Teacher_email_BCC_profile_id_bde0e3ff";
       public            postgres    false    241                       1259    61567 "   Teacher_email_CC_email_id_a52b181b    INDEX     g   CREATE INDEX "Teacher_email_CC_email_id_a52b181b" ON public."Teacher_email_CC" USING btree (email_id);
 8   DROP INDEX public."Teacher_email_CC_email_id_a52b181b";
       public            postgres    false    243                       1259    61568 $   Teacher_email_CC_profile_id_8a708682    INDEX     k   CREATE INDEX "Teacher_email_CC_profile_id_8a708682" ON public."Teacher_email_CC" USING btree (profile_id);
 :   DROP INDEX public."Teacher_email_CC_profile_id_8a708682";
       public            postgres    false    243                       1259    61569 $   Teacher_email_Email_From_id_acc54e41    INDEX     i   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public.teacher_email USING btree (email_from_id);
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    245                       1259    61570 (   Teacher_email_Email_To_email_id_789297dd    INDEX     s   CREATE INDEX "Teacher_email_Email_To_email_id_789297dd" ON public."Teacher_email_Email_To" USING btree (email_id);
 >   DROP INDEX public."Teacher_email_Email_To_email_id_789297dd";
       public            postgres    false    247                       1259    61571 *   Teacher_email_Email_To_profile_id_4ade4937    INDEX     w   CREATE INDEX "Teacher_email_Email_To_profile_id_4ade4937" ON public."Teacher_email_Email_To" USING btree (profile_id);
 @   DROP INDEX public."Teacher_email_Email_To_profile_id_4ade4937";
       public            postgres    false    247                       1259    61572 !   Teacher_folder_UserId_id_25ea40b7    INDEX     g   CREATE INDEX "Teacher_folder_UserId_id_25ea40b7" ON public."Teacher_folder" USING btree ("UserId_id");
 7   DROP INDEX public."Teacher_folder_UserId_id_25ea40b7";
       public            postgres    false    249            "           1259    61573 #   Teacher_module_CourseId_id_50aa9262    INDEX     g   CREATE INDEX "Teacher_module_CourseId_id_50aa9262" ON public.teacher_module USING btree (courseid_id);
 9   DROP INDEX public."Teacher_module_CourseId_id_50aa9262";
       public            postgres    false    251            %           1259    61574 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     s   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public."Teacher_modulefile" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    253            (           1259    61575 2   Teacher_modulefilecontent_ModuleFileId_id_72056622    INDEX     �   CREATE INDEX "Teacher_modulefilecontent_ModuleFileId_id_72056622" ON public."Teacher_modulefilecontent" USING btree ("ModuleFileId_id");
 H   DROP INDEX public."Teacher_modulefilecontent_ModuleFileId_id_72056622";
       public            postgres    false    255            +           1259    61576 +   Teacher_modulesyllabus_courseId_id_05c97e90    INDEX     {   CREATE INDEX "Teacher_modulesyllabus_courseId_id_05c97e90" ON public."Teacher_modulesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_modulesyllabus_courseId_id_05c97e90";
       public            postgres    false    257            2           1259    61577 #   Teacher_question_QuizId_id_f3ba643e    INDEX     g   CREATE INDEX "Teacher_question_QuizId_id_f3ba643e" ON public.teacher_question USING btree (quizid_id);
 9   DROP INDEX public."Teacher_question_QuizId_id_f3ba643e";
       public            postgres    false    261            3           1259    61578 %   Teacher_question_category_id_52ec7234    INDEX     k   CREATE INDEX "Teacher_question_category_id_52ec7234" ON public.teacher_question USING btree (category_id);
 ;   DROP INDEX public."Teacher_question_category_id_52ec7234";
       public            postgres    false    261            8           1259    61579 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    263            9           1259    61580    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    263            :           1259    61581 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    263            =           1259    61582    Teacher_quiz_url_fda39535    INDEX     S   CREATE INDEX "Teacher_quiz_url_fda39535" ON public.teacher_quiz USING btree (url);
 /   DROP INDEX public."Teacher_quiz_url_fda39535";
       public            postgres    false    263            >           1259    61583    Teacher_quiz_url_fda39535_like    INDEX     l   CREATE INDEX "Teacher_quiz_url_fda39535_like" ON public.teacher_quiz USING btree (url varchar_pattern_ops);
 4   DROP INDEX public."Teacher_quiz_url_fda39535_like";
       public            postgres    false    263            C           1259    61584     Teacher_sitting_quiz_id_280a1446    INDEX     c   CREATE INDEX "Teacher_sitting_quiz_id_280a1446" ON public."Teacher_sitting" USING btree (quiz_id);
 6   DROP INDEX public."Teacher_sitting_quiz_id_280a1446";
       public            postgres    false    265            D           1259    61585     Teacher_sitting_user_id_a53fd1db    INDEX     c   CREATE INDEX "Teacher_sitting_user_id_a53fd1db" ON public."Teacher_sitting" USING btree (user_id);
 6   DROP INDEX public."Teacher_sitting_user_id_a53fd1db";
       public            postgres    false    265            E           1259    61586 2   Teacher_studentcourseprogress_CourseId_id_fe404be7    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_CourseId_id_fe404be7" ON public."Teacher_studentcourseprogress" USING btree ("CourseId_id");
 H   DROP INDEX public."Teacher_studentcourseprogress_CourseId_id_fe404be7";
       public            postgres    false    267            F           1259    61587 3   Teacher_studentcourseprogress_StudentId_id_838739dd    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_StudentId_id_838739dd" ON public."Teacher_studentcourseprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentcourseprogress_StudentId_id_838739dd";
       public            postgres    false    267            I           1259    61588 4   Teacher_studentmodulefileprogress_FileId_id_e2bc8595    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_FileId_id_e2bc8595" ON public."Teacher_studentmodulefileprogress" USING btree ("FileId_id");
 J   DROP INDEX public."Teacher_studentmodulefileprogress_FileId_id_e2bc8595";
       public            postgres    false    269            J           1259    61589 6   Teacher_studentmodulefileprogress_ModuleId_id_41c42264    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_ModuleId_id_41c42264" ON public."Teacher_studentmodulefileprogress" USING btree ("ModuleId_id");
 L   DROP INDEX public."Teacher_studentmodulefileprogress_ModuleId_id_41c42264";
       public            postgres    false    269            K           1259    61590 7   Teacher_studentmodulefileprogress_StudentId_id_12135e51    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_StudentId_id_12135e51" ON public."Teacher_studentmodulefileprogress" USING btree ("StudentId_id");
 M   DROP INDEX public."Teacher_studentmodulefileprogress_StudentId_id_12135e51";
       public            postgres    false    269            N           1259    61591 2   Teacher_studentmoduleprogress_ModuleId_id_c9fdad01    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_ModuleId_id_c9fdad01" ON public."Teacher_studentmoduleprogress" USING btree ("ModuleId_id");
 H   DROP INDEX public."Teacher_studentmoduleprogress_ModuleId_id_c9fdad01";
       public            postgres    false    271            O           1259    61592 3   Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae" ON public."Teacher_studentmoduleprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae";
       public            postgres    false    271            R           1259    61593 .   Teacher_studentquizprogress_QuizId_id_a04a2235    INDEX     }   CREATE INDEX "Teacher_studentquizprogress_QuizId_id_a04a2235" ON public.teacher_studentquizprogress USING btree (quizid_id);
 D   DROP INDEX public."Teacher_studentquizprogress_QuizId_id_a04a2235";
       public            postgres    false    273            S           1259    61594 1   Teacher_studentquizprogress_StudentId_id_4e5596d2    INDEX     �   CREATE INDEX "Teacher_studentquizprogress_StudentId_id_4e5596d2" ON public.teacher_studentquizprogress USING btree (studentid_id);
 G   DROP INDEX public."Teacher_studentquizprogress_StudentId_id_4e5596d2";
       public            postgres    false    273            V           1259    61595 "   Teacher_units_CourseId_id_f67d8790    INDEX     i   CREATE INDEX "Teacher_units_CourseId_id_f67d8790" ON public."Teacher_units" USING btree ("CourseId_id");
 8   DROP INDEX public."Teacher_units_CourseId_id_f67d8790";
       public            postgres    false    275            W           1259    61596 "   Teacher_units_ModuleId_id_14dc3af9    INDEX     i   CREATE INDEX "Teacher_units_ModuleId_id_14dc3af9" ON public."Teacher_units" USING btree ("ModuleId_id");
 8   DROP INDEX public."Teacher_units_ModuleId_id_14dc3af9";
       public            postgres    false    275            f           1259    61597    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    285            k           1259    61598 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public            postgres    false    287            n           1259    61599 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public            postgres    false    287            q           1259    61600 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public            postgres    false    289            {           1259    61601 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    292            ~           1259    61602 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    292            �           1259    61603 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    295            �           1259    61604 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    295            x           1259    61605     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public            postgres    false    291            �           1259    61606 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public            postgres    false    297            �           1259    61607 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public            postgres    false    297            �           1259    61608 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public            postgres    false    303            �           1259    61609 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public            postgres    false    303            �           2606    61610 H   admin_department Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins" FOREIGN KEY (institutionid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 t   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins";
       public          postgres    false    3681    281    279            �           2606    61615 H   Admin_department Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins" FOREIGN KEY (institutionid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 v   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins";
       public          postgres    false    209    3681    281            �           2606    61620 T   Admin_userinstitutionmap Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins";
       public          postgres    false    213    3530    211            �           2606    61625 N   instituteadmin_profile InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id";
       public          postgres    false    215    291    3703            �           2606    61630 G   Teacher_answer Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId";
       public          postgres    false    217    263    3644            �           2606    61635 G   Teacher_assignment Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m";
       public          postgres    false    251    3620    219            �           2606    61640 S   Teacher_assignmentupload Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a" FOREIGN KEY ("AssignmentId_id") REFERENCES public."Teacher_assignment"("Assignment_id") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a";
       public          postgres    false    221    219    3544            �           2606    61645 S   Teacher_course_AssignToTeacher Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c";
       public          postgres    false    3560    225    227            �           2606    61650 T   Teacher_course_AssignToTeacher Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute";
       public          postgres    false    225    215    3536            �           2606    61655 P   Teacher_course_DepartmentId Teacher_course_Depar_course_id_e2919890_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c";
       public          postgres    false    227    3560    229            �           2606    61660 T   Teacher_course_DepartmentId Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep" FOREIGN KEY (department_id) REFERENCES public."Admin_department"("DepartmentId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep";
       public          postgres    false    209    229    3528            �           2606    61665 S   Teacher_course_EnrollToStudent Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c";
       public          postgres    false    227    3560    231            �           2606    61670 T   Teacher_course_EnrollToStudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    3536    231    215            �           2606    61675 Q   teacher_course_institutionid Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c";
       public          postgres    false    227    233    3560            �           2606    61680 V   teacher_course_institutionid Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    233    3681    281            �           2606    61685 O   Teacher_courseassessment Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c";
       public          postgres    false    235    227    3560            �           2606    61690 Q   Teacher_courseregistration Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c";
       public          postgres    false    227    236    3560            �           2606    61695 M   Teacher_courseregistration Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c" FOREIGN KEY ("Name_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c";
       public          postgres    false    236    227    3560            �           2606    61700 M   Teacher_coursesyllabus Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c";
       public          postgres    false    237    3560    227            �           2606    61705 D   Teacher_csvupload Teacher_csvupload_user_id_42769c97_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id";
       public          postgres    false    291    239    3703            �           2606    61710 N   Teacher_email_BCC Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId";
       public          postgres    false    245    3606    241            �           2606    61715 D   Teacher_email_BCC Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute";
       public          postgres    false    215    3536    241            �           2606    61720 L   Teacher_email_CC Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId";
       public          postgres    false    245    243    3606            �           2606    61725 B   Teacher_email_CC Teacher_email_CC_profile_id_8a708682_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute";
       public          postgres    false    3536    243    215            �           2606    61730 ?   teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY (email_from_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    245    215    3536            �           2606    61735 J   Teacher_email_Email_To Teacher_email_Email__email_id_789297dd_fk_Teacher_e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e";
       public          postgres    false    247    245    3606            �           2606    61740 L   Teacher_email_Email_To Teacher_email_Email__profile_id_4ade4937_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute";
       public          postgres    false    215    3536    247            �           2606    61745 M   Teacher_folder Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id" FOREIGN KEY ("UserId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id";
       public          postgres    false    249    215    3536            �           2606    61750 M   teacher_module Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId";
       public          postgres    false    251    227    3560            �           2606    61755 G   Teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    253    251    3620            �           2606    61760 T   Teacher_modulefilecontent Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m" FOREIGN KEY ("ModuleFileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m";
       public          postgres    false    3623    255    253            �           2606    61765 M   Teacher_modulesyllabus Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m";
       public          postgres    false    251    257    3620            �           2606    61770 B   Teacher_progress Teacher_progress_user_id_dd1966fc_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id";
       public          postgres    false    259    291    3703            �           2606    61775 K   teacher_question Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId" FOREIGN KEY (quizid_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 w   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId";
       public          postgres    false    261    263    3644            �           2606    61780 M   teacher_question Teacher_question_category_id_52ec7234_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id";
       public          postgres    false    223    261    3552            �           2606    61785 I   teacher_quiz Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId";
       public          postgres    false    263    3560    227            �           2606    61790 G   teacher_quiz Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId" FOREIGN KEY (module_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId";
       public          postgres    false    263    3620    251            �           2606    61795 E   teacher_quiz Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id";
       public          postgres    false    3552    223    263            �           2606    61800 G   Teacher_sitting Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId" FOREIGN KEY (quiz_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId";
       public          postgres    false    265    263    3644            �           2606    61805 @   Teacher_sitting Teacher_sitting_user_id_a53fd1db_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id";
       public          postgres    false    3703    291    265            �           2606    61810 T   Teacher_studentcourseprogress Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c";
       public          postgres    false    267    227    3560            �           2606    61815 U   Teacher_studentcourseprogress Teacher_studentcours_StudentId_id_838739dd_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute";
       public          postgres    false    3536    215    267            �           2606    61820 V   Teacher_studentmodulefileprogress Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m" FOREIGN KEY ("FileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m";
       public          postgres    false    253    269    3623            �           2606    61825 X   Teacher_studentmodulefileprogress Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m";
       public          postgres    false    3620    269    251            �           2606    61830 T   Teacher_studentmoduleprogress Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m";
       public          postgres    false    271    3620    251            �           2606    61835 Y   Teacher_studentmodulefileprogress Teacher_studentmodul_StudentId_id_12135e51_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute";
       public          postgres    false    3536    215    269            �           2606    61840 U   Teacher_studentmoduleprogress Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute";
       public          postgres    false    271    215    3536            �           2606    61845 P   teacher_studentquizprogress Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q" FOREIGN KEY (quizid_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q";
       public          postgres    false    3644    263    273            �           2606    61850 S   teacher_studentquizprogress Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute" FOREIGN KEY (studentid_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute";
       public          postgres    false    273    3536    215            �           2606    61855 K   Teacher_units Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId";
       public          postgres    false    227    275    3560            �           2606    61860 K   Teacher_units Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId";
       public          postgres    false    3620    275    251            �           2606    61865 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public          postgres    false    3701    289    287            �           2606    61870 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public          postgres    false    3690    287    285            �           2606    61875 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public          postgres    false    299    3726    289            �           2606    61880 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    3690    292    285            �           2606    61885 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public          postgres    false    292    291    3703            �           2606    61890 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    295    3701    289            �           2606    61895 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    295    291    3703            �           2606    61900 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public          postgres    false    3726    299    297            �           2606    61905 B   django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
       public          postgres    false    3703    291    297            �           2606    61910 C   instituteadmin_profile instituteadmin_profile_institutionid_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT instituteadmin_profile_institutionid_id_fkey FOREIGN KEY (institutionid_id) REFERENCES public.admin_institution(institutionid) NOT VALID;
 m   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT instituteadmin_profile_institutionid_id_fkey;
       public          postgres    false    281    3681    215            �           2606    61915 7   teacher_announcements teacher_announcements_sendby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT teacher_announcements_sendby_fkey FOREIGN KEY (sendby) REFERENCES public.instituteadmin_profile(id);
 a   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT teacher_announcements_sendby_fkey;
       public          postgres    false    215    3536    306            �           2606    61920 -   teacher_answer teacher_answer_questionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_questionid_fkey FOREIGN KEY (questionid) REFERENCES public.teacher_question(id) DEFERRABLE INITIALLY DEFERRED;
 W   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_questionid_fkey;
       public          postgres    false    261    310    3637            �           2606    61925 F   teacher_course_departmentid teacher_course_departmentid_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT teacher_course_departmentid_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 p   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT teacher_course_departmentid_course_id_fkey;
       public          postgres    false    3560    227    314            �           2606    61930 J   teacher_course_departmentid teacher_course_departmentid_department_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT teacher_course_departmentid_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.admin_department(departmentid) NOT VALID;
 t   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT teacher_course_departmentid_department_id_fkey;
       public          postgres    false    314    279    3677            �           2606    61935 6   teacher_modulefile teacher_modulefile_moduleid_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT teacher_modulefile_moduleid_id_fkey FOREIGN KEY (moduleid_id) REFERENCES public.teacher_module(moduleid) NOT VALID;
 `   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT teacher_modulefile_moduleid_id_fkey;
       public          postgres    false    3620    251    320            z      x������ � �      |   p   x�+�4�(��KN-��SN�����,�P�)��y�FFF�f�F
FV��V�FzƆ�&���V��*��+.�,)-I�(�O��I�N.JM�+��/�7�+�K����� |N(0      ~      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   g   x��̻�  ���� �)����A �B4�7v&�/����������lP�� ����`�8�5�����vV9��Њ�I��`�3}�!��|J/c7��(	      �   �   x����j�0E��Wx�,F�a%�v�~@��B��db����	!޸���p��k9V��Dr��k:�q�����+2�a>O_��P�pI�_�	8A�5����/S��O�[;��|ó�V��V2��]t[e�8��9���2�A��MJ��֊`�����:%�=���}�bK����Ni&��1��������{f�      �   u   x���A
�0ϙW�����$b޲1=�A��E]�]o�U���w�"$�����R�286hY�7��Mc����xS�<EO��=�M�A4�U 
R��/x�S�c��� X R?�      �      x������ � �      �      x������ � �      �   �  x�}�ͮ�6���S�	�e;�h�(�Oj �S�����+��HJ��b�;ʡBRr��k?�������aږϢ,����?��#��}P1h=xæAb����q���c��&8{�s\�q���[��Js
Dw��H�E����EEz�����2��z���)��ͣ/DJ���H�V�.p��:,E�MY���Y�z ������w��j���o�����j���5�w�Cǈ)��H�!�w�Wģ?�Wg��ޮb��z�Wm�a|2��wf�g�T�3��&r�!�* ���n�ou�Ĉ�T�k�)\��ѥ�E�kػU(g�2?����U9��h ��� D��7 �:ۥ�ӳ]�~1�&�Mj!��˓J��E���2�PW����6��e{�L.\k9�cU�i㒴�0Mc��E}iֻ�$WW��>'
��Z�Fѭ�U�i�JZ��f�[Ir�}���>�1�ljUt��HUo���HQj��f�N��}Y����Z�'ӜuW%$4T�J�K�
m�JvPb�y����o����x2�*0F�Q���B7D�raƻ!��9}����\S[�U� �RW&=ޞc�n���m�+J8u�q�M�������@C@���y�f9��i�֢���?�V�x ���;0��yhl0��n��8�w��2�w%�$8y�є��l+�S:�����+��[AT�[=��9�M�ǜay'�Y�׹�,�� ^���Bf��*m��5�^�+\���Q.�JuN�� x��O�%Y+�7z��'��,��$����v������K�ɎAo��r�`��Un�2K�=�W���ɬ��&^�N�%��ܑx�h�m�t/*8���\UW�G��l����MP��Ȟu8������Nÿ�s������HVۮ,�l�R����JL�c�H+�
�� ��~?��������Kt������V�Lpz���&0���_
��ǣ�kw��Ш���@j�!���9sK�:uS�2�.H��2M����knQ�э'�о��Hmrby��&$�ɍ��M�f$����m�����KQ�e�p��1���*#`M�c�ys��\�óE���U����3@h� Q��V��X����c�oE�7�S5�Qz?�*IM�{��EEj����=��=�W��RUdF�^nXW������Љ�̨���TqT�p�m�}#���L�8��D�U����D�U���I���"�H��Q�i�u����D�<�T�L�Z��U�k&Z�U�*m�D��"N��\��?e������V5��0�S#hU_�j��8�V���2��#踋�2�?\ǳp�����}0CQ��cd�0�0o�p��iާ��0슰Acb��M$�`S�j�#Q0�E�A$A�;����7��ta����j�����ȗ$Ea��G��1��*�      �   �   x���=o� �g��+�;���]��c�$-R������CR��J�<�ף�T6�F|P*�{f�-�tL�|��G��r�~�bJ�`� u�;\��,)+�Ck�w��:�i�d��`i�`
�0�a/o)�����|B!��a�������b���0��ͼ%ɫ��R��-�BS��)�={��}��4I �M�b�l�B�nn��-�"[c�F���=�w�s~�K       �      x������ � �      �      x������ � �      �      x������ � �      �   O  x�mR�r� <���H���c�=�Bm�0��E�N��ŏ����V�Vgj�c�kt1�A0��MFCd��":�4�qa�뽋�,�'�} #\���3{[���hb�3vٰ�-����H����܀�
q�2�9�@��00��[QQ�^E�>[�b>B�ǂ�~HY���jf�+�w2��%N�D~) �4�f���6��6�~^��0�WoI��J����h�!w�#-��u-m}��Z��r�{2�m� � ���D���X�{O?i�^ �*���M&�6�ZZ��������K��zղr������|r=���@�޷�����+�|���       �   �  x���Oo�0���S�}U4c��m�{ﱒe�X�S5�~M����6�p���g�<�_��� �v����B^�����H���5p�Bs�p U��h�/���0B�&��Y���HՀ��D��=���%ڧ
V�d�0��T�ִg�Չ#4�`�r��xe�&�5Q\p���MEt�dT��`�auj�ks:�b8(TE�(�FIJm�����{����]�f�K#L���23�K��z�G3�]�T@Y6�L�h�G�d���y�le��|�ގ]�j��@UpXpt�-sz����!�!������=i}\��S�w�_�-��=�7s\��R�K���%9y�
�'��,.ï�Ы�Op��[A�w'}����!��;Ϧ�O �d�r ���u�[۱�5]9�(
L}��)���)��LC�h]���)�<o*T��z��]VO�^���U�H���W�侽w��/-&s�	V���~�Z�f�G����p8�(�A      �   X  x��ɒ�0  �s�s���@��hA�f���0(�� �|}����u5|>W$7""��j�8�H8g���ky�O����㬘n$�d;�u�&�'��y~K
��M��������D)w؍!Y<1s`��ɖj�Y'۱���$O���� ���2����7��񮏍Ӭ����K�n_j����ɑ�T;�l�-�����Eb+���ln;���M;�ﭹ���*>�7ң��*�M{��d�ig�K^�{�o��ҷ�O�<U/E����5��J��'6�p��@0 ��oY�wTz��
�蟭0Ӷ�����h�}!��@�G��D\c������_����\,?1F{�      �   �   x�3�L�H�-�I�+�(�����)-��OLI��I������$�\Ɯy��
&�DhC(�2!K�)gEe��^VZfMpu\f�^��~
�I
!�٩yz%tc��e����_���[��N@?�J.2�Y��/F��� Y2�8      �     x���OK�0���O�w�n'I�$'E/+�{6�)ݤ��"~{c�u�x�a�y��X�@�w<9D�cO
٦V0�N[�[@�Md:x�>:�Ww����`a{��S�+_����UZ����(5/����ٜP%̖v�N��OnL�pT���n��N��q����R�W�w��J��@׺i���#ͮi0C�a�y�Q����Gaj!�
�|06�p�d_����ē�� ��z��^�Ʌ����Y�U��Y���ǐ5      �      x������ � �      �   M   x�%���0��N1(�f���� ��,+F(���i7�{Qv0�^;ˊm��ɱPwL�1��pU�?��q_�o��      �      x������ � �      �   =   x�3�/�,)I��,�LL����4202�50�54��2������K%J�!��s Q*c���� �!H      �   )  x���͎� ���{ߔ0|(p���^\��mES��o��4�i���
$�gf"��0�!a���Ѕ'���:o(u�we|G��2#J�)�D�Neڽ�)b���OC��tj�&	��]$��Ui��R�H)�����)��[LiP�
7��Lf�������/URK�����3Y�P���T���m����JI8�m�I*��;����и������eH=("�@#�z3�!4>����s�l��o,p	TJ3Q�*Z���1���û�bi$�HA�F��E��H�>      �   V   x�-���0��0�i�Rva�9�˖sI�[�[�K�?.y/�rb�k돰p�P�4y�U+�"2ܪS�Ы�ɷ�Ԍ6zlH�!���`      �   (   x�34��420�4�247 29-��LC �Č���� v1�      �   c   x�-���0�a�*I!�w��s��~X`��m�����up�u�-��,;�a�S��+A,�!�] k��(B�zܝ�ȣ4��:�tj���6�Ǖx. /Wg�      �   %   x�320�4b.#CN�42�8AȌ���� s��      �   U   x�3�46�,�LL����4202�5 "3Cc+#+S=C#��Ɯ�V11i�٩�%11^��~
�I
!�٩yz%\1z\\\ 1�      �      x������ � �      �      x���1
1D�Sl/	�'&+9�G�	*k��`rv�P���^����t˳/��R'!H�h�䑀�c��"[ɧ�Ի�׫�0hL��y�O����k�����k�O�@�÷�w�PspƘEQD�      �   �   x���K
�0E��*��>���4�(8�D(�"��6�(t�Z���8�\�P�TC6���K��ؚ&.������S����6*tC?*F�mA�P�	=;�*+�A�f�?TE�T@[���"�^%u� �;�ǝ���"|�pZ�NQ�      �      x������ � �      �      x������ � �      �   7   x�34�446�4�@ π�Ԁ�Є���Y��Ds�rZ�#K���%b���� ��I      �   R   x�U˱� ��&g�M�.���@C�B`A�dK7�0nl��8�^>h}ِ�=�I��Q��ak8uP[5�GS�GU�,!      �   >   x�%���@C�sR�o	�Ћ��!랒?�o��Zs�,t��VϤʠ�ӑ[��E��L�      �      x������ � �     