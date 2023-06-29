PGDMP     :        
            {            uhpocms    14.8    14.8 :   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    21366    uhpocms    DATABASE     k   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE uhpocms;
                postgres    false            L           1255    21367 ;   add_question_with_answers_mcq(json, json, json, json, json) 	   PROCEDURE       CREATE PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer)
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
       public          postgres    false            �            1259    21368    Admin_department    TABLE     3  CREATE TABLE public."Admin_department" (
    "isActive" boolean,
    "DepartmentId" integer NOT NULL,
    "Name" text,
    "Description" text,
    "CreatedBy" text,
    "CreatedOn" timestamp with time zone,
    "ModifiedBy" text,
    "ModifiedOn" timestamp with time zone,
    "InstitutionId_id" integer
);
 &   DROP TABLE public."Admin_department";
       public         heap    postgres    false            �            1259    21373 !   Admin_department_DepartmentId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_department_DepartmentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."Admin_department_DepartmentId_seq";
       public          postgres    false    209            �           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Admin_department_DepartmentId_seq" OWNED BY public."Admin_department"."DepartmentId";
          public          postgres    false    210            �            1259    21374    Admin_institution    TABLE     9  CREATE TABLE public."Admin_institution" (
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
       public         heap    postgres    false            �            1259    21379 #   Admin_institution_InstitutionId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_institution_InstitutionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Admin_institution_InstitutionId_seq";
       public          postgres    false    211            �           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Admin_institution_InstitutionId_seq" OWNED BY public."Admin_institution"."InstitutionId";
          public          postgres    false    212            �            1259    21380    Admin_userinstitutionmap    TABLE     5  CREATE TABLE public."Admin_userinstitutionmap" (
    "isActive" boolean,
    "Id" integer NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL,
    "InstitutionId_id" integer NOT NULL
);
 .   DROP TABLE public."Admin_userinstitutionmap";
       public         heap    postgres    false            �            1259    21385    Admin_userinstitutionmap_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_userinstitutionmap_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Admin_userinstitutionmap_Id_seq";
       public          postgres    false    213            �           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Admin_userinstitutionmap_Id_seq" OWNED BY public."Admin_userinstitutionmap"."Id";
          public          postgres    false    214            �            1259    21386    instituteadmin_profile    TABLE     y  CREATE TABLE public.instituteadmin_profile (
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
       public         heap    postgres    false            �            1259    21391    InstituteAdmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    215            �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    216            �            1259    21392    teacher_announcements_to_list    TABLE     �   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer NOT NULL,
    profile_id integer NOT NULL
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            �            1259    21395 $   Teacher_announcements_To_List_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_To_List_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_announcements_To_List_id_seq";
       public          postgres    false    217            �           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_announcements_To_List_id_seq" OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    218            �            1259    21396    teacher_announcements    TABLE     (  CREATE TABLE public.teacher_announcements (
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
       public         heap    postgres    false            �            1259    21401    Teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."Teacher_announcements_id_seq";
       public          postgres    false    219            �           0    0    Teacher_announcements_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Teacher_announcements_id_seq" OWNED BY public.teacher_announcements.id;
          public          postgres    false    220            �            1259    21402    Teacher_answer    TABLE     0  CREATE TABLE public."Teacher_answer" (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    correct boolean NOT NULL,
    "questionOrderNo" integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    CONSTRAINT "Teacher_answer_questionOrderNo_check" CHECK (("questionOrderNo" >= 0))
);
 $   DROP TABLE public."Teacher_answer";
       public         heap    postgres    false            �            1259    21408    Teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Teacher_answer_id_seq";
       public          postgres    false    221            �           0    0    Teacher_answer_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Teacher_answer_id_seq" OWNED BY public."Teacher_answer".id;
          public          postgres    false    222            �            1259    21409    Teacher_assignment    TABLE       CREATE TABLE public."Teacher_assignment" (
    "CourseId" integer,
    "Assignment_id" integer NOT NULL,
    "Assignment_Name" character varying(200),
    "File" character varying(100),
    "Created_on" timestamp with time zone NOT NULL,
    "ModuleId_id" integer
);
 (   DROP TABLE public."Teacher_assignment";
       public         heap    postgres    false            �            1259    21412 $   Teacher_assignment_Assignment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignment_Assignment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_assignment_Assignment_id_seq";
       public          postgres    false    223            �           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_assignment_Assignment_id_seq" OWNED BY public."Teacher_assignment"."Assignment_id";
          public          postgres    false    224            �            1259    21413    Teacher_assignmentupload    TABLE     �  CREATE TABLE public."Teacher_assignmentupload" (
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
       public         heap    postgres    false            �            1259    21418 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq";
       public          postgres    false    225            �           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq" OWNED BY public."Teacher_assignmentupload"."AssignmentUpload_id";
          public          postgres    false    226            �            1259    21419    teacher_category    TABLE     �   CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(250),
    isactive boolean,
    createdby character varying,
    createdon date,
    modifiedby character varying,
    modifiedon date
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            �            1259    21424    Teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    227            �           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public.teacher_category.id;
          public          postgres    false    228            �            1259    21425    teacher_course_assigntoteacher    TABLE     �   CREATE TABLE public.teacher_course_assigntoteacher (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_assigntoteacher;
       public         heap    postgres    false            �            1259    21428 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    229            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public.teacher_course_assigntoteacher.id;
          public          postgres    false    230            �            1259    21429    teacher_course    TABLE     �  CREATE TABLE public.teacher_course (
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
       public         heap    postgres    false            �            1259    21434    Teacher_course_CourseId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_course_CourseId_seq";
       public          postgres    false    231            �           0    0    Teacher_course_CourseId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_course_CourseId_seq" OWNED BY public.teacher_course.courseid;
          public          postgres    false    232            �            1259    21435    teacher_course_departmentid    TABLE     �   CREATE TABLE public.teacher_course_departmentid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 /   DROP TABLE public.teacher_course_departmentid;
       public         heap    postgres    false            �            1259    21438 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    233            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public.teacher_course_departmentid.id;
          public          postgres    false    234            �            1259    21439    teacher_course_enrolltostudent    TABLE     �   CREATE TABLE public.teacher_course_enrolltostudent (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_enrolltostudent;
       public         heap    postgres    false            �            1259    21442 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    235                        0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public.teacher_course_enrolltostudent.id;
          public          postgres    false    236            �            1259    21443    teacher_course_institutionid    TABLE     �   CREATE TABLE public.teacher_course_institutionid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 0   DROP TABLE public.teacher_course_institutionid;
       public         heap    postgres    false            �            1259    21446 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    237                       0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public.teacher_course_institutionid.id;
          public          postgres    false    238            �            1259    21447    Teacher_courseassessment    TABLE     `  CREATE TABLE public."Teacher_courseassessment" (
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
       public         heap    postgres    false            �            1259    21452    Teacher_courseregistration    TABLE     �  CREATE TABLE public."Teacher_courseregistration" (
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
       public         heap    postgres    false            �            1259    21457    Teacher_coursesyllabus    TABLE     �   CREATE TABLE public."Teacher_coursesyllabus" (
    "Id" integer NOT NULL,
    "syllabusFile" character varying(100),
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_coursesyllabus";
       public         heap    postgres    false            �            1259    21460    Teacher_coursesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_coursesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_coursesyllabus_Id_seq";
       public          postgres    false    241                       0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_coursesyllabus_Id_seq" OWNED BY public."Teacher_coursesyllabus"."Id";
          public          postgres    false    242            �            1259    21461    Teacher_csvupload    TABLE     �   CREATE TABLE public."Teacher_csvupload" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    file character varying(100) NOT NULL,
    completed boolean NOT NULL,
    user_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_csvupload";
       public         heap    postgres    false            �            1259    21464    Teacher_csvupload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_csvupload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_csvupload_id_seq";
       public          postgres    false    243                       0    0    Teacher_csvupload_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_csvupload_id_seq" OWNED BY public."Teacher_csvupload".id;
          public          postgres    false    244            �            1259    21465    Teacher_email_BCC    TABLE     �   CREATE TABLE public."Teacher_email_BCC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_email_BCC";
       public         heap    postgres    false            �            1259    21468    Teacher_email_BCC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_BCC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_email_BCC_id_seq";
       public          postgres    false    245                       0    0    Teacher_email_BCC_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_BCC_id_seq" OWNED BY public."Teacher_email_BCC".id;
          public          postgres    false    246            �            1259    21469    Teacher_email_CC    TABLE     �   CREATE TABLE public."Teacher_email_CC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_email_CC";
       public         heap    postgres    false            �            1259    21472    Teacher_email_CC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_CC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_email_CC_id_seq";
       public          postgres    false    247                       0    0    Teacher_email_CC_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_email_CC_id_seq" OWNED BY public."Teacher_email_CC".id;
          public          postgres    false    248            �            1259    21473    teacher_email    TABLE     �  CREATE TABLE public.teacher_email (
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
       public         heap    postgres    false            �            1259    21478    Teacher_email_EmailId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    249                       0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public.teacher_email.emailid;
          public          postgres    false    250            �            1259    21479    Teacher_email_Email_To    TABLE     �   CREATE TABLE public."Teacher_email_Email_To" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 ,   DROP TABLE public."Teacher_email_Email_To";
       public         heap    postgres    false            �            1259    21482    Teacher_email_Email_To_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_Email_To_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_email_Email_To_id_seq";
       public          postgres    false    251                       0    0    Teacher_email_Email_To_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."Teacher_email_Email_To_id_seq" OWNED BY public."Teacher_email_Email_To".id;
          public          postgres    false    252            �            1259    21483    Teacher_folder    TABLE     }   CREATE TABLE public."Teacher_folder" (
    "FolderId" integer NOT NULL,
    "Name" text NOT NULL,
    "UserId_id" integer
);
 $   DROP TABLE public."Teacher_folder";
       public         heap    postgres    false            �            1259    21488    Teacher_folder_FolderId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_folder_FolderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_folder_FolderId_seq";
       public          postgres    false    253                       0    0    Teacher_folder_FolderId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_folder_FolderId_seq" OWNED BY public."Teacher_folder"."FolderId";
          public          postgres    false    254            �            1259    21489    teacher_module    TABLE     �  CREATE TABLE public.teacher_module (
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
       public         heap    postgres    false                        1259    21494    Teacher_module_ModuleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    255            	           0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public.teacher_module.moduleid;
          public          postgres    false    256                       1259    21495    teacher_modulefile    TABLE     ;  CREATE TABLE public.teacher_modulefile (
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
       public         heap    postgres    false                       1259    21500    Teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    257            
           0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public.teacher_modulefile.id;
          public          postgres    false    258                       1259    21501    Teacher_modulefilecontent    TABLE       CREATE TABLE public."Teacher_modulefilecontent" (
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
       public         heap    postgres    false                       1259    21506     Teacher_modulefilecontent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefilecontent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Teacher_modulefilecontent_id_seq";
       public          postgres    false    259                       0    0     Teacher_modulefilecontent_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Teacher_modulefilecontent_id_seq" OWNED BY public."Teacher_modulefilecontent".id;
          public          postgres    false    260                       1259    21507    Teacher_modulesyllabus    TABLE     7  CREATE TABLE public."Teacher_modulesyllabus" (
    "Id" integer NOT NULL,
    "oneDriveLink" character varying(1000),
    "syllabusFile" character varying(100),
    "imgFilePath" character varying(1000),
    "imgCount" integer NOT NULL,
    "fileOrderNo" integer NOT NULL,
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_modulesyllabus";
       public         heap    postgres    false                       1259    21512    Teacher_modulesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_modulesyllabus_Id_seq";
       public          postgres    false    261                       0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_modulesyllabus_Id_seq" OWNED BY public."Teacher_modulesyllabus"."Id";
          public          postgres    false    262                       1259    21513    Teacher_progress    TABLE     �   CREATE TABLE public."Teacher_progress" (
    id integer NOT NULL,
    score character varying(1024) NOT NULL,
    correct_answer character varying(10) NOT NULL,
    wrong_answer character varying(10) NOT NULL,
    user_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_progress";
       public         heap    postgres    false                       1259    21518    Teacher_progress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_progress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_progress_id_seq";
       public          postgres    false    263                       0    0    Teacher_progress_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_progress_id_seq" OWNED BY public."Teacher_progress".id;
          public          postgres    false    264            	           1259    21519    teacher_quiz    TABLE     �  CREATE TABLE public.teacher_quiz (
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
       public         heap    postgres    false            
           1259    21526    Teacher_quiz_QuizId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    265                       0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    266                       1259    21527    Teacher_sitting    TABLE     �  CREATE TABLE public."Teacher_sitting" (
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
       public         heap    postgres    false                       1259    21532    Teacher_sitting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_sitting_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Teacher_sitting_id_seq";
       public          postgres    false    267                       0    0    Teacher_sitting_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_sitting_id_seq" OWNED BY public."Teacher_sitting".id;
          public          postgres    false    268                       1259    21533    Teacher_studentcourseprogress    TABLE     3  CREATE TABLE public."Teacher_studentcourseprogress" (
    id integer NOT NULL,
    "Grade" numeric(5,2) NOT NULL,
    "CurrentModuleNo" integer NOT NULL,
    "CurrentUnitNo" integer NOT NULL,
    "CurrentAssignNo" integer NOT NULL,
    "CourseId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentcourseprogress";
       public         heap    postgres    false                       1259    21536 $   Teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentcourseprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentcourseprogress_id_seq";
       public          postgres    false    269                       0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentcourseprogress_id_seq" OWNED BY public."Teacher_studentcourseprogress".id;
          public          postgres    false    270                       1259    21537 !   Teacher_studentmodulefileprogress    TABLE       CREATE TABLE public."Teacher_studentmodulefileprogress" (
    id integer NOT NULL,
    "fileCompleted" boolean NOT NULL,
    "CurrentFilePageNo" integer NOT NULL,
    "FileId_id" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 7   DROP TABLE public."Teacher_studentmodulefileprogress";
       public         heap    postgres    false                       1259    21540 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmodulefileprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public."Teacher_studentmodulefileprogress_id_seq";
       public          postgres    false    271                       0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public."Teacher_studentmodulefileprogress_id_seq" OWNED BY public."Teacher_studentmodulefileprogress".id;
          public          postgres    false    272                       1259    21541    Teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public."Teacher_studentmoduleprogress" (
    id integer NOT NULL,
    "CurrentFileNo" integer NOT NULL,
    "CurrentQuizNo" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentmoduleprogress";
       public         heap    postgres    false                       1259    21544 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmoduleprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentmoduleprogress_id_seq";
       public          postgres    false    273                       0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentmoduleprogress_id_seq" OWNED BY public."Teacher_studentmoduleprogress".id;
          public          postgres    false    274                       1259    21545    Teacher_studentquizprogress    TABLE     W  CREATE TABLE public."Teacher_studentquizprogress" (
    id integer NOT NULL,
    score numeric(5,2) NOT NULL,
    completed boolean NOT NULL,
    num_attempts integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL,
    CONSTRAINT "Teacher_studentquizprogress_num_attempts_check" CHECK ((num_attempts >= 0))
);
 1   DROP TABLE public."Teacher_studentquizprogress";
       public         heap    postgres    false                       1259    21549 "   Teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentquizprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_studentquizprogress_id_seq";
       public          postgres    false    275                       0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_studentquizprogress_id_seq" OWNED BY public."Teacher_studentquizprogress".id;
          public          postgres    false    276                       1259    21550    Teacher_units    TABLE     �  CREATE TABLE public."Teacher_units" (
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
       public         heap    postgres    false                       1259    21555    Teacher_units_UnitId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_units_UnitId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_units_UnitId_seq";
       public          postgres    false    277                       0    0    Teacher_units_UnitId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_units_UnitId_seq" OWNED BY public."Teacher_units"."UnitId";
          public          postgres    false    278                       1259    21556    accesscontrol    TABLE     �  CREATE TABLE public.accesscontrol (
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
       public         heap    postgres    false                       1259    21559    accesscontrol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accesscontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.accesscontrol_id_seq;
       public          postgres    false    279                       0    0    accesscontrol_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.accesscontrol_id_seq OWNED BY public.accesscontrol.id;
          public          postgres    false    280                       1259    21560    admin_department    TABLE     j  CREATE TABLE public.admin_department (
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
       public         heap    postgres    false                       1259    21565 !   admin_department_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_department_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    281                       0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    282                       1259    21566    admin_institution    TABLE     u  CREATE TABLE public.admin_institution (
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
       public         heap    postgres    false                       1259    21571 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    283                       0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    284                       1259    21572 
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
       public         heap    postgres    false                       1259    21577    admin_role_roleid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_role_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.admin_role_roleid_seq;
       public          postgres    false    285                       0    0    admin_role_roleid_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.admin_role_roleid_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    286                       1259    21578 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false                        1259    21581    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    287                       0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    288            !           1259    21582    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false            "           1259    21585    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    289                       0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    290            #           1259    21586    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            $           1259    21589    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    291                       0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    292            %           1259    21590 	   auth_user    TABLE     w  CREATE TABLE public.auth_user (
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
       public         heap    postgres    false            &           1259    21595    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            '           1259    21598    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    294                       0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    295            (           1259    21599    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    293                       0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    296            )           1259    21600    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false            *           1259    21603 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    297                       0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    298            +           1259    21604    demotest    TABLE     �   CREATE TABLE public.demotest (
    id bigint NOT NULL,
    user_email character varying(255),
    user_image bytea,
    user_name character varying(255),
    user_password character varying(255)
);
    DROP TABLE public.demotest;
       public         heap    postgres    false            ,           1259    21609 	   demotest2    TABLE     �   CREATE TABLE public.demotest2 (
    id bigint NOT NULL,
    user_email character varying(255),
    user_image bytea,
    user_name character varying(255),
    user_password character varying(255)
);
    DROP TABLE public.demotest2;
       public         heap    postgres    false            -           1259    21614    demotest2_id_seq    SEQUENCE     y   CREATE SEQUENCE public.demotest2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.demotest2_id_seq;
       public          postgres    false    300                       0    0    demotest2_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.demotest2_id_seq OWNED BY public.demotest2.id;
          public          postgres    false    301            .           1259    21615    demotest_id_seq    SEQUENCE     x   CREATE SEQUENCE public.demotest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.demotest_id_seq;
       public          postgres    false    299                        0    0    demotest_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.demotest_id_seq OWNED BY public.demotest.id;
          public          postgres    false    302            /           1259    21616    django_admin_log    TABLE     �  CREATE TABLE public.django_admin_log (
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
       public         heap    postgres    false            0           1259    21622    django_admin_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public          postgres    false    303            !           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
          public          postgres    false    304            1           1259    21623    django_content_type    TABLE     �   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         heap    postgres    false            2           1259    21626    django_content_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public          postgres    false    305            "           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
          public          postgres    false    306            3           1259    21627    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap    postgres    false            4           1259    21632    django_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public          postgres    false    307            #           0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
          public          postgres    false    308            5           1259    21633    django_session    TABLE     �   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         heap    postgres    false            6           1259    21638    teacher_answer    TABLE     �   CREATE TABLE public.teacher_answer (
    id integer NOT NULL,
    content character varying(255),
    correct boolean,
    questionid integer,
    questionorderno integer
);
 "   DROP TABLE public.teacher_answer;
       public         heap    postgres    false            7           1259    21641    teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.teacher_answer_id_seq;
       public          postgres    false    310            $           0    0    teacher_answer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.teacher_answer_id_seq OWNED BY public.teacher_answer.id;
          public          postgres    false    311            8           1259    21642    teacher_coursesyllabus    TABLE     _  CREATE TABLE public.teacher_coursesyllabus (
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
       public         heap    postgres    false            9           1259    21647    teacher_coursesyllabus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_coursesyllabus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.teacher_coursesyllabus_id_seq;
       public          postgres    false    312            %           0    0    teacher_coursesyllabus_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.teacher_coursesyllabus_id_seq OWNED BY public.teacher_coursesyllabus.id;
          public          postgres    false    313            :           1259    21648    teacher_question    TABLE     S  CREATE TABLE public.teacher_question (
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
       public         heap    postgres    false            ;           1259    21653    teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teacher_question_id_seq;
       public          postgres    false    314            &           0    0    teacher_question_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teacher_question_id_seq OWNED BY public.teacher_question.id;
          public          postgres    false    315            <           1259    21654    teacher_studentcourseprogress    TABLE     <  CREATE TABLE public.teacher_studentcourseprogress (
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
       public         heap    postgres    false            =           1259    21657 $   teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentcourseprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentcourseprogress_id_seq;
       public          postgres    false    316            '           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentcourseprogress_id_seq OWNED BY public.teacher_studentcourseprogress.id;
          public          postgres    false    317            >           1259    21658 !   teacher_studentmodulefileprogress    TABLE       CREATE TABLE public.teacher_studentmodulefileprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    currentfilepageno integer NOT NULL,
    fileid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress real NOT NULL,
    studentid_id integer NOT NULL
);
 5   DROP TABLE public.teacher_studentmodulefileprogress;
       public         heap    postgres    false            ?           1259    21661 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmodulefileprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.teacher_studentmodulefileprogress_id_seq;
       public          postgres    false    318            (           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.teacher_studentmodulefileprogress_id_seq OWNED BY public.teacher_studentmodulefileprogress.id;
          public          postgres    false    319            @           1259    21662    teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public.teacher_studentmoduleprogress (
    id integer NOT NULL,
    courseid_id integer NOT NULL,
    moduleid_id integer NOT NULL,
    progress integer NOT NULL,
    studentid_id integer NOT NULL
);
 1   DROP TABLE public.teacher_studentmoduleprogress;
       public         heap    postgres    false            A           1259    21665 $   teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentmoduleprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_studentmoduleprogress_id_seq;
       public          postgres    false    320            )           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_studentmoduleprogress_id_seq OWNED BY public.teacher_studentmoduleprogress.id;
          public          postgres    false    321            B           1259    21666    teacher_studentquizprogress    TABLE     �   CREATE TABLE public.teacher_studentquizprogress (
    id integer NOT NULL,
    completed boolean,
    num_attempts integer,
    quizid_id integer,
    score integer,
    studentid_id integer
);
 /   DROP TABLE public.teacher_studentquizprogress;
       public         heap    postgres    false            C           1259    21669 "   teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizprogress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.teacher_studentquizprogress_id_seq;
       public          postgres    false    322            *           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.teacher_studentquizprogress_id_seq OWNED BY public.teacher_studentquizprogress.id;
          public          postgres    false    323            D           1259    21670    teacher_studentquizresult    TABLE     Z  CREATE TABLE public.teacher_studentquizresult (
    id integer NOT NULL,
    answerid integer NOT NULL,
    marks integer NOT NULL,
    content character varying(20000) NOT NULL,
    questionid integer NOT NULL,
    quizid integer NOT NULL,
    selectedoption boolean NOT NULL,
    studentid integer,
    teacher_remark character varying(255)
);
 -   DROP TABLE public.teacher_studentquizresult;
       public         heap    postgres    false            E           1259    21675     teacher_studentquizresult_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_studentquizresult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.teacher_studentquizresult_id_seq;
       public          postgres    false    324            +           0    0     teacher_studentquizresult_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.teacher_studentquizresult_id_seq OWNED BY public.teacher_studentquizresult.id;
          public          postgres    false    325            F           1259    21676    test    TABLE     �   CREATE TABLE public.test (
    user_id integer NOT NULL,
    user_description character varying(255) NOT NULL,
    user_image character varying(255) NOT NULL,
    user_name character varying(255) NOT NULL
);
    DROP TABLE public.test;
       public         heap    postgres    false            G           1259    21681    test_seq    SEQUENCE     r   CREATE SEQUENCE public.test_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.test_seq;
       public          postgres    false            H           1259    21682    test_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.test_user_id_seq;
       public          postgres    false    326            ,           0    0    test_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.test_user_id_seq OWNED BY public.test.user_id;
          public          postgres    false    328            �           2604    21683    Admin_department DepartmentId    DEFAULT     �   ALTER TABLE ONLY public."Admin_department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('public."Admin_department_DepartmentId_seq"'::regclass);
 P   ALTER TABLE public."Admin_department" ALTER COLUMN "DepartmentId" DROP DEFAULT;
       public          postgres    false    210    209            �           2604    21684    Admin_institution InstitutionId    DEFAULT     �   ALTER TABLE ONLY public."Admin_institution" ALTER COLUMN "InstitutionId" SET DEFAULT nextval('public."Admin_institution_InstitutionId_seq"'::regclass);
 R   ALTER TABLE public."Admin_institution" ALTER COLUMN "InstitutionId" DROP DEFAULT;
       public          postgres    false    212    211            �           2604    21685    Admin_userinstitutionmap Id    DEFAULT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_userinstitutionmap_Id_seq"'::regclass);
 N   ALTER TABLE public."Admin_userinstitutionmap" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    214    213            �           2604    21686    Teacher_answer id    DEFAULT     z   ALTER TABLE ONLY public."Teacher_answer" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_answer_id_seq"'::regclass);
 B   ALTER TABLE public."Teacher_answer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    21687     Teacher_assignment Assignment_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignment" ALTER COLUMN "Assignment_id" SET DEFAULT nextval('public."Teacher_assignment_Assignment_id_seq"'::regclass);
 S   ALTER TABLE public."Teacher_assignment" ALTER COLUMN "Assignment_id" DROP DEFAULT;
       public          postgres    false    224    223            �           2604    21688 ,   Teacher_assignmentupload AssignmentUpload_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" SET DEFAULT nextval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"'::regclass);
 _   ALTER TABLE public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" DROP DEFAULT;
       public          postgres    false    226    225            �           2604    21689    Teacher_coursesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_coursesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_coursesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_coursesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    242    241            �           2604    21690    Teacher_csvupload id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_csvupload" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_csvupload_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_csvupload" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    21691    Teacher_email_BCC id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_BCC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_BCC_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_email_BCC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245            �           2604    21692    Teacher_email_CC id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_email_CC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_CC_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_email_CC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            �           2604    21693    Teacher_email_Email_To id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_Email_To" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_Email_To_id_seq"'::regclass);
 J   ALTER TABLE public."Teacher_email_Email_To" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    251            �           2604    21694    Teacher_folder FolderId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_folder" ALTER COLUMN "FolderId" SET DEFAULT nextval('public."Teacher_folder_FolderId_seq"'::regclass);
 J   ALTER TABLE public."Teacher_folder" ALTER COLUMN "FolderId" DROP DEFAULT;
       public          postgres    false    254    253            �           2604    21695    Teacher_modulefilecontent id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefilecontent_id_seq"'::regclass);
 M   ALTER TABLE public."Teacher_modulefilecontent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            �           2604    21696    Teacher_modulesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_modulesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_modulesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    262    261            �           2604    21697    Teacher_progress id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_progress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_progress_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_progress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263            �           2604    21698    Teacher_sitting id    DEFAULT     |   ALTER TABLE ONLY public."Teacher_sitting" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_sitting_id_seq"'::regclass);
 C   ALTER TABLE public."Teacher_sitting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    268    267            �           2604    21699     Teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentcourseprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentcourseprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            �           2604    21700 $   Teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmodulefileprogress_id_seq"'::regclass);
 U   ALTER TABLE public."Teacher_studentmodulefileprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            �           2604    21701     Teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmoduleprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentmoduleprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    274    273            �           2604    21702    Teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentquizprogress_id_seq"'::regclass);
 O   ALTER TABLE public."Teacher_studentquizprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    276    275            �           2604    21703    Teacher_units UnitId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_units" ALTER COLUMN "UnitId" SET DEFAULT nextval('public."Teacher_units_UnitId_seq"'::regclass);
 G   ALTER TABLE public."Teacher_units" ALTER COLUMN "UnitId" DROP DEFAULT;
       public          postgres    false    278    277            �           2604    21704    accesscontrol id    DEFAULT     t   ALTER TABLE ONLY public.accesscontrol ALTER COLUMN id SET DEFAULT nextval('public.accesscontrol_id_seq'::regclass);
 ?   ALTER TABLE public.accesscontrol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    280    279            �           2604    21705    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    282    281            �           2604    21706    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    284    283            �           2604    21707    admin_role role_id    DEFAULT     w   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_roleid_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    286    285            �           2604    21708    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            �           2604    21709    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            �           2604    21710    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    292    291            �           2604    21711    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    293            �           2604    21712    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    295    294            �           2604    21713    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            �           2604    21714    demotest id    DEFAULT     j   ALTER TABLE ONLY public.demotest ALTER COLUMN id SET DEFAULT nextval('public.demotest_id_seq'::regclass);
 :   ALTER TABLE public.demotest ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    302    299            �           2604    21715    demotest2 id    DEFAULT     l   ALTER TABLE ONLY public.demotest2 ALTER COLUMN id SET DEFAULT nextval('public.demotest2_id_seq'::regclass);
 ;   ALTER TABLE public.demotest2 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    301    300            �           2604    21716    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    304    303            �           2604    21717    django_content_type id    DEFAULT     �   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    306    305            �           2604    21718    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    308    307            �           2604    21719    instituteadmin_profile id    DEFAULT     �   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    21720    teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_id_seq"'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    21721     teacher_announcements_to_list id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_To_List_id_seq"'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    21722    teacher_answer id    DEFAULT     v   ALTER TABLE ONLY public.teacher_answer ALTER COLUMN id SET DEFAULT nextval('public.teacher_answer_id_seq'::regclass);
 @   ALTER TABLE public.teacher_answer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    311    310            �           2604    21723    teacher_category id    DEFAULT     |   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    21724    teacher_course courseid    DEFAULT     �   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public."Teacher_course_CourseId_seq"'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    232    231            �           2604    21725 !   teacher_course_assigntoteacher id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_assigntoteacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    21726    teacher_course_departmentid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_departmentid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 M   ALTER TABLE public.teacher_course_departmentid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    21727 !   teacher_course_enrolltostudent id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_enrolltostudent ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    21728    teacher_course_institutionid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_institutionid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 N   ALTER TABLE public.teacher_course_institutionid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    21729    teacher_coursesyllabus id    DEFAULT     �   ALTER TABLE ONLY public.teacher_coursesyllabus ALTER COLUMN id SET DEFAULT nextval('public.teacher_coursesyllabus_id_seq'::regclass);
 H   ALTER TABLE public.teacher_coursesyllabus ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    313    312            �           2604    21730    teacher_email emailid    DEFAULT     �   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    250    249            �           2604    21731    teacher_module moduleid    DEFAULT     �   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    256    255            �           2604    21732    teacher_modulefile id    DEFAULT     �   ALTER TABLE ONLY public.teacher_modulefile ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 D   ALTER TABLE public.teacher_modulefile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            �           2604    21733    teacher_question id    DEFAULT     z   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public.teacher_question_id_seq'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    315    314            �           2604    21734    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    266    265            �           2604    21735     teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentcourseprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentcourseprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentcourseprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    317    316            �           2604    21736 $   teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmodulefileprogress_id_seq'::regclass);
 S   ALTER TABLE public.teacher_studentmodulefileprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    319    318            �           2604    21737     teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentmoduleprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentmoduleprogress_id_seq'::regclass);
 O   ALTER TABLE public.teacher_studentmoduleprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    321    320            �           2604    21738    teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizprogress ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizprogress_id_seq'::regclass);
 M   ALTER TABLE public.teacher_studentquizprogress ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    323    322            �           2604    21739    teacher_studentquizresult id    DEFAULT     �   ALTER TABLE ONLY public.teacher_studentquizresult ALTER COLUMN id SET DEFAULT nextval('public.teacher_studentquizresult_id_seq'::regclass);
 K   ALTER TABLE public.teacher_studentquizresult ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    325    324            �           2604    21740    test user_id    DEFAULT     l   ALTER TABLE ONLY public.test ALTER COLUMN user_id SET DEFAULT nextval('public.test_user_id_seq'::regclass);
 ;   ALTER TABLE public.test ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    328    326            u          0    21368    Admin_department 
   TABLE DATA           �   COPY public."Admin_department" ("isActive", "DepartmentId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    209   9F      w          0    21374    Admin_institution 
   TABLE DATA           �   COPY public."Admin_institution" ("isActive", "InstitutionId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", picture) FROM stdin;
    public          postgres    false    211   �F      y          0    21380    Admin_userinstitutionmap 
   TABLE DATA           �   COPY public."Admin_userinstitutionmap" ("isActive", "Id", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    213   G      �          0    21402    Teacher_answer 
   TABLE DATA           `   COPY public."Teacher_answer" (id, content, correct, "questionOrderNo", "QuizId_id") FROM stdin;
    public          postgres    false    221   2G      �          0    21409    Teacher_assignment 
   TABLE DATA           �   COPY public."Teacher_assignment" ("CourseId", "Assignment_id", "Assignment_Name", "File", "Created_on", "ModuleId_id") FROM stdin;
    public          postgres    false    223   OG      �          0    21413    Teacher_assignmentupload 
   TABLE DATA           �   COPY public."Teacher_assignmentupload" ("AssignmentUpload_id", "Assignment_Name", "CourseId", "InstitutionId", "DepartmentId", "ModuleId", "Upload_Assignment", "AssignmentId_id") FROM stdin;
    public          postgres    false    225   lG      �          0    21447    Teacher_courseassessment 
   TABLE DATA           �   COPY public."Teacher_courseassessment" ("isActive", "CourseAssessmentId", "Score", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id") FROM stdin;
    public          postgres    false    239   �G      �          0    21452    Teacher_courseregistration 
   TABLE DATA           �   COPY public."Teacher_courseregistration" ("isActive", "Student_Name", "Instructor_Name", "CourseRegistrationId", "EnrollmentStatus", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "Name_id") FROM stdin;
    public          postgres    false    240   �G      �          0    21457    Teacher_coursesyllabus 
   TABLE DATA           W   COPY public."Teacher_coursesyllabus" ("Id", "syllabusFile", "courseId_id") FROM stdin;
    public          postgres    false    241   �G      �          0    21461    Teacher_csvupload 
   TABLE DATA           R   COPY public."Teacher_csvupload" (id, title, file, completed, user_id) FROM stdin;
    public          postgres    false    243   �G      �          0    21465    Teacher_email_BCC 
   TABLE DATA           G   COPY public."Teacher_email_BCC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    245   �G      �          0    21469    Teacher_email_CC 
   TABLE DATA           F   COPY public."Teacher_email_CC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    247   H      �          0    21479    Teacher_email_Email_To 
   TABLE DATA           L   COPY public."Teacher_email_Email_To" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    251   7H      �          0    21483    Teacher_folder 
   TABLE DATA           K   COPY public."Teacher_folder" ("FolderId", "Name", "UserId_id") FROM stdin;
    public          postgres    false    253   TH      �          0    21501    Teacher_modulefilecontent 
   TABLE DATA           �   COPY public."Teacher_modulefilecontent" ("isActive", id, "Slide", "SlideOrderNo", "TextContent", "SlideText", "SlideImage", "SlideVideos", "SlideAudio", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleFileId_id") FROM stdin;
    public          postgres    false    259   qH      �          0    21507    Teacher_modulesyllabus 
   TABLE DATA           �   COPY public."Teacher_modulesyllabus" ("Id", "oneDriveLink", "syllabusFile", "imgFilePath", "imgCount", "fileOrderNo", "courseId_id") FROM stdin;
    public          postgres    false    261   �H      �          0    21513    Teacher_progress 
   TABLE DATA           ^   COPY public."Teacher_progress" (id, score, correct_answer, wrong_answer, user_id) FROM stdin;
    public          postgres    false    263   �H      �          0    21527    Teacher_sitting 
   TABLE DATA           �   COPY public."Teacher_sitting" (id, question_order, question_list, incorrect_questions, current_score, complete, user_answers, start, "end", quiz_id, user_id) FROM stdin;
    public          postgres    false    267   �H      �          0    21533    Teacher_studentcourseprogress 
   TABLE DATA           �   COPY public."Teacher_studentcourseprogress" (id, "Grade", "CurrentModuleNo", "CurrentUnitNo", "CurrentAssignNo", "CourseId_id", "StudentId_id") FROM stdin;
    public          postgres    false    269   �H      �          0    21537 !   Teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public."Teacher_studentmodulefileprogress" (id, "fileCompleted", "CurrentFilePageNo", "FileId_id", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    271   I      �          0    21541    Teacher_studentmoduleprogress 
   TABLE DATA           ~   COPY public."Teacher_studentmoduleprogress" (id, "CurrentFileNo", "CurrentQuizNo", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    273   I      �          0    21545    Teacher_studentquizprogress 
   TABLE DATA           x   COPY public."Teacher_studentquizprogress" (id, score, completed, num_attempts, "QuizId_id", "StudentId_id") FROM stdin;
    public          postgres    false    275   <I      �          0    21550    Teacher_units 
   TABLE DATA           �   COPY public."Teacher_units" ("isActive", "UnitId", "Name", "Description", "StartDate", "EndDate", "File", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "ModuleId_id") FROM stdin;
    public          postgres    false    277   YI      �          0    21556    accesscontrol 
   TABLE DATA           �   COPY public.accesscontrol (id, admininstitute, announcement, assigncourse, authuser, category, course, department, email, enrollment, module, question, quiz, role, userid, lessons, modulefile) FROM stdin;
    public          postgres    false    279   vI      �          0    21560    admin_department 
   TABLE DATA           �   COPY public.admin_department (departmentid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, institutionid) FROM stdin;
    public          postgres    false    281   �I      �          0    21566    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    283   uJ      �          0    21572 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    285   `L      �          0    21578 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    287   M      �          0    21582    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          postgres    false    289   *M      �          0    21586    auth_permission 
   TABLE DATA           N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public          postgres    false    291   GM      �          0    21590 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    293   S      �          0    21595    auth_user_groups 
   TABLE DATA           A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public          postgres    false    294   W      �          0    21600    auth_user_user_permissions 
   TABLE DATA           P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public          postgres    false    297   ,W      �          0    21604    demotest 
   TABLE DATA           X   COPY public.demotest (id, user_email, user_image, user_name, user_password) FROM stdin;
    public          postgres    false    299   IW      �          0    21609 	   demotest2 
   TABLE DATA           Y   COPY public.demotest2 (id, user_email, user_image, user_name, user_password) FROM stdin;
    public          postgres    false    300   !�      �          0    21616    django_admin_log 
   TABLE DATA           �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          postgres    false    303   "�      �          0    21623    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          postgres    false    305   ?�      �          0    21627    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          postgres    false    307   ��      �          0    21633    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          postgres    false    309   ��      {          0    21386    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (isactive, id, userrole, first_name, last_name, email, dob, mobileno, gender, department, address1, address2, city, state, zip, profile_pics, createdby, createddate, updatedby, updateddate, institutionid_id, user_id) FROM stdin;
    public          postgres    false    215   �                0    21396    teacher_announcements 
   TABLE DATA           �   COPY public.teacher_announcements (id, announcement_title, announcement_message, "to", readby, createdby, created_on, sendby) FROM stdin;
    public          postgres    false    219   ��      }          0    21392    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    217   Z�      �          0    21638    teacher_answer 
   TABLE DATA           [   COPY public.teacher_answer (id, content, correct, questionid, questionorderno) FROM stdin;
    public          postgres    false    310   ��      �          0    21419    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    227   �      �          0    21429    teacher_course 
   TABLE DATA           �   COPY public.teacher_course (isactive, courseid, coursecode, name, description, coursetype, passingscore, instid, createdby, createddate, updatedby, updateddate, moduleinorder) FROM stdin;
    public          postgres    false    231   T�      �          0    21425    teacher_course_assigntoteacher 
   TABLE DATA           S   COPY public.teacher_course_assigntoteacher (id, course_id, profile_id) FROM stdin;
    public          postgres    false    229   |�      �          0    21435    teacher_course_departmentid 
   TABLE DATA           S   COPY public.teacher_course_departmentid (id, course_id, department_id) FROM stdin;
    public          postgres    false    233   ��      �          0    21439    teacher_course_enrolltostudent 
   TABLE DATA           S   COPY public.teacher_course_enrolltostudent (id, course_id, profile_id) FROM stdin;
    public          postgres    false    235   C�      �          0    21443    teacher_course_institutionid 
   TABLE DATA           U   COPY public.teacher_course_institutionid (id, course_id, institution_id) FROM stdin;
    public          postgres    false    237   Ξ      �          0    21642    teacher_coursesyllabus 
   TABLE DATA           �   COPY public.teacher_coursesyllabus (id, courseid_id, isactive, createdby, createdon, modifiedby, modifiedon, syllabusfile) FROM stdin;
    public          postgres    false    312   .�      �          0    21473    teacher_email 
   TABLE DATA           �   COPY public.teacher_email (emailid, title, subject, content, createdon, createdby, modifiedon, modifiedby, status, readstatus, attachfile, email_from_id, isactive) FROM stdin;
    public          postgres    false    249   K�      �          0    21489    teacher_module 
   TABLE DATA           �   COPY public.teacher_module (isactive, moduleid, name, description, startdate, enddate, course, moduleorderno, createdby, createddate, updatedby, updateddate, courseid_id) FROM stdin;
    public          postgres    false    255   h�      �          0    21495    teacher_modulefile 
   TABLE DATA           �   COPY public.teacher_modulefile (isactive, id, file, fileorderno, createdby, createddate, updatedby, updateddate, moduleid_id) FROM stdin;
    public          postgres    false    257   ��      �          0    21648    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, max_marks, category_id, content, created_by, created_on, explanation, figure, is_active, ismcq, modified_by, modified_on, questionorderno, quizid_id) FROM stdin;
    public          postgres    false    314   ��      �          0    21519    teacher_quiz 
   TABLE DATA           %  COPY public.teacher_quiz (quizid, title, description, url, random_order, max_questions, answers_at_end, exam_paper, single_attempt, pass_mark, success_text, fail_text, draft, quizorderno, courseid_id, module_id, category_id, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    265   ��      �          0    21654    teacher_studentcourseprogress 
   TABLE DATA           �   COPY public.teacher_studentcourseprogress (id, courseid_id, currentassignno, currentmoduleno, currentunitno, grade, progress, studentid_id) FROM stdin;
    public          postgres    false    316   ��      �          0    21658 !   teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public.teacher_studentmodulefileprogress (id, courseid_id, currentfilepageno, fileid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    318   ؤ      �          0    21662    teacher_studentmoduleprogress 
   TABLE DATA           m   COPY public.teacher_studentmoduleprogress (id, courseid_id, moduleid_id, progress, studentid_id) FROM stdin;
    public          postgres    false    320   ֥      �          0    21666    teacher_studentquizprogress 
   TABLE DATA           r   COPY public.teacher_studentquizprogress (id, completed, num_attempts, quizid_id, score, studentid_id) FROM stdin;
    public          postgres    false    322   c�      �          0    21670    teacher_studentquizresult 
   TABLE DATA           �   COPY public.teacher_studentquizresult (id, answerid, marks, content, questionid, quizid, selectedoption, studentid, teacher_remark) FROM stdin;
    public          postgres    false    324   ��      �          0    21676    test 
   TABLE DATA           P   COPY public.test (user_id, user_description, user_image, user_name) FROM stdin;
    public          postgres    false    326   <�      -           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."Admin_department_DepartmentId_seq"', 1, true);
          public          postgres    false    210            .           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Admin_institution_InstitutionId_seq"', 1, true);
          public          postgres    false    212            /           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Admin_userinstitutionmap_Id_seq"', 1, false);
          public          postgres    false    214            0           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 129, true);
          public          postgres    false    216            1           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_announcements_To_List_id_seq"', 33, true);
          public          postgres    false    218            2           0    0    Teacher_announcements_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_announcements_id_seq"', 20, true);
          public          postgres    false    220            3           0    0    Teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Teacher_answer_id_seq"', 10, true);
          public          postgres    false    222            4           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_assignment_Assignment_id_seq"', 1, false);
          public          postgres    false    224            5           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"', 1, false);
          public          postgres    false    226            6           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 3, true);
          public          postgres    false    228            7           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 34, true);
          public          postgres    false    230            8           0    0    Teacher_course_CourseId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_course_CourseId_seq"', 167, true);
          public          postgres    false    232            9           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 269, true);
          public          postgres    false    234            :           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 149, true);
          public          postgres    false    236            ;           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 160, true);
          public          postgres    false    238            <           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_coursesyllabus_Id_seq"', 1, true);
          public          postgres    false    242            =           0    0    Teacher_csvupload_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_csvupload_id_seq"', 1, false);
          public          postgres    false    244            >           0    0    Teacher_email_BCC_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_email_BCC_id_seq"', 1, false);
          public          postgres    false    246            ?           0    0    Teacher_email_CC_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_email_CC_id_seq"', 1, false);
          public          postgres    false    248            @           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 22, true);
          public          postgres    false    250            A           0    0    Teacher_email_Email_To_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_email_Email_To_id_seq"', 1, false);
          public          postgres    false    252            B           0    0    Teacher_folder_FolderId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_folder_FolderId_seq"', 1, false);
          public          postgres    false    254            C           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 113, true);
          public          postgres    false    256            D           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 136, true);
          public          postgres    false    258            E           0    0     Teacher_modulefilecontent_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Teacher_modulefilecontent_id_seq"', 1, true);
          public          postgres    false    260            F           0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_modulesyllabus_Id_seq"', 1, false);
          public          postgres    false    262            G           0    0    Teacher_progress_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_progress_id_seq"', 1, false);
          public          postgres    false    264            H           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 104, true);
          public          postgres    false    266            I           0    0    Teacher_sitting_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_sitting_id_seq"', 1, false);
          public          postgres    false    268            J           0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_studentcourseprogress_id_seq"', 1, true);
          public          postgres    false    270            K           0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."Teacher_studentmodulefileprogress_id_seq"', 1, false);
          public          postgres    false    272            L           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_studentmoduleprogress_id_seq"', 1, false);
          public          postgres    false    274            M           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Teacher_studentquizprogress_id_seq"', 1, true);
          public          postgres    false    276            N           0    0    Teacher_units_UnitId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_units_UnitId_seq"', 1, false);
          public          postgres    false    278            O           0    0    accesscontrol_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.accesscontrol_id_seq', 1, false);
          public          postgres    false    280            P           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 188, true);
          public          postgres    false    282            Q           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 164, true);
          public          postgres    false    284            R           0    0    admin_role_roleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_role_roleid_seq', 4, true);
          public          postgres    false    286            S           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    288            T           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
          public          postgres    false    290            U           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    292            V           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
          public          postgres    false    295            W           0    0    auth_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_user_id_seq', 123, true);
          public          postgres    false    296            X           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
          public          postgres    false    298            Y           0    0    demotest2_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.demotest2_id_seq', 6, true);
          public          postgres    false    301            Z           0    0    demotest_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.demotest_id_seq', 10, true);
          public          postgres    false    302            [           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 10, true);
          public          postgres    false    304            \           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 36, true);
          public          postgres    false    306            ]           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 21, true);
          public          postgres    false    308            ^           0    0    teacher_answer_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.teacher_answer_id_seq', 123, true);
          public          postgres    false    311            _           0    0    teacher_coursesyllabus_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.teacher_coursesyllabus_id_seq', 1, false);
          public          postgres    false    313            `           0    0    teacher_question_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.teacher_question_id_seq', 4, true);
          public          postgres    false    315            a           0    0 $   teacher_studentcourseprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentcourseprogress_id_seq', 53, true);
          public          postgres    false    317            b           0    0 (   teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.teacher_studentmodulefileprogress_id_seq', 57, true);
          public          postgres    false    319            c           0    0 $   teacher_studentmoduleprogress_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.teacher_studentmoduleprogress_id_seq', 29, true);
          public          postgres    false    321            d           0    0 "   teacher_studentquizprogress_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.teacher_studentquizprogress_id_seq', 12, true);
          public          postgres    false    323            e           0    0     teacher_studentquizresult_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.teacher_studentquizresult_id_seq', 6, true);
          public          postgres    false    325            f           0    0    test_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('public.test_seq', 1, true);
          public          postgres    false    327            g           0    0    test_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.test_user_id_seq', 24, true);
          public          postgres    false    328            �           2606    21755 &   Admin_department Admin_department_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_pkey" PRIMARY KEY ("DepartmentId");
 T   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_pkey";
       public            postgres    false    209            �           2606    21757 (   Admin_institution Admin_institution_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."Admin_institution"
    ADD CONSTRAINT "Admin_institution_pkey" PRIMARY KEY ("InstitutionId");
 V   ALTER TABLE ONLY public."Admin_institution" DROP CONSTRAINT "Admin_institution_pkey";
       public            postgres    false    211            �           2606    21759 6   Admin_userinstitutionmap Admin_userinstitutionmap_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutionmap_pkey" PRIMARY KEY ("Id");
 d   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutionmap_pkey";
       public            postgres    false    213            �           2606    21761 2   instituteadmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    215            �           2606    21763 9   instituteadmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 e   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    215            �           2606    21765 @   teacher_announcements_to_list Teacher_announcements_To_List_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_List_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_List_pkey";
       public            postgres    false    217            �           2606    21767 ]   teacher_announcements_to_list Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq" UNIQUE (announcements_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq";
       public            postgres    false    217    217            �           2606    21769 0   teacher_announcements Teacher_announcements_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT "Teacher_announcements_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT "Teacher_announcements_pkey";
       public            postgres    false    219            �           2606    21771 "   Teacher_answer Teacher_answer_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_pkey";
       public            postgres    false    221            �           2606    21773 *   Teacher_assignment Teacher_assignment_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_pkey" PRIMARY KEY ("Assignment_id");
 X   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_pkey";
       public            postgres    false    223            �           2606    21775 6   Teacher_assignmentupload Teacher_assignmentupload_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentupload_pkey" PRIMARY KEY ("AssignmentUpload_id");
 d   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentupload_pkey";
       public            postgres    false    225            �           2606    21777 .   teacher_category Teacher_category_category_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 Z   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    227            �           2606    21779 &   teacher_category Teacher_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    227            �           2606    21781 Z   teacher_course_assigntoteacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    229    229            �           2606    21783 B   teacher_course_assigntoteacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    229            �           2606    21785 Z   teacher_course_departmentid Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    233    233            �           2606    21787 <   teacher_course_departmentid Teacher_course_DepartmentId_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    233            �           2606    21789 Z   teacher_course_enrolltostudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    235    235            �           2606    21791 B   teacher_course_enrolltostudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    235            �           2606    21793 \   teacher_course_institutionid Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    237    237                       2606    21795 >   teacher_course_institutionid Teacher_course_InstitutionId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    237            �           2606    21797 "   teacher_course Teacher_course_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT "Teacher_course_pkey" PRIMARY KEY (courseid);
 N   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT "Teacher_course_pkey";
       public            postgres    false    231                       2606    21799 6   Teacher_courseassessment Teacher_courseassessment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassessment_pkey" PRIMARY KEY ("CourseAssessmentId");
 d   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassessment_pkey";
       public            postgres    false    239            	           2606    21801 :   Teacher_courseregistration Teacher_courseregistration_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregistration_pkey" PRIMARY KEY ("CourseRegistrationId");
 h   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregistration_pkey";
       public            postgres    false    240                       2606    21803 2   Teacher_coursesyllabus Teacher_coursesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllabus_pkey";
       public            postgres    false    241                       2606    21805 (   Teacher_csvupload Teacher_csvupload_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_pkey";
       public            postgres    false    243                       2606    21807 E   Teacher_email_BCC Teacher_email_BCC_email_id_profile_id_79a54781_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq" UNIQUE (email_id, profile_id);
 s   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq";
       public            postgres    false    245    245                       2606    21809 (   Teacher_email_BCC Teacher_email_BCC_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_pkey";
       public            postgres    false    245                       2606    21811 C   Teacher_email_CC Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq" UNIQUE (email_id, profile_id);
 q   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq";
       public            postgres    false    247    247                       2606    21813 &   Teacher_email_CC Teacher_email_CC_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_pkey";
       public            postgres    false    247            #           2606    21815 O   Teacher_email_Email_To Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq" UNIQUE (email_id, profile_id);
 }   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq";
       public            postgres    false    251    251            %           2606    21817 2   Teacher_email_Email_To Teacher_email_Email_To_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_pkey";
       public            postgres    false    251                       2606    21819     teacher_email Teacher_email_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY (emailid);
 L   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    249            )           2606    21821 "   Teacher_folder Teacher_folder_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_pkey" PRIMARY KEY ("FolderId");
 P   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_pkey";
       public            postgres    false    253            +           2606    21823 "   teacher_module Teacher_module_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY (moduleid);
 N   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    255            0           2606    21825 *   teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    257            3           2606    21827 8   Teacher_modulefilecontent Teacher_modulefilecontent_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefilecontent_pkey" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefilecontent_pkey";
       public            postgres    false    259            6           2606    21829 2   Teacher_modulesyllabus Teacher_modulesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllabus_pkey";
       public            postgres    false    261            8           2606    21831 &   Teacher_progress Teacher_progress_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_pkey";
       public            postgres    false    263            :           2606    21833 -   Teacher_progress Teacher_progress_user_id_key 
   CONSTRAINT     o   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_key" UNIQUE (user_id);
 [   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_key";
       public            postgres    false    263            ?           2606    21835    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    265            E           2606    21837 $   Teacher_sitting Teacher_sitting_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_pkey";
       public            postgres    false    267            K           2606    21839 @   Teacher_studentcourseprogress Teacher_studentcourseprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcourseprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcourseprogress_pkey";
       public            postgres    false    269            P           2606    21841 H   Teacher_studentmodulefileprogress Teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodulefileprogress_pkey" PRIMARY KEY (id);
 v   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodulefileprogress_pkey";
       public            postgres    false    271            T           2606    21843 @   Teacher_studentmoduleprogress Teacher_studentmoduleprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmoduleprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmoduleprogress_pkey";
       public            postgres    false    273            X           2606    21845 <   Teacher_studentquizprogress Teacher_studentquizprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizprogress_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizprogress_pkey";
       public            postgres    false    275            \           2606    21847     Teacher_units Teacher_units_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_pkey" PRIMARY KEY ("UnitId");
 N   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_pkey";
       public            postgres    false    277            ^           2606    21849     accesscontrol accesscontrol_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_pkey;
       public            postgres    false    279            `           2606    21851 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    281            b           2606    21855 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    283            d           2606    21857    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    285            i           2606    21859    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    287            n           2606    21861 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public            postgres    false    289    289            q           2606    21863 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    289            k           2606    21865    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    287            t           2606    21867 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public            postgres    false    291    291            v           2606    21869 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    291            ~           2606    21871 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    294            �           2606    21873 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    294    294            x           2606    21875    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    293            �           2606    21877 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    297            �           2606    21879 Y   auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
       public            postgres    false    297    297            {           2606    21881     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public            postgres    false    293            �           2606    21883    demotest2 demotest2_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.demotest2
    ADD CONSTRAINT demotest2_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.demotest2 DROP CONSTRAINT demotest2_pkey;
       public            postgres    false    300            �           2606    21885    demotest demotest_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.demotest
    ADD CONSTRAINT demotest_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.demotest DROP CONSTRAINT demotest_pkey;
       public            postgres    false    299            �           2606    21887 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public            postgres    false    303            �           2606    21889 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public            postgres    false    305    305            �           2606    21891 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public            postgres    false    305            �           2606    21893 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public            postgres    false    307            �           2606    21895 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public            postgres    false    309            �           2606    21897 "   teacher_answer teacher_answer_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_pkey;
       public            postgres    false    310            �           2606    21899 2   teacher_coursesyllabus teacher_coursesyllabus_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_coursesyllabus
    ADD CONSTRAINT teacher_coursesyllabus_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_coursesyllabus DROP CONSTRAINT teacher_coursesyllabus_pkey;
       public            postgres    false    312                        2606    21901 %   teacher_email teacher_email_title_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_title_key UNIQUE (title);
 O   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_title_key;
       public            postgres    false    249            -           2606    21903 &   teacher_module teacher_module_name_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module_name_key UNIQUE (name);
 P   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module_name_key;
       public            postgres    false    255            �           2606    21905 &   teacher_question teacher_question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_pkey;
       public            postgres    false    314            C           2606    21907 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    265            �           2606    21909 @   teacher_studentcourseprogress teacher_studentcourseprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentcourseprogress
    ADD CONSTRAINT teacher_studentcourseprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentcourseprogress DROP CONSTRAINT teacher_studentcourseprogress_pkey;
       public            postgres    false    316            �           2606    21911 H   teacher_studentmodulefileprogress teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_studentmodulefileprogress
    ADD CONSTRAINT teacher_studentmodulefileprogress_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.teacher_studentmodulefileprogress DROP CONSTRAINT teacher_studentmodulefileprogress_pkey;
       public            postgres    false    318            �           2606    21913 @   teacher_studentmoduleprogress teacher_studentmoduleprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_studentmoduleprogress
    ADD CONSTRAINT teacher_studentmoduleprogress_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_studentmoduleprogress DROP CONSTRAINT teacher_studentmoduleprogress_pkey;
       public            postgres    false    320            �           2606    21915 <   teacher_studentquizprogress teacher_studentquizprogress_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.teacher_studentquizprogress
    ADD CONSTRAINT teacher_studentquizprogress_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.teacher_studentquizprogress DROP CONSTRAINT teacher_studentquizprogress_pkey;
       public            postgres    false    322            �           2606    21917 8   teacher_studentquizresult teacher_studentquizresult_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.teacher_studentquizresult
    ADD CONSTRAINT teacher_studentquizresult_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.teacher_studentquizresult DROP CONSTRAINT teacher_studentquizresult_pkey;
       public            postgres    false    324            �           2606    21919    test test_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.test DROP CONSTRAINT test_pkey;
       public            postgres    false    326            f           2606    21921 '   admin_role uk_oaw6skshjf4fahwf7ot87lb8i 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i;
       public            postgres    false    285            �           1259    21922 *   Admin_department_InstitutionId_id_3ace7e32    INDEX     y   CREATE INDEX "Admin_department_InstitutionId_id_3ace7e32" ON public."Admin_department" USING btree ("InstitutionId_id");
 @   DROP INDEX public."Admin_department_InstitutionId_id_3ace7e32";
       public            postgres    false    209            �           1259    21923 2   Admin_userinstitutionmap_InstitutionId_id_8c9feb65    INDEX     �   CREATE INDEX "Admin_userinstitutionmap_InstitutionId_id_8c9feb65" ON public."Admin_userinstitutionmap" USING btree ("InstitutionId_id");
 H   DROP INDEX public."Admin_userinstitutionmap_InstitutionId_id_8c9feb65";
       public            postgres    false    213            �           1259    21924 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     �   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public.instituteadmin_profile USING btree (institutionid_id);
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    215            �           1259    21925 7   Teacher_announcements_To_List_announcements_id_cc6864cc    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_announcements_id_cc6864cc" ON public.teacher_announcements_to_list USING btree (announcements_id);
 M   DROP INDEX public."Teacher_announcements_To_List_announcements_id_cc6864cc";
       public            postgres    false    217            �           1259    21926 1   Teacher_announcements_To_List_profile_id_f1306085    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_profile_id_f1306085" ON public.teacher_announcements_to_list USING btree (profile_id);
 G   DROP INDEX public."Teacher_announcements_To_List_profile_id_f1306085";
       public            postgres    false    217            �           1259    21927 !   Teacher_answer_QuizId_id_8a8f554b    INDEX     g   CREATE INDEX "Teacher_answer_QuizId_id_8a8f554b" ON public."Teacher_answer" USING btree ("QuizId_id");
 7   DROP INDEX public."Teacher_answer_QuizId_id_8a8f554b";
       public            postgres    false    221            �           1259    21928 '   Teacher_assignment_ModuleId_id_10a5fe63    INDEX     s   CREATE INDEX "Teacher_assignment_ModuleId_id_10a5fe63" ON public."Teacher_assignment" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_assignment_ModuleId_id_10a5fe63";
       public            postgres    false    223            �           1259    21929 1   Teacher_assignmentupload_AssignmentId_id_a4c12c1c    INDEX     �   CREATE INDEX "Teacher_assignmentupload_AssignmentId_id_a4c12c1c" ON public."Teacher_assignmentupload" USING btree ("AssignmentId_id");
 G   DROP INDEX public."Teacher_assignmentupload_AssignmentId_id_a4c12c1c";
       public            postgres    false    225            �           1259    21930 '   Teacher_category_category_2d59e72d_like    INDEX     ~   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public.teacher_category USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    227            �           1259    21931 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public.teacher_course_assigntoteacher USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    229            �           1259    21932 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public.teacher_course_assigntoteacher USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    229            �           1259    21933 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX     }   CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public.teacher_course_departmentid USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    233            �           1259    21934 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     �   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public.teacher_course_departmentid USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    233            �           1259    21935 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public.teacher_course_enrolltostudent USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    235            �           1259    21936 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public.teacher_course_enrolltostudent USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    235            �           1259    21937 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX        CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public.teacher_course_institutionid USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    237                        1259    21938 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public.teacher_course_institutionid USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    237                       1259    21939 -   Teacher_courseassessment_CourseId_id_893c01bd    INDEX        CREATE INDEX "Teacher_courseassessment_CourseId_id_893c01bd" ON public."Teacher_courseassessment" USING btree ("CourseId_id");
 C   DROP INDEX public."Teacher_courseassessment_CourseId_id_893c01bd";
       public            postgres    false    239                       1259    21940 /   Teacher_courseregistration_CourseId_id_9e1bb196    INDEX     �   CREATE INDEX "Teacher_courseregistration_CourseId_id_9e1bb196" ON public."Teacher_courseregistration" USING btree ("CourseId_id");
 E   DROP INDEX public."Teacher_courseregistration_CourseId_id_9e1bb196";
       public            postgres    false    240                       1259    21941 +   Teacher_courseregistration_Name_id_92c9d933    INDEX     {   CREATE INDEX "Teacher_courseregistration_Name_id_92c9d933" ON public."Teacher_courseregistration" USING btree ("Name_id");
 A   DROP INDEX public."Teacher_courseregistration_Name_id_92c9d933";
       public            postgres    false    240            
           1259    21942 +   Teacher_coursesyllabus_courseId_id_6d1f2a8b    INDEX     {   CREATE INDEX "Teacher_coursesyllabus_courseId_id_6d1f2a8b" ON public."Teacher_coursesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_coursesyllabus_courseId_id_6d1f2a8b";
       public            postgres    false    241                       1259    21943 "   Teacher_csvupload_user_id_42769c97    INDEX     g   CREATE INDEX "Teacher_csvupload_user_id_42769c97" ON public."Teacher_csvupload" USING btree (user_id);
 8   DROP INDEX public."Teacher_csvupload_user_id_42769c97";
       public            postgres    false    243                       1259    21944 #   Teacher_email_BCC_email_id_5ed1e5b8    INDEX     i   CREATE INDEX "Teacher_email_BCC_email_id_5ed1e5b8" ON public."Teacher_email_BCC" USING btree (email_id);
 9   DROP INDEX public."Teacher_email_BCC_email_id_5ed1e5b8";
       public            postgres    false    245                       1259    21945 %   Teacher_email_BCC_profile_id_bde0e3ff    INDEX     m   CREATE INDEX "Teacher_email_BCC_profile_id_bde0e3ff" ON public."Teacher_email_BCC" USING btree (profile_id);
 ;   DROP INDEX public."Teacher_email_BCC_profile_id_bde0e3ff";
       public            postgres    false    245                       1259    21946 "   Teacher_email_CC_email_id_a52b181b    INDEX     g   CREATE INDEX "Teacher_email_CC_email_id_a52b181b" ON public."Teacher_email_CC" USING btree (email_id);
 8   DROP INDEX public."Teacher_email_CC_email_id_a52b181b";
       public            postgres    false    247                       1259    21947 $   Teacher_email_CC_profile_id_8a708682    INDEX     k   CREATE INDEX "Teacher_email_CC_profile_id_8a708682" ON public."Teacher_email_CC" USING btree (profile_id);
 :   DROP INDEX public."Teacher_email_CC_profile_id_8a708682";
       public            postgres    false    247                       1259    21948 $   Teacher_email_Email_From_id_acc54e41    INDEX     i   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public.teacher_email USING btree (email_from_id);
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    249            !           1259    21949 (   Teacher_email_Email_To_email_id_789297dd    INDEX     s   CREATE INDEX "Teacher_email_Email_To_email_id_789297dd" ON public."Teacher_email_Email_To" USING btree (email_id);
 >   DROP INDEX public."Teacher_email_Email_To_email_id_789297dd";
       public            postgres    false    251            &           1259    21950 *   Teacher_email_Email_To_profile_id_4ade4937    INDEX     w   CREATE INDEX "Teacher_email_Email_To_profile_id_4ade4937" ON public."Teacher_email_Email_To" USING btree (profile_id);
 @   DROP INDEX public."Teacher_email_Email_To_profile_id_4ade4937";
       public            postgres    false    251            '           1259    21951 !   Teacher_folder_UserId_id_25ea40b7    INDEX     g   CREATE INDEX "Teacher_folder_UserId_id_25ea40b7" ON public."Teacher_folder" USING btree ("UserId_id");
 7   DROP INDEX public."Teacher_folder_UserId_id_25ea40b7";
       public            postgres    false    253            .           1259    21952 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     o   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public.teacher_modulefile USING btree (moduleid_id);
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    257            1           1259    21953 2   Teacher_modulefilecontent_ModuleFileId_id_72056622    INDEX     �   CREATE INDEX "Teacher_modulefilecontent_ModuleFileId_id_72056622" ON public."Teacher_modulefilecontent" USING btree ("ModuleFileId_id");
 H   DROP INDEX public."Teacher_modulefilecontent_ModuleFileId_id_72056622";
       public            postgres    false    259            4           1259    21954 +   Teacher_modulesyllabus_courseId_id_05c97e90    INDEX     {   CREATE INDEX "Teacher_modulesyllabus_courseId_id_05c97e90" ON public."Teacher_modulesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_modulesyllabus_courseId_id_05c97e90";
       public            postgres    false    261            ;           1259    21955 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    265            <           1259    21956    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    265            =           1259    21957 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    265            @           1259    21958    Teacher_quiz_url_fda39535    INDEX     S   CREATE INDEX "Teacher_quiz_url_fda39535" ON public.teacher_quiz USING btree (url);
 /   DROP INDEX public."Teacher_quiz_url_fda39535";
       public            postgres    false    265            A           1259    21959    Teacher_quiz_url_fda39535_like    INDEX     l   CREATE INDEX "Teacher_quiz_url_fda39535_like" ON public.teacher_quiz USING btree (url varchar_pattern_ops);
 4   DROP INDEX public."Teacher_quiz_url_fda39535_like";
       public            postgres    false    265            F           1259    21960     Teacher_sitting_quiz_id_280a1446    INDEX     c   CREATE INDEX "Teacher_sitting_quiz_id_280a1446" ON public."Teacher_sitting" USING btree (quiz_id);
 6   DROP INDEX public."Teacher_sitting_quiz_id_280a1446";
       public            postgres    false    267            G           1259    21961     Teacher_sitting_user_id_a53fd1db    INDEX     c   CREATE INDEX "Teacher_sitting_user_id_a53fd1db" ON public."Teacher_sitting" USING btree (user_id);
 6   DROP INDEX public."Teacher_sitting_user_id_a53fd1db";
       public            postgres    false    267            H           1259    21962 2   Teacher_studentcourseprogress_CourseId_id_fe404be7    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_CourseId_id_fe404be7" ON public."Teacher_studentcourseprogress" USING btree ("CourseId_id");
 H   DROP INDEX public."Teacher_studentcourseprogress_CourseId_id_fe404be7";
       public            postgres    false    269            I           1259    21963 3   Teacher_studentcourseprogress_StudentId_id_838739dd    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_StudentId_id_838739dd" ON public."Teacher_studentcourseprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentcourseprogress_StudentId_id_838739dd";
       public            postgres    false    269            L           1259    21964 4   Teacher_studentmodulefileprogress_FileId_id_e2bc8595    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_FileId_id_e2bc8595" ON public."Teacher_studentmodulefileprogress" USING btree ("FileId_id");
 J   DROP INDEX public."Teacher_studentmodulefileprogress_FileId_id_e2bc8595";
       public            postgres    false    271            M           1259    21965 6   Teacher_studentmodulefileprogress_ModuleId_id_41c42264    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_ModuleId_id_41c42264" ON public."Teacher_studentmodulefileprogress" USING btree ("ModuleId_id");
 L   DROP INDEX public."Teacher_studentmodulefileprogress_ModuleId_id_41c42264";
       public            postgres    false    271            N           1259    21966 7   Teacher_studentmodulefileprogress_StudentId_id_12135e51    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_StudentId_id_12135e51" ON public."Teacher_studentmodulefileprogress" USING btree ("StudentId_id");
 M   DROP INDEX public."Teacher_studentmodulefileprogress_StudentId_id_12135e51";
       public            postgres    false    271            Q           1259    21967 2   Teacher_studentmoduleprogress_ModuleId_id_c9fdad01    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_ModuleId_id_c9fdad01" ON public."Teacher_studentmoduleprogress" USING btree ("ModuleId_id");
 H   DROP INDEX public."Teacher_studentmoduleprogress_ModuleId_id_c9fdad01";
       public            postgres    false    273            R           1259    21968 3   Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae" ON public."Teacher_studentmoduleprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae";
       public            postgres    false    273            U           1259    21969 .   Teacher_studentquizprogress_QuizId_id_a04a2235    INDEX     �   CREATE INDEX "Teacher_studentquizprogress_QuizId_id_a04a2235" ON public."Teacher_studentquizprogress" USING btree ("QuizId_id");
 D   DROP INDEX public."Teacher_studentquizprogress_QuizId_id_a04a2235";
       public            postgres    false    275            V           1259    21970 1   Teacher_studentquizprogress_StudentId_id_4e5596d2    INDEX     �   CREATE INDEX "Teacher_studentquizprogress_StudentId_id_4e5596d2" ON public."Teacher_studentquizprogress" USING btree ("StudentId_id");
 G   DROP INDEX public."Teacher_studentquizprogress_StudentId_id_4e5596d2";
       public            postgres    false    275            Y           1259    21971 "   Teacher_units_CourseId_id_f67d8790    INDEX     i   CREATE INDEX "Teacher_units_CourseId_id_f67d8790" ON public."Teacher_units" USING btree ("CourseId_id");
 8   DROP INDEX public."Teacher_units_CourseId_id_f67d8790";
       public            postgres    false    277            Z           1259    21972 "   Teacher_units_ModuleId_id_14dc3af9    INDEX     i   CREATE INDEX "Teacher_units_ModuleId_id_14dc3af9" ON public."Teacher_units" USING btree ("ModuleId_id");
 8   DROP INDEX public."Teacher_units_ModuleId_id_14dc3af9";
       public            postgres    false    277            g           1259    21973    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    287            l           1259    21974 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public            postgres    false    289            o           1259    21975 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public            postgres    false    289            r           1259    21976 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public            postgres    false    291            |           1259    21977 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    294                       1259    21978 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    294            �           1259    21979 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    297            �           1259    21980 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    297            y           1259    21981     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public            postgres    false    293            �           1259    21982 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public            postgres    false    303            �           1259    21983 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public            postgres    false    303            �           1259    21984 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public            postgres    false    309            �           1259    21985 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public            postgres    false    309            �           2606    21986 H   Admin_department Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 v   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins";
       public          postgres    false    209    211    3530            �           2606    21991 T   Admin_userinstitutionmap Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins";
       public          postgres    false    213    3530    211            �           2606    21996 R   instituteadmin_profile InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins" FOREIGN KEY (institutionid_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins";
       public          postgres    false    215    3682    283            �           2606    22001 N   instituteadmin_profile InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id";
       public          postgres    false    215    3704    293            �           2606    22016 G   Teacher_answer Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId";
       public          postgres    false    265    3647    221            �           2606    22021 G   Teacher_assignment Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m";
       public          postgres    false    255    223    3627            �           2606    22026 S   Teacher_assignmentupload Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a" FOREIGN KEY ("AssignmentId_id") REFERENCES public."Teacher_assignment"("Assignment_id") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a";
       public          postgres    false    223    225    3552            �           2606    22031 S   teacher_course_assigntoteacher Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c";
       public          postgres    false    229    231    3568            �           2606    22036 T   teacher_course_assigntoteacher Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute";
       public          postgres    false    215    229    3536            �           2606    22041 P   teacher_course_departmentid Teacher_course_Depar_course_id_e2919890_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c";
       public          postgres    false    231    3568    233            �           2606    22046 T   teacher_course_departmentid Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep" FOREIGN KEY (department_id) REFERENCES public.admin_department(departmentid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep";
       public          postgres    false    3680    233    281            �           2606    22051 S   teacher_course_enrolltostudent Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c";
       public          postgres    false    3568    231    235            �           2606    22056 T   teacher_course_enrolltostudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    235    3536    215            �           2606    22061 Q   teacher_course_institutionid Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c";
       public          postgres    false    231    237    3568            �           2606    22066 V   teacher_course_institutionid Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public.admin_institution(institutionid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    283    237    3682            �           2606    22071 O   Teacher_courseassessment Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c";
       public          postgres    false    3568    239    231            �           2606    22076 Q   Teacher_courseregistration Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c";
       public          postgres    false    231    240    3568            �           2606    22081 M   Teacher_courseregistration Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c" FOREIGN KEY ("Name_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c";
       public          postgres    false    240    231    3568            �           2606    22086 M   Teacher_coursesyllabus Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c";
       public          postgres    false    241    3568    231            �           2606    22091 D   Teacher_csvupload Teacher_csvupload_user_id_42769c97_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id";
       public          postgres    false    3704    293    243            �           2606    22096 N   Teacher_email_BCC Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId";
       public          postgres    false    245    249    3614            �           2606    22101 D   Teacher_email_BCC Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute";
       public          postgres    false    245    215    3536            �           2606    22106 L   Teacher_email_CC Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId";
       public          postgres    false    3614    249    247            �           2606    22111 B   Teacher_email_CC Teacher_email_CC_profile_id_8a708682_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute";
       public          postgres    false    247    215    3536            �           2606    22116 ?   teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY (email_from_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    3536    249    215            �           2606    22121 J   Teacher_email_Email_To Teacher_email_Email__email_id_789297dd_fk_Teacher_e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e";
       public          postgres    false    3614    249    251            �           2606    22126 L   Teacher_email_Email_To Teacher_email_Email__profile_id_4ade4937_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute";
       public          postgres    false    251    3536    215            �           2606    22131 M   Teacher_folder Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id" FOREIGN KEY ("UserId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id";
       public          postgres    false    215    3536    253            �           2606    22136 G   teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY (moduleid_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    257    3627    255            �           2606    22141 T   Teacher_modulefilecontent Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m" FOREIGN KEY ("ModuleFileId_id") REFERENCES public.teacher_modulefile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m";
       public          postgres    false    3632    259    257            �           2606    22146 M   Teacher_modulesyllabus Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m";
       public          postgres    false    3627    255    261            �           2606    22151 B   Teacher_progress Teacher_progress_user_id_dd1966fc_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id";
       public          postgres    false    3704    263    293            �           2606    22156 I   teacher_quiz Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId";
       public          postgres    false    3568    265    231            �           2606    22161 G   teacher_quiz Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId" FOREIGN KEY (module_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId";
       public          postgres    false    3627    265    255            �           2606    22166 E   teacher_quiz Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id";
       public          postgres    false    227    3560    265            �           2606    22171 G   Teacher_sitting Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId" FOREIGN KEY (quiz_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId";
       public          postgres    false    3647    267    265            �           2606    22176 @   Teacher_sitting Teacher_sitting_user_id_a53fd1db_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id";
       public          postgres    false    267    3704    293            �           2606    22181 T   Teacher_studentcourseprogress Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c";
       public          postgres    false    3568    269    231            �           2606    22186 U   Teacher_studentcourseprogress Teacher_studentcours_StudentId_id_838739dd_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute";
       public          postgres    false    3536    215    269            �           2606    22191 V   Teacher_studentmodulefileprogress Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m" FOREIGN KEY ("FileId_id") REFERENCES public.teacher_modulefile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m";
       public          postgres    false    271    257    3632            �           2606    22196 X   Teacher_studentmodulefileprogress Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m";
       public          postgres    false    271    255    3627            �           2606    22201 T   Teacher_studentmoduleprogress Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m";
       public          postgres    false    273    3627    255            �           2606    22206 Y   Teacher_studentmodulefileprogress Teacher_studentmodul_StudentId_id_12135e51_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute";
       public          postgres    false    215    3536    271            �           2606    22211 U   Teacher_studentmoduleprogress Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute";
       public          postgres    false    273    3536    215            �           2606    22216 P   Teacher_studentquizprogress Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q";
       public          postgres    false    265    275    3647            �           2606    22221 S   Teacher_studentquizprogress Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute";
       public          postgres    false    275    3536    215            �           2606    22226 K   Teacher_units Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId";
       public          postgres    false    3568    231    277            �           2606    22231 K   Teacher_units Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId";
       public          postgres    false    277    3627    255            �           2606    22236 4   admin_department admin_department_institutionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_institutionid_fkey FOREIGN KEY (institutionid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 ^   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_institutionid_fkey;
       public          postgres    false    281    283    3682            �           2606    22241 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public          postgres    false    291    3702    289            �           2606    22246 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public          postgres    false    287    289    3691            �           2606    22251 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public          postgres    false    291    305    3731            �           2606    22256 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    287    294    3691            �           2606    22261 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public          postgres    false    293    294    3704            �           2606    22266 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    3702    297    291            �           2606    22271 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    3704    297    293            �           2606    22276 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public          postgres    false    303    305    3731            �           2606    22281 B   django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
       public          postgres    false    3704    303    293            �           2606    22286 *   teacher_course fkg4ubhja82bo0jsn69qeqgm8b8    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8 FOREIGN KEY (instid) REFERENCES public.admin_institution(institutionid) NOT VALID;
 T   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT fkg4ubhja82bo0jsn69qeqgm8b8;
       public          postgres    false    231    283    3682            �           2606    22297 Q   teacher_announcements_to_list teacher_announcements_to_list_announcements_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_announcements_id_fkey FOREIGN KEY (announcements_id) REFERENCES public.teacher_announcements(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 {   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_announcements_id_fkey;
       public          postgres    false    219    217    3546            �           2606    22302 K   teacher_announcements_to_list teacher_announcements_to_list_profile_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 u   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_profile_id_fkey;
       public          postgres    false    3536    215    217            �           2606    22291    teacher_module teacher_module    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 G   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module;
       public          postgres    false    231    255    3568            u   O   x�+�4�t��/IM�����O��L��RRJ8Sr3�8���t�t�̭L,�M�-̍u̉Rc����� �<:      w   m   x�+�4�(��KN-��SN�����,�P�)��y�FFF�f�F
�V&�V�FzƆ�&ƺ�D���+.�,)-I�(�O��I�N.JM�+��/�7�+�K����� ��'      y      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x����� Fg���7�(�����R��$ZS}~��o���{� ǪٟR�Y�h��g�%����-7+��!iW��"�M@��88W�6������|`k���S.؀��,��xh�_ɫ��V�?(�W8�A8��������b[��x@"���pv���~�_�[*�f�5��7۲��@��N���2;�PU�iԄ�      �   �  x���]k�0���_����B_�?��,�.	�S�k+�G,��?%�������o��}���Mʦֈ�=�{4r)����y�V�Θ=������u�p�+���y�s�Q��
���R�E�<��gW�"f~�,���0_��NqAK�J�Ҙ�XP̈@Ӽy��RW�o�G]?��P��=U�������2^�u��^5�>��Tћ��D?�걵E�`�b��`M����������@	2��0�!�5�4z	w�-Ea�ﯕ��i^�c�k7F`P���5]	��9���C@�V&"P��;��&�}ޞ�Uaۧ;ӻC�����_z	nk�~�oi6�w�Fz$���C%��2�?+�V]1��<Iayp���l���%=�`a��H�yj�\����n�f���~$��I�]�}�M�ԽOo6�e�d��1�=E��|�h�X�2�ʎ���A)�q�?�S�H      �   �   x����
�0E����44Ik5߲������_�9�8y����i��m0�Y�g�b�4�F�T�f��s�]�d��� r~40F�_���g��e����9�RP�"��QcI�}�b���y�'���QI��دLe�5^�4l�q�k�yOpA x��S�      �      x������ � �      �      x������ � �      �   �  x�}�ͮ�6���S�	�e;�h�(�Oj �S�����+��HJ��b�;ʡBRr��k?�������aږϢ,����?��#��}P1h=xæAb����q���c��&8{�s\�q���[��Js
Dw��H�E����EEz�����2��z���)��ͣ/DJ���H�V�.p��:,E�MY���Y�z ������w��j���o�����j���5�w�Cǈ)��H�!�w�Wģ?�Wg��ޮb��z�Wm�a|2��wf�g�T�3��&r�!�* ���n�ou�Ĉ�T�k�)\��ѥ�E�kػU(g�2?����U9��h ��� D��7 �:ۥ�ӳ]�~1�&�Mj!��˓J��E���2�PW����6��e{�L.\k9�cU�i㒴�0Mc��E}iֻ�$WW��>'
��Z�Fѭ�U�i�JZ��f�[Ir�}���>�1�ljUt��HUo���HQj��f�N��}Y����Z�'ӜuW%$4T�J�K�
m�JvPb�y����o����x2�*0F�Q���B7D�raƻ!��9}����\S[�U� �RW&=ޞc�n���m�+J8u�q�M�������@C@���y�f9��i�֢���?�V�x ���;0��yhl0��n��8�w��2�w%�$8y�є��l+�S:�����+��[AT�[=��9�M�ǜay'�Y�׹�,�� ^���Bf��*m��5�^�+\���Q.�JuN�� x��O�%Y+�7z��'��,��$����v������K�ɎAo��r�`��Un�2K�=�W���ɬ��&^�N�%��ܑx�h�m�t/*8���\UW�G��l����MP��Ȟu8������Nÿ�s������HVۮ,�l�R����JL�c�H+�
�� ��~?��������Kt������V�Lpz���&0���_
��ǣ�kw��Ш���@j�!���9sK�:uS�2�.H��2M����knQ�э'�о��Hmrby��&$�ɍ��M�f$����m�����KQ�e�p��1���*#`M�c�ys��\�óE���U����3@h� Q��V��X����c�oE�7�S5�Qz?�*IM�{��EEj����=��=�W��RUdF�^nXW������Љ�̨���TqT�p�m�}#���L�8��D�U����D�U���I���"�H��Q�i�u����D�<�T�L�Z��U�k&Z�U�*m�D��"N��\��?e������V5��0�S#hU_�j��8�V���2��#踋�2�?\ǳp�����}0CQ��cd�0�0o�p��iާ��0슰Acb��M$�`S�j�#Q0�E�A$A�;����7��ta����j�����ȗ$Ea��G��1��*�      �   �  x���ݎ�6ǯ�S�X;N_�Niϖm�j9���7�b6������;��!��J�I�?���̌�)�$=θX0� 5�BK�Y@C�`�6�g?�Sy�^&���Ł��=� �i���~l6�4��x<�O4 �πqR�Si���ڛ9�l��Sv&���[�/��CxaT}2��(���`�t��~u�2)r�\/�|���1>�A�0{�nȧ�&�7���E�|�ؙ�ݙ9y޵`9,o<�H��J�>A �3��l@�*1� i��ُO���q[����x�q
G���?�Q̃M�dl$����䛳!�om�`�S�92@�e�oHb���������V��O�Ci�zi�b�q!1�Q�q�RF��7d�Hu*m�gz-Y��٤�!�/�`2tY��B� !cS|ٲ�d�%8Y�k�豱o�h���+_3�R7��Y��~/@PF���܇]���j�c#�ݏOE���}�.�!V�Y/jS���fK0`蘪�j���,�R�(l^�"��3Y���ٲ�k���h(���"�_��	w��W�߱��R0�dg�<�"��zQ�T�:�w�.�Hq�[a@U�C�$壤uQ���W%g�X�7U�_<xد�n�a��m!:�-@X1vk^,V��j���ӿ����`;j8�52�b1E���Ѓ)S��ݍ����C��+D T�� ��@�?g�uY��{Q�5�S}��Rn�eGt�RK����#b|���)�������!���1&@�h�͜�~����mpQ?�q7��ǰ��b�
SMq�9gEI��f�O�=6s}�j�3Ѐ�� g<�sw���Ϊ6�R��j���];��9�=��oD]�_�N"��Y�<o��
�����;�L �}#�]�
�N��h��О�y��}����(�z�A�9PՕ��ϑ�y�����d���x�|��k@U3�P�M��~���}$P�:ŷ{߂P#� *Y�9[�:���bJ�7s:��[p��A]�%��Eg����ɇ      �      x������ � �      �      x������ � �      �      x��I��7��ǩŔ�o6�V��ò7zV˯�qI�ɤD)͊FY2%����7@�����?�������.M]��9W���ׂ�᜾K��y��;�O9��B�)�[NM%����T{u%טw8��]Vp#��xv֬Y�����Ӛ��@��vW�'���^3 2-�[XՇ0��g��z\e���������;�J��2b�އu��3���5C9e��Bk�̙�[m6��r9��g�ᮼ�Y@����j�#�s������|�m��'Xت�u�bJ��4��4�}�����c�\�ߗ;w���c��W�s����e�c�W}GϷ6ݩ��C�3�O�g�K�J�s/_j�g�J�c�%�0;�1zMs����ŕ��>ѵ�����ξ���'VҎɏFo�&=��e�9oU��:��N�7ew����-߰5�5|;l�G�m���ؑ�_�n���<bZk^�Bp{��^ݯ�����9�˽ա-���:n��#�;#5Z�gTF��a�g�RW9�l�*���v�O��?}��$Im�E��Tw�gB��8�<��əK�s}/��K��ݥ�%�e�I0��񦏟��)�M��-o����\r��?[v�f�ڧFvi���8�s�x�潻rfH�V@�%�J�I}/wgn{�@��̮~y�A�]L�޹�k���#I�Ղ�����S�!�R��d�zG�5;p7�J�I����_��Z6)�J辶Q{h���nc�6��i��/�/����-�/s�}$��d��;��ܓv���p�@w�B�g�i��5��΀	�>�ݵ�(Ow\��W��C�>�e��Ȼ�S�X�g���t�J�%t�8�*ٝ�[t"	���|���{:��!������DR� ��������8d����c2bdX��w����dǈ��sm�$a�>��~|��mn�Ee����zk��(w�ؼ��4�vu n��p��E�=o���A������x����ET�1���4�:/:�^�0���i�n>�+(b��tkO33��oc@�F_�H(Cx��D�,�ux�����\����'?q\��x�$E���r����x 0��0re�K��A}�'v����kL�	!1n���(�ۄB�D�����[u�i���~l%�����n3�Y&�L�D�4�>A�A���9�,:S�W(j��G\��[��n���Sn�!��UXQ�n���`�"��ʚ����A��M��1��'ȺSGHd;��5�L��~|�5^����ى 涒#|��3C��V} n�Q=c3SR/�ySϕT'f��X'�v'�t�S�����BK�b�2��]"�p����je��s@�GZF����?q�Xs�:�\[��BOU^�A��_n��<S�����T��^&}���'7 ����L�-��	T��6��*1�v�0`��ɷ���p��+\�A� �l�Xk̽���Z�t�"a�O&q���2ҟ́?��RGs�~�[JgE�b�~�=P�X�%���@d�|��=]����7$��! �;@�@_�r��ԏ .���I(x;=�,Cr��'��F�{&:����Q���d+�(�����ٙքq��2����zflT���Hp�A�f�����6D��r�i�o�x�� �O@�D��f�S8	�)��Th�/� �Z�L��}�����nv�ŲN�ָ-��#���K�`m4�m�EI@l4>:ߣ�*3��K"�H��e �ߎ�ɀ �n=�ϴ'_�yPn�x.�`���H�~8mk��l��s�n�.R����t0a>j��#Q,�dj��Se��J��\�{J�0�	 \li����®�6bR�p�G�(ˡ��\$� /�ې�P%��x�a�Z�\�1fCu3-va<!렿/��H�����G!G�<����߮�������JP�pȲ�Ɠț��?�."�0����!��,���|&m>�)��3@�),?���G&�R��^V�7��?)6���Z��|K�}.ej���@ ��V V(�QB9"?�	���E�E�@��N�V@��k@��)u��[{����R!Pw��d��&��;8�c��}E9��ě�i!U0"z���3h���<ך�9�� tnZ 3�:���I715C+�Z��Dȷ�{�ƾ&\(5�M�
4��I��8��vsgO�,U\�ܦ2�7$��ҵ�����;�9�md'�9X)J������G$��~��d�A?���bJ��z�V�H7<�����Ā�ŏ�P
Z�J��	�$���k���3 �O�#���}�O��W��.�s�,�䧿�M��5}u���>QҀ�\20��|�.�iȅ��� i6i�� ~O��P���{ z@��A�"U��F���A^�v$�� �Br�50	�#`n�Y�M����
�6"l&�D�[U� H�27mi��J#�S7��������Ėb(A��|�EU�G��79�`�q�'-��9P�N�Nv���,
 ���I��GF�w��ݺ$/H��N� iy󤺳�A;$��ܼ�b�d�c�68q�T[��%�)����N?� e��B(��:|�x��Z�
�|o�:�1N/���.C�/Z�'ػ�!dR$r�]�w�#[���C�	�Cf����m�$�+�;a�@�A �x�f	�ՠ�V�!�L��+�j5B��P&���	@
���C�K]��X|���2��p-��᥇ɫ�=����!Bxz&4�Š�c@�/���Ⱥ�ھ��C|�9��c�ց~�z�A�B�k=h����(t8�M�ж���#i�ӡ��?��
t�/��N@&Q?�*5I����@�K�w�?��1A�W^��"H��`&���T��\_ ǯ"D�ۿ�z0���0h/�Ÿ����G��D��Q]E�u���:���L*�G0�b̉Ζ��������Mf��1c�|���T�J�����
����|��Xo��J�mn���L|%�����ndi�n�Y߀�r�7h!tU�%J�u �6] ���N|Hv���'��W�:#���`9����Z�:d�vb�TG�9�Z��*iB�Y�)ct������ ���.��M��~����}#���D3Z�B6{i$b��I�u�st�k�FA~���@�D�v��|�ny���.��sS:�!�t�ys'~��yp�&&���@I���w4��P�$j8��ɴ5�wr��G�B��$����&����A�O"2"J�fp��E��m�Ȁdσ��"�>w<�D<�L����e��A�vu�<�G,�����:u�_"�ewmN��"պ7��Y�O/�
A�4�5�� �1`$��?�8T��Id�+	<?��"�U�'��80�d~Wr@�3�
�����
�驲�r�Z$si�!C@���Ef���Ջ�Sw���R�%7O��A�c�@n+eN�vt}{b9	r$�4�Խ����ݢ��yᚠ'y��!�����}5�~ǌ��b��p��wB|���u` �]�*dM#�����$x��� č�x����hD����ԉ����R���JP��W���|*�p$��d��L���G̷���p-z�=OB�g������µ�cU�a��Ͽ1,�X_���u��=_�`B���87�ۤ��7:�qaX���K�qw�m��k�W�'�mu+����|XR�'?�HD{���s�8���2wɟ��iC�U]W0�K��TrI ����� �rWf��{�y��@���[�ݝ���'y�\?�:ڄ �����0si����v?��@yw_(�Z�K�s>�]���*�>�#�TI~B�d���*_[�$���P3�� U��~X�i�u��B����Nh/��K�C�����Z�#G��|жt����5�y ��B�D�1u�gh�.�gr9t��u�6�YB���1
e�/j�BƜ`����A!ſ��5H5.��o����9`R�B�;/1��V�* ��0'���q����	W    E �y�$�8�'�m3�V�2�I)��f��f���:耴�Q���6xԦQ!�@"l(�iiK �
1i�pϛ�L�!| ��I��kZ:�_�e.
�1����e!���2ڗ����2�A��Itd��3��5����o��*�L,�\���#���V7��/����B&2�## �YZH�ЦtQ�b���+�����1��M�R�p0=�]\iv�L�Q�d��J$���v~��ŭ��i��Ѝ���	�Iȥdq	Vq����q���`*Z?H����@�ˀy�NU;p�<�
Uw�+��0Q� Îx-�Բ�&H��� �24 2���X��S�m���/���ַ�L��Q=�4D�:1�x�2�MP=����8S0Gf���˘s���Y~޲�v+x}7�R���;�
-�<�YT���ڮI}!xɾ�:֊��I�%����@��Ȇ�ƒ�=ZԅĀ^`�yz:A�CeH�O�r@a��TG��!1�@
d�nļ����p9-v0F�Wa|�.��@�N�@iv�l��.�?6S�)p���$J�"r��������OF��--O%.fu`���8u�5�/�#�7U��A�U &���=� �V���&Q��YC�%^��R���S|���0h�sej:��>K�t#&�%M���=*|���pܚ���("���W!~k]O#i�5����a�\\��� ��A�5`���iW��n0#��$�,�D�k�� 3�$|��	�0��I�-�lU��$n�h&�I=zy E#�<ݪ��6 �`�lh�I"��'���אn�p#�.�
#r�S�vIa(B��[�"��������124
�w��y�b��ڼ�T�t�V:��@�1������#�Z�Y��A�������\
R	#"�p�1	�Z7t��Ɏn0������c!�x�a�L7 ɰU�M���	��L���r����k-"�G^r�^/�FCCr���h{�t$�m'�<�}@wU�\�� [�Տ�F�B:�2?I\���&��\���B^�5�#Ѥi�=�˵;������j���/�r`��?!ODޢ܊�ȭ&�+qy�M/�Z�W�O�o�0���m�24����¥\�gO`0$�K�!��u����	2F2�/L_��;��iF�h��b4;ĩ��������fRB%�26Aʄ����)��҈����SZ�Jza9�E}Bjraҵɋ��_�?�(�I1��	����KĈ�P�_��`H�!�P�;-�md2?��3<��[��f�K:A��ƌ��.�?��q�#��6YS2[KhA(�v�Sr������=!�~s*s��℆'�1(RtI} ��u"�~g�����_̬  ���������!�.�4�ȗ���b���l�媄A��Ѝ�87դ�V#"E,�TC߃cHU��!����0ع�4� ^u�h�%A��r�h�Y��޴��.�ĺ��(�5'rq��o��'�#l�DFd�`A^PaF�Y;C� ���Ze�<�Q�D'�Ť��U�����9���_Qe��B!���h�JLЫ�#X�js�,�'��Ԣ; utC���,����D85�DB����/���e�F�A�6!�pF%�Ly��"�O@1�*�0c�B�����\K{���Cs���Blw�V�ϙ����[K�nu��̴u�LaAT�#i��E����#�U��8�6�y��Vȗ���-*j���乂�������t^�d�D�է�t_�_m�v�uߟ��ҫ
B�i��ґ�ß�.��8�'q^�pn�0� �a�����+����@��W��
S�A�U:m��:����U�z�<�G�׀W:�i��y +�;&���`��|j[�OĈ���F��,L�Y{����{���������|b�ސڼZܷ��.������1�Ă�g^�11TB6	�4���Ԭk��o���6ut�f	���i���2��V;�U�0�)B�m��c�	L��R�"N2/A�!KU	�u{d]WU�!;
J<$:e��9zo�E�s�����Q=��P|�������Յ�z��v�J��M�o-iD	�oB�y����H �A:�J��Eߣr���#�vO ����!8s�n��IȌ
�+�
�h�	�-���@�&-�.������+}��Zm\"��֘�FR�$���D&T��9���!E�� Q7Ю�wu�Eؽr9%iWD�7!s���ʠ��X4��EP��h ����&F��X.��%Qdߔ8�>��D�a2��C
��BF���ಈ%����/u��!Ln�<�������JPD����������KW��"�22�~b� QGg�Tg"����_2+�j�N��2"emh-�:��ZP}-Pv;�+���+ӯ�bEn��&m1�$�����'\m�Zɳp!&RQEs]�l�{-dn�Et&̗��SatS�B���h��H���b�W�!S�����bR�]G?̠��Zx�#�t
L>ت�Lp@&'��$��+��[��i*��ʀ��\�Wt��&IRf����oXM�'�����(�p�AUdq���our��'8ɣLj�6����I��-���'�Fȣ̠^]́H��3N�h�\t[�U{h� FU�����b��=`��i9�iK�RF1X+\0���/r\���A� s�0Fd�'�g��/�A-@�F%+����L��
��܅^�Ẉ%���'�s�� ����tz�I ��5�vڪ�S��;�C��P���D[C0��œ��L��NU�<SQ�!�̫ �N;9zJdIy���N��1�K��В���!�k�RM��Z�$����)���P�>:�C�d‮� �p�AJ ��F�kߦ�B E6��f��=,��9�N���u�A�[�jQ�v�:c�6ɋ)YWҶ#h��C`od��%c���t:�4T�IC�E;�q�Q���3e�CF@[%0^�#�Xۓ���.��
рR$<�X�ag�q�a@�$�����*R$e��b�zJ�+L�+ڳ~�B��s9$T�������G���&.�ĝ�r�ɀ�����N�Zŗ�ךV�>�`���_O0֭
c��Ga����!�DrR�SLrAa��m�v� ��a���"��+�$o�� ?�U|B0�Q/�iJ�4I���206_�.�@Y���o1i�~\ဳi�P�\CKÙ���H8p���]��(6 P%�'����U��j�G��*I��� Po�ZQ=�6�Ѩ��Ff��{o	|�dPT�w�� h!'TX�d�@�eAղV3xt:������ݠɪ	n�	���P)C��9���H����a�CR �yʕ��Z����0A�(r	Ntؤ���G�6o,:ѱU�\������a�ॼ$�^�Q�X7������qxd�Ȅ�i��eP��ւ�n���D5Ut�T�ҥ��Դ�*4��X��X�D����!�5>���홾�|a��P��7Z���~���wQ��Rj~��s���PG#�E"F�LQu���A��*���
�g.�{����U��[+�i�U��3���Nb�������Z��6��\�#�g�>�1�44�
���е?����S@ө,��S&�kms���O�3X6S��A����E���I�c��%F����-�Ѡt	E��l�Y.^�DGwF��8W���f��R�+I�.ZX'ܶ�"�-��:�������F�>�|V����U'��4�%��9 ��Y����G�(�G���F�fy�#h-QpA�W�h���B�݄�#�TK�;0���P,\S��1��΅��� A~��Q��KU:��+�?&�8U@�X��9��F|Et�L��_�3��%P�_w�S54���Z:YuP�pܵj�U�K!#_tt��F��V}��wO�*�l���j�jiš��%M�}CEi#������T���q���ꑿ����V��xF���y���>���;~�,�<�j��9�����~�N��ow�k�B��<߫�f��Ͽ    ���+ȿ�,߫��VE��Y�Sa��'��J��I�}��X���{g��c�>V�����w�����i%��/�ת�Š?b���N��w��/��;�׽��O�:K��W�~�~	fCe͚��̆�l�̆�l��Y��u3*��2*��2*��2*��2*����37��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*k�f6TfCe6T?z�Y����P���Pi&���P���P��_���fCe͚��̆�l�̆�l��Y��u3*��2*��2*��2*��2*����37��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*k�f6TfCe6T?z�Y����P���Pi&���P���P��_��JfCe͚��̆�l�̆�l��Y��u3*��2*��2*��2*��2*����37��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*k�f6TfCe6T?z�Y����P���Pi&���P���P��_���fCe͚��̆�l�̆�l��Y��u3*��2*��2*��2*��2*����37��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*��2*k�f6TfCe6T?z�Y����P���Pi&���P���P��_�����?��c̵)�Ee͚��̋ʼ�̋ʼ��Y��u3/*�2/*�2/*�2/*�2/*��37�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*�2/*k�f^T�Ee^T?z�Y���yQ��yQi&��yQ��yQ���EU�3��f�ڏmfFefTfFefT֬Y�����Q���Q���Q���Q���QY����Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q���Q����K33*3�23�=��\�̨̌�̨4̌�̨̌�̨̌�?3�jfFe͚��̌�̨̌�̨�Y��u33*3�23*3�23*3�23*3�23*3���373�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*3�23*k�ffTfFefT?z�Y����Q���Qi&���Q���Q��fF�͌ʚ5k?����Q���QY�f��ffTfFefTfFefTfFefTfFefTfFe�gnfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefTfFefT��.�̨̌�̨~����s53�23*3��L03*3�23*3�23��̌ʻ�nT0~�H�D�`�~���Q�h�O�>���~BSy�ޟ}�{���+�����$���VE�F�d-lK;�j�C�7&uXx�:����d��3��J�\�>y�}y�f���|�*j|^����И��JW(�pU�uO�!��>g�1P�����r�)�o��W'XU�N$	���=L������b�����U�u�:i��n�A�0E��+W ����G��>�}+��!>� 9ա����K5��pu�M����<P��L�Y�0�~��W�cyz���
$K�4$���&�KV8��JX�(c^-ߑm[n�����q�{<���z�E��ڹf^:����C;;WZ�uV�g�G���0]ry���鎓��!�TW�JQm�-�')1�xw
 ��2��O��I�s�aGI�]ElE��f��(�u������rV��\=V�ڣF!/���dH�����nv>���C�����pk�r_U��ut/�~�ִwW6�%*��I$�@8.�T9�9��Pi���W��bЄXڭ����%q�ֽ�!YY�v��M:U�AH_��L|�v�p�"����deNguo�9��ǝĝ�L�Vh,i>��a7d��C^tp�L���dT���:x��jS�GՍĀ����7������v��`��0f_wwa���<Uv���s]:�� ����6����!y:w�m� ��#.����@���Ǯ��^'�/TN�K��� �t��ݲ\Bļ�P�t��*j���?��i*5����|�T�ܡ=~�u� �B�A�ᷪ��+t�ӡ�:v�Q!�hYJ��S_�z��u<;E� �����E����`�>J� >ܻ���֫�3X=�[��~��h�w�P5^�_U�+�T�4V����9�m��;}��وKހ�BC����^�9�rU9�D�Hjl���#���e�*���D�{���9&�
2��(��-mUK���^r�L�|,��p�s��0�>�����s���+L�k�:��z��o�串P!Xt~P�D�1qc8t:I5�r�b�����9{��g-�t�H#��HPPG� >u�1�5��	d��tv]�'-��h �3^�e��wY{����#�t�u:�c����)�z�j��zO�9�����+��Kl�p���H����G�u+����C=S��Z��.{����O�*�zW?�i����V��� 5��E��VL$t����*X"��va5�K>�u��Q���3��2�u���Y�� ���y99@H�e���F$wU,��*�@|��[������8ϭ%R�� ��>hձ���gCm��3��B�9o�&H��:�Fa���5G��?*ӧ{vcV�T��ԥ�c��,�*O��wԦ>�x��}�=��r�i^}4��!0+4�⇪�\�\GM�R!������侠S��y��I�R��|���w��/X����;�5f
1/�'�;J\{UT3�YHN[ H��B��GT��v��)�GR̐ٝ&Q����P�m�/M�9�����=H�=�w�	g`�\-�"`�|�3#��nf	I���Q		������6�M
�a锤v�Te�����+�_E�1����k���!� ��Q�bG��TG%T"�H��1w2
�:��`)�� �¯��:�t~��]�P|Gf��\CE��`*/Ի�>�ͤ�q"�g�t��iQ����lofF����Y���� �h�
�x#�?;��w���%	�i���x���a��F:��HJ��؆�2��� �H>,���ڜ��U�3�����3�K����:v`� qp�#��}�9���6:"���tK�Ղ~�	��sM;:m�M⫸�Yw���a�Wn���2O�
h:��usȖJ�>��� �R��ޖT��H`��7�w�`���1u�W����L���r�N�:���|n���� �6�S�%�o�\�g:�,fH\��QV���sU�1㢣�V�gE�]G�EbJ���Z�	���N!��EZՉ��Zý]d��*r�R�:�+��d����o�w��%�ף��ꀒ�-�S��*��A1���J�A��?T���W�*�QP�K���ҹ���5��tfj,Ĝ�:�۫]	]�=��fW)�R��X�Gg4��fN$g���p�+�*R_Y��w�P��']���zU|��U0<d��hYǫ���Qh\׳m��]EVOĨ+r�鞭���T1�N�OҢ��d�h�KbBG̏l.-Wj���Ir*ՒkԖS�u��lm�_�N�/�$��A\TG�ĵC��/��x��=��Ļ H=L%x�9��!n�#t�AS�90�w7�$St�@��u{H,��a�'1 :�m]:�<V�YA)�T�Nn�(S$LEM�*M��^58<��q;�n}P� �f�	�tJl�K�E>VLK�������"&����t�y�1�r����@e6�Gڔ�P�k�]GS�c��T���0 �  ꀀ�pM��IF�#b��u��ˌ���x���Η�]=�1]P>Sa�D2�%-8���f���[ޗ��M���|d���:��S�b�2���y�l@�������o���t|nÆ���S���B�vze��� *I���T*��0��x�I\:��u�0-�aG��a�������(W��J���խJ?D+ ��a�g���r�S�
�Z{&8��V}�W�0wU��P���ƛDl�*qJ�j��� ���A/C�9+�a2dBt��G#�*?.�9�������Y�My\i]P��<��~�z����GJ�z!����Z�*�"�a�|Kr/�RD�/B�	���:}(��$v@0]U��tĢ�ǖtRȣ����'�Sb��1Ň�:<�y��FK�?�0��J��W���wک�U�ܥoI�^��B@h�K�+�H��< T�R:�j"����^�o�/l���՛|� �[*]W�kz#�u�
T�eӳB��<bD�:5C�>Yj�3k�ج�h�!ىl*Jv6'k0�˘d���-�Q;���d��Z��kS�^��RGe��|�}���c��/��˥�b��@9m �G2��1d9�I�j�up�D 5��ɉS%��$N�՟�*�,w3>s�F(Z^����$���2�*?T�W߷Ppȣ�
\\����S������>�`�b�o ����`в��b�$YYgd0��IU��zBg��R��"���W�E4h5�hz��[?��YU�s(�IU]:�D�?�,350��orᐃ����N~:�:o:R|,��8�b29U!4O���Ώ$��N�Ca��t�)8������=#�	��U.���u��bD�H4����9hr�6�H���^/��JG��_f!�_�� �[Ԩ�nl��:�n�(e��t$�}�U�0�y�N����|�{���Gq�;��J y� �\�pqCujeQz�ʂ9Ky��;�T�MU�>�-���E�Zk$p��DաT���|U����Ps�@��������D�^�t�$):JT�u�SщQ��	y��*��iϫ�s�?����_jy���]�3P�GU������3��
������t7�L��=���]���R4j�@n���|"��s4�p��H?��=�;��卲3��Uz3�ŉ�#w�I0�=m�#:u���2�ͧ�tA���V��@Ղ�N��G��+����QgBR:�j�^Y:�#��&xG��:��D��߆�>���/�s�R�T��
ڶ pe��	G�<|O����-&1�3�-��5�BN��KR�Ob�7�m*ۆk}\x�S�B�P�r�s�)� ����pȠ ���|S��j�N����H�����G���͔Z#�2�U�!C�`���t��pn���4Ae��\Հ��/�;�Ԡ�I�$tk_�7�����/�Z^��      �      x������8�5��}1�$Nҙ/�O4�m��_~���LM���[�����'35�1�����������?�����k����������Y�L��d]V�uVg�?��d)�*�'!��"SY���Ae/��)ˍP�4w�}��m_��d�%e��)U�w]��k���L�6��*j����K�M]�2W�y���2�Y���2���-T�YK�Sfe��H�F1�I���E�j�׭�M~|�����au�xe�c8Y�WO�����w�m�	�}#3U�YWʪ�E���;�V�}��C�E�3�[�&We}4�,ע�iQe���Uр�R��f�p��N BMtj+U��(��I��������d��"Ϗ�I�l�c
A�
���B���O�e�S(+dEt*��j�x�4K�Q�ߑ���4m�w ����Ί�U�jSt����Pb�M6`��+z��T�P���+��]�U���ڡzcZ#����l3��(_VE�:�y���(�y�'�����٬?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i���?i��*C&���u�˶(��Zaʼm�ִCߘr
�-�)��ZU��-�ku����;��)����~<�ϺP2�����`��R�A�����ҩAe��󭳢!�0�i*\��i�����QCw<�~�߮�}�
��,RgT��f���'	4
�p$=u��@��L1��P�z��N���0�Q�*gT��&�ZguS�Y�m���@ߔ쥬{Y�p���W����/�	��ož5�ʤ��B��>���_��?����yɧ���������LO1J�&�fI���\Ȣ��~��[�l�=u�Ml�.'b)�0��6@9��3����,�"��hu��F����o-�]�M���i��Z����`�_j���5B�ůbO\�4�6�<;�WҿU1�@	��F�c�A����D4�1����Vj����~2b�]��J� ;9�"d	�k�����Ăn�����^F��rK��0EO�7KJV��E�[*]������#����(��Z���ۅ s�y*>�B�j���N�:k���e���~K��i4�){5��Q,�[d nE��_��l 82�Ir	�����0��ٍ���������wIVÐ1�k���R�v�(�D1i@��y�����<����%�ku�@���<���w++Q�X|��AkYSe%��w��~��ޮy.���5Ͽג^�N��ޢ��x�XY�����������Rൢ+���ג�n�����S�k�dz��)�w�ϐ���_��lA�yR��w��.Sb|�wA�Ȟ���v�}=]�FY�R�
���܊�4Y{��Ci���W�U[��6��&���7��`{u�1Fn¥�4#A"���G�z���dm����tm��#�ҥ�LZm.��h3�_̖�3_�<�n*�/�w>U�Њ�ڮ��B���o��|E�$����I�~D��+���Ѩ����\�S+�B�As8�=W����g�5���G9�NNB� y��>�)� ��H�Gx)%9Ϗ% /=>O�m��# ��>��n?.����<���BRr�y,��w���zE�C?��Mu	��3�q��?T�Tc���k(.����c��4��r%��j�n�$����!w��72Z��	\Q�P��:���8S��a���93��z ��"�`�&�$�j�1���;x�y\��?����c��� �Hs^nA#�,u�cZ�Ѯ�� u�� 	&⠟s�w79����3���5��L����3{�h�&o��Bz��W�)~�����b�9�qŏ��>�5��P��#<���<����۩�s��g�'�{��|�H��3��,�X�\�Ё���Z�!�@���c;�5���51�^��ʸD3'X���(3ˈ}�}w6���.a״�<PT�b�4Z�M�,E�M���	j�'�T���U�q��cW���]q����wy=ɔ5��;�����nae�:�uD~����2~��V�n�(�%.�{��u�����;���{s]�w;,�7��ʬ��+���~M*��{�.Y�#��u��̥s�#"1��c15{\��ޯ��J�G���j����	$���y9���c�(�fm�øY{,Y��.����\L4 �<���1c����������8�W5�S�h�H��:'�����d4��Yo<0�f�����;�ۅ�B�Ne� ':��󜟈�ΩF������D��t4z�s���#V���6ӏ�q1~<�^���x��/=��h���:����p�d�n�fw���|��8��������StOY<�ʗ���М�ھ}�k���3xY5ؕ��<�"�0gӓ��W������Mhg]�_�r�ÓZ���v��I�GЈ��z��#\�U�P�������E᭦���X/�)���z`��_Q[At��m�E����q5&/X�}�]�S��,6+}�*�����gh����'lU��y����p�ϰ�+�i�qn-��O>���tv-�h����f��q�@��NNˏe��$�auC�R�*��3�W�ݝ�<�õH�7��� ��Z��Tx S��f[8�`H E|����/B�w<��h�W���m���y�ⵍ�+x�>t?y�\G���k�%yl���u��J׃��|��Y�]YAؤ��2��y��B̶�y��V�~�#��k./�ƛ|����Bs�S>�6�<?�^�忂Ҭ�pi���TWy���l3�J%�\>�ȡ?��}��X�SS�����d��/B%[�G}�r��-e~nY�� ��oq���ā,p�i����u�O���ڹ��5��xvq�O�hQ�����Ux-�g�h�����)vz��i%�we��
����������0#��NGxx���&9���T8q�?\�� s<�=��}|�!����7q�R(�l��+A����b?�n���}	V�6��A��Qb��T����[��٣��ٵ��z�����֣||}���;��u�|��Tq�I�V�t,�
��v	�x(���T�V"bm�)������F���Q۲��oX������>9v�0wU�,�k�e+�WWg�^��A~(b4i*b�o����n�kuQ�z���~Q�3(>�ǧ+;0�e���)�B.P���E�d�J���Z�^���8���*֞�?FY�2�����(��t���]['�r������n�o��_�}W��?�㢎%���}<�}4�'eO�+r�3�������ԟd���#j^����Wa.N_�]������n�5#ss狴��1�K���(� n�z[�Ӹ(����.�X9�����^�a��ǝWV��,���G�C��,�I�ų���s<����d9��z������6��$�k�`�`i=o��?<�r��Á�y�+��V#�@M+Ͽ<�(�d0����_�*����ua�D��lk�;��[!{m�{���<��_�^�ի�9���{R²���x�zE�8�ߞ~�"�J�xx_�b�I�wH���+�x����<�|�����uC۽)�>,k9�<d>?W������/��gRE���\�z���s�N�s�'�q���������?�������#>�W/XƟӗJ�����a�~�-���}������ҽ�t�1�^��&{e���<#HpF�r5���3��w}?~wk������zc�պ~�87w�8��z��i��^)~�:2#v����~;b�ӌ���f��>[҉���5���d�&ڕ>�&\i;��m�cǻrЅy��"Z��ON�;�)A����l��l��9�������I��������E_:�j
SY-�uaV�sdR�w�s9�y�A��4m���7�N����h2ڽJj9�!J{�w/��~�������dL��]��Y�@��O#�"���H������9���8�W��N�Ҟ�0�vG    �P����mV�پ�����E�=�7�3iHg�>��ٱ��	��yL���ګ�=�?Bi�83���VH��|�|4��g�W��@�G���v����l�d�%�;�\��>��|���x~�B��N�[��֟Sځ�
�+�׫v�LP_�x��+	/��z��r�Tv#����f��������?��k�A�L>��|a��#K�?��8=�e��SJ�x��v<��/��}~�5^�9��+����M��/����w:����lI�����|�om�Nyidz���|w���x=O����A^Q%z6������E\=��M/���Z�6�� ��1�z:�1�.�9iR�en��n��2�v�9��;n��v���2&.�=�����KN�}GF���e��Etj^`��nM~B��Q���E5۽����")\���g��~�-�x��z'vh�d�&W����� �~�Em���p��@�I�T��WQ7�!��-&;�(o�y�?�øV�vJ�Wy�� $��*�d��F�:��q�3�3E[U��[��'�c��Xf[����������"�[��C����ՕGۨ��p�ǣ��c1~c�Z�ů�}%�}/{-��F�r|�����9��8�ٸ�+�m�ۇ�����)��R���	t��R�_��O��b �X>qm��#+��O�U���n'�u�eq�m��u~q�`�mDy���g�ǧ0"�}�|w٫��C2��9����l<����Y�cp�S^Ґv����ë������y߿���Z}����t�_p�M�*���Ng��3�7؜���
��(\H�Gp�Gf�V��*PJ���#F����w~Oy*Wo���Y,�h*w��^��Xg\%�8\u�]��?~��G<��x���#_��B~P���7��넑z�{�����=/t(���.����܃9��LRUx���`���x�x�B�_�4�L&V�;�$�*.ް�?�^�k!��L������uEd�A-��N�Z6U�`�F[r�b����5=M�f�{�|絮@�qWvM�\�3���K��l���"WM�����?ކgD�#����p��b�
UJ���GwƵ�,�y�)-��>�?�8�
�Ĉ�6��OO�+�ޑ;�3W$�ԽF�-6�a�瑪���f�e��:@.(��FSY*�zW���Ji��iek�L�y���Β���,ew� E\��T��6c�H*�f}�y�s�̽
�h���U����Ι���g0M����<�f���	*�#$��Ι���`^�9S���3òh��ɴ{e���݈��e��]3�'y�{�BȐ����+����v��F�&o��1#�2����k�R�=�_�J�.I[g��h����U���Ϡ��-P���x~O=u-��W�I��U|<�x��򆌄�f:�XVh�Ul[�dhUb̥�ڣ�,j�������Fʆb���W��|��~aS�.�9�k��������|$�=�J@g⺑�*Skg-��ӵ����>!߄Uѯִp���⡭��끣��u�׻��0��n�π�`+r��e��⍌�Y���0ދۼ��IQ�tF��+Fͭx;}V�Uȵf�u�v�z����r�P���XW	��G��5I��Ǔ�
�~zj�U�7,D�Lk�T "�<h����\B�x��.���'�� |I���ė��t��O�m/>�����:���K���F��|؈m��5�|?(G(��D���3 G,զzϱ�"\e"�bG0F���Pc�No���>��$��=%#LF��ێ�w������aW���]�!hy�i�ZXq/�a��z��g.�:���ɸ�q
�r��C��M�,�2.�6��/F�t�u�xiv��x	ozU�ԲPJ�A��j�ǳq�s,���J<'�v��Dq҉4>'���'r�h��8ɷ3�cY �np�\��>^5�DK��Za�~_���}���(����O(O\%@�o*����	s��"Q/O���ߺ�U��~zˤ�2ň��%Q�/,��b������ƾ
��{����g��[O#���NF򯠱��O�����1X�%��"�S~�*-���������X�G�+ki|v������TlM��QZ�X�#���Ƣ9��荲����+1��� �ou�aV{6Y;#��S��!�)�%m�O0��>��kc��x�g��1��f�pY{��9��(����)��%�/��Kx��W0��;�]�,\=�g�w�H�6�l󰎙Q�E���#Ex�7`$��o����l/�v�b�ي'�JcJ��>�?7��wGd]v�d�ו��D(}2�����#�3W��@9AR�*���G��K�:E8����iZ�=����o�C?Z=��|{h�t��3�P�� ��� ���7�#�N��������a���HT�wO��n� "�$y�y����w!��y�S��
�p���˞P�Ey��Q�+H�<M�A(��u�<M�l�(O�Ǵ��Hĳ�"�t13���㌈5�檇X�.�3G�!���m�L�~���>���>�����=ZaU5qY.y+���=�{���}��tF+m�W��"�<��W�g�^�9a#�g���!7�
��#��W[�Dત��젖�%���/�,���9�J{Ƈ+�3U���R�_�K�w]=����O3���yϒ���s����n�*�e����)1"[5p�W�?�uv�;��?��?�����Rײp}�t�+m�Z+��TK[��R��yF�� ��{^Z<��|U�mDU6[&�<I��:[b�~��Ec��J;�t�+��mm]rG�\vWY6�^��s�t�i���m2UW�g�^�7 չ�G����2�k��?>O�{@p;2�����ǌ,c�E����0�/ZE��s��o���2�����(��`t_���]��AD��^o�����VywY�����q1�_�?y�w�z��H�W����Vٝ�G�r�3�2��:|c�]�s��?<��S�h;2C2c3�&���[E���������Rew��P������XgF&�e�;9�	�AZ�J�>i%�u&�b�Ҍ8q{�����Q��F<�ߓ������֎�g�5g��X#����T����r��Gw�Ȍ{�mt��A
��&�;����I#�<�Wa���Id_��uڗ�_�8�W�1�� �:8o5}�K���!b�!�<L$�}LLt>�8�����Yc_�y|%�=4���X�Tc���,��E�l;z�.k�i�|RNg���I���'�}uH.�e�q?CN���c�H_�}���e�"��?�]<սM�]"$��UX��фx�;���So[���1T=���xL��D�S�6�u7�E��Y�([�z�e�����Ncbt��g���U�+�S
I�b_��Y;`�1�����wb_�rE���&���	$�Y)Ɋ�����M�ޟV���"�+	Y/�b���2�m��x����8R�9��I��4��u������,�s�o��9^��{��t�#��FD�Q&��G�8�	�[D�����U�5E|��8�c��y������U�����^���A���S�8=���y|�1���9�ᪿ�O�4f<�'�a�^���gK{������;C�P�/+e_*pN�I��ݜ�YюD;�;����O�>(�\��p>��5�7��\K��s_�k��T<�$�Fn{�D�aD]����諭W_6u�q���b�c�"lޫ�i|��6w4~7�ed��`:�h=���Q"O������i:���$,�?I����-+#9����߈��+�I��H�rlD�٥�RȌ��,/
YT,tla���N|w�:����s-�}��w��e~��y?bK<�����%���\˟��\���+,������@�����\\��[ϟ��4�Ó9Ѫ>��,�B����=0��rW;N��X���?�9���R��~S�]��%��������ѽv�^�W]�러ݢ�WK]SV^d�y��^=���|x��=��}W��9=�"+�6�;`F5u�6��D�?��    :��̄��,BzH��9j��Y��~k���zs��\���H'�g&������H���{����°�۪���ϸ���]ƣ2���
a�� �S.rC~��*C7�912�QTx%�j#5#C)�?�PF�, ��|��HG�=��V���^�]Gs��5�*���*v�-��QޚY~�V�CW��TO+�	���������U>��o[Z\>g˂���E��)���O�����Z��k�M��7��yI.���q**g|��e���G}u��]��V��٥5-I���92
8c^w��Ѓ7��Iwܱ3���R%QM����o�ŋ��/�]���e����\�����>��Q5�{���������'��"��r��#��w�,�|��~Jp��K�]�uK��{��:c�u_�k�g׿�?>�v>���s����;�H�5TQ^X�7�M��oNt����ٽ�c�~>��@^�Ÿ{-������l�;%C|K'��	L���ŕ\Jt5g֗�iAuZ�/g�x�E8q�T��@���$��k��l�̖�H�ʪ��/��ĎJ��~,iQQ���(0пq߈��Te��%������y�15������r`i��ݴ����y.�֎�r�v���w��j��W����ZR�S���z���Ϟܒ�X���ϙ�K�~���	��Z�	Ӑy8�4$hL~�'Ԍ�Y=	�ٟS�W�y�&��gO���h�YDn��C�=��^�@��tˋ�����rp�����͛X�'ɑ���_$���v^ۭY[~�mO�)�1V����ۑ�!�\%����,�s���y��`Ýo�:Gu	Q���f������1շWt}m��ȵK{W�kR㱍�4i5j����t����;�F�yG�.j�=4~�F��gOKU���*��珯eW��QYB/3�ߢ���E��UT��f/���m�ܖjX���{���	��
;��ٓZ���FE=W}M2:�J3��ݵ,�(�}	Qr<��vǞJ��'=�K��������Q_r�f�����C_Kc�w��C]w�<\[�.۩��<�������DiIvN�_��URn>{��*���k�_C0����˵��6R�gW%Պ�xn_�M䚈�B��ˋ$_n��қ]次k��.]���uv,�|�&���(~l��*���3�WI��|����ƭ��K�?Ya�
i��Iޏⷒ�{��%�5�WI��|��u��$�|wW��0J����)��Jq�{r]w��U\n>{�4F����O/)�������.'s6��${3�H)�P�n��H��G+�֜�"mw���k���*���Sp�Ȯ==�/*ڌ4q�x:�l�I�Ez�J���gs��@�ӦwԴ0C:S��ܷv�f�����8�om��"m�'�z^%����pꅌ]ku�Pq�O="3>��ތ�qi��插��R��ϋ4Ao����@�,M(Np����ȃ����y���8��.���b�ه�9jƮ�:r.�[R��#9��~j߷o�m΅3�WI��|��r�J��k��C��]	�u`�%.�ɬ�f���ջ#e�b=��_$�f�:�u�ʍ�5H����Y��2'���X�C�Y���S��z�����b8+C�֟����D@|����֘�Q>�9�Ԡ�k����U�$7�=h	p��I&��,�����ѽDs^�s.��U��7�=����k�Z�c'ʚ�&�ߕ�/hI��(�#{PC\c��N�ttz�f��Ϟu�X�Q�+�0��F~�~5��#M���'�c���wjX�%X�>��p6^$��&7�H���k�2����^sG���23��Q��)�x�����+��p-�ڼJ��g_��Y.�z�p���r��c��٩�v�9�68�ɹ��Q���ѫ�Bn>�"f�ڰսO��e?�q7&�~�+xu��S���n>.ǕF��'~�����|�)��*)՛Ͼh���[��3�N�=7><�l�r�ֻ�̣�m"�Si��3�WIa���k�.��s�u&v0~f�Θ��Vj�Τ=���,띴x��W�h��F��5��;Zl���~�<����K��L�@ٍ�s_�﫤��|�Eu��1#�hw�:uӍ�̚��w�@*Wg b��|����*�ӛϾ�Ӄ�\��<���E�2w��G�S�\�9�bFu�>�WI������b�r�����[�u�^��bF�K���&J��ZJڼJ��g_4ǩ�-ON;ޟ�|�����6�;?;���<��H�x&�Zj=�Yɩ�1`���yZv���qMv������b��'J���J���gO�Vr��*�&'�����`+̍���#)���p�C�y�Jz�泯g-�/�U�V�j�g\���;�͛E��Z�]�J%�㈬���	'��k$��SқϾ^��j��ǸݙJv��cE��=fƪ��{Č�w��QD�xT�\JZ�H�ν��yHD~�1�����lm���~�W���^�iTw�E�I�iH�ɗ��nʜJ!����%;ʊ�htn��H�?�J��ݑ2�3�>�In����+����4wq;��g�j�-?c���pq3���/>E��G��JG�I�ج~oj1߮m;:~:<�V������℗����}3J��������$Ym�����캲k>N���	Z-wG��F�Fr�����I�^|���f��U��7�}}�y�r�f�3S���Ȋ�D�y?��ݼ���9~�/�\��\���ںr\�<���Ԡ���#�kGp�ob1�䒋�AME���5�WIn����
���g���K��S�zp�����g%��>/�sH�zZ�!ʫ�h߶����VP�	׎����mm�ƃ{�]��ﴏ��\O$�'f�6�*�<��))Wp�����Z�޵�my���4\G�
Mr);P�����F��$f+����FٯT��UߝtһC���&{�{$}�wv�ܫ�ϐǶ0蹏KZ���]�$�DH�1����.�1�*�c~S�i�Ñ�O�� �O��?搫�A��\QrE��,s�N�[z�tM��W���=ʋ�@;� ݿ�o�/I�����K�sK��,�0s|��^��bm;�a�c��cq�OV/NtO��ʹ
)���1�6b������=�\��_���
���+˼�k$fe�+7���xV��mB��<���4�j�%�ٞ�h%�HvgAFJ�K:�8ʇ�7���X���l/��e��Nj�0��Z���mV����	���I�/h�G�m��w���ؽ�۫�K���(n�s4�&��]{��n�尣C��,־Ȉ��H>�`�&:�]SZ�9���s�tl��V����Z���M�NpZS��c/rz�fs9}�������n/3�E��m����p��c􉶃i�L�����x�Y�%V<����Ӻ⒓<��Z�Eyt���}�:���F������"R���#In�O+;�Vt�O����r��|���>q�d���S!Y<�~�c$��f�?����[['^'뫌�k4@��s�ao�����Ѐ�d�$���ݎ��/8��f���o�qr�̳��p8f�J�s�u�=U16�.�����nG�FJ#��#�4sq�w��q��x��S�������q3.�1�wqsY�XHk,�pS�k�nܻ��ձ�\�6�����^xJ��\�G�����<[E(u��YL�a��r���:�q��E���R<�m���R��`��x�[ ^�H\��ŉ�y7�\����z�c�'��_��׽
��ϫ/�f�9�P��Թ�ypr�5V���8���͚w�9}>^��yl��5��	��P�d,#��F81���k7���m*#�O�q�2;0㨚�c��ܾos�|��s+���;��K�ppgn��K4b��wi�*C����hFL���}mNtrF�5���+:��i��]�f��t|��H����ʬ���_Ÿ����Ծ�6'�>���N�b�!=՘��n��7��]�$5w�����7��ov~W}��\��mg����o��T��3�8v<�C�d�>�mG��y��8\��9�;�{������:~�{HL+x[������c5����{�Z�6򲐤�if̤s$=u�u߽+�9�M�V>K�[��1+���    �����>���kRG��l-��k�w��ɕt�P�:�X��|n��eu����5��zӫ���|v���$S�>D��|�(�ѫ��#�J���s����O���_�ǥ����N���Vcw��Y����ə�GX�#�Y�C�9�is���WzVk��IO\l7V?8�(�<r�(|Qr�=ML�9;����W�4�;[O.���g��c����e�#볝���l㩝.[�9���D��iu.�i���\�Ì���F�Aٻ���ۻoO��<^������T�b�v�S-���/�{o�#^y*�}o�v������JN4I��[�عN|/��:S��{�]jQ;wwџ����o���3k��Unjj��HT��𸚟H�{�K���Sp�UB�i_�����vR�!3�	�^��:ɋ+�Ƴ���$)��,�H ��;��s�{��
�+ӵk�01,��������$��Z��WU$��zOB��{L�����s�JĹ���!�x~�O~Z�is��dSww�$�>ߴh�7c�#�MBsÖ�G�ȿ`}:>��@��H�y���
�";�>���c2f�t�;�y^��Ƶ�S�zt"�"������ׇ,?ƾ_RM�Y�g�hsj���y�����)j�OZ~�}���o����9����/O�"~��E��lȶ¡ϟ�#x���_���t���I	WrZF�i��B�;���~��Z�9s!��u�#��<��'bJ�jé�\�;��;d~��5����x�����9���w�����T�4]�=g^�c�9�}��'�<r��5[v�Q<g�-��_}ki���d�$P���̄�i<��J��O�*� �񲚁�i�E��d'.'��:hsM�>絅I�����	���\��n�>=˳홂E�lyV�E��z�9�=���:<Qo˫���'��ul{�^����Y]K[���>A4���'o����7�e��մ���eD����MI�J��痧#2a{G.�RL��/\��c��	�s�$┽k<���S�F��Gzx���x�ON�jDF���c��qt.Ո��Z�9<\};dg^���w��ɉբ*p��)�:b����)�>�%���˧�V ��7�.�w�C�k����o�#���F�ա�;��cw�YvM�J����ql���U#�5�}����X� ɟ�uF�s��Y^�y�Y�b�����<�m�N+5ۓ�I���@�+D���4�l�K,�*�U�߬���r�k|G��Ip�8;%C�9�;�n��j��ke0fe1f�i9(6����8ԥ�JFO��5�=�Pgov����m��5�],�2XV��q�"#o3�fS��Ak�\����Ϟ+ڝ�q�ǞՕ�<��^��f[��-�Y���Sk�}ch��5�g�N�α���WVjF�v7��l���O�y.{�,�6h����Z��%Pn����u@��'?��:Ƌ2�Y<{���mOD�s�=]��i���,������k�x���nc�_��Ԧv��Id\M�)2����(���{���i��T�j���X����J7�=���v�&�\?�I��Y88;�d�����>˭h���Hf\m*u�ɲ�D2��kY��l��6��<�l�O�!�Y;�������v��3fJ��վ�q��E���>Yf��Ǖ�)�k1�i���,����غ�`B�j���1F=����[�=�]������؍�չ�1Q��DeE߯5��Fe�����{���;����}>=���B:�O�����H��s-i�t�!�o>1y>�1�S��<���؋����c>z���s����,��9�-�\G�y^��Vٟu�f�Z��k��_�����&���\5y�������ڔ|����_z?�a��p��9˵[3��5C�:�8��sup�����	_�����.�VO'�'�ZO��qrZ���g%��^�s���^�����:/ĳ����ŵ����yZx1��S����]��^{�����^�9zj�����<Ǒi�����|��ै��!�6��|{�����e�I�N)�=��J���E�U7)9�N1-��^�����pP�ʶ{�V+"l��+G�`�Z�Ξ�+ј�VF�m�9��^3,�m����c�x?�|S�,�ME豫�~�	��4��^{3w�F�R��!3��f��O����9���>�e�W-���^�y�U�4�)�}ج��iǜ�we�b�Xr7����J�J���Xev��k6��]�����y>җF���#֐�\ܝ��Z.zF�Z.�|j�ʰ+�9=��ﵷ�����KƬ��Nx:<?�w������ñ~#�WŰʛ��X�u❓�߲���KuTyO�z�+۴8tڜ����ܠ񾖣>������Vuߍ�u�w�UQ��!�.b�7���"Z�X_]*�"�m�����%/凲ﵿ����_�c�CJ]̪�)���x)3t'R
�K���!�.b=��nOCyk<z>��rЃ����U�g�����\ �7šڋ�"�RO9h�\\��J:���`)�WqЇ�"VH]g���o�I:�K-�񢛘uNG��Y���V�z�;+��3x%�5^���Y8VS68���o�M��䵚��N1�o�4��lɷֵpg�Z���V�n\G�ښf�s!�Z���K���Ŭ������G��ř���1�F�R�-�-b�u����}C����?�o��Uz1Y��[q�eG����/p:����ѿpH�E^1+�����u!^w��|�/���7Ŭ�~���Irx���od/����Ǭ�vg\::��-���#~%W+�#VY��I����g��g7;^�"�Y�pM�س�;U�u��K5Oy��B:��.l~��V~�9$_��R�pI����Ͻ{G����T}���J�;�%V4j�/��"����܋Y!�O�:���~��~���8�C3��sF�V�;ֻc��ɳ�'�'zr/���VX�3�c5��߷�1�����F���Zt��7�������;�^�{��������zK�o������Xw����e���w�^����<�S��Ί
�YA��pw%;���F&�۞]�'9z�Q�>��w̘�oSod:3�\72,��R`�lu�Ñ������mԩ�!����x<f��{f�x������;�-��? ��꼝#��Yr��ā���[0�3tb��l͇�!q3З�f�$� l��z;�G�Fx��ciM�Yld�u*l\oe���'pF�K�,"��5�s�����o���6H+��|D#<��r`h�=�^T?ЈM3Z?�s��E�8������1f���l�6�|��'��1�7�H�ѝ�+�&�_�ٜm{��{��)��EJ��z���^H���D�����#Zf<Z��e���哭9ZvvŔY��<Q�Jcܠ����O�g��	�S?S���c��?���?�d�%W�����C�#Κp�͛d��$�z0��y��I�=:Έ�n�����a��ɚW��!������8��X����xI���N���Q�D3u�7#����-|y��[	����ٛݩG���e���!켐k}6Co�yj�bݧ�w�<�?��#:��b�K���O��3a������14w��j>���x�,��u5N�:O�T���#z���Ղ�WTK0�L����|�=ڟ ��&-}Λ���7#��3��<�ַT��	s���%��G������5'�Fgy}*�R�>#2`֒�R��A�l�-����I2'�C��}�ɕ��������y��[�Ϸ�E����
�Kt���~BA���<כN�DQ���?��#V��}>������ɰ��[��ՌX+],�+pL�p��ͦ�Qs]�xH�5�S�D���kW~�}���ѿe��Zbj<�Kd,��$�ν	�t�V
��k��o����׵�f�>`+F���|j;NƆN��ļ��G��ӥ+~ŀY��F��R!��ꮨ����CZv�U�\�5�O�U�����8E
��ţ{Q�*�>�K:����/��=�M����+��|n5J��(�#��Vcy��"�Ǭ�1E^A?��.Z<����04϶DTa(ؽ�7�NG���i#�6���>j����K6O�;'�ԛ�I�����BGg;˯[��i���0��疄�����h>��g�d�󗻙�i    ���7�۴��i�y��S�*m�ф���?��i������2�&J�➥�Kf^��W%�a��T_���r�u�l�S��=���s�܂Y�����[y�x�<xR��$�Թ�A>�<�U��V������[i�ڌ�����5�uG��yJI��9�D�@��)��6�vK��M���B�4N�z��C�]��U��9�M۝:�X#dwT��G*�r�8�[�=ve7��Zr2�G�Ç�8�De��:�����F{v��a�+	��n̗��=�����z��O�����t{V�[N�KQ.��4���9����	1�5��NW��4e%��'rN��J���������0��y�oڈ;)�ҵ�h����?�jm���V��$��>�n׽G}ҍz�O�I7��J��	 �~َ�%l�%�-y5Ts����)5"M����>j]ְdtzD3���rv�a�8CS���k}c��{�mB�x��x$��tѶ��|j�Se�G�7WG��0��.�l����UڟQ ���@�$�*�~�S*^��[����+��>�N��h�<�~'��_���eT�d��qz{�z5��d���2|d�E�s=` :fw���w�4�XʵL��sA�k�0v�T���}��S�*xڹvԕ`�+Kf�U.�y�2�Ȼ��ks�Uv�Yr��#�׳*�sV�틝u�fO�8�ú�ů��E.�qA�g���{V68U]���u����� ޳��8�J���紕����G�b�Og�%J��:��U	�yQʗ-8�p�Ǝ�u�*����ar���G�[���)�N�fS�[��}*}q������A��G�d^4	�;<���óy$ҕ���������P��/'�56�u��M��i�G���ٵ��x/H�{fO���gƑ�9="ў�v���(mT�%�苧hr���\�/�����?p����tL��,�/��M�٨q�����Ovߎ傤;g����{0��d>�H�'���z�$��q.��@ej�����1�pQbW�8����U2��_Z3%u3�G$ԓ��*��Һ�t�n���V ��9���￴�\Z��
�p��~;�K~��yD�=ّl`Iq�����}�V{��8:�^Vǁ�r<�K�O���c�ʻj�4�C�����-�dh[E��L��6��h�xƳ�>sN��Qԉ���3�S'�VF����D�y���"�.����վ�l��h�}�)5�j�����-K�N�X�f�#c5�uk��&�r�-������9�T��Y!�D�<Y�"ciբ�zG�q��<Ԝ�o��}�xEf�[�V�=��jn=���XR}8�G$ד���8��X��{�#V�70U�n�)�W����k�XB�8|N�����U�-�g�~���R]�"�">�G�oW���>��[\�B/���Ѱd�3/9�7E9�;Q��#2����d�뽌��LU~ˑcŬ�>z?Gr�c?]���^��1k���#���?"��X��X�X-�O!m+Ո�)Ü��*�9y���Uq��G�$���`�t�G�h���~�#���D<����ft<w����Ҍ'�R�pQ���5����+��cIH:�U�)Ӽ�Tg$�׼���ݴ:Э͓���g��~,F�x�y7��j��\�K���N�;5����Y��	���ԬG�/�_UR�����#"H�e.Kp���#�t(�Q��/N,��5�Oq�����հ�'MEW~���w��e1���Q�#�=^�af���l�e�~���ӧ�3�6Ͽzz�OF���~z=��զ;V�˒�����[K{UkW�����+�U�{5�A_�Zɉ�s�ֺ�5�]FO����W�$�2�8Cv=s
���=3��_�\�`�`NĚ/���H�v��.g@3�3�)?@�� $��?��t��$��:]�����\��C��"�
�¿3[����c�2���1���+:�d��9�������JNt\س�wy�Ō�s�d*��be,�x��.�t�܃k,b:??Yz<�G4ǓW�Ks�w������k.��5�m��o�`�_2O��%�\����?��I���E�����Q,+�����ׅ:fw����1���jR�E.���u)~�׳�sY_-u�w��ؓ�U�t%��w�O�U��Kn�n�Vy����<"��Ue�3$X������w�����^��A��R/�t.w;w�&�殺U-�rJnmB��ZpE��vϲY���>�כJC�V�@��k������s���D�I���{���k�x�]��;�(��z�
�rΊ��+�s�vM�4�|��a�~�5,�N����0%�t^ww
�C�D���i����6f�+VW��в���W�s�O���'��������3�q��s�I�kV�Ȯ���.��)�.ų�wf��{q���7�T�;o�-��=����o܌r0�k>���gt��k�,^y~X�yw��{�.��Phu�?g�Lr�/��ɿ����9�|����g.�g.U�x�O��������
5�k�]9r���qqe9l~2���j���J�l��ꕝ�K��ݐ]�\����h.I�c6Ax�y����,�u���=�Nݼ��۴��C f�`ޔ�Ġ���!�Zi�Z��3I{rp�����Г�;�ٝ{4lqE��)_.x��9�Wvp�,I�h����߉e��)�1x��u4Q����R�k(&�)�N��ug�|w�"Y��P3���z����/�'(:�δ��z�=�Tz{b�C:˱�z����)�Q��0����[.%�̒-�%s��bq-u��c\��$b�+����"%��:��*��Nǲ��73�+��yǎ�G�$9��2ʳ��\��D��x��է��[WG�A�+��U�Z��{$�����&�!oO(��͏�����&�^�~��skB�}؎jEͱ����b�����˷;�`ƮgZp�]��!���=�|�,~�~��9:	��۩��{;�#�d�=w��:T�Ǫa3�c/f�\;�v������y�<Q�	���C��,ʉ��v�.m��O�l�(�4�S���o��	ҍ_S�M�di*�WT�(�뚲�?�4�4���U F��"ܤa���F���WZJ�WJ>/>�\���c�f���|�/�����,Xo\�gNFJv�(�����>�����;�$����U<\���=e�
c��9�_�宨�D���DR��^_��eg��(F2���F���XH�E4qm�H�'���������J�A���ȉ2���%�4���v�w �f��ԣ�&��w{��td�l�E���B�h�'��s���-lM��*GS���A;/�dʹ��#F��_��Ny���K#
���g���k����}Z>����ɶv�#�<�./i,�Ez<"��[��oyb�g����F�WO>�|_aw)-�k�K>�'ۉGa�#�}n���Jd�o��#��Y�yȻ��]��#n�h�~�>lu�$s�8�Ѐ��GԺ�o(�F-h8Yr;̹��C���e�����nP�j>Wڃl89��cK��l�?� H!�)�_��p����a��M���
=�F>R�I����m}�q�X�#���'��+�@�����D��:��~rub�+�G���6[��s�'%[N��
���:�H�'k�T,��>�C�c�HC�r���x��H2�'4�gx?�^�-K�=3'DΪ��l�XKd�#�͑^��w�l�w��m�gJ����TyD�=��l�[��Y����8)wB��EZ���?�on�����\NF��x�.DR�Z��r>ڞc�Պip���]�^\��Ҡ��v6��b>=���6:���ӻb{8��J�\�qYޯR�	�d5[NE��+�(��Ɍ�o�nJ'T�5A�Wa3e~�ϩ�I:B����{Yړ!��y�kK�xɒxڟ�\��oW��Z�v�nF�z����?�K�j4ɞ�;%�K�WJ�aIt(��P�n;��N���+�נSLW�zR�>ԫ�S�7��I��hn���xD�=��-'�b_\83��^����?��T	D�a�R��ޜ1�i�>ݓ'\�e1�]�rf��zV�ZNN��
��?hG�E�;	,'����:���R%h����    E�zN3�I�=ߓ�ؼ�#���x�Ȝ�#���Y����v����B��Y��25���鹂��D���>�<[G3zI&���}�tr����鱗rh.��VSK�<�r��،q0%�o%�yl��BO����i����~�8�4i��;8i�_9�s,wI�u������+��SOa+|��r���T�ZK��vW��Q��H2b,�;_=�-���7Hd�,�ع���L4v]����q��6өdx.��5���8&��ܼ����hI�5|����d�z�4�n{qtr�I9�ݕ]A�I�U���/����lf�J�WJ1g����'Wm��xr���\�*�[�GNk	��)�=�	]<��Ic��d�43|D=y͞�^d�z�+��:���>LY�\��i�1G
Y#	Ƣ�S"�*�W��4�3|�)=g�ǖ|8�,������#B�ݓB�Y�A��Fa#��pO��3Db=�|?�$�l����D�ͦkV�3��SQ/M�K|r�'��&��G��nl�>����#���!��(�uV�,�Qѐ��	������yM22�����$%9����<miװ�xv�Q�=m[ �i�I�w)��b�HBq���������Ը�;�7�\5�,I����S��}��ȁx%����_����<~w�u�+3}�d��rg��'u9cY�I���q�^�dDi񣈒D{�;_p)kř�OH�?�s�ܒ��玝*ʬ���?AzH�n��^;����F�T�v��Hۥ$�3z���,I3!6�m��+��',i��Oڮٸ�Q$�qg^6����+%O�$��+����#�����>2꒤�ޚR��w̒4�K�*IRrKr�]��N秄
�;dHEwэ��؞���������wv~�K�l�nJ���O��7�ڬl���Z�.����t��Cx�o�dO�����:�����:O:kXR�GH�f璭��:|�/r&I
���&�;��V�3{�Ե,�+�k�f�7k��s�t��N9vWo� �t��JH(��㌑�з_�pi�*=�	Ʒb�u,M���k�$�v�ns��+�"ra����iNϨ{F��6�F�Їk+37Q��s��E�>j��X���m�oi�!��zc����󮱲�"`^_qV+riO�}�zD3<U�9'�j�tƜI��>#�)l_�b��y�����}TC<U�r���NK���JM)X��3�y��xb妨����*�X1�#~R[�֥�ۻ)�J��d�m����|Y�lml�0����y�$AD�d�)�#�I�'��#����5K�����v'v�����t�Y�_1J�'����<�^�K#*��]k��+'�;�?�mN/�4`����?�����z�sЯ�ݕ�*�H�g6�]�0�A�S��i���F�KЪ�g��=�(.�~{�>�
�Rb�#F��]�0�ޮY���P}�B��H�.;�qDH���WWήu"���I���=K�@It��TxiOR���J���8�[$ѷw9�$��X��Ȍ�(�5ߜ��[J5�
��{��t���H��HD��<r����w��Ӫ��M����,�s|@�J��+����oo�cz`�D�����3�iO���l��¾'��i����H=�p�t��Tf7���d�:L�?"��ǑT�=�)�JG�/�ȓ�����4^�}���^�H8;���+%:6�;J�>��ZlzY�s]��ִ��[�Pa{ӌ�'�Go���t����M3�$���IIJ0��hA�o�GǏ���Ww����v�tzW�S��+��Of!����3{D�G�x^��O��y'�� �Ȑ���7�}�αc b?��Y�R�x^��F�GtY��A39%��_%���%w��1�K����E�NK�G$ޓ��k�$���\���~�j��jw�O��M-�q�H���s�~�{f�F	���|����V���xn�@t0Q�ӹC<KVCF*�!2�ΣF��_��#r�l��{G9�u�)C�����:b({i��4��g��$UL��۟UXQ?VH>&��zޓ ����M?�G$֓��Kb�"���i�Q��Jt���|_]Cz�L_]��%Nq�+��k�۹����w+CQAE��'9v�8�����%����]&G�䭟}~B��[9}�����(�Ϲ���Ȼ��fG+��ۊ�F��=!R��G�G��G�V*���.c����J9>� %�˖��#�z�?c�S��D��֘�]ڽW�AV7R��F4S��U印�:�����S�/����gۧd�ܯTj��키P	Eω�J.�����\�����O�l�$����Wyg^d5$�����GC5W�����Ґ���'̽�*�<+P���D1���̠�*>O;}��6���m�r3wH{+�"��|Z]��F�7�>>K{�Y���|k3[�e;b�/������̋��j�\�����9o���'pHY:c�dE�A*�]c�i��-����Q��7�"L��;��O�_e�;��ڳ_r��v-�e��YV�m�𝚫�TT�hެ�G$��^-��:yL�'P���6m�X"e:������2��~-�?g�>q�<�_q����'����엠���N��m��]�Hn9Q�+�"��qXmR�nqQv�������JC�s{��X�Y���r�������UJ{��K�=UX�W;����.:���6#;�z���f�z=���x��)�����~A�����?u����K��"쪳�����g`Z>e�m�3�`(ϛB�T8��Y�����h�ߖ=��G��={eö�=�E�l}�eӤ�i�_ڴ�����ܮ$�8�El��g�v�gfd�eǮR̓����bL:��\Oy�ź�χ"��URY���g�s�VJ;���0S��ɯ�=x<7������g��d�|J�5�溆����#r鿦�/�~ܙ���>��N�Mbo���7�U��c�5�t�9h������g��]����uۖ����U��� �����=�]�T�B�]�m��N ��dcw���˅�-��>��v戇<{s��3z��VS�V��Ym����H+�´3�V�M�ٜqǬ<�e�s���v�W�4c�́�I܊�mQj�y���b�������.琘�B�SY��|��E[ګm�VF[����.�����-]��VU��>�n�����y���9j9Vt;�_������u��r�����l��x�����٩(��l�m�|�N��*l.i��2o�wv���N�o���#�'��'*	��e�,�ܷ�?`������d��b]��+3ޅ��\��!�Y�b�,�fT��,^�}�������!��YBTu�<�(��J%��Oq+-��L`���V��R[l%����f�U
GR)������CT�!mB�'&����N�g��?m����c���`֋�z�ܕ��_�ʂ%��C�j�w/Β�%+#rWDOB��n-J^�e�g��1;�/�H���|+>^��:�G:k��r��u[�����*!7_��<5�d٩pĕ�NG�T4\\�h��f_��z�R]��_���:W_���۬��C.�UYl��,�.��;�d�+ik���EB\5�nO-�';b�Y�dT��`*n%�~&�N	9�R<�$����,��?�M�O�D���I~�V?��s^σ�0կ�T"�q�\�e=�����,Z2����߶����G�*�m�*�ƾ��v��T�Z��<u_�3�9�uH�DV,5ż���s_����V����uJ�͗b._-C|�|�.$�]X͸���|�	o*x�\���E���6���B�D�)5����閸��׫6*=G_i���<6*��T>"4���F}O`�xbw�o�';��mS�c��6���I�'�������]��?j���K�S��$�C����w�c{W�Y�m�̢��h�s��[��;��=���A�o�h�v��l��s�ȷg&�/T>�:�κ�A���ɻk�J���*�]?��Q���&́�f|�ޤ��?�/3a]��7<�qW^�S�j*M|��|�#>���Q�z_�T?<X��6cw����t�'�l�Ql��˧}�f�lJ���S���<kg�7����9�g&�7�<dٛ�q    �Rlq��ts��\����O��]��i�;��H�oD���]:�r���J��Z�cB\s���εlʶzqkc�z�s�߹)�~�6���-���S�����z����t�&]��@*s��x&]���.[�9�Hf�]b�L|�|��-�tv�Q�N�B͸ׄN�O�cҭ��jc���?�a����ƶ\��#1���xe�p��H|��|�-��	N/unA�kK��k׵m�I����JhAR�K�}"���8d��w[�D�g�y�f$��+�p��G|��|�=a�P��!܊f�����1-O*(ߒS��>.IF��D�S��w)��U��$�Y��[k6�]��3vP~傭q Fi="͜*�����ڛ>]���ۛ�����C��Zn�?׹�J��A�������N�>�V@��
�O����®�Q$����ggujF�7a�ݒW����=yh��𺻇,Q�����,��SN����h�{��c��������-Z�z����r�[,��y��j���bmw/�.ءR*�W��Z����2#�sIf؟�r𕵿ʛ/��ߓ����'�-ϼ��Kr�r�E{�J۩RQd��ѓ'���
��B'�����I˽W���|�*L|/���M���d��(��+�l83��␱�g���P��@}���~�$�G�ie�vo�t*ڱ濱�a �SY���}�z靵Z���q�픧�Mvk:�V�]k�=�������*]���,Ujj�|����)]�蔟WmRzN�Iio���a�v�vU
N��iG�g{�~��V��Bla�g�~����*w��`i���ۥ����Ÿ�#�ܡ���eN�ۙYNa�(d���h��v���L�:-������4˱#���6ӽ��Zn��o�����#ӕ׳����LbYn�˪��c���r��g_��ɦ:[�������P�0�"�O����Q�8�xt��IT�z����R���{�+X��%D3�V��9wqz�3s�o
oF9�kM1u@�N���c{c-�s��5s���F�?Z1Oio0��v�����'ڽ�\���	�^p����
8Q���tS���+�,;��]�� tI�RS#���ί�6k��6&%Oecn��Ǿ����.3O�m��c����9��ە��5�9R��C���< )��
�4qRb�LaS��$.b�U�ǖ�ũG*��➭�9�#�k���������k�;{m����g��j*��r�� �(��l=z3�+�B�R(,��ڼn�j�-�XV�fN�4��w)��SG�,�Mٮ��.PZ��N���(���mR�Њ\�ɿ����UF�b).s㑸�Zي�u�s��a�;��*y��d�e)�2�q�;�Emi��=!0����vGP�}��v��Ӟ�U��p�g����+�9��}O�V+��͔=V�Vk}J���@A�N�sq��m�N	��v+��{��x���2a����J��W��Z0og�2�sN1v&v�f������hK�y�Qӻ�"�vw��)��vVH1v%܅�B��Ζ%���[����M`��������oGչ���3�\�����کKѽ���Ш�D��=g�.��W���!K���/�f�k��]3���r`l���+f�V��vz�����a�Z�p����]9�S���j������'jv�gyw�����n���b�V
v���Gi�t�Y�~��$��(,��9�t��Gci����غ&ʟ��.T�]������	���
��)���T:�����qKL���%�+��Cd���/�`��	�-X|���W����
��i���{�c�snW�s�w��V�٭��%�I�d6+ͼ�j�t~�xc��M����v)%۟��G��*�7c�g�����Er{i�.��PE^�O%;'�Q���r�Y,��d���U޾Gm���Պ�z4�b�]�vt-]�,�緳�:�Ơ6U��u�K� ��B��_�D?����ە䜗,��C.���tm��u��ݐ����e��Z��i?�6r�'��vx����R��U��ڟ���He�zw�2��i�T=���ݯd�MV9#�MT#�M�UێTd�B�>~¢z�86v�-����ީ��X;�1��*�Z�_��������w��{��ɱ���wX��`o`���򡟊�+�������X�z}̈́U�6��Յ��8~�f� nw�'�O:j�Y�ݵ�v����Or}�ڤ��+�Ͷ[�7G]qz(U�J/��}�b�'��*i*��c���n���]�RנJO=hƧD[���3��%w��Ԇ��%آ��y�̄}��\�d5ܪ�ͳ����5Y��	�Ǌ�Ii�d-w�����ci׈���#kN��LY{ڥ-��<֖pO��͆aMn�ʿ�F�P�ra+n��#�c��G��;�IL���tvb��H}m�TQ����.G2wۈ�9͗��;����}��*'�"�Z�}��s��I���3G�X��͂����M�L��Q���"1s��J>5�X�;i���2O���5����WD5���/G��H�}��!�Z�u.k�94��ƺ/��G5���o�Mi)�o���>%�%J˱�P�y�H�=��c$���7��EE(�<PwY��\�/��,Z���y[�
�gN��凴���n����2�1?���-��U�U��!o'�*�ǐ��V�y��eg��:�=�5y��ٓ����	;/�q�/E����K!�i�MM�nʪ-�>`��mݶ� :vmߖm�m%�z�l�b�rI<�Y���|�B�A���2\^�Ff]���\�m�fm���,�Afm���~oT�����R!�l�\բ5�jQCw`*>l��9�gn/瀷�4hF�7U��DV���gh�>/Z��������TU+5���MM�oj���+]B����[�)�z���/tYԃ 嚢o����t���@�VVƍ1��u���C	����Tʦ7e���Edn2���r�H����?�G��,��
��_W�;���;�N�<��ӝ���)��k:ge'�|��yJ�~�����Ms�@�n}��F��C���I��ma*�u�utrY����Xe�ϴ��(��XͨH
X��;�L_�5vb�0�hd)�^�)T|�ٌV��ɖ-Y��d˓d�bk�b�V�i�شUl
i��i6m5���M[ͦ��X��l��tЧ�[�%�������\E]Cc�N��A�r0�-$���}]��we�<P��\-2��c͍n[��ȱ���iKj���\(|p��fh�3��X�wD�����KX(�t�����o���J���/�;՛�i��"/ѫ*/
��B��UТ԰_yYW@(
.>/� R��P�̼V�`����!�11�mP��:ztC��0�U_�ԅ,���dTy�ָO�y���]W������,� _��]���T7��m�l8��0�/���6�o��@^�؏x��]���ʞy@ƿi'�@�+�"�>�5��k`���$aCBY��,�P���)A���F�Cx����^B�Z�V�l�>7�Y�\+���}��sR��(���GӾ�N�W�������ݳ&T���B �"B �l��"@�P؈1�NdE3-e]n��`� ���ۚ�51k�L1Ĥ��R�����-�S+P.���9�l�N����]����ڼ��F���J�}U4%@1�[��q��h ��T��C�u��@�U���yWW
R`� ���
��)�ȡ+�!��BT��=ץ�L�79lJ�Kx@���1�P�y�[fu^�?jՂ��t?��O%���v���4�	y4�Y���k(BU�.�����A'��-�z|�ZwEނ~�/e�We�#�)	� T��E�E��jȋ�zvy��lU��d�*��p^~-{���,�jW%�=xI=:]װ���b(L��mlMY���#�B!H�9A���6����;XH������YwMK��T[H}_�"o��6�!+
�����yY���PC�M���U�[Y��� 1�:z`��Q^+�x<��lE�F3 �	k����U	�iۇ��s�qY�Q�`C�T����T+�G4��R][�lЈB��'!�y-rZ�Ϧ�    aJ�A���u	
�A(i���u��0[�L���+�D��#�a>T��*������ �9_����馩4&i��NN���1$�*U����D�"�jz�9�C��"��T#+�7��\KO�;t @�V�
�4/�\I������+��N��P�S���APUij���J�W'`%,
J��Bӑ-��ÃE���N��P��iy#@��m���ڔ@�����;�c�0�U	K�Rb:	HM� ��젦�C^i<�C0S���~����V�u2M䇢�`9�t �
��ߘd���9>�򬮳�,%���$�7���\����`��� �F����xH�aJ�s��6%�M�oK����!��/`0L	T�ޤ�M^ӢTa���t�.��5um$����x�`t` *(����]�'W�¬��������t!c�i0�Ʃ��,���Y�� ��q� �N׹�*�4�|+��&���i�Y �!a�������Sj��3����`�ؠ ����@T����^�z��n*�I���6/�&�\��~�5�ZS]k�|C�-���<K�rp�`^	Ѕ/*JD��5Xy����{�$h������e�Cd`]a6*����zzG�;H(y3`�@i0��#��� s��]yd͐A�
x1��(�� y����8����928���ǫ����2���a���%@��A���3��0��P�`�>k(fpU`#ђ���Ո���6�Ϥh���u��CmK臀��T� ��-mw�T�f4���_�9�<0���Wz$������!\B�ˡ��C����dR
`	w�>U�4���n��)�60�-p��>����J��X BK����0�bn �+r%x O�h;O?��,���?-z�o�B�0�0 Sy�� .@����Ue3T Xg��,�'u&���	����ʉ���|�xl�-���4�N0�06��v���9�f�
ꢥ԰�=�X8�I�'e�.ɥ�Ϙ����Ր�7���`��E�j�xIp*L)��G�@�ϵ�,+ح�C�Dr�5��M��M#/�5p��mw�?�"ӌ�v��:x[�k'�;�YEAW_W,r\"�ZB^H6`��JB����`����sP��@��i �@AK #���˦+�g�����W���w=�
W+K�R�Uh�,o�_f�JIi#@8�a�3�+fz�&��S��Q-	��C�+h��,�-©��2vCW	�9" Ğ�0�F�CF@ݚ��4���ܙ���'@�z��,��"���S��*6���W�E�7�@�K_�c$���䁃&�?��6Xi�u�w�)�ޏI���N��!�@�ВK��i����*�Ӵ����E`�t��C��B�8�v�L�m�� � ��CuH�0��Dã�y��nQ7��W��#�F��d�Zb��zC+KM������Gm���2`�$a@a9�z�NPR��2���4��H* ���(�GH�E���4t�U�
A���o��?w��R�"��lSx�Й"PuI��B�g���dP>���Ѡ>��h�k)C�]dc�Q ���$8Hy�X^�0  ���/@OOA4��T�ӓ�.a���ZIҚFSA��y���4��2�5Pb;�k��tΠ�h�����)��J�����0�A��a�&x�f�!>5zD�%\\�@K���	�c�nB<�2�P���N�w��Z�Zð�}�#^�m\I��%&t�H��a�˺��AdMa(�br�J�?�A�[�d*���$� J��Zh0�Lh���UM�(��]�C������|��y�U5_����NK����І�(�,4"�
b���}���p�I0u�qEpg*����`-�\���:PА�Ji��ֿ�F p�HjW9@�� ��`%M��BH��(�@}��BF!��81I'�솘� 2�z�#��[@��XS=C[�!�]����/%f��"���G���!-�#D�P��0Dޭ�h�����E���1!�,�1�K��B�كˀK� 07�,$�Q���e�;��p��wd�0m0,�e;Kq ��Zo�>��ِ�}';?o�y�a\�;5p@�R�*<5 .B��¦�L	�2�j�z���I��	�M�J������u����D�J��	ATb���,���M�A�`n�7!��%а�IH�����-��9�4`[���F %� I�@�S�pb�2�M�B�{D��d�~�d*L1t��A��)��@�%BƎ�.F��ER��hQ��I���/�9����@�ʢ��!ʭ�<�p��|`���-�0$��EM����̴]��5!:�=e��� �6P�FX�
Ȧ&t��Հf��0f�� F�W�|�2��2|��_*�p�$��-,r_���@=�L	�K_U����0aɛc�(qO�WV4|� "�`f<�<n��7�f*�]� B����*���؇�H��j:�Y��ĺr a*������|�iVz�Oβ��[v��Ì_Z�����
E�����AF���( ����?��� ���޻#�NT�T���@m�b��Dl��^ew��+�Q~�/�a��h�p���/WT�K4��H0T���-.)�/��{���3��P?U�T�0a��vȏc��!�l10�(P.pK(u  lB@P�{+�YB��'D�0~��C�H!i�h#&jr�\���R7�F؁����2��-�I��@o}-��+	x��$8?�2�;D�%`0�������j���1P����*���T���y�TPE�taB�)��:�?��B�p+
E�JX��Gϧ��0T��*���`a�|#G���k��!Ã"�A�(�η#_u�"t�T�l�xA���H��/��mG�\I��=��;��D7$�)� A����#kWծ��ZҴ�"�kgF���h���3=:p�Q!�	n��F�P;<6
�c�9��@��rR���c������5M5K�������^�Y�O6uv� |ϴ>譜��vxg.�m�Fa��'~��7��I�r���<��̀^;��mVr��/`��RP�_��j/����1�xΘm�n�Y1�&��y�8L�>8OdCU���ͦ�Ơϻ�:����A��������؁bg*`m����gl�-a]3�)���3>U�A����;=<��j�~�,� ��D[,��8=ł��"@�v��E�<�X]��z�K��eOp�B��#����	�p
8,��[X<��
ψ�?As	�ż��"4����}�[�08��4�B���1���X�SG�8��"���ʿ	�U�~���8�˂a�W��-��!���ol���,��
v^���.^��͗��8/4�N�d�$��-y��m�6���y�&O�������&f���'���w�b�Fqr�&F��qH�9�jI<9�]�w�"2�?������.H7�g�/����uw}| V͂Oe�J|�y��P�}3�hRo$�;4=v�5�'/��}&�����[����R�g����	�'��!q�9�# �t�����|�5;/?���$$o �8�d� ��E��;��!�.��`�P�R��$�W	|n����7����<��oníޞ4K���i59�����$��+����<<�٬"x�j��㾖�$�����L���<p��:�7=�?*�2�%�S[��1l���P����*�F��4x���xT^g��1�͟�wQO��~����O3r#�/��į�jt���N��Tp��=�?\%��5��3��W���)_�J�c���K8�ݬ7H� R�>�`&5�v���Iǟ����    �:�����$�=0���Ԥ���ˤ������@�W���0Ji1�X�sT���gC��n82��[T��Z;�F�:�Q/3��d>�kN���;4^=�2a�+ ����F�� ϴ]+���?꺍�"@+q)�e��t�e}�e��3g�\��7���;Q@F�����I; �]��VF��X��> ��2b�հ�U�7���Ǡ��4��3.oYa� �����oE�hh�]J�bt�aD5JhD��710U�XA��VL��wcs���7-�!��wҀ��F-����м�(l۵�D������{`�q��!�ݸ@ `�+�;����8!NF��ucXp@��ufG1��~2�=���D�������i�h����-?��܄���Fs�����O�Fb5�7�M�ݵ���6��rT�h(Snii�*�ʦ�$��=^ǃ+�15f��0�Z�v���XsCD8�c��(`��\:�X=Z��p��t�ȏ��4���u<oV����b?q���pD���h��O�W��D����{��4��WQ�@m����Y��AOg�7������9nn��M���}繗'���|�?o��9/ g�z:��	>:.�[D)&AQX�~�3�YF��a�H�y�:��b4t���WD�����÷��"�ו0c'@�fM�]��:47�Nə-��b�&�ft���X���Z��38C�2�v ����Yɜ�d��(rҭ�7�����ux��CG�IXi�!f���¶�z��	�u����pc�81hL�{�	�M�{��P`�!�^�dߪ.='��W�(�e�q�Z��{�_�aC�53Ff����o�ߏ�x�˽'x�]�S�6 ?�8q���sy9޸&�z��&�6��@0�W�O4�vZ��q����6�Ҥc�1Bx����O.�烵�J���(�lL���|����n\��� 2O@9���G$}�8߸�#�s`�ޅZ0�}��UT���c�o������9���������?������������M=g[;TG�����ԟG���d������9
�o�k�ܣLm8��+Ɵj�-��T���1����O��2�t֯;�(����>�[s��>{��������X��?c;K�_�N��f7�(�6��������:FY|?�y������ϼ�]#�� ��k������������7�y��=��Fj;(�����}���[�	k,���j�n��:qd���=�y����Kd��y�aa_�~��l����ޮ<�LJ������������%1�����<w���SxfwF����Pp��K�y��gU��x6��תذ�����\�ؚ�Ԑ[��^��ϿU�������"�}��'�,9�w�W?�(�_�^<�����g�����?��E�)�9E�	��2|�TF��_�FⳒ������7S����W�I��\��~��]�ƥ�;�j���xbю)�e8Hg��׵���:����B�/�ПOǟ�5�������z�N��Ac��i����?�n峮�>�<��O鴟{�0$>��|׿Xٟ��Q+�a���\�?�����o6�����ӆ����z�?�~<�?����_ޱ��vAk�~���4�e�}�t������cM�x��O���ظ�>����ۿ����������\����}B�Jg�v���x�����"��uJ��[k���=�������l�?��������,&���ڋ~���ע_~��};��B��m��Տ�81�8-��o8�d*������u~���o�!��Xj������.���u��w�_�/����������&rS�3���q���b6���/.����xͿ6^��#6������z��������o������k����ߧ��N�^ɭ>����:i�j"��������'?��z~jSR�_�u��u3s���K..K�Q�K���u�\�5����vϨ�8��f�����E��W۫���o�=n��P;ֵn��'kŊ������I�y�j�RJҫ��P��2gE_˽�^=����{�9��<�Q|��>�q��Z��Z����c���̓��}�������t��n����ݛ-yk��g���c��D3�YS��S.�����G
-z=ϛL��o�&��h[K�|M^���I�7]�z4��v�R����(yZ�ŷ>w�7�"����ebͽ�n����t��u`�^�K��[���;�qh�,�=��e����o^c�����Xۻ�ѷ�g�Wk}��g���
7��b��6co��wrxܫ{֕ڻ�S�g��;?��@9�f��9-6�=���h�L{�pz�>�HN�x���l�]��J�3�~�rao�Y�TY�㭛S�&#�0 ���#�o��?�5�]x��=Y#6���F	��9��<M�Î�#�8�I��o���,�SM<_Hۋ���������㒓�F.MF�w�a��[k��i�e��ɦ_�g_)�
���������5�p���R��϶Q�=ޖx��-���<e#�?|�j[[pR�� W�c��u��#8�?��.��O��}���a���O||���[��������W���_��+�}忯�������W���_��+�}忯�������+�t�_/c�B�,�*+-IF�|_ܻ�~#-�}��S?f��6�����XY����~�.r���M	Ҏ4�c��w�ӻ�1e?�3m��/;��l�y^#�Tn�Z�Ԧ��9 5��\?췉����o�A���cWI�'?�ob�|���~=��{�����4�r����8#��μ�h�{�b+�xde=��r��5:��O�:.�9�ͽA�z��F�	^�8Mb���|�z&޳Țy�R�����w:d켮WF�z݇�����o������}���k2�a�����^S�${���Jw=��e��������g��+��9�c{re��3E�<,����w{��;��lC"�A$����w;O�����W�%�8)�f_�i5�^ۘ���Hi�#t��y?V���d�t"�^M�������Y�Ǒ_�Z���rGg���[���w9G� �n�+�����Ϟ<V�߱Nc��Y�@��}_<�]�k?����r�3:���(������{���U��mI����֗tgoz��՚�|�5�_�g����.����ng��]�l	8vAn���J����W�F���~~���n|��U��sk��}�`�9y�1�Sf�+�6�?f�\GA���<sz�ú�y���S�Z~O%�);!���-�>Jr�x����b�}gw����/U��\u�k+���G�c��mo�AeW�6���~����^
�V6��y.N�j�|״o����v���<�ۉ`��=��)&h�w_Ҭ��Ͻ�'fW��U3��*s.�d���;g�u�¨�:�yU�z��ʱ$�� �t����=o�!��.1��敿}�vYʬS�9УނO�=ҵH[�G�y�u�h>\���9ύm��Ń�>�k�v�eM�~ڔu]R�J�R���� ��X���W1�oM�����	�9�lʉ���^!]��NQ�`�.�k�������S(�aޏ������w���B?��01q�'�RN��זL�~��G�|�9;ΖsՐ���B��o�Vgw��×m��ud^����nV�~vE���y�[
��܍�6R߬�l)�h�$?��O֜ӱM6Y���>�rQL�aK��#?;Ӝ\� T��R��}�cMN&k�\II�P�2��~�*�m6����v�)� �r�#SJ��ҿ�y�>A�����Ӑ�3��`��[p;?�Z�Ϋ���13��۲q4�!����J��_��b�`�]*����S���a�=>��m���l=rۤI�ؔ{I7��;]�%�\�}?�u�OI�?��o@���!h��{X�p�)�=��u�*�w=W�����!)���3��C��韯������,_"/YX�C��xɉ�U��@�R ���#���Y��;v�NH��:q�XhH�pé���
��c�z�~���YAf'�F+�h��er��įt�#�E�-1���    .��'�nw8A��{O�*ɸ��ʳ�A�%m�PAf���d�.)���+=hAs��8m�9��g��07k���n��G�i䈨�O�V�����}�[cH␗�(<bշa���!9E�f��N=Z;�dM�M����%D�.���c;�K~oEL0?�(���|�O�I�,�u%���>�
�+��kcMׁ���k��)?�� ��:����Y�A]���?�x#A���܎����~#�C�R�I�+�f%����-CBO<Q�3������7`H��,��ڠ��א��70���0�W&������I����R\+��s�/��߱�E=5=s�KW��G~�"���8s�Ģ�U΋����@�]���A�lY(�����d�����]��`*��h�W�6;��@�h�QL�	�\)�	f]�+��:��H����}x��ϖ��I���9ܥ�O@!V�U��
g�O���؆��{s y͑Q���r\J6�].��O�Â�S�����J�ץ�hp:�^e�쳍~#�߷��b1+���f�1�Y�Ӕ�h���{��Vť�'h���0؜��#�h��2�����!Ƌ_i��C��p�}Z����Vc�etq�d!�!Ea�ެ�2�W2�<A/�ihX�)�t~��u�r=I	��I����X�V<%�jHY��_�,�n:�KJ��6���!{R�_2�9�b 0"W�_��t��$��-(l  N}��{$��/ϲ��x��X5ٿr���-�;��I��m�
Ds<���l9�x9 ;O�����
��dD�g�B�j�ٔ
�����x�(k��*����ܥDb�.kV�e��Uqa�
Y
7�s|_Q�"�ؐ��
��򢧶ԇ�-���[�G\\ c� �AH�Z�C��.	��0�n�yq���Q�Ln��=S�>d�����lwʧ�����y��̲���29�I�R���R�����=��jr��ˎ���E�!Fq_��X���د���@,��v�HVD��U�6<�Yy�����pi�y�����T���l3�>�XVL�^	�~b�p)�^r\8���r	�;��I�(��ux�;�PwWY���?�Dv��:�����z	]'lK`�%qؐ�FNX֛7� X��ި}>{ֻ���U�t?r���G��q*�*s�%�}X��1z4��19�W�'���LiEܷc�F ���Y���O�H���ej\�}�%���ql&�����N�b�Ϡ?����6�]�L��pXPu@� �]B�pVGOncD��0G:NҒN7��m�v&w/#B�Z� ���+1���x��.3�������(�-��������B�܎�ȒG� ��GU�.��[  �c��Cs��	��&&��;�����y�Y�.im�X�bv�em�cY$^���\���<i{$���}����?b4j�<,:s��/��v�}���cÀYA��k�w+ < �45������
q6�5��׎�sTC^�,o�AeM��'&�Ij����é`��=�<b!ǘ��틝��@6������9��Z�ǈ��
؎G]Qe�E�>[
+%q��,F�����q��Z��ˎ�ZTP:P��J����<I ��}Be?�B�0����>My��-��+!�d3kR#"N݋�����P����nw�.T.hI%������ut✬�4�Ө��tD��]$0j�y�I�Ǚ�x�8q�,iS�AN���y�����P%���'f��m��{I��EQ�"�8f�ǅ9,�V��3i����O�����H����>Rw����{ΆU�<kֻ�|oG���ܓ6oT�$�0ڸ�^���c��ur��hu��/Y�=`��10c"hV����!�yj~�6l`:�SުHCg�z��cɏs��]���b1��� K�cm0���q�摥�Yn���c��Ѳot��0;��=]$��!�V��$�v��?�9�y���D|�	�>,uݘ���\j%IP��E�*�!��Y�>�dM�lsx�:�̂,6ǃ=� ����y��� 7�k��o <0�R�b�)��c�_�s,�{�3]�V�s($��|�G8|U�ኅ�2�Ȋ��qH�]��+�� �R��A�~ye��>)����`n�8���H"\y��8,0kŝ��߸�^W��u��F��iwI�7L���l^<j��a��Z�N�2B�q܁#��-���2�A�^��ek�K��w�3<8َ g��$F?8�en ���n�}ɤE�%�˂j@[Kl�Sصf�啜�����H%~�Ff��_\G�.���$/��U��v@C�_�4G��pߎW;���.�=������K�� �G����Ə�x�i\U�-��x�)���#a��P��~~:ȱ�K$
�n�mw��.�g� 
����7�3�p�W�@���^�p�.�����DF�X�!�[��XS]��j�-yȬ}����@��v�I]��&��2
��f,n��
�zqLq�0U{hG-�8� 9
������G��*�����N�f}m�١;���vyq��X�Ϙb���L�����O:��+d�n����x��E_d�'6�sv��W��pr7�x�|�	5�m�����=P��&��O4�,~�x���C(�ZbU�3���1ӓ/�7��q�Ϙ�����;b����ñ%� ,���9Ad��ŋW������@���L|�*H�X��x^@u����(�EV�ž,[5� �z1�mVv�v{�yI�ءl�7A�O^^J��W_O*��@1--n�ӝN{�B���X0��8wL�i&a����8��&T=^p��ma��f��?��.+����>^��
N�D��.R�g����.��Il��:���?��s�{���Ǩ���X�������Q0=��^����l���U���k�N�,�ͫH��=�H����3���bU�`�_�	�����ܝcz T�m��`���v�����Q>�SY�c/
�U����$K{4� Ĕś���k��Uӹ�i
�ʤCa6Y{ ��B�.�#
k���sE��Ί��'J5�����&=��M��ܫ�Nѷ9�ƭ���BV�����X�j�F��jL�ܛ4<ˑ)�f]��E �\ژw��1ao���a`���d��:���[h�Co�&
1���87�����6P7Κ��=/��2�g��BA� vZ�sAc��m7"�o��\#'���֯�ڒ��z�<�Eu�нX� �`T�j�1 ���F�$�ԑ����0sq��b�.�98���Pq�n� s5��8�a���>����ٱ�ո�~'�Ã��J?���T��y�L�l�b2�F��fVm �(6��.����q�ƈ�Y͡'��6]ՙ3(���v���;���p��rE��\ek
�a��٬��W����b����نF����]dA�4���^��c��kU��8U��d	B6�լ'�qb�ebaS�t�Ơ��!a��%_+�$����bs���a�		i��aΧ�1�R�Ɍ��D��q�F�iW�����# ^�����:F� 9�r��OR�Ǖ���Ҷ�Q�g��o�6�6��2҇c��SE&4��Y4�ޮt͠C�-�J�-������X<a���ׁ��T�!�N8�#�_��^EC1��0���̩�nʖ����a@0��p��[tgA��b�#�L��۞�<#��R�m��NF��ᑏr�Z��O�K�ʓ�\����9�@��c|nώ�t�ωZ0����Q�; �F����K�Q��S��'���vop�9�y< �i�_8�U�pg�����H�$\�Ou"�9�h��)Q�Ǉ�u1����s���˜8��6 @o�yFC4��̨�Q�m��~�Vr���b�d"�A�,��(#a|�#�å��,�:y'^С��0Ee��Ҽ� *�m�k��!�?X�bIi1)��W�J|\�&�%c��ѥX��:8�����q��|�u������=b{��!�Tŋrv���u�;!J_vO�v+n,00�q�wo u�0�r�    ��v`tĞ
3"�hM��q������jV�	������	d��Wl�%���j`�O�KWt;޹��Q�q��.�8�Fe�ʮa�܈��i���UX􃇥�fx�����N�Н����9L��,��	\�����ɇ���u�9�n��N�����)�����8�5��##�uRH���c����_6�T/�ӗWӍ��_��M�(
�2+v����MCw�(�F�w?7pxa�h�� �җu����(s�7��(]Lu����<��k���m`x�0�ndrĭ�A�;"/02�a����{ȏ"ٽaCg��G����x?G�6�wo]i���������<����'���MRR�]ҷ<��~�͸E1}1
"�!O���C�!�ێ����N��'ycW�q�N�g��x���6p�W1����MD**r&�/q���#�DJ��`�f<"t�`5i�=p|������.�и�4~�A�G8�F�B��1#���� ��NcL8�˖{)m纛%�ߌ�"k���d���$�*L2�C��?b�k��b��w@�r_�sĝ��
���"�=d�X��Ɂ�� �s1�.�v Zvf�sK�/���sA	���6��X�[���b�1�GN�".=�\����;��Z!��b^�x�-T��ހ���m�*i��Sŉ�X�W@��D��o�V$�r"��� ��q���tz=n�L{�c1��v�F�!��4�j )6k���m���=�I}+�������:�8�����3�%�6p��8���,Ђ�O~�b0�s����e�t��Ne���x��g����-z��x�џ`#T(��i�5h�/
I��M�f^�N�0ha,hl��:9,�x��<�C��i5Gh�@C+�L�5G�"q������ho�[2�y Kmǣ/PՕ��߮��)���<��v���Q�	��RNX�l%�<>���!2����{��u^�|��ٌ0����w������ �:��*z��&�eķ��@5�ȸ9��g�G6q"?:��%7^�����|W�zGd�ʡ�:��a|�����#p���#��S:�\�Ƀ@i�`�j��#Š{�ts�: ���Uu�eFF��k˦�i݈����B��*l�`���vz|QOw��a�Z��[���|xG� �B��i[ʗ��i�+}���ܟ?��o*ׯz�R��{q��I��M�b�h��fu/��%�� sR��8M_�&X"�q�ű!
��r�a�o҆��_ВF{9����N����z9�����w�=�"a�����שn�T��b :D.��x�;г�Q.���hh��N8~F�^�FZ;�7��k5Ͱ�+w�x���`��U"����D���k��{l��AŁX����O��]�,��=C]�%5z���R[���j�P�N��SW̥���8�兜=w��k�1��pv�67���V"��E�Y���H��w��V��_N����8+󧚀��d��O��W��䍶^��9��^`c%3��F�^2�r�+����͆O��0M����ٺ�Z�`Q�:��I�q����z�s0�+��u�T�{QT��Hf�4gw�/V��dՐV�+�X�n�ע=���	k��oq�<LV�}q4�k ܀-C��K�{��z��pH
�Z&k��6��h�6�R�c�� ��}�c��Í*������uGf	�cL�8kS��s|Y�^�o>�V�>:���0�~81��bM�������c}	Pٶ=c��7��fA!� �6�9�?�����c\b~5d���6��;��.�/��1��ax ��Ljũ�Q��X3��J�J1�H�pg�ܘ�^M��3�k��
l_��БgBUYX���7q�֍fO�����޳+����)��E5rr4���jc��O['k�-���F��ΪE�|�!���9��Qց!� ��:�4�o���~�]���Y$lR�X��m�LD�8hoEQ�U	]�[h(�̸fD����9��|��F�Q�{���@4���\X&,q��1�#Ǽ.�Q��w���|E@��樍�w#���1k5����o'�V�B�(yBӇB:/��w���vR�O�W��zp�,�E�g�!���u��;B� ��﫣���(7v�9��1Ӭ;B�^`�)V (�ng�z(�8i�f���n�0FV��o�g�u<���M��u֫�Vn.�e�]�x7N.Re���	�U����{K>h�Т9�<~��G��j�}�X@]�a��w�-&�@l'����ȉ�Q�-�l�� x�?7j��S�Ph@c��%qy:�){���u38��q�c��SL�GL���5��Vȿ<?{��a� K޲�����D�NX!;���c^6��k�ղ
G�󀜩�X�x�	�#ʷ��k�d ,�n����m.�rj\w�����e��]3	�8ʏrԌ_���?yt��[h:�7N��,��I�ie��蹜pz�,':C�V��*�����SͶ�'\/y=�f%M���� P�b$P7����zEOL���FF����E0eX���X۲��9�:?D�4M��|g��xT8��l�s๣˓:ZX:N�->�X�UF񅪣Վ��W'�d=z;�AvH�=1�����y#R��E�u��<n�u
��ue65`sF�1��lk-b�߈W�/pf�up�K��`s�y{�ƹ��A�|r2�"o��գ:ŋf��U�9�"��"����vB�zX�t5+�"C����v8��X��⇱k'�\�M��r�sD��5����Xa+����ޱh�b�=VK=߆�[f����S1�j-g�� b��hED�GэtY4X.�\䗵��ec���7�=�pm��&ҲY%f^�0�|UO�6"=����.�<��}��:�l�X�[fA��A�(��8a�|�U�>RD���e�ָ��e=_?��>+?�Ro˜D��d����l�S׀�[�B|�l��Y�Eyp;��[qf�O7�W�:D�Gv��Q¾��G�)��U�u#� &���	�x�rc��G�c�L��E��N`��ԞS�i7��W3���x�=��U~' >�ѿ:�����d�_���X��#����~��l)�lۣa3�39ˣ��|El�*wt?N�Vˈr����7٬ǥ���Į!w/c����íb��������'�~������rvat�Qs�P�`qa�K��*X�;�pz���M��q �#�5�8j���� ��H5��Z@��Ȼ�������i�9�(�(AsmNjmv��ׂ��|Y
�Ƹ��m�e�V{��ç+�)�6V���-?�x�le�����@�
&u쎸������@O�������b�sD��)'�������R�����ۍ��?�Cz6� Y&럷x������i�^����!�������6��j]ӱ덆n���x�
�	�CO[KR���͏V�r�=��3�9 c��"7�)�)�WMgYe�(��Y	���;�|L܁�Q�[᪌�ǹ-�tl���_�X`��=�hǻ0��^Y��X���b���$Lu-�0j��Q�F�w�y��(�a�b�`+r��O����ǏJS\�X�AU5�;Y�aE����N-�*�P_����e<g;1I�\ʹϨF�e�9+�t��?�;O=sH��W+f7�͗�C��$��et�#d����e9��t^P�5G���18x�k0Gr�Q�^i1�+|��a�؆��z�+"�"0rP�Y�o�}���vZP3��]���ۮK�,��눳��֢�@_ :�1���:��Y���(p8��������H���W��$��o�2����_=����Fc��;̨x�#��M�וw<vK�`����K#s�*[��D1va�D7��~2H�`;� $�Ѱl�]�*h�,������@�J����#]cN���)	�IK�ꂢZ�mΨ���N�="Ș,�Wi=`&��P� �����1�w0��|N�U8�e���GT-�[Gޏ�?s|    ?�y�oA�!��TS�=zc̆���8�p�f�2A3Z�KF=G:8���� ���׃__�|�qo�{gZ|m�>�y]���v�����R�J���-���E>Y���c�$�:�0�&7�����TB:�dld>����x2��ρi�����2�9��r��`[�0~�o��֙ðB�%Hؤ��
Уv��ȟ��yv�d��qdS�5��uN��t���pP{�"ހ6�̡;ՠ5f�n�ȴ������{�A�ݤ�o�!p��k���i���Ӗ��]Ҁ�?���}�����a��mtr���XI
,�Zk����۱{�5;�v-��>�D��k�_�Ft�6�\q4��˛�d+w�g]��" Y�ӟVAX�T`����s�*K����1� �$��_�;��z�k��3��0��-�ki�9?�Y~!�����_%�,��kw8���/�b��a�bD�l眦W �/.+2�6������3}iE��6�O��|��5@8,=_�;k�N>9\yȟ���aG՟6]w+Ͱ6�z3�Ƿٻ�h���;�}Q레M��J��\3���7�|��v�n��Mp�|Ui_w�ٖ�;�G���ܫ���"�n�|�>�oR��pj����ط1�A�Ȁ�=����E�PqW�����p������܀�O�vE%������: �oc$9y 9��͈�<2ѿlXt�m�����ME���Q� s`2�"��Ư�'a~Xj @�� ���X�|2 )�@#����2Z^�i�A�h��dь,�~cY�mJ�X�`ǻiR����L�8���Yk�l	9���f���*�< ��{�����
���ؠ�9�c�` N;j�vv�+�Sl����Oz��Vk�
G�n��|uxf�î[�@e��M�/h��96v�^A%�c��P�kxT=�9�OF�8���J_-Wlx����l5&�1�^�,�'m��"jv��Xd_�$V�'+�� ����ms�}޷��3�BSw�T��RT��_�|�._��6/�u�b[Q�ci�I�twN��#�.��!Y�����H���yA����Оm�Q���ݞNψq=�3��V�n��7:��V��aԋ���j�j��}GY�C�U�=R��ݤmV�0���X���q��.��P����8]��cA����M
�V��2Y��ʺCi�5,�c>��hוN��L�u���xYG:�в��ЬDX�8�'Y��^F�C�6/�#�+�]���qW|6lHqY�1۱��6o�+��\޷k٢�-i��#�>�!�{.o�e�?�����@[�"8��`l,������(���MS�Jv��.���޹�.�M�̊¨t��r]�t	�8�D���A�?��D'g�G�?��W|��R�pm�N6<d��GR�2
T���A��Wi��o(O��b�O�ҋE�Ӑ6�ho��s�[?����n�c%4��S T�7����J�m,��^��iAl�:T����%v��W��|�V��ԄI�Q�y~LT�L [Yv=?�I���o�{�Q�B��{X�m����I��k���nf!_s����s�z��3P�\����0��,�Ċ��h0��� �Rym@�mW�:p���<`��>k��)���d�s�n6'$�"�VG%D�h(���=��H�	$�pb0�4Ox�x�ȝQ#a(ϒ�O���4㔝�]2�z��æ��|��=R�i!^��P\��"�!k�'oߌs�@���֚�=����CoG���))�f�����I<�[� ^��?� ��P):��'M��P���z�s�nP�-�Y���ڊ�Sn�qF�f�^^�+��5�i�{�q_k��y�����L�����4���M]���,M��\��!�mQX�B�I�@U�=�񯑷�m�X�i��;���� ���z!]^���٬�za�ra���}��:��`��j�˫��-�X����ղz�HpTR����i��S�4I梗�v|�7�'��ˬ�q�M�8؅�t�
�P�5��Be��'�
�����p�VI��$y����������[�w��m�d&�(�l8¨��&�E�`�94 ����2�$����@�m��_o�? ��h�+Z.xk�������qk�f���k�O�-��y�q�I����p��ּ���5=p�d��T�#1��F�I���c	�����F�e�ܰ)r�/JD�F������S��Wy��n�����	0�)P���t�uf,�5&�lk�%ꮰ�� �,1��*0|4�y�8��8���7�`s/I��&�@-*̲�'��aR���B,��j]+���èŋ���뫁��dk/�3�Ƀ��`Ԅ p�������\�5���Ȯ�GQ�n�ڡѫ_'A��Gt5;���	�����,d�Oh�˷�ts��\�*��fl��e�����j���G�8B^yHd%A� �f��E�x~�������ZD����f��}rϷn�k��˂m�89��v]v���./�%������	 ȰF�@��䠒��D�>ܯc��o���C��/7qO�T
�g�O��t9N*�XF65JU��/+�V�-�<�Ce�u	��������AĖj���1��~(�����R
���ֲҹ��wz�鮚iK�rL%S]?��$;EJ�� �[�a�2�i���ͤ����c�ê�}�	��(�����K���<-��	%�-�ڣ��*h�iZ�=�V^�0�
�΂c�N��H_I�Mxt��h|��r�dU�m�����0kT�3�0��4��B��(�7�n���m�\�aI����n�~�Dcϖ=0�ptի�q��E��>9g����$ ӑB1�vzλ=���]|Do��%`����Ox�l�^a�#��G��[r\�˛�S�Jv���=��l#��n�{h(6Ǘ�����%�gԭXlZ��� ?&0F]ό���.V���dK�,EQ�ޞ������(�v.{��UF��I�y���G'��t�aP�bL1;8�}�re̽��s[�N��͆D��8�"� ��
6Ԁ7dA+͎6��t��_gqP]�q�lS���zR��}u'[��]IK�qE��/�}��1R��9щ�c��A��ʠ�قZr�z�<��"2ę����=�
7z��e�\צ���/遐�˽�C��ld��!B��[�+�G1��dI�p�=Lv|Yب^�_k�8��J����Z%�?�Z\�w3l�u�V�۫{k���cse>�[����8��u;�c+K�Dg��#{~��|�m����HV�aЀO�=�_ٟ��iVV�P���d(_gܗ�������o�j�z$c
����_���y�; Ϝ�Kϻ��R Z�f�{)�F�$ld2ϊA͆����xѶr��y(���1�)���S��Z�)B���(O�I�g�A�_Gp���DI��6:<,����d,�C8v�/6�����@�� \�y���i�F#ݞ��P�RԽ�2�~o�r�ɮ'���w��G��T<������,O�7Rmy}��+,ܭ�aVS����nyʵ�Q�хS�C���MZ�J(ιأm���ث(�c�aj�E��<v�]{	ũ��8�����Ї��Π�
�b�?��00��G��@t���:KTg=�$�����W��R��S��Q��Xq�d�ج���@��Ð�Y{Xjg�=��w�Q�栃�q�z�W��ݏl&M[j��S��1�g����O?�f@Oʚ�.��mK5*K!f�d��q5��:����[[�2E�-�k��v�E�j��ї�@^�j��B������я�Dy �c�Rp�^�|�`J\/�	4����߯�Pd�dP��G9vI����6Cڜ�a��|�Wtv3�v���#Ϣ$�ͱ�~�B�&]�����6��ĠqYq�y����\��n�YN�q��th�iq��ћmx���� �l�����n6�c��)E)4��G_Ԧ���+�1X��N�8��M��	���Ω��Kh���ѯ�٣��T�n5��t���&I��ä{��a8sm
��>�l     zL�
�Uͽ�UGtOc��5�	z��v]��|�s\�M�^��8K#�:��8T���o�r4�}U���O����]��z���u�+x�61�h��A
�#�_+�� }�]�ѷ���\��Up ��� wk�]-XK,����A�C��Hϴ�����&�Ӝ#�/��C ���u������淌F�Ä.�f`��vb��O�P����i�4�������Gºt˱������}];1����i���f�8��[ V3�ށ_�p�\����YiJ۞�S$h7�m9�ݎ��d5���D_��&?9;ۛ��_��c_�����C.����{16��v�tdܳ�U�C y��e5��LI����y���/�0^�/�6�:�r�Yk˺^똃�y�c�� �wZ��I\���q�����2�Y,>�"���N~��ٶ��Bbv�%��痝*Oh��B��V�%7��V)"�cZ~���m����S0-α]�]����+[�e��\�6f ̇<���ז�ˮI�F�4Or���nd�T��bY~q���%����q~ �mjJ��=��/�~+(�e����r�N)g������~�Ӫ � �]*3�!��x3���wwl������F�M
[�����T���E��Ԑ�J�γ��G�*��S�c.��*s������a��������m8�&NL�]A�wbZr3�(����^Un�7�٢��B-�����)���AȘ�ml�]�28zdD�v��`g��a3깪m��N���7��I1!����d�M��U*J�����5���;W
���ENX���zY��
���-]��'t�ԉRxxEk����Ѿ����dMD�YH��u��긴���d��9�5�,�:<M��Ŭj�;�K3���'?8k<_CvDd� ��@n��v�D��5�D�ݥ��_��W?`������a�AdF�>��H�j�S��l�U� ��J�"@U���Ԧ�ej�,7)+�[mȬy�h^��d哻m��^kJ�! ��ssĔG�u��1yL��I��||8��~|yI��<2�M9�/�g�&��3,X�A��MBg� ~E[�ʶ����]LQ�h�N��U '�����e}{7(]ct�������+� M��ӽ�7�� F֛~��5̢=N{�ג�
�š��2�u[��&����B�f���A�f/��j�L$��&�sb�Z�OG�/�n��`WϠ��Y����+��n�+uF_�©���BJ��5�oh�u܏�[i�{���E>�j��=r�Kt��:-?Fucpc|��<G�2+�f�ঠJIU�Ol2]:T�Nyy.��Z�.Q����;��m ��R�"��1>.����{_N!~)_A��cG\��4j�sH�`�y����U��dC����Ɔ=���[�ܜ�N���%i7^��i�;�.4�z���}���:֍�4M�����2v� � טSl��P�3�^��Ф}'H����c��:$�����#>���(Y������!�k�)z�����~��� �1���ϛA/�%P������g6��Q�O�|��=%+��T���=!�FL��я�&+W!�_��!�|N���[�]��<j��Ye���Ԫ;e$���X7���b�'��<�ֱ}	�$�t���W�o}.�����Z-��ns�˶Kt�5�\<�ФO����=�:jzIB/�q�D�c���(���`P�jʾ��10��n9���Y��&/���|y�����br���.��£2�/���y6�;�� ?��%��֮4m��`�u	�-;����y�j�?f��8��&ـT�7�(������_ �Ƕ���#���<Ș �&��Yv��=,���_�/� ���5���(��E�8�`�����^��~_��s9�g嬑�Gܛ3j�\2����:jɑ3#��t�-Z�����1��+R��`�q�g䓭?�DV	z�X��t�h��,<P�S��F>��0���a��Z���ſ�����n������h��\�)B����ղc�_�Aę��pvi��/�L_�p�,|(x��M�OL��`�0���G(���X�qx��=�pc�Q���5RB�`�.WD�y��b7��^=��Y��,&c�e*Z3�z�y''�\萹9��晚�'j��\�xq����uQ�#'h�>;��x��i	�9��m�x���þ��:��d�!���bʶ)����nKy/[���׿z�ce��}�C����?:?��x�ՁFL��JD�%K���y>}�jG����BKؕ�>_���>.>+*�r|���v�5R&� �1��k��)5���?o��d����{[�i��|H�ga�CdB�Y?���˗�KJ��<��G;/�En���o��h��ޟ�<X��w��f:�'oGg}���`����Fe}�fCG�c��Lp���P�<Z���3�"�	�����$���2ooP0�����+M":��n�У��9� �p%Y35એ����ո�&����?2yi���R0�L٤�$A�2lM�t�Z+r��o�dtk�j0u)P�6?R5�̗BW���
�fP�N����|q�c�2�#^{R���fW��j��P���'~�U������+X5�\O#SjY��=h����a��}$bE������H��l�4 D��+縃�I���A��:Α-���wp��!- b��\Fڴ
N�e���C"ӻ5�������1����)�fY>����?�-����$^��+i�xZm��dw��ܤ}}���Y�Sn��-�<"9�L��Z�"��ܤe.�MzY*�3�[K}L0�� �Sʥ˾�j�����@�틃���߸�j	W�O�`�4�eFy�>$7�/E���z�n̿��rx=�oW4��K�F��-��|ޯ)�g	t�d���jߕmA�k�@�H%n�m��~��+G��*��]�l�j����"�t�Fd|��.��7�����ō]6��$�K:��g���ӹ*N�6��׻|��0.P�F��?ΧE�!�h�3I�����I�pzea�2��Z!��n�nV�=r�hQ����%�8-�4�hqI)���{F��2e7�B�� ��ó��m����#�s�Y���%��QL�?^�R�a�u�\h?9`6�4�-p����c�_��y=bk[��V��ֱn;������H~� �%��*�.[<7������m"�S=n�#�7��;,�	�_���	�[?�v"��/r�z�AJN{��ѶYzj�m��j����l{��=����̽c��j�tk�1��w��?~��iq���lKj²HPt~܃-�&��o��Y6D+U���Ǣ�8��fY�M�����a��?ꓣ}�yy;
���n��Tށ:,K��٦`bDd^�����ղ>�S�l�e#�)��_-�����Y��_�5����W������������w������;�}ǿ��osG�O����=����"�c��Lo*?�X����vI�7X
?H���r�k�5eK���Nz{,PI�G kNn���Ζ����f�[#���5�s�I	��N^�Q�֚��beGWY&ֿA��r�8���7�![j���z.!�zJ�G�S]�p�2P�e������i$6�w������3G��}�r��Xp
�6`˗Qe=��^�f�jx�&Ɗ���Wg��xnv(G�׳'7�W
�����烷�=��������]˿�e�K٤�\��3����]gX���z#١�'N��������B+��a���Yd'���xb4�i����k�سj{\d��}[����ޔ���F�g��e ���nʕ�[q��e�D?f����%�غ�m���T�1︥�
��]������ϕ���-�T*�!��:-��pZ���em�F��F�Zԍ���K����O6q�����N$ǖZL��;�W�;��d�YΘWׯ�nE�=�52'����?ǉ[Q��z4_��c^�I��E� :k�^ŵ�I���~��1Vz~y�+�'��fd#�r���=�۠����p]�+�"�#�?�!��    :��t�G���!�B�ӑ�rY8�z{��;NZr`?�2�Y\o(����Uf��6
7�}�1���էD>L�IH2�W�̭t����m���]Y!`�Q5�z�(��|cށ��C�_^�1��X�Ӗ
;����<�ө����	8v��k6�������{F%"���$��۵����B�"Kyˈ��bn��O�ͳzVK��.�`�Kۂ��,�b
'��L?����?-.�U�*��~<��%�y�)�MfZCL��<���ʽ�.ydR��XP�G�Z�����ĪE)[�t��5v���]��>_�2mtV�Y�w�X��������#!P�48��X�9:�w6ٓ��T4�R�5]�q�:J�d��ё�ag��7k�Z;X�MOzvmTpvE���*����!R?�8^v��1���������͖q4��r�Kot��v{q��ʚV��i��T�����3���+,	jL����|7�W�0��Q/l��K'�X��`ؼMPjZ�(ˎ\�n)�W�a�\�dy*_҅9�S٩*5�Ê�2^��cg��!'���,߄�����(�����#��k��is��瘠w�!:�g�]̮��Uír\�!�E���z�k���A��˙vmȪ��n'j�pv�S{�-��¹y��>Z�,���O�V��Ԏ�@���֖�Jb�_$��r���;L��dd���q����M���W2al/�7���<��?d�gqB��l�R�+��mN��!��H�!�B�.cM��A�������T ��r�@En���sꆈ�a���Ba�A1�vh�����=�z�.�4�	��̈�'��sP�!O��_fs��H��0M��/^{.�� 'K��Y�ܳ}G<�2Ǜ��=�+�#��fQ�'<��sEvY2��D�׌h��Q�cTo�e����%��ߦ��-�>5�:9
M�Оc<�p�����
g�>*$���DڝU���ϭ�t�j�E���@���zO$��]"$�У쉔z�����������_F�����u���M��(k���v�_,F��3��Uk��u��y�[U\�°��޶��%,����X���5z�V�kj����5���>�˶V=q�o빺8��cG��	���F¹���0g~<X"�v�6�k�b��Q[~f�!�vEkH�=a���Z1�x����G�����|��\��xr�e�n�9����[��+����aʝ퐎�L�5%;rFk�T�� ��fM�S�e�����Nr(�D��Z9R��=�;��j�ocɌU��C��`�>��C=�
���*N�q��9�֯G^X�+���Y�����ʩ�sY�2����f'Y_?:�~st
-ﴙ��M0�xlv��
��0�`Α��'�+�Y����"R��g�c<洼*:xGTM����&`��#
��>=����Dߨ3={��dm��(I��C�iJCc�� �E���胗H�q�ԩf8Krˁ0 OC; ��8c��RL:<v��,��՜#z&����oGX���U��9=��St���`����<N cd�a��i�m���*����K\@�ّ�zX�'�44P�j��?+ҵ$��K%c���|��W?�!�se޹�VY4�h\�'����k%
R��~����^z3�k%j\P3RR$���m��0�HdD�S�-�K����kO���8J�m��8蕛����R[��r��� �:�8(®�e�$�b���ג��'<��8�V\���������J	-�&��/S2��1�H�7 >z������~��9�ŝ:I�=K��)�=d��yƣ�Z�����<�J8@9�N�v���Ιp���.�=�!�Hxe��oL���y���߽���28�2���M��5?E��,O���r�sC�*�J�S�}§d;�Y�ӹ�7X��p��3v ˢ�����)U��,= ���q���l�Q�&'\��׹b�aÆ|�����]tzN
F���x�ےA�o��F�"L�����l�^��1�ILo�d��6Z�άC�;5���;*�8M�5H}��Ľ����%�c�,uw��̂@��2�Ta[Ē�-�?E=���r��6,q��4�S�0$d$��Ƹ����vk�^�����Wn��f8��%W�)�i�9n«ot�:���'3-kz:��#j����*kyD,-=���l椭ѿ���jf7o��P����׭/\Q����UoG iԫ�0;aq^x�x���F��Id ��k2�pk�袶D�v˶���}/yGP�^�)��j��׺�8I�����8p�9v̋��~�Aw�iNL�w=J�\�y}�	(�� ,N��O�eO�n�7�6�P���7�㾼!����o��x���*>Hsj{���'F��Q��be�7��3[g �+�}�^�V��8�%Zh�LM�N�yw�����pr���ٛ�X|X�����G'���P?�����v8W��}9�\/ʐ�	;�i���t3dJAI*_��O	1�#!�ڭ�N�#}S�P��pۆ��jv�V4�lc�r(;�I8,�ҿ��p0�~�����	h���,q�]I��A�M+ ,�� �on1p`Z|�|&���yۢ#�W@O�sل������)>'آ��9_��-Q��M"��8�Ύ_�TH_*E ��ςey�y0v\�&�cHO����k��^,V��������rr#tJ!t�Ĥ�&s���7�)[7"��K��ۊ���=�� ��m��f�3�����j�������s��,�3�3hd$���$���l1�X�O�o�t�Ҭm���v��
@-#�W��ZR��� ��-�s�n=&�|��ڪ<��>��+_��;g�_ ��bj�D��c$�YƎM���d?R?e�g8��i�%�;T�aN�m���wȌbqX0̀	N#g-���=�Ӹ�?,��Q&]Z���RIF2�	�ξ�sZ�b��3iF+Ʒ�O�ֶ������ͱ ���t��m Wv��Z���q#�Ix^���+��%k��Vв�~8���G�6��[�&m�s�7K���q�`t���6避�S�n�,����`���آ���2Q>'���6:[~gv����#;���]�\ɷ�5�+$u��H�r�Y�s_S&2��}��G�=��@����^G2셢��?'Ŕ"͍�6�Aʆ��3�����F�>FZ�n�r����m�Utꝟ��fON��R_b�y�?��� :����ҍ&L�f�0
@?�����4���3*�;��ߺ��NYv���s����IJ+GJ]��:Y�P���l��3�Ni&[���m�~$���~�g]�#�,���W:2b�%6�#vЄը�Ě n���b�q�Ȣ����׭�Ŋ�EQ�&W�����A�Q�88m�0���~F��ܷ䝜r7]��3c|�W�[���@DN�~�<8`���+�.��c"+��w6ȇ>T����")3�R`�'�в�|w<�B,FS`�Б�D+L����2hxx�v��ލ�2c"��+iI�z��,��H��N�W��o2ƴ�'&)̙sm�R�>����跱�_�Vִb�DRTꝭ�FE;� ����0����7�٘X!�ЀR���Sf�W�������3K�%���,�����ЈM.��F��s�%�Dj�e���2`��Nwp[0h���߬]ʵ��9v�]��T"ip��ד�H����et�d�5˲Z��mJ/�r՗Ad�<1'��b�5�b��{@-c�6�m'�����_I����Co�È����ޝ�Jn4[��{:��v�C���GJ:��.p�TV���;�A��[��j��dA!�[������\�9sv��0�sזmM�� � �⎖� "��N�7�|]��Y�vKE6O{q�e�MŢ��dI:�%��x[J�Q��Ѱ�I}&��F���#1�1g�E+���
"�� ����KT�3���*�&6�����6צ��<�8��~�D���������dv�t����ݳ&������B��V�q2�K���)���iY�B�i!M��O�D3r�I>��w9�߅��q�c�� ^�|�f�����[�'�p�3��^��E��    k��fͭ{�s��,���ݤ���H���cȷ���d�b��N��T���U"Y�tʊٰ�_���W�G=��Bʇ|�� ct}���>uFn����W�����` �	����-A���X�y��a�p=��Y�o�ޥ��癵�VJ�$zɛ�����vd�h�vf{��ʷ#�{��Oq~M>4��w��۸�%	��o�y����X�&����EvI7˙��'�I�����bCI{vޒՄ'�d��YC$��때�z��N7%fɧ:�rޭ���;c����I�4!����P�2��~�3Xn�'����0��S�L��y��&;��d$]kۯ"'�d����Nc!��6<�gN9NՇ���7�@jiǗ��L�u��>G9��.J݇����^�Ō����(k.��|-}�Vt�FLՙD6Y�2�C��������Z�����iIN)���>�)��HRb���y��0�� �n�b����9+�=μMΏ9k���j�NW�lV�ձ��:��)w�%C��O���g�����(��nŬZ���vI� g0��2XUy�Qxw\�G�c�]M���6�����h0ze����Nc�Jr�)@~�v�KM�:�9�w���ڃ,�\�ۈ0&��U�QmB|�5��.���,i^g�=:�4�f�^j�۲&��f�T�+Z�Esb+t�`1�s0��*I��ƽ��
,�w�y#�3�vM�ܸ�$�.g���=�H�t�XS�:����9��5/"��$�MJ�7Y��d{��l����}$? �'�C��O��������N�j[Y���/`Ye%h4�s�1n$�+X�$�4$a�)o��tQ�ɧ���3�[������r��m;��yaͳ�
�R��/���;c�۽2�1JA�0'd�LhL��.Y0.t9��ey﬌���Yr3��i���[xQ$f���+�k��/D�L�N�@@C�(��D%�8�~�D���lv/;
3G���t�)G!H�4�rR��w���_��6,-��aoÕ./^�Ϙ�T��)/K�,+��պT_&T%s�zݻ.]2�v���[?��1�#��SƊ�~jtTN���e4�>wQ�wF�/J�"�)��w�)�\{Qףt�oB�r��(*�rʓ�t"�Li3'Ν�3�~e�+�<7�HuH��9�Ѽ��hM���Z���+aqǯ�NM�����i]���r�Ն{�t�|��i%8���>�;��](�{݇*6�5?���_�h@�R4�)���C�P7�D�dӣ�S�j:���,ݢa-�s���g�zzO�ޝ�'Z4W�#kE���颔�� 1K#�0Xi.���G�l��(3��]���W�|ȃqa�R���^ޟS��c���.o�M���P<]r�!ޕ�w9�_r;Z�c�i��	��ֻr�������T.t������H�@6�8��v>XO�O���Y�_vЄn��3S�O�>��԰��rS��%�}�nV�ىT�e��u���0�����gk�
�8�Ñ��]��6c�uۺ��	��!���w}!D�2������r�����M�?�A� ;�KJD���"pe �v�R-�Y%=���^���b���xݱc�)���ϩ��d����3�L&�PV]���܉(���Y�U��`{�,�&���S1$�e9���!��=q������������l`.lԡ��糉��&i׵X�l���!�O���r� ��kz}����/�c����v>[��|\��,�F�u��I��XS�G g�C�4����(�♀��
�X��6�췥$�rH�z�����e�?�u4���y���=��Q �٭f��l�OX�����%[@��v���՜G�1�l#f��v\\V���W8�7���	�g9�={�{K#wش���q	<��U����y�.F�AiR%����m��ō�2bjs�rx.���B�-��-�R��v�k#�oe~婔���Q�J���7��M�C�`:�2��_�6�)��ՔuH���ުB2�Y�p���"��S���_o59ǽ�׽���L�����M����r+Z.�ڃ�.���|T5۰QGMj	�5dwԐ�2(gR����~���-'�V�z�{�I���8�a�_o���Γ�B����=�NE����t�_�*9���F�,i����X�Lvn�h�ޥ��.�>+��ӑ�O���Չ��A�ѕ��ky��Ģۘ��}{9���u�
=!��7&��f�a��V�e�E��%��]��7��(��gw�ޕ�oJ-��s,م��w�mْI����H��(�����L�j�s%J	�Tʖ��3˛8��6�qޘ�-�󥏛d��Z^�p�8���7��*�l�)iЛ��:|`���JU~-D�4���&�q{��vWs���0����rCq?5�HD�}Lh|qr��:�`��K�;��>(O�%�����].�l�`��#�u��������a[�y��A���"n;1
>��Ϛmat�[���] ��B�Nb����@Q&YJ9��^�Z��Ҙ���d� �%�[��M]�m.=�R��b�܆��T�lLoYH� evW*��p�$��l���f[j���rw(�Ͳv^𽰭��Y�l�o�>�/U�!q�x��������Q�[���u(����>|h�R�8Ku�-ϰ䂉�҈w���|�GͲ�K�\R�Γ�z�;��)J�L8��9.�>f*���1�U?S�g���Ҙ;3�����
���jd�v�т��s�22�	s��|���ʦ=OcҀ}�9  6�p�.c�<��W�@��}�n�9��mJ��E���c|TKV�2a����S��7�$�%G��)�foY��6�ti�{�p2$��~\��U1u$��7�Oe��]����u����#��Jڶ2�����珖x�.��\y���	����r��*�F-��쇬��M��n����k�	�PU��X#M�h����	��;�ֶ2�g��\��c�1�cYRB�G�c5>=k2�=J�?OO����I���� �)��w�����e�]�[���a\�jغ��A���O��7I��"�F��D���K�/��GƮĴ���Uo�
%��;t@������1���M��]٣�jý��sc�%מt���=EF�z��dIKĤ�sr���Ai�2��.gϑ;M����MJR�͉dcۊo��K�9*۸!ݥ��S��r?Ǯ��Αsf��t������A\�)�s��7�VɄ��q<�骬�:����#_b���"*.����"�W�����ƓY�i0�$��9,��)��&(G����^�}.�m|٥ ΝO��c7w��O8��g`�Em�,�	��r>��y�#�q:9��)<>��Wu�Ɗ�/�E1���|��V��)�bK��v'�@��{�
2h<�¸������us����Z��������?��`�V��b�Tk���a�x/���󭉫�ԏ┡P�o���>� ����(�"���+]��<�� 3S�<��j=�޷k��N�	
�$y��B:n�|+��1�
����K��V��J�7+y�.UѸl�KG%��ĵy�>���r�>�h��y�����3r�!<K�/�����L0 ;��O.N%��^��d[�Gݎ�侞���ZXps'kBcN���WFԂ՝��ZM���#{~I�5�/��m����P�r]�R�}y> n�^�l6��=�i��I&�m�YH2$�S�<��L߫��yS�h�}�d��!0���%5)�����6��Y�'�+��������͉��:N*Ka��d���K;��ȋYx6 Uj����Q-�|��Q����n���}!�8R�,'��c;;J0�M��jC�Vϵ\]��S�F��M�!Z.�Nɶλ�W}%����[��ߎs���Ѐ�)K�G��-}��&؃�Z��e[=�m/�E6ynZ*j�=_��D[��h�����&J�MO���Ǉ7c���D0?�H��7I8�鵠NfV%^��|y�C�x�u<O1а��mSғN��ң���b:�VZ�ܑ_ �o搘C����J!% DK�s�_r����:��mt@S�l    �;:��'.V�/|j�T<ɠ�o���:A$_+�9��]���6�����UKR�!�P�.���z��n��ђ��)˞IR���9��Ϛn.�Sή�l��Y���8/�<PJ�kKM�k8.E����~���P��F�81ji��)��e���L9�@�N�k<g�d��f�k9��<���%�A�������ATI�������5��@�1��:q�,�tv����x���E"�IbDƷ�2��`j��]� �5���z�)�IɁ���s�z*#0n�0�~���S�8;�s�����0m�o]��s[iɝ�r_kq����冧8� ��OϘsܞ�/�ϓ��2�Y2�z�e�D"��O�IVT�ҫ�T{���uO�1��>C��@������q~H��JtM�[𾭫3�ar���5�rb �MU=�@R����y�p�#���#��c�@*���E ���V&o�62��v���=B�-5��`��n��:�a�����P�ZjM�� f��d28�d���K~W�+\�ͽ���~�t'��:�Y������v���&�}ޅ��r����zO:�ќg��s.��WR���K��{-]��h��8p(_V��K7���|rR!�d��R�Qc����u��R.���*?������'��|�ɬ)����$�J:fzw�\l�;tn^v 8%6��l9|��R�0�TQ�^D�q3��c�f�$�+�3�ra�!�}翏��$:.�z�2�OҶ����$�ZXN$��%A΄���<��-�쮲G]pDʷZ�>�Is"��<ǋ�a��"���S���>牥F~��׃	4�K2_��:�.}�i��$����;��21��E�U�J�ٱ$���i�Z��������xZ����3���2��Ѫ�;�>� re����M>7���i�R�BK̉��ac�r-�U��d�U���|{���h��d�T�sOu��g(_�b���:��c��d)&��*�2�c�q,ߜ�df/��<b5e�!F�<D"����dl%2�IԲ�0)�&��N�70c��mÇ	�}!@x�|7�c��qW��=8��o�g`��Cr��-��˅�"�vM�:k���c�J<�l@�H,t�	 � �/�7��쭙a��ݺ0b���L���LJ8�Y�c�XI$�OCb��麇�LAS�dx�z�j9�Khl;���'H���\y"#9Ϧe�bQ-@;��c9������6x�>#d��0��Dndw��nĴ;)�r֕��8d	��	ݤ��S������ۘ�v�$]�_�1�,v���?��ؖ�)ؓf#o�%�0?�QBc1���Ì���+G)��Óǣ.����<Jt�j��W�Y2�kx��>�.⡭� �f���BN�)||9J��~`;�jO��<d�V��R�|��A�>_<�C���A�SPAP6?M���j�Gvy�ev��� s����V�������K�~���\�(ɞ6��ez�������Y��j��g^�`w�U��2eW~���.�$M>v�dz&?F~�L�)R��CV�T�奁\��k0�D{���K�ɖ�5�2�˗e��Y0>5|GHKbn��P��Zf��aeaoMMUƆ��#����Wm�u��S�p�IB�ɠ'β��ْ��n�Ǒ{��������Y<R�rO�9 �<�޲/\�mO8�2,3�����V�I;��md�G��f�I~r�za����[Ɗ�tZS�����%[\�+����yo*��ff'���o]�mJ9ݔQ�$I�J^8�W?� �0�a��$v�g�����W92H�$}���'��@��@l��ܭD��_�l����n9H�:)8�%��E�I��<!�iE�H�Q��K͓Tt�Pf��7�:�Y�J�8 3Ά�s�/N�|�.�kNn�e��a���wf9"ĺ��p���bϫ6LˑU�:pQ\�c������O��S#�'��4��8<�_Y_PQ������T{����e�"�N2�&gǸ��f���S�HQ�� ��XO]��3��j�;e@sT:��`�ɳ�q)&��[�J����:�����v;��qGqr_��gNYH�,�+I'�q�M�Q��_ݍ�=}��a<����~�^ �r|�x켸*@���$����ii��w�w٪@V+u�|��hTo��"8���x
��c>�h�Aa�8��{�ec8~��W�l�r�f���]����-1��+Ei����(���@�br���"ܓ���d���L	��-7M���R�Y�ʠ�v�m-`��l�r�1N���,H+H5Շ�G��%� G!���`�m���1��n���!S���mR����î��*/XEsr��������DU�9q74|��s�e]�z<~��Ӄ3�3��v��ړ�q�(�,f�դhgCR��$�L�.*�I�G��ȉ7\I�֜���,�z�ꌁ;;�R�K�x�wK���楜�
@��r8^[!ח	�s���0�)+�%j��:����谌O�����0e�^9���C�F���V���dLM�
>5yoNoe�|�I���'��r����a�s�����p��E�<�[zI��߃H<פ���S�[K�Z���������d#��L	�J�>1�y�}O/c\BP���o+�f&w��w�����:FySUGN7�"�T�u�M͙b��C��v������ޠ3w�zĺy���grp�X!��?���;������q����~��h��d����X�;d����̪<�^9Yl
꬜�#�r�i*%��̬I�PX�w�0繍O&� ���r��U?IFM?��6J�в����h'|��m[��@���!���q	������J~�6���O�O����o���m7&GJ��e2�X�-H~*r�hsp{�}������;5�:7�џ�:.;��uෝ�¥�k ,r�������?�z��� �̖h�M�*�����m�M�����v@��i��Xj���+zd,�&�+�c/M�U�l"x�3y�'N1;#��R�5���X�>�H1�lq+���8�(��C�(_k��]���D�,E�Al_�y���:�7�$�wv�\5w
���:������e|y�gMr����s��z�w�1�j@�#߃]Ѿ�:�IS�����U4�j�-fqX��]�\�[>��\ԤY��MV��'�^�sZ�������/c2��Z7;�sF��`�&�*Q�z�-�q"���Mq�ˑ!˵f�7~��1�ưS%(�̢�MA7��y��q�rYӹL���{�V������� �.E��$�&�')I��\w���ֆ,��Iҕ��bG��������+;��TRu;���1�MwȄ]�ш��ԇ��R;}qf���:��C_R�rEh�>�M�!mJԕ$�I��K�8�8u��K�����C���D!���m�G�t$�x�PWpo�YU�������;X�\� Lc�U83��J5�^�ߧ�r���+�l槾C2%�6����ok]��l��~&{4�̡s�%)��Z#$��~���������)m���~��� \��)c5��ea��O��&���������egA���=��ק���i��+T\-��Zi��/m�H72l4�+�dR�>R�h�ֿ1˸ɿ���m�S��d��Y!ԳSR�be�g���Ig�Y�5����pk�vx.��ɫ�٤t��(w>,�����^f ��}�r>!:6O詐M�����ǐ?��/�;�vxk���n��#��e�|�3}�ƥw?��iL���Yms�4&B��&JF�,�b�9����A���;��?�X&�_H��p���f�����渝|H�M��q@��<�U�%���a��K�P*��aڧ{��|R����"����$����dQyK7 �t/;���W��x]��.� �?Wj���{gr���&�P���-��[�x�fҹ =�+_-yn��$-�s0���%[J��X#�˿�OhC#��~��}We����bH��b�
3�9~gJpY�+w֤N��N�I��%�]cÞ=&��t���kk�@��u�8�����i3;�]��\�$���t�PIh�px�<��    &��a���$-��o(c��;�h�'(C*1�qx���艆�y?�+�oq��)RS�1Q Z6T�Q�Е��� r�~Jf�|��o����I's`Ŵ�af��'�ib��1�~x��N�g�S��Ǩ�VEy����z��*)���j+������<��M|P���ti���gr����ݐ7}��sK'��!R&M���	��Ԡ�#d u��j�����R��ˢ�nD��"�leMs�q�\@TR��tN|O~�z�9�%����Sm�8���j�y�0*��c�T���]�+q*�bΞtM�|9
8"7�3�(��& y~+?�;��i�I�*�_��sn��o�G�CkI��C�h��a���)7]�n{��Lb�����LJ����hz{��桳\��������QG⋈p��}9�JM��'�����O�~��G�2iK�N�Hq��>S�^z��ZΝ7�2ɥ�ȊO�V5�T&�H/�'���m�2��K�\�����]5��7��<	e[���ּ�^U��f�������?�iM���U��Y�v �6��Fqw3�A�M*|�nda��_�	)k�R�:GH}��$�$���nYf�;�;>��]^��{&6��	a�$TY��ZbpHr�� ���t����?��DH�~����ر:oJ���7���Ni����[*�y�]����1����0tbe�]yHr�ؑR�?S�����[g�PY�Wi훝�.���&�ɿ�I��IJ:��f���[v��,�3G_��I_�֒.�xgm?ە,2�q)��AO��[�'��<ҍ'aV 4|�g����v�XA1\��-��,*W�v����	�K���@�sN)���j�*9s�$(�Tb]$B:�m�FWU��1�Dt/�Rt2Zvk콠�8q.���'�k%d,N�Kϣs$B�4�55��1Z��� �F��T�H�k��BY��a�^�Y��K50I2J(}N���&��a
�$4��v��!��u˖;�;�,�~�^m�Q���+[k�(���dg��� ��ߔȚ{ޒ��8A�}�4
ݫיD�Bt��p`)՜�90p��h�mH���7-�����-.�;�zv�0��C*�Y�2�!US�V��uȞD���Wi5c�����C��<����#D����iy{����r���Ę��6�k�:P	/)�M��x!����bdAJ���ɻfg��~n���"JVWɇ�yp`�2��p��u"<�G�] X,� �0����� ����2��.�*�����9��/h*)b�O���(�r��g��t���{fq>�?������u����%���MI�%j{�ڲ�L��?ь񣸚�$}'�nvқ��|C6���
J�PP������r~����9Vz������D��Pl����:��l����w�i"�ts�f�᡼ 2Ep�ۆ�z���u+ޤwR"�=�d�ǉN@3~^jj�l���G+ {z+=�&íO��-<͏iL����[�y�̨ 1�Rƌ�������Ǹ��<�`R�/���v�X���!�Tro �s��c��>�R	���˰P=��!��#8 �&G����hr��{�%Z\Y��,�����xW����εd���e�����9��kM�'�Ͷ-����Z��=Kn2a��"�j����L�G�x�mr���	��1��k����O�Y��ä���.�`s�e�j(3���˙�:�r:���n|�M�A� J�m�~0�
����x���(7��S�n�8��<5�e�7����TVK8����Aq�K�YJ�V�D<�<��1 ie�K�R)Wܨm܉����bX�;SG�ۯo�(w��"�l��ͭx|�u�?��9\���v� �w�\1�e{	$��9ژ�}��>ԙ�r���.m�1=���l�RDC���b��v�*��������k 8[���j��k�b+�)�R3��ku�R���f�i�s�s%'���e�E��ox�ר�}(��2���O3��I�氦�H(�$�z�@!i�ޥ���8����4�
�un.�{���E����`�e�[���瓰��b Ω;9����פۑ�� ٢C/̈́z+5����`��͍��ϥ��A���|`�=�Y^�U;z�!9���r+�.����m]�^��:�pe*ք�kV�b̙m�x���<[rF�n�Y�ЬS�K �-���$��	pB}c��|>w��9�N]�Za�[��nvE���>k�����"�??� z7R�BGV��y��I�'�(���`g^@�Q�CBc��l)��dq%H���l���b�\�<�eug@����s ���V�@�z� �^K�O�F��ެ�+?��g���`?�Q3�㺊k8��0�-<C��ɡ�,Փ�
y��R��F��9�w�K��O8�3�	�:�u�ϱ�}�콟{�E&�:_.��-t���k͐e�S�I����� ��>�,T}S�����GU�i���C�#�z�m/t�`���t �巓�dKfMҨQ	��{�[�`��U� �S�}2UIGu~b'���h�'�k��xkvӍ]�y�V��bI�c���+'��lz#�P(�iN�dȷ��K���Vr�P�J��W���@L�om�}�BK��6��1�:��M��k���Hk�uD��Sq���l��J��,���&�5��~_n�%�xˇ�X���C�Aԣ�$u=Dė 5%GG�۶?J�~֒����w�0�)'����Cb�R���1�H�zҒ��t'�B���j�.}���43���r����ظ��6#�D}�iG_U_���B&.�;����S���4Jɕ`�e�]4����z�j���G$MM&2ςr"[�>�*�c��W���hv���?�7�J�o�w9Kvn\�M�%éwE�0+���w�)�w�.��<��"����	��hKl�L �R*��I�S�^�N�zaT���i�ޮ��PJH �0�iՓ�/0|�T�U�t�`w�ֶ�܌�f#�߽�佧v��"|�/.I��3�-� �R[t3���=��MA�_Ft������ o_z�u�S����c�j�1�N�����`if\�����n�(a��<��� �x�9�o��F���r�.>����v�!)�)�(k���ki/�Sf�7������C��鮬�����?ֽM5�0B�b�t�&���n nm���/�XU0a�$�4��A���)���ڕc�u=������xs=ˠ�j�e�vJ��@8Z�:7��f�aY�c#����3�M�IY)�|��Y��xw�N�-������%b)gC�S�l�����ӓy7����M{�r�h���E0o�Yy�'�{U��o�T��|�-���>w%��W�S����r+�OKȼ�*Z'�'�w|�~���~�إݾ$%r�>�&��m�WM�ˡ2��g�y�!�!��Cs*��$�c�?孕��,P�j.˪o�]GXI�e9*���f���O��Lg063��Ӆ�ow����[���~�L�э,�%��7 ���):��s�O ��v���At����~_eB0�F^�XN��������RA�[�]}��H�d��_^��9�>��X~'(0��J䥎����?k�dh�/�	>��"�wbD|�㳐rT8� �9!i���_��ek��WP(�5w<��ȟ�D��*�l����8�i��X�s:NS��ۅ:�Ȧ ���P`�)���xw]�s��M��h�@�-@@(pc��jٙ�BJ�B���. ��s,j2*'I������̻�8��Éo�u��5e��$��z� B�;�ִr��o�K��:�ޡ�*fԏns9]&�m�.�<�p*�<3U�!������Kb0�B��́��?/x��tt�
���<2���#��]�Ϯ�sk�ZL�r�aߏ��g�K:��(M��M5~�I�6��3� b�KG
P|~j�y����J'�v��ݞ$��H���T�Նwݍ�ʣݴ{arǗ!K�*��b¼_	e˙�����Bc�fS臯t��w��;]_���������/&����ymuT�d�es�;��kɆ��U���{N>�H�#�=����f��J����b4���)����Z    �w��T�f�٤���4!j@Bk"R��~u�Y�� ��+��rm}���#����<(?:�sH/�)]����Y �����5U+��R���dh�F9ʃc�6zr��]�V�B���D�R�z��K��K��[�E�胳�>:��5� {�~�~���$DC��4������(9��Z�ړ�M־@?%����ס��ʀ?��W�Qص��z�J�_�,��ۀ:�����_����Go;aDg����!8�%�D���Al4�gv5�D�a5Lv�J��CK��ܭ�S�;���W��#�Ai灞�[nSϗ��D��7O�W���7kg�À�Y���,M�ɜ�iak�p��V ���@�N 91�C��Ǌ�)t*Sm(�P�G��5��>#�Yj��ɄR�X���N9�v*��w�Y�8�OtlE�]�8ϟ�}���#�O�h�nLQ�){�XM>��Aϴlxp�s -`�F>t3a��d*���\Z=�̒��p��{|ȊQs2�k5vr�O �)��ξ�A���c��\N64wyJ�5%+?���f]�s穣��>��� �3SJ{0����:AB'|����]>`��/H���K²�ZzX0/�}�r|}���7J"�
�uK���Nk��� 9�_����m�=��X9ٻ��tw���;ѣ�v:S9-�#�!�G�G��������H�f �r��Xe'�Ɇ(���ˑ*1')���J�U�t�[��ZL�T&{N��JDɭE�=\��/yfS�Ӗ����3� %K(+aj��r\f�� 1g�c�̓�=�%�_1��t�����0���\pi*�ߺ�^��M`���\?�S���>�,�o��.�Y�����Z��L�9ı#][%�t�I�ׯ�A�K?�����PP�L�۽�5tx��g��/+�(������[�͜Ǻz�1���HCbl�%�\�[B=ǟ����
�^�K�(a�M�cl�M�)���=i`�TRq��k�U�b�!�u�&|�߶�wJ�o�u�I�z~1�|��g:�8a���B'��IOS��L�����|���S��VY{)���"_�83/?�'�?�v79��S�A<�oE�JyV�Kڢ
��.=����E�(*G�+B�d��zVY��L�u�#D�a����T��'�]��7���Y_������$���r�m�!E
��$ofh�{`�t��܎6]&/�]d��.U�c��s�M�Gަ���J7��fN���4B���f�ͷ��9۰��QS':��8��+)WLY4��~֤����RrIX�N�B�;�I�(��o2�lb�c����	o�]�9�0&vM�@��h�\��������ƋoR0�ό�����c6d�sf����NϻX�kgI]����Z��"��G?x���{-1jܞ��X*����in߿�����6�O|JP���z7��F����y5W�g��{]�ޟ�6����P|ɚ#J��X��)g�{�:M���S&^�ٚ��'���.��c�NԔ_w��'[�#����o��<\D����J�.���̗�ɃJ|B�\�q���F"�d=�9������7 I>C椂#�wJ5&=O��m�$����X���Z�������@�����y[r�?�M����H7����'	4/Os�3��ӳ�ҼsLI�25DH�3C{S�)��*��`���^��̨��� �Z(ד�vj�G���0���MWS��kQn�%��[�G���!0N�>��]^��LOxR,���>�Ϭ�HiXo�Ω�q9s�j�����`��j">v|t����\v0~xr���z��<��x9(Pv7U���9�%�N�M��7��A�N���#d��Q��a��1��$} ALӍ�?ÙW��4#)�<��o�����;$9���d}�!U�nе]��Ÿ����L�SW:-=8�9�i�3f����9�z��P��V�<7������#�^�0��4'�ٜ�R���;���\Yy�.��E���I�n��x�9���զ�
}��5��Kx7�P����p�^��2T͍�	EBC��TrR���Mna�UEŤ@S�d���;�>�U�:�(~����=��.�kp1'�X��n���*��I���`CC��˧��ݵ�x�?��U�%��œ��
.�OD�3���K���1+97����;���rf��%<$Y�A[ya;�Bctٴ׸j�q���r�۴u=�<�h=nc_����̸�|��7��3�u��w�*��a+��N�Q��F�]S�Ք퐩���*��P�3�թ?˫X��YC_N��ɢ}6iN�&-Ŏݹ�Wf��=�T�!��	�?��!�h$ skaR��*�x�a��g�;S3s����+��Օ)���Y"�8A��9��ݺ^�u��\7۹D{��쐪'��z(k%H�5�/9c
~����7�t��3����t���Ko��� _]�
},s13�K�4�*^2�Fo"{�,�K��$�gf?'���m��}��y��榼΄1g]����~@ô��4�v�v�pa@�%�+�p nq�.д�B6Es;�wZ�����(9S��̀ԉ�՝�*���RG��%ج��W���7�)�Z�|�or��{�cTza�t��ZvM]o�ˏS������*|⒑���j>P�Ɋ:��+��`P������)W>�'�'i��gݧ�\S�9u���9�)�j`�Qz%UHV`�-�-�<�.��^�/s��r���s�Jr���۴R}a����2z�Շb��}���I�c��퓿%���U�[fr�}d���;
:��ռRP5`��wGf?��|�p{Y�Z��\L9��~8��Hx�܁���ZL�j˿�ɕb��n��Pm1 I0`1a��BU�F.e����l��yHg��[�%�+˗� �W�N�=Fҥݬ��B;K�XJ�PI�7U�R���mL��̵1����_����B����J��m���J/���@�=����b���-�da���u鑌�[R��m�2��/򔠭����er���^��F�$�����۟�����ْZ8�TSS���G�+-�R�%o*q��w��I�p8K���?6h���H���D��Y���
���^u�����p�ڟG�8��&�ɞ\7���줡���g#@�I:�8����U�kI�um\ ��{{ʫ��%��u�Ţjl#�"lb��h�����gN�7w��:���� N��c#r\���ۓ�;�>��Q:<���YB���paY��L��*��ǥ��*ж����1�[�	�
�5�"���l)���3��)�z%���x����壒��q~z���^�ͥg��1L��#���*<3n�[��a�YIb��͸��&2��~u����)��,�p��:�T����dċ4q3��RK���z �����x��ת���FP]u�)���"�/B�	ɘ�Т�P4멼��������o��*�f�;樉���*��o��P�tV��Hs��j�W�ޏZ[���5çM�ق:��a��0$���%���#$7$1L݈�5׬�� {8V�a��:��n�c#n$ħ꠶��=��p������2����AO�x?�#6W;̘�+ �$+Zr�U�����tNG����d��/��l#���d��4�vBg� n�k�=Tk�re��j'��f���i@���c*;��.�BI���6曃f��L���B�C4`$�����T `f���N7���z_�:�M9w h��aYe��K�n������͍3���Z��?��.e��IC��?w^8}w����S�Wa�al�����ʤ�fw�L«'[�ĺ��l�ʯD���^4�=����xH�E��o�+��ښ�	���%�\��
�,�ұVHb�[J�;���6�2��-) �ϴ1oj�{��J4æA��O*���9J�~P�F���͎�	U�vy��c';d���%��J[��W(͜�ӝ�r/���L 8���Ճi�>�� ر��cd�9����;*�%��i�%"$���x��V/���:�����%6��vR-��V�W]��ϟ�P    WmԶ�`p����h[%ˠ�,�಺�=>s�0�)+����YJ�r߁�s�p8�P����ӑd�-�M�@�h��Kƽ���e5q�'�oh��{���9��U
ɠ�ܫ��Q,o�a���^ހ���xL�)t�u�ơ$"���M��<:�9� s6�F�i�����;Δ6w��F�N�| 	�́M�)y� C&);e$O�')��|�>j#3��h/���� }Zѣ���{����5��\ad�7�I:�i�/�\�R�Ɩ�$�,'U*�������1�[� i�dx蜷��c��/���j�;��r8������&�	���m-c���Ӽ�@���
ǽ�o�v��%fu����D$�������NH�z�w�-վyg��o�3~���1T�y�[�ژ�.;�ՙ�Ư�K�.E�:����eo~y+M+VʔH
/�g����$K��D�f]&oY{h\'��`�j��<�^G+LՌ�R�~*�x���)�N~�(�jI6~�Ѕ�HXs�0�C�̒�b/0��o}T{��Cr�s������3<)��u%4.=|��E�s�S�?���!6��2-1L�k�ap�̎�-y	A6��;v&,���(���5��ZɤѴ�0��s�#�Rv�C���p����G]��<5�l~�LH)Y�ë@���7��/��y����g��c�5��e{��	�_t��CUyLmJ���9�v~IVt!S�Q��O��w)F&bٔ�~�1�R6f��4:ײ�r��3K��RY���c���Գ�\L]�w.#t�����m8�<�}�e$�@����>]��5���u����ձ��$�i�צ�E{�Â���Iq��*X����*W�h~eÍjC�Gٗt�锓ui���z��9mˇ�G��V[��m�|�j�: 8��R��5�U�:K�݀x�X�V�����  �j�2s�;[�%�:/�==rP�}.�k�Љ��[|"m۸��Ȋ<�26��n��E'hÅ�s�`2����~ZW��\@��"�I`a�η�z �*ǥ+l@�@�HV�A;9Eg����7W-Ah���o�+�ٕ�_�����%)��T���(�R"��|C����o����4�ɺ�;,�LBĘ"slþ����i�&�Wg<���φi��>�i����N�����c�����o&����k�n�'߁/硑sU��Cxhj� ���UAr< �ה1F��v*r��+Y�eh���v�"�2=��jҗ��F� ��X�H�1�[���e�S���OLϳ�W�MS�a��'�8N�y�=|m6@�&J���|[���R������f��2�ٶ�� �s��pSk6�A���5k���?�|]���� ��?���A%���PϩH�4�DX�����O�R�������)���U��ӷ����,�����	�
�a��_��_\����9_?�2&���^�S��Dۧ��)��=&"��x��U�7C�pgO"�����ɩp��P\ 9_�q��~moAZ�PV��� ��j]6`&���Ftu�������]R�7��е�+��M9.�,�u���4��Bn/)�<�g�8�q��%)NB6�p��p���jnE���r��S0G<:��v��6XڲbzT���O�{"�JQ<�A��acO�u�m�N���6�UzL[)&Б��м�}Ğ�c��J)���Cvz��!�e.��~ݥ��W�ôM��C9�	��W#�lC�r�[��G�v:^��W�Z�����2J��rk�Wo��"5���]@4��h	��ɶ�
�w�$z;{[��VG>�VN,�%Q�2{^K.";ba_[pf�/� �[rs���e�q�kV����\i)-w�	��H�>uA l����U]�������^dG��C5tZՋT�:��oyo���Z͖S��$��q�n2mJA�^,��:�	�<.6�E�*�m˷yG�Z$�TI2l$��♇6V�>מ���[8��7�{��dm���de�k���ձ���X����uŷ��t'S�M��2fK�Ud�-��H~��;�8�zE�\�=k��hA�I'p�I!%�O��s��Ũ�ܱ��C�b����� ���F��P(���jȽ�I+G����^�Y��wS���	W`�]ԙ��2cv	+�!���?1�Q�8�e�Z�:�ouJj7�E���5�����A1w�W��<�O}=�7S��g�3L��@�����Jq(�J��;�=���.�����.�hHm���X:���Y�9ΩZQų�`���a�h�i��	q�Y�8�$g�w��0Yv�^@;c�T

Ȑ��]�L`;�
s:$*�`�s[ɶ���I����~��˧6��b��K�@�d�|���'�by/I#��,6���P2эDQ*�T9��/i�ټK'wys���:*���c$�\��Gw�0<u�Mz@�\�i���.;!(r`����~޷�X�����?b�|�f:����)ٶ��ɮz%���5��9�����Ak*7sHM�-��v߲1o��	�N]��M�l|�3����E��A��u<z$�${3��ߏ��
���9'��0%1����\S��H�� �~ԹB��-�<[V?�.-�=��U�qòIR��>��j�n����ǝ���'F����֣΃$��ﳰ3F�7�b/[��&М�J�7�D:���!���y!Y֔�#�`��]��Y�}	T$@�w\��G�i�j)��ɩ&^��{Jn�aHz\��g/���߸�7�t����$�sD����>N/��C&vJ)���Y�d�c[�4�u}d�Q9y�4��P���[��Da�+��.%�y�3-e�k�Jo�"�)#|\e��]}������r�"�����.��T$��ܴ�֏g��3;�N������J�`�g���9��_��s��OS0��_�k���$#t|d2��H9?G(��jD����������~&�$sk��/�ʚ�3s�,����O@���Xei6[.#�)��G���c?{�~E��J��ԩW�8�Լ�Ϭ��8p^/k�X߀���ӄ���,�/���h��?���`���Fy����1�\Ϛ�F;F�oȏ��0d^ir�()����p�xOz�)�����(�z+�����vߥQpC��~�M��ϝ`��~���mi���JV��'�D�l�ޑ���=&�߬�qȥb(`�f�sb�9T���R�� \_���S���곈���/j��!o�9o	�3/�@}�ֽ�����J�y�,�7����.LHu�Tp�O)GI��l]�Q?�)>���t�B��7٦H�QV�ϥ��6��8���m����V��}��Nם*�ay�?�ȅ�|�� ���bZ԰�[���e�1׭��9�7~��O�)�����I���:'��9�ϴv��0{o[>[�ycv�J��K;G��G.�[P�F��9�C�ЫD��!/s���*V�H�#��M;n"A:{���ѭ�sU��cjT��"R�vn,�. �*�bwG�+�&������δ�~�vZ�����i~�"��E�1�>Q�Y,n��C&tb��p+�9΄��X��[��5���_��y�ݑY�
�����(��Fx}(��x{R�&���N�eq �0^ }�U�V�)ᓚ�u�о^FҮy�<����U$�1��-z49?��z��-�ɓ��sMY��FO��4Q}�@�`����}�5+��D�5�]RH��N�L�m���]D	����.�0>�:2R��`�4����(�V˴�� ����Ym�8�'�.��k��פ�|r"7�(Nw���J�n����Y��Z��S�Mv��{�q)W���p3�M�r����ȍ?ķ�)To���D+�5`���6,oǸ]&�+E��5\��{� v+�͎wN���O�'R˽'0y8��[NǛ���j���R%p�Lv�.;��꟔z]��g|��6���G=}�
��H|�}��Z:�`�WV\��"G97�WN�25`B�0%�%�;Rq1����Y��;T�Aq��0�p#��t�ȏ25��ɿaM�2�&)7�/�9�� ���[_n���X�E�Z;��9    �źAɑq�t�7y�|����D>c!�&=�O1�猰����pp��"Yi�6ˤ��>�|�S6���Z�A��*���&c�������^;�#|Fb+���k�����/C�)6�:���j�ٯT�b��u��N�����I2��
��|��r�=ZFj)r�ͬ�@]�R��fro��D�uwH��1�K����T+B��O�ާ��3�|�9n�����@�}Z���������|�efj�5A.%�c�3,`M����-��(��[<�5��X��>�;䴖~�erت�Pe���cǩ��7ro��Ϣ���������:��&��=�V�Ǹ&{]�%����&�zM*� �S SD^sd��M��X���@����.�+I��v�0�L�DMӧyZ�qe����_��u2/<]&�.z�u8��L�)a�ќ���It������+)[��^:�F�\+��G�,�R�5�P�hV�!� ���v�Hd�m~�>�5n:�34s2����a>Q�Ћ�
������"�ӛ�C��(W`�ݖ�>̊r�ģ���9���j2K�1�^:J~�`�~�%����uO>�T�� s��!���� KG��DqB�}f�}�����O,��)I�(f�������Me�IE��	���ޅ��3�g72�F�ʽ���L8��b +E�V��K9��-y:!�P4:p0;,ymr��މ�\��zI>P5wi31�Zr��{t�T�������-%�l[�h����>Cp���G�T��4��J���~si�ZԪ�*�W�1+h�G�ь�`Di͑I�mq��QS~��|�Հ��ۨgv/G6��A��x�v�!��ow3/.QѬ��+�K�L�f�K7�swbH��h�%��<ϐha������'�%���7�g!���rs�%��7��d�By�l��TƗ�|Tt9���o��g3����k����ղ	��n7����a�l�IY����B/?�ʊo!('aRt4��=�g��1�'"?����yn/��3���O���4,�+��K�5fǬ�ɻx$. �����;�r�ex)?A�G7ڨ1;󠩺W޶9}�J�I��n.!��l����O6S��pxFY�5k47X����<�c����Nݍdc�����i��Ig�V���^]��>ce�ՓI��	L*<R@K���NjތB ��_^(8.�Nc���4^�q�M���@��Nz��(o����T��D�ꆞ��oB��UT-��f��4��.7Nf����Ɲ�ϫ{����4���t+7��\��Bd��q���U͚�Lt5���m��c��	,�,gL�`F���|IX�CS�-F�U�F�D�.�MU��y"���KG0wm��f�n���qQ����8��0�����?t�_&B�xCr�Q�z=wq�G���-�sI�T.��4YYg����W"5+�	�D%f�\��F1vӡ�LT=xF%I���4���<y�5�|����n5�0#�r?�xbY��uòz�="\@��n��Փg��r��u/��u7�Ѝ�V����M��!�˞scUA|m���m��yWY�}|o'��cS<�����k�i���b���=�y�ϙ`MM�`��7�my;�G}C�F#������v�GI�R9�r��
G����\�ne�M����Hi�"�/~��D����v^j�{߅���!�A]M�>q����k���sM�F������j�o>s�~+��BhS�t��y�eq�w~��j���)/�+�)qgГ��f����.����X"��p[�TAѳ��7��d3_�?yZ9wL��!#۶�=�9�A��L|�#)��N���	����f�p����R�)jRG��:������Of��v���w?)L�KB\���',�ɶ�x�.���e�Sa���;ؙ��5�am������e$�UGa(�J)X�c%h��)6x��V�@���I9�˻�i���}�/���)�¥݈��.a9�^?Τ��:K��.�'��לx�n�r�^E�Q2�lJ��d��~��B_���SS	��Y(���h�+�24Ǫ��,�����'IJt~�����J3�s�x��Q8����5���Y�W2�k�����:�|�ss�5��S�E�������e1����@x#�y`��Q�K��)�XΜ՗���<<�����x�&�f�&V�P�������K����D*��Z��R|;4)o�ͫ��FڃaA��o'��g��Q����<,1ʙ����Q�nr��{�4��m���d�a*�$��	2�G	@�D�xD����&'��UG��Wf}����g!�a�Vh�d|�������E��-��m�:�?���k��=H�����y���F���	Z��u؛�}	&?H���В/^�Y��(ن����Ĝ>�Ў���A�#Q�:������7S�U/����h�,_����~�-�K�_��|��g�	��Yp�$�{_ kZ4��P�߿��f\� �L�{�~7���ro��O�*F��n��@[���m���ދICi����ky\$�+�!Sm'�/zu��!Y��y�4HK~���")v;��%��1��]}J3���ܟ�؋6��x��}<�]��Sz���;�\	1��1�9�I7P�8�$��-�pǳ�~�Pb�@��Y�>C�$�fE'Nvu�9�7[�g��k8��k�OH�g�E0x�ԸY{	�ϻ�)�_��u�&�vR�y ��&�L&[lA�<C�Zu���A>H�H���k\9�UJ5i؋L��ԍ�����!�Q�5+�Rc���$�%~9�	�����|o�+��r�sd>*7����D�|��s�C��~�'i�DVs�I�����*�v�]�9�$GI��@���+~"w���{߽��9�򔴾��I�_|�	*rY��z��u�з�1[��20�g���$�b�j�t�����j#�1�/\�7�a�o�0�|����ro�ڶ>=�;��>�\�`pAX�M^%�!��~��=<�q?��G&���չ���_�k�F櫘(�Y�"�u�Oz���>�	�<
,#����	\
๣̍)��)�֯ԧX���"�9^�� �Vb��ܳ�G�>ᖌ�.:>�����JG��VNA��=�ݰ�/Ʒj���|������S)4]�ӥ�\&2nF�[����)z�O��^�����P�]O����]�#Ʃ�q��Bd9�R;�b�>
�JץA�R�\�B�;|kal�&eO��^I|��fx�Og�Q��"�0dF�J��3O�7t=�1�9C�����ێiI �3�X^e���'��J���n�q=^���\lK`�df_��g�Q�i:˷B�Ou�������e�M.���?&�&�T�e�;}R�]�c69����I6���\����!A��\��F�p� ��H�K�05G�\}�Y����x`EJ�@�������YYk�ד��v�<�� �ޣ�<���}(�'�����(|��Ϗ��3��l��v�0�;��d���d�bg��|?}l�ܝ��bna�{o���=WMU�ց';��! ����Xw6��L��fq��GL��;K���wb�
oW�*������̡>��Y� �<a�c��ԝ~�ś�9����I��A��j����ӕ��~��<(-.�.��9���B}/�,��)v�J��UZ��kYk���ic�%ϝ����RGg����)Բ�۰p3Ÿ�Sl2LF1���!�e����I��'� %���r�ƥ{��0B�w���!s�=���*sxIW�������M}m�^�1��;gp2�m.�S��W�Lk�A�?Ԃ���쏿�������w�����;�}���������w�����;�}���������w�����;�}�����_��x|׃I3t:�����33�e~�{�۹�kۀV�F|�3�Jb��̜�a^�iBy�=�t}~c�kx��ᛖ��i}��6���\,*�p�$ő��6F�~���� �W��9(��[56|'�#�����u������g����Ci��a���w����JW����{����/�=�������_��*�    ^�߫�{���hǶ��� �W��(�/�Y���;�R�ܿk�u�V��g����{��kǈ��-�*��Ҧ�q��VӞRO�9�3�z�a���݁��9����~O�L߃Ɔ�_jC~��ǫ���G9c�ߵ��@ֶ(�����	[c)�ϣG���F�v,�sǷ=��8'�C6:-�������/����������-囝�����yx�������so9Y^�{�"�ѽ�q;�pR��3�f+I�����&a���̝�u�'���^>���$��DK��y��T��9��'9��B֢	�,�%}�',�~�@���2뙆����_�ѱf������q��yx�������<d�o��e�=�+����߻o�^�߫�{���U����W��*�_ŷN���;��Y����������y�g��q<+����w�FD���~������E���'�峗���˟��U����;��QvcK��2�R�H{��#?��\|E��-B��WU���Z��[���h����o@��׼Irk)3!��5�Ń{�$���S�1$!,��i�8<�ƭ���]�|���@�ܞ�g���E}p�,ڼ�!;Q��z��>�~x6��\�yL�Qm��~�iڟ�ɵuz��7Z�$��־6�6�]M0O|��Yk����ŕ!�v������AM����,b-|�d��k$�/��<����}��uӞjf����㚷n�o{��S�e[~��k��7H��3����"U����U���Wk��ɵ�,��/�>c@���]�%~=�ծ�E���1��O�D�����)@�3��?���|��L>?ٯ��{�?AP�G?پ�O���x�ꫳ��������#��D=���C�~y �^��`���G�t���@_�s��u�w8�����ն�����WZ3�"k��~/:��@��Y곘�=��{w'�=#�ۅ/h|j�t��b�W}���v,7k����\"UV�{���Y(#>j��Y�DG�|�wʛ����SO(�{�ޑIߵU$8s�\Gcz��B�X������}Ά�Z�����\����Z���ذ3���|�.��~���p�����ܷG�ݮ�w��Xs�����5޳���s_�\@��W�[�Y�_����{:r3�yZ��mZ���7sVw�x��I��op.GN
+l-U�����Gn��Y��y��~�)��M�5�{���5U���ϝ��X���)��>e�}���n��'��r?�'������������'����Z(S���'�I	]T��NO��}׺�U�wR���e�;�sU��4��ٮD�|Bv}}R�-~2-���f�.�E?W����p��W\��_A?i�Ϲט趜�=��T�����#AQ(�Ω��1�c��}c�5��Ǣ��М���:o	A��ß3u����e����������%+��W�����X6�'>��{��jXm<K�Sl��o�n�������lZ�u=��;�C�l���T�}Ϝ��?�A�|f]� �SR�=��+y��n��M���o>��ug���OWع�~��W%���ܯb?�﷖�ӊٿ~�3�~�p�����x�}��i8����=�Z���������bd��<��:����'���{����+�	Pm�u���י �n#G�J���K�UՒ��X��]E�Dn�r��DX��|��ۤg��|9��,���@�D��2�X:+�9S�vf��G�Fخ�=�?��&]]?�+v1���I0�K�<��ͽܼf�'�H�����$'��\��dɦ3��CX&yq���e��᯼�1|L�L�[���wl�|�`녁C�����"D����Pnε<']���n�����r��εs^�@�o�t~�u�#��ʄ;ֻ��]��6?��e��|t���#��{�y����:���_�ڟO!G]��=V��d���G��G��MO�}�7ωwܧp�n�hNa����̣^б�߅YBϴ�y�.& ���w�RP2��mIk�$����	�/�	<ۭ�37[�:�/���G�#���-�x�c�j\f'e��"kB��/�l̮{[�^׀dwM�HP=��	(B�f��Q��,o��tԍe���������F	L���r;F('Â�*?3�`�M�vd��bw�_���r�b��e�G�K������]x�����[���N��$��X7|�Ԃ �!f1�T���x��ιa0%��V���߂l�}�m�nL�F�������.eA+�*�˄��}I�ޓ�fwj%�>]Ǣ3	�ogEֽٽ�ڬ��a�w8�Cl@���*�q�����@u�$���@l�
<�1!S���
\β$�'�_�
�@<!��z�P���CjYSw+���%1ԉr�8Y��8��s~=�3)P���� P�Y�auֻP'�_�e��nL�66�7�*��	^t�84Kƨ�p�̴!�`N7��GJ��� �)�+��Ny�m�C��)d���T����:��=�}y�f�2�r
]�Ĺ��}�(l$B4YB"�Q�j*vH�y�#˪S����V��$`!e�ccͫ�����d_�3�R�%�tP#3�,�^�;���#�	�v�Ad�yB���ː@���>�{�	�p�nr0`D���)���h�q<���BY8��+��$�2t�fo��(��z��N�CV�l���z�+®(@m�D��Đ?L�p�A)��b�
��Ÿ���󷰸g��Cc�����ƠjgN�X�ϟs��S8Z��1��h�0'K�m��L�\�za�*��%��'#��g�ܞ���U���U+A�(2�lQ��l�J��#�s�-vp�1V�!��eNX�b��GN�Y�u��<�	#���4��Hu��/)�I�UO����`�y)��7�A�H��U"~I��,ܼSv,[�ot��v9 �wz��=
����J��rUH�Zb����P�|rm���X�)�%�*�[tl��_�kN6��(8bT0�4]�<�+�T�
ȇ�6�K��6"��ΰ1��@�!��^㷑h��Z��ABbY	Qw86,"hi�!�gy�O�u���ճco��M�2ɲ����t�R�u�	Y��&A)���;֚+���a�U�P�zN��-ÕZ~��Χ�K�ˤ�|.�v��,$��>��=�V:��[_�����k7Ll�[6<�ZЋ��Y^���6��D9��{ tuo��՗]2�j��ЗnN6�â��&{X�����$�|�{�rG썩�O��3� �f�'19	��|�҃V�0Vo�|ʞȲǩ�UW��{�a纈6�>�=XY��z�Wy�ᡊ�:�[�!z~�wVΒ^h�_��X���3M�E�r�:W)��y��+P�3��PC@�4��ֳ�U��Y�~'I��<e
ؖ4rH�avJ�9A9��]X�eu��%�Y�UpeL�M,V��j�"�x>�XY%�A�!A�u���o�룦J+
�D�r��E���!�=�R��>�Rɋ��He�?_cgv�
8ꝇI%�0�"�pL����MK��w�|Ѥ�6}��Ʌ�Χc!ء�ibL2$��L�������7i�1�ń�����p���wK����c�uRM Z�����$��=�$eʵy�2�C\�Ƕv|~~;�o	�!�)� 5��=0y���"��d�d��'�l� ���d�B�R#w��Z	lZ�"�*�^!p77�!�@Pp��W�Sgli�%�$�? �MM���y:n�?���n����@n!>ȭA�Ife�v��K�ព�����U���?��{Cm�_l���{�����2�խ�����Is��I�lC��(H�Tn�^]���������
��/�I���i��	 ���G/��ތdL¥�i��BEe��P���F�3�|Nu����k�H��+���O� >�5���b�ާ)�t�
"�j�S�_�^��v_]�0���KƉ� aX�(9�����-v���T��, ��V�oަ���mbzކ1vil�R~��ׯ�M��,�VaĢ>NO-\��6��m�W-B݅/�g��Np���Z,F�DNVb@�0T���6�Di�Wf[ze����A��p�¶.C���     �_��vJ�%f�4��˫��:9�l���Wi(��%p k�E\'҆�[��ɖr���l	Ƞ�c���e��<W�oEʻ)VpdQ���So{�{��drQ9� ��yY9]�j��D��c�);6� Bt���GF�7��8�pK��e$]7Zd|dÃ�+E�E!��W��9od$t�B-�-7[��r�.rA^� {��,��A> �B��Yiw�i��H²F��&���v�C+��l�OU�a倶v(֑����x�Q�z߬��=���̐!5��%��ga��-�Ʒ�IK�ر4~K���9�/���[7�ݺ|$�������>����(:�С�ƃ����U[B�\A_��������$�����F�{A�%�G�m}���'�WYz/����&���>�+D�}�?�tn�*��J,}w�=��8Y:�R���9c&*Ϭr���X4� V�e���*�e�o"`?�Ol����TW[��쏉�~Ve��'��R�\:�������d��_7���O{�`�/� =�c�f���1'Ȅ�/���E�>�����iRlPh���l�HIC�^e��l�O"��Y���$(yC;�3!7�ɹȜ��L��r�B{�
y���ZЏڑ3+ҭ���9�^8�x���9�_�P�0k�zꚶ��\E/)m��и^/�'(��#l��yq�DxG�O=R��9��V�_�h��R=�C�N�c��(CL�l~nmpV�H}"�7�&��h�U�4	�.8OgeK%\��	'	��5û���I�[H���.9�"u�r2��*�K-��zˏ�I���?8����̈�P����!�
��l���9-��[��I/r��Q�`b�׹Ɠ��V����ݎ��]24Iʭo�k���K�2�	�7��c��_���_K�Se�"���=
���g�{���nc{i���.Hv�ɕ(���*��
7@E�֣X�D��ql��P��1�m�vU���DG�ސ�sE�W3��Qִ�-��l8����'�u�w~&h��tK�Ȩ�W
�Z��>������8�|��ѿ���)�t.v!MWYq?t�S_Nb@�+�a���:+!�M-[�@�2z)�HL9����x̭ G�d��AA|�o>��IH�$���>�:���H�dzt���
�=�LH��k�x���M/o�O<ǖ��y?�g��0�����ГԵ�6#�[��ޞ\��^_֋-j�:������o�
�-p�yux����}'��aB>l�r=��Yx��W2G�YAEA�N^����H����9%��ёY���1ۮx_o֮X^�~�cۛE�4����U��w�Ũ'u��S���,�ol=��_)s*�>R��=Kڗ�9%��Z��S�s��()�gb�� �̕lXd�lӋq�-t�b���<�B�n~b#��_%�#��*�;�z;��&�,@"7+���`����amHS�2S&�T��V�K���b���i5�Z�D�-E#�J�Σ���E������z�cXqAVB*2,*]fPgp�֓c@�ِF\bHɇ�T���YF�l�'�w��M*e�/����6q�b��A.���\���
x�-�������H��I}��_�ܝqwv	��];�ʛ�z�D[&~�o&�� �P$<]H �1�|�Β���<Ѣ�5�Mt�ś��+�P0��2��9[��&5�������חǷ�㤂��L齱S��)Բ�P�u�26�C��oJ��#�+�R-�*�{C$<�5!6��
��X,bO%es��s�����xnٺ�o���	��9-�*�ֳ%����C���O�&X�%S�����lV=9�}m;sI��nLRUyG�>"�癸��R���ٝmî$��Sc��xGс_	�~D��x�.>��`�*���ZPH7�*�<�UG"�����RǑ$�D�b�73(��IBA�*�C]�PcR�۶~�֛x@���.&��u�5W]K��M!��礼I�"ʻ����~`c%��5РZ~n�;�����J�>�%���Yd�wze���-�l�����z���`��#E'���͢����C8�׳]��t�骥���Hi%�;�B���;�ԓ�:L��nn\�Ͻ���d.��X��>MPO�+Am�ݛA������7�F��r!�ǖU�~;�~�}��މ���P��|��$/�W=fn7	���A���_1o��9����Iq$(���`�_�*���0�\�TI�U��K�]J�!ݣ�7�:�&�������};8/��ӕ��(�'Ap�Sc�k���d�r>���7_�Jh��)�7K7��9�Y��r[ք���wV��Os�~I��m��Hz��b�����td��z�7�D5�m1��l5����Ƅ���V��i˺�eD���Z��ng�4�xd��>�K.�@��o9ւ ��#l�.��OK��^
��ɲ��a�,�a0�?g������p�l=ˆo�x��W�d�rO���`��(
��o�U0'?�扥	m��,w�l�eiD�c�}�׉-.�A��6֟e�X9��7b��X���[���&�ֳ�-r�GM_�S��<���n�0L>���p�Z����5�oDʮ���5T��E��s�A����V��m��tS�D��>�.M��k�{���M�x Vi�a�R\�o�e����e�2��0O��]��Z߱tCgW���#Ϗ|˚�G�����ެ6�VSX��O�]>6<�!Z��*��cO��3 L�c$T��#G�Ry�Y�
ѣQx�f����Bz�|�Vk۬��Ã��"pz+uܗ�Bg������;4�ej�ݜd��W��މ��Gr�O��>B�a��?cN�_n[_d�Ow�p��;]l�Y�����^��s�s>�9ë�(�Sg�������^A�N��J�\y������!�=�>{��eY.�*ޔ�˹^'�Xu���7&�ٛ��-
����:�E����.���%�VmFz�m���Lެ�� �>�j�2\ �A!{K�Ey�9I�G�d�^9��Z|;gv�qK�@B5x�����qv����W��F�X�_l�k�}�����-��ݓK��Z��˨��J�����>��oq$)�
�%l�.��O3ݖ��Q�t�rM��a���E14&d���X�y��]K+�*�%�##�f%i�;� kNúI������v�P�a&��B,R��A,�Wڍ��ꏴdL��oi,�5�:��u1&"��Ԙ�y�?APJ�o\�s�\Uؠ�Utu�sg�1۷�	�TqԦ �<��
u0d#9�L��!w���S
�N��[>�|Ճk2E��?_ށ�O�]F^���<�>�
��}+������A*l�6�器�N�<��{`����V��^8��`/���5&*�7n�l�&j��uݺ6�e)��F�K�I�M|�J���&��V��ig��8гތ�!C<�M��udZFUv�t���]o���BQɌba��[��ĖS����M�a=q'�<�7٢��OV���������j$*!X�v��,�yB�ҪB��'���
J����H;l=v~s�r����骝�`F,��D�!D�U%�B��X�a�(�^�����S5����t���ŭq���t;q��=z��+�����v��:��ɐ���Uj�ƺ	�E�]1l:�o��H��/����+S��ֻJ˭��)����a�:�;�W���Ӯ'��-�?W�&Ǯ[t�R�r>��G�.�[�W��g��|xL��`��.8�uU���$�4u����Ռ]��,�=�H��g��_8E�N�O��,G^6��t�x&�y/��;9�ӟr~����P��z�C�Qv���d�r"�h� ]DJ'�.��O�ϊ�����k��L�`��A��z�_dD�T�;��Oɱ��џ�?�ۺ��Sʜ�Z2��S�ꟙА��lk{����u�L�
D��g�V�}��)@��*ۧ�C&I��*���я��m����>Ȥ�W�G[?�Eg>�r�6[a��fӭ�k�]�Ʉj=��>y�����\ޏ�~;�?G�i�ʯ7�     z���d��}�d�+��Xآ�X,��衐l��U
���f����E"Yv�E"B
�E"���[M}o��V{������lV�R�䱳�2�{��`po���z�$��GV�SK�)o���F�����:����2��-�$�,�dK`�9��`�D(���ERW1�x%�/��g�z��џH0ٰN4ɬm�����Jfv�3��O��ۘt���i_��2�Ӂu�꺙C#	O>б
������^�vƢ��I�.o�Y���'�9^��t�sf�@��^�+9���x���uw�d+����;�#�Խ̆��N&�d��V��|� _��by
��iu�d�O��t
��b����f=C��¿A��"jVC�p����Δ��vYM'�{aߜ'�r*{���]���o��1}qѝ#)���=d�;��sN�7K��sB����0ߐ$��co:N�a{�8.zُ%T��	�*�t�n��@e�ҩ|VyˊL���!�ܑL�,�f϶��Q����&l�s���qȌ5�o��$-�ly3��>o������	�.=A�}��j�k	�\]�}��'�:mO�t[��K�ݤ�=�d�o��h�G�?b����3_$PF�n�_�wzf��}��?YG,��q���yGA�IE���լ���	)��6�1�Vkd#�e�*ϙ�D��q�㛹�op)Z�w��P�a�@�es4�j�|�gLRx1�����Օ$���t���?+P�*ނ�~z6�R���R+<I-�l2���m*�u�A��ˋj�Y�MO������ۯ�q�J:���D�c�e��u��o������Y�>K�$-%�u7*&N'+��[R�����l�,}��L�2��"쫤z��`�j�O�,=�߱�����7n�wΌ2�.lI�ž⻓����f���`� 8�|w>�>4u�G��h����B�X��=��(��L�Vl�@I:y@!��ŝ�=��$!͙%!'�����2"���Z��A��<m���(żW�s.�j�e�3�:{�����F69n`u8���7t�kAAU�����	P�EV������X&x���4��"k�/�-ӛ_�����v���o˭�Xnh���k�k;3��H��.�^�qX,g~r�o^̺s���d��W���8�eQ���.ˀߌZ/1̴R��=	D��v�d����C��\��D7�Q�uĲ���s�n
.���q3����ޱ�t�I�"�A	�����|"moLQT��~�n[v[)��naf���8�9q�g2��[�XH����
u����̏*� �*���܍y����[1�+%rF���D9�K�>��<4Y�{��Y�]��͉�%=�-��3tXJ�䞨��V�Ж�S�mY�BT4����]fN�!)����U�0{���s�d��e~��m�y�lyԧ	�Y?�Hc�R�4Y�}Y��*�l@?��2d��+�8�<¢�w]^$�6�kc��ure�t9�Tg��[�S#S Χu��eWG�^׉O��NG#����~a!1���lV2�����O�ʤ��8q�:>'�!"�j�2c�\3/���J����F^�m�ܓ��
��鸥���6����A�Bw�hf���<����E��U��tK��f
@���WO��Ib��}Z]���Cj��t�r�x �����J��
�lX	;�1���Id�З=�Y�`=�7���V�
������Y
�252[���f�;)��"3Iv�
C@�0�O�&i�f\
ȳ�;����J5#��GŌ��R鷝�B�% A��uZ�iz�YO����vb1u����<�;|���~�}��Eln銢\�)
to���krHL=3���Qh�M�O��Kw��4�3wZ�v��잎?��R�4�P���Z�� l�����[�j�ɑ�>�_M�Y|��D%� C�Dh�ҊA��>�t'�z�y���L$�kA.Q�} {�S�F|#"W����ȱ���J�O�O��4a8$��d�l��5ҧ^KF�&� g�2]������N�v�lm��O����H�z#e���M!�#;������B��e2�o��^@��WFy ��h���U�$Cw��K�vu!D�{7=��糜�:e�x���"���vn��>�X�_a/� �N/�B�i�J(�{�?�LJ�D�h:2S��J;�Q>�	�G=ܻB.K���{�^>���z�Eo*=�2��sS�e�*U��i��[��ѩ 1�|��|#�T��e�D,^Z�1{	�ѽ�8/��씳��ehN�
�YT���d+$i��}X/���)
yr&���P����Y7_}�B.�jUD��ʲ����ƃC����V_�6a>Kf0�D#\���hY�"_�<M�.萠8ܐW�)w�҄s�ov8sȸv����/z��\���g�˳[γ�k�u���Q*��6�;#YYx���6���c�H�����d�\��O�����-(�,��tݢ����]��w"����PzN���r5�=r���W�/�S��e��c�V>0����|���]��D,�a��'���L˄u���9��yU��j<>|Z�>��2��J6Ui֏Ia�:���9 �z_%2�$�店��U���Ow��Vo�e�q�yVzE!�'�S7c��j�_��"	�!����U�Ae�H���S�B%K�{`�x���-��8���=E�۳F^O'�+��\�u�e�'˸p��#�Y���2�?YP���[�f���tH
/J�+0�~Zד9]����mJ��4p+Ғ�*D��Gr!�/�UdD�Gt.xpف(S�#�/�"��M�55)t�գdH��$.���X�mq�&���3#�Ez�#vO�M��Bǽ4��
WRn����<�K��Jҗt�
c6���9딵��fBYTx R!*�KzN��Jwd�Lwp^��%�#��A���	��w�l:�ԒX+ڹ�E+"H��h�w)�a�F��b��*�*�Ꭴ&�#l�w'H���N'�� �ý:
r�KIV�]S�)�����7|I�e�t����L�7F;�y'����2o:�tJ�*��̛~��;%�Q�h��,��a�\��1���ρ����/�XGxt��,,�#�*���TBs�e��x�,�1�rI�_�#�D�l�R���H�n���C%��ʕ�L��+�.Y�bҦ��K���t6F�7�5tCτ����SJ׫%r��nk������+��f;9�A�Gw��ϝMd��ugyP�󋗩(����J>E�BF95�i�b9ڤ��Ӻɺ�eռ�]�̛ϲ��1�(���P�޷L	BS�gfR^�����\�.�W��2�=0�;w4���~�}�#�B�MRyՅQ˸��*'��N�m��I�lP����xa_���l�B���)���)��C�����T���k�aV��,*���dI3�~�t�1�I,������uS�r�CJ ��Q�H�B�U2W�+����-��z=�PS! c�7U6�YOi-�~�.V����''�Q*S�V��t+<��)4#9�@�OQ M�+��#�� ������tą�~a����p0P�a���(j�WG��ƎkыԮ0@Z)唿Pdq#EռJ�o�) ���<� b����*�]�I�oj�{�GY�*w[!�%z�ٻ���/�v�������7�'�+Չ��bb�#[�`E&��xDH��@�vQIʜ�&S��piPxb;�6�ImN�_$�^D�Sn�ީ����?�A��ۥ�\P(�B�{����A�4��|jgbO�lm�%�����gblI����s�(8]��=�ˠ3�7���.�s�����0$LU��_tW,d�#�9ı>J�:1�?�o2{]�^`L���8�]����$R���zh�Y�:���ՇE��'\R:�i�Ex�A��i��1J%?�+,R�ޫӆ��;�*mU�աe�qdX0����W{[ȉ���T<;"
M�~qG�ԑaJ}�����3;vA�Qq��R(ƁBzmϖ�(�m�ɸ��$�^�M�/4���Ze�$/�<dx�CaN��j    ��J�u\�g�t��x�hXŉz�i�He���ʨ�l|ď�э��������+d4���/0�뛗��![vQ�-�"����)�NdH�d�]B�s2� ]�iV�!|R)�`� @�X�/��ߣQ��,�%�M�vYT��_WIc�� �h�����')�N`Q�1ԣx�:^h2��G�[�0��_���]Ȥ2�R�kB���	nڠ#<h�7RS����ӥᘍ"�%E&�x>$Q鸑�a�"f>?k2�d�� ��3s\��_p��ƈ��s
��&�Dgxd��$4_�rz��u)NA���>wd�e�nU:�B�� ���A
®��e`d�� �S��⮃�,�h#�#%��v����[N�#��7��Ĝ��h�"4�ʋN���c&��$t���HN>XϨ�Pz$�;˫G҉G�ȁ�G����ч��x��ll2��c����m���C.���t��*�&u�L��2�ozt��x!���Q�)��Q}���9�ftK�X�!����T_��‵�,���'��yǣ���{	�d��;R����a��K��B��i���s;�ΰ2�h�#�;���9N�)��d~g:���b��]F�F�z.k\s����鵶?{�t]�͏a{�<U�_'Ԣh�@���(�\�t����L1?_�o�L�n��z
9o���R�0�`�����n9�qݠ��������Cm$��0	&m������8	�A�;C��E����ݐ��r@��tW#�'�b���jXa ���̀��Lö���Cqqa�.���a��l�¼5@t���iJ\
�ΰ�Η�_�������Z%gÐ�"�����ٛFcɳd�Vl�yL���*�����D%�k��K�!u������� �(�+�x}�@�"�ٿ�Xc���ό�`��'�9fc7 �k���5�t�AO�À�I�p<���>j������(YRRtQr\�>�h���:�[���j4+��f�
x5V��޸�'�ӐMh'�J�P�����>Y�p�- q{�2#����� 2#��5A>b��'���W�m�-ʱ������D��cS[��e0��?ުLY;��a ���?�
RɯA�~0ECM]�7�i�S �.g?�E�Ld��\_l-�٨I���CQ_�c�}�F�tM���6@��(B��d��/�t����������d����밅v]_Fov9'�P��|5��9�p�K����#6��B!km�mR#�s'���i��� 4VS�ąz��o<��~��ƀ���m���ap�jɢ"��jGy��23�%�b�dU,*��@�����S�\�#������ᥧ���x�Z^Q��O1F�H#u]�é���-+l��[��;#�����w�^	;��r���7�m�a�:�:����я?kp9�j�[��v�.C�%��dE�u�݁ԿꓓqG�)��qo��v/���K��J��N䍵2Sp��Ǯ�_N�s[��="@��,�1���se��Dy3z+�'�i� ˳�C��;�$k��O�q�)?v�X��N�G߄�� 3N�C'�I�^��ݙ�2��vR���) �D)�� �F�>�]
v�O%Dǫ+ި	��[W"�p����^���O`���%�Z�|�S��XJ���Ͳ�r���	K��<u���hcN�V�f�T�'����� �f"h��@���?Yf6�|�;Y�&gȂ�[ȩ8���q��C�,md������(J)��9()�_�����/�����g�R��s������s_�`�"*p���2ymC��(zV�K������ $�W@�dB�u)��%����2���.��Ӽ�g�� �(�
`ma8ݛ~�r��~b�4�9��p��ڏ�5ɏ��e?�>gplpb�
�N(�����@��q��s;�A�dNx�X�z��'�x�Xz�(C�-�ݷ̵�V�:iO�@�Di_�
+0(rf�)"�|���n�d�
�qW<��y��X���)�#��S�U%�Bw�da��ɤK�G�ݪGrf��8�H7̮�ds�Eg������e#�I��A����o�*2�
Q��!�s�9�Yr�S����.��[��{*rJw"�2؎���\K�b�����P������	M����Bo�B�Z\Y�1����2� �hE���h��sl'Au!K��9������}�j�+I��O�ʽoćz{�㸤k����˯�S������ݿ:u>��^-�|���]d8w4�M �:
����[�5������B l��h����N�M�ĺb��<^x�lީ@���W�;�"n��ғ1C}�Uf���_��]��#W4��F&��Y��U��q8�ʧ��ǒ����.��d>d|���#[����oZ�[�:�E�����d'�2DY���K����](>�P��Pa��Q!\e��Y6��ӥ<�G)(��8��Gx"G����L 
�� *���`���O�(P
�S�A�pa�C����)O�!��]��&	�l�[����x�w�z*����W�����*E._5�쯯�22K��L]�1/0$��,�n?[�u)0X� ��DXh4덑��
�c���y��AD*ѩ��t=��d���8�s���.F����g�Un3ӽ�h�H}۩!�S��D�m	�����^@�ź ~�i�d>yv����ojg����ቺ=����ޏ�W�+�N?ه K�!Y������l�A�ЖK�~���UP�Y��f#�8��'���w�$)sA�2c�k(�%��,��G(,�|>��b�C0�z��l;��.�0MZ 7�x�����*Opl̊�оh�I����B�D{�a���{����q�����E����F�ʲI5��%u���Z�����(�7�Ao(��
U�s�"+��'��
���}g6���Ni�eXV3n����A!#"_���5F)�ykJX/�.O�0�pW��5۱E��/pC�V��2#)TP�r)@�T>�$��K�Y��AB��P�=a�a��Jj8 �9zQ�v��]Mׯ>�I�O'
�k��7�o���%��u0ݾ���2*�񛒴���1�U�����d� ���J�ֹ-�x��� RI��y��̀��r=�����!NPı�^�4�b
H�:|p�!������2e����I�E/ֹ������y�ՙO�S�&a�U��~Am���]	�y�8O��������$%��F��d,����qK�� 2]��~ta�K�:}_2{��V~38��3v���tR�0��
a|��b��Q����#�b�C�?#"�S'p	2H�`WV��*�Cj��2Ⱥl<�Xda��=��&a�,�Վ���w��cn�;�|�o?��xX";��A�[/ �J_���m:zE�sK8�*� ǌ�WN���ف�A�$����r����v�G���)?��m�6��܅��|�$�fb:�
J������q���N�fcC]rKҵl�4�Ps��V:q0jn�� �<z��^&�p�|��z�� ��T��@Z�ɉ����������vtېއA�}�*$�����tQ2H&˂�7�
d�ިJ�A1-�r�	̆��O��f�A����`N��|�G�J���b�J&؈�c�'6��x�&k!74��u.�e2'T ����0�țܧ⸿�6����h�a
{��+�7��]�6���܄P��»�$-�N��~����V��^�B&{Uj�|O�c��+���]O����m�e�x���D���>r�Ҳ�ͩ}�D�۷�,�q=1��`3M�:�?�$�?y49@�d�0v�sf]!��Ɏ���y0�)�:�H+H�@�k�Q��G�Q=]��)^[$Wȭݧ7IQ���$�+#�
���Wn�RvFf���8��dnp�h��~������y�m(�E��n(��������u�˞y����O������F�!݃�v���~�����k�U�(��'�P<ɘ��P���Pa�!Фh%3�5%m�N}23��o�4��=�䯾�qguL(� 4���X����K�g��9���m�5�fJ�b��Bx�^I�    ����C	��;1^��ǎT�B��[BJmW2�~= ˣA4OM�hʑ�X��^?���%Z�����D%���=�Y��s��O��}��R�Y�y3��~����#�����?�qZG�v���3Y�Bb
|�|2`נw�6I�azp�d���yZ����l���No\@%՚�M�]�C��l��f�+���f:��_�@��汫̾�h�ci$M�دR@t/��ŤJ�j6�nY�͔�<#�����|yFv>�#��߻��Ƿe}��j�͠u��K�]��0�uIA}��V��OM�p'2�*#]�al�9+�L
��g��FK��(e�=�mP��7������̣����Y���	5�`9�"����F7ʋr{i��] ��?����L�wj�Q�r�=5eUzM�~L�M9e� �i�O���ѿٖ�t�����#��F���{:o.*e��u����7󃮟�0=�z����<��*XO���n�q���-Űi0���-L����9��b��':3K&R�n�7\"pr�3�S���w$7�,,��s�RS��9<��mk녒ҿ҇�1s�_�ӝ
�45xC��~�]�#��/iW|�ϙ�H�(]�v��~ن��������ᘰ�E�xE����Ym:���m��Q#�#�cAP�E�0'�_yF�.m�]j�Ʋz�qPѭ�IF(����!�*(�'�ב��%.dAߚ�W�tޑ=b�]
��7*C'�b�WN��鱸��/��ԖXx�yC������%|'&� �AV3���lc?��V|���������}b�ށ�D���7d��?��4d=�����6���������AO��<�׳ِ��9{IH&��;5�l��Fa��h��@"��g�z}�Z'[mv4�Q��~�ƛ�~ސ��1m&��Λ��ܕ�'�r�J1����Y�E�Ŷ=o�~���u=�u"mI�#���-7l�=0�*�Y�zK���[��;��Γ�(t��W�"�0K#2Ml�*,�ss�\��q�or�R��Vt#u�-�MA��V��	Y��Ѫ�C��� �����K�@]Ml�e��%)f�;�a��]P�Ѯg)ϮH���wv�Rpг^?��b�_0�t3[�K��JG��8'	c�l5��Q�⤬���ے�C�u/p�
�01��t�>�pNԉ�:�!�Y�{Њ��dua,�����'��d\g^�z,6�=���χW�1�[�xQ��39���I3Zf����5x�2����)���O�х/Y�}?�6���μFN�&{��1��b�T�X)ռ�N���1���G�d�$AY��3�c����K��Y�pn�g�%�w>�=>'��5/�u�>,H#�7>e#�W�GҘ��ekY��I����^�M�Y�t��0t��i��v�ߑa�S肽���u�Q��UK��l[���	�OőV�'Ff�$8���|vꭘ
��^%Տ���׻��ެ'F���1��<�k���PpJFFr�9��g�X����I6�w�VyT�rU�|����ؖ��/�[O���,�C�mw/у�g��Ҥ���u�+�ڦ�EW���G7�J�u��LX̽:�U�~?�W�N,r��,?���]���س̷��Gp�6��BK�"Kp��MV9K�a���{f!�@�a"�l}��$�G�e��#�+2�[X� ��Z&>L��񺬷�O�j��#�yy5�9.�b�t܎ʨ֕��Ȁi�Dӿ�;L:�N�q�L	��L��5%�Bc呩����y��
��h4ԭ��I���o�Ml�oo�=���π�2i�O�g���l?�� ]��Cw���tG�ޥ A��-�cfI�"=A�({�zr�Mo�O�<��*�;�[h0&���F~cdVԞ[ڀI�(њ�l�k���3	CU|<�>�l��=�.��K���`�D֯w��͸s>�������<n��'�	���G���e����[�cy������bⳞ�(��(��p�2v�'C���ܝ�pq��z�-Z��[~��u��ԭПesc?8j��hJ�eiJ������Qe�%��v�&���{:j����������ix+r--9ת�_w
#J����.Dq��#��h�[�T�)ԬY�J#�qwe���]
�b )�9V"z�ޞ�VL��M�tAJ���&�@w��g�\��ɠEsiV��[����F�;��P��˒d�׋Q��y����[ޯ>�yzYMz~Ϥl��J����Z���`2kw��v��_�
��ð>5�;�d�Ω�[f�6�UG��m��ޯD�s&��S��Z��5���8W��Uߧ:c���`eV�
�w8����&)�p��HG����Cj�d�Y�! 6���|Ɔ��G�G����G]P�a��b�.s�:!=�-�`d�߬��u��^d�Ӝ�;�Y}9؎kY��T��ꞩ��s>���6��c����e!�Mz��f#Ϧ�nS��:z����P�{s�_��d�#��[E��`�[p2Bx�+���e��z�ϸ�l��B<g�]櫅���Y�=~Y��8-��I�go^�����n2�1�Ҩdή�wL�2�_*�s���T��h��=utu�4�e�0����"#0e&R2X��N��� t�P�ʥ0V*Y�K�~�5��Wp�=W�>�
�䳬��)�p�L$����d�o^��G���9��yv�A؇N�C���`��F��1:���)7��'��U /xO�s2v
d=� �ۇ/
�
e9�>>����wL��,����|*�0("i׃�N4�rU܁��R���A�`R %���mZ� �	�k�pY(;�1��O6�Lާ�S�"�W6_�) ��p)����p{��c�H�J;�o�o�t���}�ZV�/(��������<5�r`��Y�eG�z:�γ����#uh���"y�Lq�"N�8�B��1(}ц����Lk+E���/�>Y��ܡ1͜w/B"� 4 5E��봭W�L\�=3FN�Y(c�:���>�
�{���x����G��]��"�\^��ڄ�[���hIL�����(��rӴ'�Y)H�3��ćR�ܤ"��N��a�{;[����ǁ��Ă��j���a�����W<��X��~O��b�Qf-�t�Lذ#L�@�uKZ#��bY�u�i�0�\E����N*?���� }�.\�Hg�����ZxZG����'�ɶ��2p�K8��>i���7}�7{i=$)��26�|�}�ޅ-�̧bh��?:��y�e�`���x;R�Bǲ��uCK�nxv�7�+��o�	8�IY��8��y�3E��0�t=��܀�F���Mѩ8��
H
���%ANT=��f0?�PU��ؖ.�g92x䄀{f���dk���<B��m���0+$��P�k�w)S+�2�'#�{���]o�����噑�Wd�f�Zw�����E�Z&52'¡p�lc�l19���m�Æ�aZNL�I����X:�G;Ƨ�u=6F��̎��l��b-ւ�ѐ��G�1u��\��z�EX<p�&}Щ�%��i�e�g`j��މ�'����jy̓yػ!=ztI�q�E�@�U�Ӓ!ߪ7l� �m��F�I-���>+'؋\�����4q��B�Oe�J�D�^l����y��GG5��@�x�;��}��0g��*(��z�����s�`Sa������3y�Ȝ���}
5f,�/�s�'�㒋�aY��x~H�O��X<���5��d���)�m���r���������.�-��Lu���A���.�Ŵ��|�Y\��zp�έ��M�F��l ˿"I!4���3���~۽���eY�����Y���:���L����$�,����w]O��x�<6Xa��Ec��I��;����� �e��d�j�r��4��`L ������Z�AF�}�,��=���x+e�D��.����G�7�d�(H��leǲ��JUa�8ߨZP�t�z��2�l\��ntkf�Aq��F���ʎ�yg:[����L㑄��R�@�țO����߉\u$y�������<R��Ag����2�m���,�W��U    ��^�'�����)�M��:[� ~�0�Zf)���X��X:I{�&���ߕ4�:D�
Y��)"�������@�os�����
���4�<I����fEv���k��o$��}�N�A]��QO�����/�"]��ٱB(�f<ҿ<g~,}@�MM㺭��sr�w
��ۿ�S7��pc�$��3��`��	��1�B�_m�4�e��	<�W�>,{�n��`��O�n12�����vh�EV.&�Y����qE�Yܕ��!L_o]!?9��tQ<�MH�d)v�0/I=�)ST,�+d���(�+#0���̪=�7�Џ��7��o�\�L�ӔN]���0�latY�i0r��/��[�m�vSO��G��3K6.��W�m:y����S<#Uv���&�>��JՍ6���S��� W���np~��W�d�6HU�a��]��nQ�F�����n'	ws��G�����=���Ӄ����$��UP�׫��hp�G��-�	rbg�1B�a��fY C�c҇��6.��R�����/���	b�KM=���M�'�x��;�)�"3=�ׯl�p�T��=�	X��d��!��]�,�ӋI��lz1�@��}��6��5)�a$�m�vGS�i4pv�<
�2[p�n��_ʓw����n���;RoP� ��Z���JZ-�}C�3�O���Q�G{X�W�k�����x�Ię�'W$�t��vs=76��h[�f��9�B��Dӊ��3ɯ0��y�`�/�]y���}���m�ۼ
�y�?7%�������=�vn��`�*�C�;ӝ��tna��A�T��>���3�'$��`��"	
��C�yc����k*{	/s\���'_������ؗQ�I��v#�JD�Zt�Tx�VL�P���Y󽑊�������P��e�,�3OPY� V߷��L!1j��#ھ�B?�.o�R�o��b�NyI���R��۳_�@I��M���OT��-����g��<�KI�M�T&0t��)^�a�s����):�=��"Rc�"d�6[ɬJ@��j$��htWT�є,�S�O}��!��
+��R���X���8��_p��/f��d&�B!hf�ʹ��'�  �~��oP�8����b�Z2Z�Y�4�/����΅�
S���m+[US`>E�L��f�Õ�$�1�s��z^��5sYT���D@���6�&�Le��(�*J?S��l�lex�<�|:t�V�830�M���N6�9�e����R>g"��Wa�x�_nr�D1�Z1�7���L��k��D9�*{�oh�hu�g��l�DC��.��L���;��}��D�h���- q�:v90o6*0t��BN!��|�<�rf����(ۗҁ�a�n�h���E�N��{����[i�fV��Q��9����Ꝺ$�%Ƈ1�T�vi*9�*�ˬpeJk.J��R�3!g��.�=i�L����8
Of�t�JǇ����L��Ga�R�Uk���#L����蛗n�6H�ˤ�O�p��զj�V)�	櫨����'��a�%�̐f�ם���P�FG��e�2q�eS���7� !�G����ŔPOW���-�rHE�p���U�DG�u��a�1a�0F��.�+�?YX����@�&�����f$��L�	�}�J�O'��I/ltԯ��Dͼ牆���u�%��"E�e�\�ޔ�[x���qA�<�M�C�Y���
5J��)D<{����Q��S�Ġ���8^�b\�?5���3=ح��G��8�}���m>���Lר����T;��%*!zǑ��$8��s�g[6�|`'�<(U��R"�faۈ鑀��b($�ҥUX;�z�:-���dC�NB& ;��\=�:'����
��͝��|�d6�ް�qSfQ�N]�Km+A�.�g�Γ��}�.?�Eu�$� �g�u�������S)��a.���a�Mu�Ղ�� �<���H�m���3}&[�2QL%g-+���&ڋ��v�$M��r�3
��@������rB\�'�[=���)��j�V��+˪�_�
�7K��ױ�6�Ed3<O��g37q�S�W��؛N��.��0��^����#e���w9��b�b�i�hD�>{���g�|T@����W9����쭩l:}�ee����~���]�5d�2,Ŗm|����m�$����%!��l�����F�~�0�_-����R���=0^����e��7:4>� )Z�ts�X�7u<l�lh�vV�ӑ���~<��b����B��V�8��
���Y���:{�Ŀ�^m�R����	I7�~�+�M��3>�Đ��l?T�+XX�_]x��F��M���L.3,��.8)��Gȋ�:�˞`���
���$s�7��0��*N�������`?�<tJkѹ#<eSEߨ/�l�>6}���:���U�����a���~O����ܤ�����6M�H���hwX%��/�,Qiw&���
_Y%9�kA.J�KX8+�,�5K3Wa���:�e!-��-�t)#����w�!N����L,#@q��R�ͭ���S����Y;h��5u��Uq,�p�`��������7]��K�<�+�QL��?��DȢ�QEktN�C���Y+>2[r�	�cw/͊�wd�d����Xo�*��L���ݺ�_z��(��S�')^� @�'�9�2+RjA\)��k.���E
�4�cqu<�m������y�9^`U�?�G`=���O���dP�H%��:DrJM@�N	���.B��Gj�h����e��ue]��=�se;X�"���
(K�nO��F��[�sڰ��׵x[�� �M�3�!���[~����f��w�1�S�`���z'�Q��� �~K@$Iv$a7l�ќ�[��<�:
��N2`��� �F�X�$�]�� �lؤ���fy�m�c�csL>�ў-_��,�U,���ܬ�͟X�Xkr��&(Q�nߢ;���/v�����6P����-G�*s�ǳ�
:o�������>�nH�R̘��V3S�h�Ρ��;
�P���떑�;�Ԣ ��u����wg���ᤣ�����U��%yc-��]yr�z��S��o���ĥm�S�w�Ɇ�_�J';��V�G��"�SQ����㑶��
f�u�'�=
x7HFnE��d�-���a����P${6�Nrk����4�� 3�ǂ8���`�|�aҙ�e�����a1�N���N��X9�N>�/}k)3[��6(XR�ȿe�G�~��4J<�-L��wΪ�էGpP�!0
u��H��������z��A�ZR�ұ	�� }_4dԓ?2j��{�	Y�Lg2ޔ`��	�w�YpXI�1����.�u�����B
��FJR-������X���m H$MKo�m="6��̂BI�X	��Y�htB-�gDYoL��7��yi�ޯ$>B���I�����(�b`�{`g�h�2�����3'�}jB3C}���� ��T��K�	�E��WyF��_����:I���b�B�a�'��Lmp>KU�HL�H�כ�gr�u�"�YYʛ�A�ޠN2z�_dv�S��0yp?ܚB��/�,�����}7���f������ڍ�
뛬��bȎ�n�Td3n=^�ܐ`+\���gcS��.-v�&`�4@~�#�Ue��&7K��	����)]��.3�D}`�:6\q�<	��i �`�uKi�l���l��r�s�	9R؝6����\����&3�XR^�LeW�E蕮�d�Ԇ L�'?�8�Xjo��I�!�'�.E]�A�w��u�	r��2�2^_M)h�|j�8�"Y�.�P���g� �<1۰n�G]ٴ�˟)*`���!�'�*7|�w��)٦VAd�MKde(0�"�]Q���E��a��B,E�Tm���m�'�@ ��#^���o�&1+1��dE`f�a��
���`�+x��P�S���=C�,���e�NAA屢���l�T�#���M8#yfA��V'$1�"��珛�0}�▶ȓ���r�5yv    �,�PO䆩���CJ�go�8��F;�B���!�\H���"'5
�c��#-�`	xd��~,�,��"�3��;���u�szk�U���or�l�]����'s>Ek>4�J�&)�7���<p�<ݞ�i�ı8�'����ۛ��n��N�ێy�Y1��f_U�A�'���Q�o�
����`���|R���E����l�|��If� l;+|����7]��k�ԅ󸥡{]��A�D�%��'�"�����a��O�XH�o��NT1�@�=d) �c��l\9'���V:;�u�����yy�m��F]h��o:?9,�͒
���:;<�:IE�mR�.��3�|#Me�yB3QB�xA��!���ؠs���ȨFmX�CvBo�a�Fn'!�,q����Y� -��P���\�2�!�z�Cr�XSE^�(Ix*�X��
og!*���ļ�{��ރF	�yɳ����Y���Ly�v�I�Ggr��U����e���:2@��EWV���Ͷ\��	�UvV�RN)���[.^RȊ��%b.��	��Dͺgղ���2ߕu�<0�^Z�	�V��E��.F����*�Al*+Oܷ����EI:Hs,�&L��[i��]vCV���_��;��`�b��|�%��\�Ō���L9�ߕfŊ�8���ewts�g���h���SP̧S�s;蔈���bMP:A>�ܤ��o%������Vh�Z��z��,�Z�4֩S��M��v-1��S������$�4���2�Qg,g�ɨ� dQ����l�#;	� }l��/$�!m(9�IJ̮ꔯ
���C*��|���ˢ8�001uc��0�nB���\�7���I�P�	�O.m��N�F��K�Dy�l%�a]���.��/����;��ɛ���<&�Q�����D��:ea�rcVD�"�d�p��tR�����h
_tN��y�?��d�$����qw�g'�D�� ��C��{��ۑo�DR��|��F�@��X� �Y|i�H��!m����s��=�!�ed��*ܓ�R���P��Lguۗ�4Sʱ�gM8B����%L��?�t�Ȟ�E���,B<%�J6@�i��N��A�i@��d$ǣ��;2�E�[��W?_�Na!�>!�c�:W}�}N�k��e�tn����*
�݉�7V�ĂM�=�&���-[ֱʺ;y?��,pC�>��[+��뗱��]U`����5m*�V���;Ay1�������� ��
U��;�f�_�^��	�[ �|?��$�7�[W��n �����Zi�$�V���TEb�����'���l-mY{V�6Q���S��Z)�tB�����\Dy�.]�4PQ[b�lH��(=VN:sg��@Q�&y��ȅ�ꢆ7�e�������b���it��,f�,K��w)5�;v��F���<��bA����6�δ���vJO��E�*�~J揩6Az���C�4��Y?��k#f�N���,D�l3�V	�n��h��0�q�Ì�/tݬi�$\�{A#��� �MIKOJI��G��6�ͩD�7c�����l{���)d��T����r�,��"Y�kW�w�:�MU���B�.�;A�ۘT,�5�s^�S4ݞ�S��E�zP�N�M�"}�/6�D�����<�;�ҋ�c��h!Y��	]%1¢0Tm̥�R`}/���j�2�n�TX�r򋣖J�_22z�VS���|�͘����Eu����$e��}֔�}����)��-��-�y(�&��T+��m�u�02�Q�Ub���kæ N�YF�,;�8�O�ԯ1���'�>�ju�|6���)���o{�7�:EgR$=��Z��*Y�E�x'=}�����؜� wEfΓ������Yy���;��s,]����[�^�ԆL+Vz�  �!"�*#��@�N�tM
�÷��[�%�L1��	3�ed-ﰛ�8�@g���۳ɛ:�D��.�'9��l�ò3�ox�	����:����WfMz�\��g'"�i�@RI��M���C�Эl���G��R,���ܵ>G���!:p#S�B�BS���7�ٙl�@��0��"ʔgK{`|
�T�tp	ȁ���X�ѐ%Ԁ�7Q�*��u�Ȼ��d"ӖG�o�����32�.<�X�p9�M씪�2��Q�lD�q^0!�,<\�P�#���O@;�fw�,Y"�+�)K �nŕͩV_�Y�3�)��0���������N����&*'���db|����g��Լd����`��I��Z���7�^)�X| ��-nf����4�[�G�����ēBO[b�ls�MG{u�o��$��h��r��|�'�@c�T��J�J�c��@	�V7��l�
����u�_mh����]2\����4x�Aei��d�o���cQ��ݶ������$@����f�ł�q�QA�&��m�|H�}r���ƥ�j�Մ��*�SnX�䊅��!Ϡ��4�"��T�ė�x7�S�0eJϺ��d
����g�{7��W�~�m2��+���	�9����@֝J��[���م��zG����K�A���'�:�k�޲��z0�D����T6�E�������0��P��_�o�Vw�4m�奢r�z��Qu��FmՍ.<O��O��^�5��J��x8���1C;Ё0��8��$ˑ[I�[b���s�K��̪���~�ڦ�Օy8 ��7��N���֧N�I}t����	XV*t�Ő�3�E`Jl.��:��rT~CR��s�j/�ݦ���	���
)@xg.����\=Pʹ�ȑR��H2Oq.|����{n,ѯq�8��zn���UXYE�:F{^��M���.��o]EJ�*0�I�5W�����h6|S���
�f�v	��H�%��e&���Μ�aN}��4 ��z|�B���eL�U iI����aN��= POJosԞiň��M���Ё"�8�hx5�iJ�}�O�iG�3��|g�<�Wyl��xH�Q[�����t����bv|!?S�����"?�VԽLn��T��gZ�)�u�wv�6"����:�b;��S?W��x�����u�&7�H�V��
�"�C>�{�[.���+ؘ��%�� Rd���A1��W���܂�r�f�gr	Ն�MC�V�hJ�?�m�`K��Y�����ګ�@-�<l@�c�aP�棥�Qo�be����}�_]6"�����Y��sVgߛy�(�J�.���$e{W�)j�Ww��A7�j�B�BJW�'�&��$�1l���pI�S���8t�#�q�r�z�/�:|��[)l<�e�O�n�a�=��NX�ܩ�)W�a���U���[� �C9:˗��nTW*��'l�V��<6�f^�]�E�>������/��K]�[�-OV{�t��̜�ᵔ/m�����ES��V%G��d�W�y�z&�$�X��f�Y5�r޿��)��W��$�qoW���A���j�3���/R�L�CXE,o�Za�G�:�wF	�с�:��=�L=W�.[i?���i'f�8�� � �D�))��G��ms�aJ9��_	�z�k��xŊ�H?���L=�Y��"�m�sp�|_���Pq��2i�ݓ���?��������'��z7��_Y�wu�
=%6;~�h"7%ي~x�7M�3sx��#�t�@36��m�8k6O�Ul	���ҰE~q .(��z�
<�d2���cs�ɥ3���yE�'���?~��2�X8U�JD�'�H%�&�A�\���9��X�:�}��@���=�im���.
hJEC��.~�V�?Sw-17ſњ�f>۔f�hiK���5�<�}Ro��:���++��M��M-4i��bS�!j`\��Ͼ��I���	��س�g��H�a	�%�蹯ŷ{���*3���/����`s�Sca��UK�¾��$/��7��z�}�%��*�QoF�Z��:����b	rR��uޏ�k�?6���<Y���Bǌ�����HZ���܊|'�<�;U�C_Ζ�1�3��6�0�z��    ����[��9��O��`@�i�Y�:N�L�0xΫ�?��FA|�[(R�a&��s%2��k�����:{8���F:��J3F�Uc%z���� ���s�11����:'�W-�q09d�������J�6��� �������'�8�����D+�	T>�5&��ym.�>	j�IA�Z�� ����z����y�Z���qף�\�����RM��3��*~=2��6=O:��w�T=W��f ]է6>љ��^��g����E�Hk��7>'v0�\����UZ����j�>��ϼ$f������`��ۆ�;5�2r%\�{�_z��6�ʺ�����a�w0��E��ۼ�6=��K%-Z[i-/�'v��m�Ob�O�5CQU_M%��%רrP6�=�mc�s��{򀒿ao�>��p~��P{H��W��{35�L��W'c����6,��oJ�<��'������>ɡ�htbL$[Cr�Z��:�'�Q��b6��9_��܀���:�7��j�}s{f5���)�2}�&l���g�*?���fq�F�zw�?e��t��+�>f�)�^R��.�>Ř7A�0���"��C�O���97t��.D�_E����Yٖp��V�w����ܫOyT6�>>R�8��%�(��E��F$�~�m�$ʞg���&�'~��:G�V�UC^$E�"(�oO��m��xd�6��Lp�Rl�ħ�k�ip3��z�r�jf�e����@Ӽy�k���c'�H�k�AI�X>��OD{B51�u�\j��Q�yؑ�����5�u�-Ǉ+p�)�P��-��d���.Ԟ�� �0rq�俜#0pRbG.�6Ӌ��;������.�"H'Y1�$��ݷ'+�أ%H��zB����x����K�PJ!-�ezI[�VE��l��yM�XRd����do�t<���/�C�� ����z��Ĉv��z�F/��"��T��SU��1�[j�6�C��?��X>�(��1����6��f�bGQ�[��b��)�&r:ϔ�93�5����d��k��j�\J�I�mnyBL��D�D��9�+��Ɯ��4�O��>�P�TT��Ys�����B}�ٙ���ۋ	m;���TF�'R݉�d�W�N��c������V��"@� �1�G���sa�\�!fB~�dر�%\嵑|�B�@�ӞAq��A��d4��g���,�u�
甌�)In&CsIi��'-)���Fm�hn�,6���I��"֩ILY����O��U�_��8��"�����q"/oKR5��Wgu�����
	6�oTj�^�2�p~�S@�q���C�\S���8�G?k]�tMF|(�h�}�m{w��|�/y���&~ �����0Б$M"�9rnx����SJ6����ie�5�g��w������ߺ����I�a��B���)GO�"��������R-��U^��W��Č���Ԑ^���	G&W��R��`\RsL�o�������/f�z��qg�*��XD}��~KWy#������G0�e����t��'�����aF�k�v��;2��>��m��kٳ�KC��c�/��ʦB��1�Q�}m��v�;�`���oK�L-��SVH�b�J%a6���#����YH�MoS���e���f;Ar�Bg�?��QJ�yB9����_șHX��Oxa�%I��db�s`�˚*��P)���yMG�j�E�4h�g��q%�~z9,�h�L����!%}�v����� D<���W9�����������9�V�5���'!�y��̀��<����t�1p,/P�(�Wۉ��K��^��;�[�lM�h���9u�1&��&��o���	jadL�������ȭ���K�|�E�^��$����yW<~��� 	=���-V�#���V74_�<�Kd�)w,H672 Sbu��σ����q�_�l�_7u@��8�e��r��1
��8,	V��'���3��쭧D�'��[��c)1m���k�FƢH`
��Oe4v�i��h?��e��Y땛8n��u�q~��'��s�~��^s�X������;a�����������N
���s���1 SO>8'�i�ޘ��ֶ�a	v��H���F�w�h�><a�KV��$����Z��j��Xњˇ�L}yz�YH��ANj��Ӓ\vw���ó��(buq0ї�<߃���x܇v�c�>5�{��D�bl$����ʺO��*��e����ַL����Xx�yL����5�� �<&U�L���)��\� ���+�w�BW"X`��[x+��<�	�:G~�J�pk���eS�Nۇ}����F^X�`��):�2<.mF>u��;_����y+�o�Նl|��m����`��A��9/��gЉ�0G��vQr�;��ח�c�ӌW�۩��>�'j���A��{���28)R6����C ��nkjF�IwK��Iu%M�_�d�5��S�������$Uj/&p�/��Ȏ�c:;T�R�%��Nm6�y�:AY�l��|�vV���-�������R]7�"���x�+(kQ󋉤��j��)�o�F�S̊��1@M�����{/#p��Ao�U��g��m��������ԟ#w��G�u{�9�9WV+Y1�Z]�&\M�������`�I��Y�9�<������V^G�J�8��Y�p����w���+�\v�%�@v�����[�����'W�!s�tS�D�51|aU��UoE(~杉ד���;�.��ܧ��k�x"�K#��J@>�7�]$4��O�Ã�7gR~<�����ot�@jw���Þ�-z#z"�����ǔ��_з� ��t���d�e,ПJj���J^VM��-e�6�"���9aYk�J-�@�O5��L���#xPIK�hl�|ҵ4�BRТ8�ik	��w-g�},0��y���l�1�:�B���M��rv�,��G�$�c�<�	��NDJ`[�G�MbmEEl�,R�$0�}aM�"dH�8��usR��&#���׊����4<�}�EA��$�R*G	b�ۺ�	��S=4?t����&r�c;j�b̳c��%��U�%7���݆������yT�f��1k˞�����YK9���],���V��ܙa:E��"H�)ݫ�|���9摝�Џ"�$ ��3ЉitE.#�`]��|R\�Z��\��M ̡�$udS���l���u	�W_�o���EE[����j����|>Sڭ�dZ3�����$qnZ��Y�ɽ:a��:L5�\�4�O
���I���U��^����`��c�^N񱒄���|90�3I�2�*M�Ӗ@J��/�4�?�^����7i?OqI<�+J��띀_�6��22�AuE�йkD����"/�fm�gm�W+&�^vv;v��$Ҟ��y.F���IU�H(z�⤩�'��)�X��`%nT��=�7ʹ��'��`[��.�%�IR�|�6���R�r
nd�c��Nh>>��f��8r2�S���ZSW�`�����p�l��T��1�˕�9 ��/�g��ְi��r�[�7+v&i�t��秳�s��	��;��1p35�\��L�+�!�Qz`J�9�d����S*��0��<�)���kx�o||��0L��?�?��Q���N��u�%��Ds��`'���ԕtj��st�=�u����1�L:SEa����<JՅ#2B�Q�㖒g�����C�����RE�%�ChRT��\k���+ ��*	���Ǔ���,�P����^��P���P-�+�Ӵ)!|(ݚܣ����8���z�\j�d��Y`��DB���O�:��,��vw:�IG��^M�m���]Ur�|)u���.}y6���zsOIى�̠���r��5��1�v+m� ѓ&���q~��)䕳	�a�zA(�w1�A�Q�>>�8b����[�mGB�q�Ij�eI^oc궖8Ie��:�ǔ��O��π�d��D{O�8fb��&GރEnJ!2�f3��SU�R�RI����l��3�����#&�G��N��o�I��I"՗�m�u+l��j�mX�1V4` ��=    �*w�~���\��Q�̣փ��������@�x��n쐭z�:�	��
)�.5�ħ�
�l̖��D����_�90`��s��~x���Ф��d�	�j�W��B���o�/|�d,����I�"�s�X�������
���JS%0��:\q�]�1��t��ƳJ�;�o�h���\c���ߟ�	3k&_�fv���Āy���@N�ߪ,���}�gg���,���e%Fմm9Zʝ���Kު�t0�^�ݳ<̤��%7�Ҙ��u�Յ����γi[����og �zs�u�f;i�}���N0��tc,�gj�Óc�ϟ'��$/[!41��6>�<䤥JK��l{/_�3����e	���l?��~�P.3oD>.ihi����}���{,�#�����]�M9vi��\:W��	���j�iA�vyZ���ċJ�`�`�#"�����[=.R�O���1Z�%O=���#eʺ��(6b�!|�i��9(1�mL�`��������:��7s�9j��Pf�9_Cgv�	�O*����̳e:�W��cD�q���1'd*GW�B$s-�1��b��XMH"��z}��!����T�o�m[Οj�;݉��l8�f~�G��0�h'3�t#�zby���7o�C�.�S����'
/���ݙ[�>���_sa�/��O�^np���ė�~�?���|ݞg�D:��Y6b������k�hg�����?s��'j���̫���y��4�j�u�� [���Õ�F��ͦ��DC��AG)��,˱�f������]$�^݉��Y�M���A����Jތ���Nw���Y�2՞�L����{��P�������V�Q�r��������\Q[@��m"��
��k{�8���fl��Ȑ-�I�M�LF���TG��X�{w�q��D�S{�����K�-�JЙx�,C�����3�m������Rt�]O��d�&��Fm
�へ[h|�J	���#Ŗħ�2�h��߾�eY~|�>O�d��Uh[ ^Omؘ)	����%���<U�3��b�/�(G�a��n�s�X�;!��s�Ɵ?i��aB��%;Ji�p��a�W��j���Ē2�틭����&�n/壘�ͧ^J��QnH�C���A6��;��<�歴q��6#�����d��9$�m��<i4�X�`}狞��0��3�}R+��lp�W��7g79�˟����F��1��Gn�\*�/Vz^�
�\��7��I/���ID|���x2�^m��G;��｡I�$�(At���B��~����������O�w�	Q��-���y�N1����y��.�iRK}\�p&<�5�<sm����kH*l��	����2۾Y]B_C���	��C�]��٩�����Ӿs���]�=G+���)��s��n�D�rl���>&��q�&���m��7&��w��̃��<�3޻������E�/E]w3��Q�*r��[\�=�1����}�iy6V剁:i�"��uJ�m΃L5�<�RG�0'���l�P�S��f��W�=���th��6E�=gjh¶����Ao�?ʝu�zN�5��D� >�sL�D�!�7��J�%1��S��6)r�sƂ(�{O���?�P����i$�����{z�br�����U��y�E����[��(}䯲��xY]����Oܝqr�&$´����n�SJ	�Ǆ��~٨�!Ba�S�gN��$�����󨠸!����˰��l�X Ď��yT���|j���l���A�xa�x��H�)���'AZ7�`�NG�T*|�d��&s������7R�P<�-�J�ГaѼ=���E�c�A0�y�,�����xN���Z����5GK<�C@��:�C.2�x2a��x�9��ϡ�����������s���)��h��eN�;�h��Y��ۜDV�g�e����0_&s�Z�i<�pS>ZS�U��q41h��۪v�x�2+��-��
U��O7Dvx'�gE"Z����K#�﹑�8o��X����` [�V�U�&��.2r����:�W>{/uљz}O�~�n��甎ɜ;�Π�_T�Nmt��/�ڴ�t9�}���r���mN��)���8��mᖸ�����.�j.e +������sVE����<\�����G��`��[@k�&�!�1�x���Ǝ��=���s�C��\��g� ��(��L�����&��r.c.���d�߲B.�ō;p"���9����C	��s���%y�Cɮ��Gr������Mٚ���T��e5�'����V��u���['�z^V��aG&V�f���{'��c1��Z6K|�[���w�4�D��q���:�6 r�R�/��7@;	�x';��52�=Sߟ��L�&H�?�'K� ��z'�b)Df���mG )��B�F�"�4 �-�J|N�)r�<q����~��|�c�����_������w�dn���Xr-lB�f��g�_��fM5�rȭ*Q���4>�+,~z������%ׂw�B�4��<k������]$�~��\�����`z�矶�R5w0n��l�&���Z\��cM�Jط��������'�)���>LP
RЕűP�?���_����=�۵���Ǣۻ��S�_�?�a�F��ښZf.*�%P��+�{�Om�9إ����e��OzMM�n�T4��"��ᴴ��|��?
L�4�@N�P6�>}����7�ݤ�	e�O�����Ʃh��N�Q�0��Y��D����u�q����1�<�RXU�8Șy5�Ev��W�y|�	����4�����I�x����M����U3����M����2�^���&+�l�殎�0��@ܹ'}Ď�L�x�R����l��ެ�l���������c�>������v�`��Y�wO�Zv���m�v[܈���i�ʔNw����=	3ϯ��sь��Y,m�i4��󘰫���x��f/ȫ��s^�G=?m*�E��|#T�˔  rF>r�hi[*5�F�>�W{���y�O-��	e	\��$3l�8:�"g��4:oW,��"P1�n�$V�)o}h�۟�����H��Xo�
4v�9%���5���|���*{Uk8����#�ou��s��VN����DRO~���;4�ϵTA�5{�ɨ�pa�u6��&Q�$����{��Jã��b~]:9}DMn��M��H�rA+Xz��QI=��ӝjs���q���n�<p�%i�!���e(o��HL�=>��7Iu	�]+k�) ����53��[ߐ����a/'���
5 �j��Ov�a$$�1�K�N(7�f���3x��F�F{�XK���5?�5tjޤ�I'�{N5�7QS�vԯ��m����)�,���漑L�·꨾�f|8�������b��=1l��3-?����tuT���!O�hɇ�d���X(20��2;���i�ã�n[dW?^�9Rf��r^�Խ���P�q�\޵Y_9M	:�������w"�Nm-�s�>�#���ۥ�{��Ή=�ρ|,���u`�> Y���q~�k��b����'J�04�12�K(�)�Z�b���fr��鼓��`�V���дq�Ll���s�!�))�#EL�֗)�����W��%!�����e�%���d�C��T��.�ռ}>�.����h���SޗWj������>	�,��P�������n�a�v����	#c�'H�vPߜh�co9y����k~�ݛɚ�S*+9��;Q�$Q>���j�l���D��EP��v}�۬+?|��������Q���9�EY�l�����A��ђ���<6�NTtUv�Ǥ��L������02ϯ�|�7*+2�ZӐ�]g�����)|Ư��C��g��|�VG�Ѽ�϶=�cM�$x��_o���9�:��S^���m�*�NR=�L�$�ɲumg>T�g���e]m)tJ��cęJ��e�}l�Җn�$#u�D��kx���;G�.�-շ�Y�Z�ˡK�H.U�'AoN���S�,�yޙ��瞗Vػ���]W�\�`m��W�q�;�G{�(�P��$    3s�i���C<n�]�\�eSP��C�:��IE�,�tt6��b0W_�V���<mJh�.�1���I��*Y��u�6k����kI�/��YƜsVrss��=�̖aR�9��<N���5��P���{8�3@�(�������ɯ���j�1���c�%]y�&@�?}g���%��[�BT8R�s�!&c�o�n�5ৰJ��,y�{��r���>�{ ��xa�Jj�h�'ƭ�)3�-�P9Suȃ�H|���{���3EJB�oK��R,�����#�+�b�����L������\��\�(R{��[�b��{C��b~�.��	g�aMh�W8.'��\{Pm,ɘ�|��\��'9(㹀5A�ç2��t�gU�a
��BӤ�3i�z"f�;��I�����9H�Ƅ��N�h+�c��d��v���3]�	���Aq���*��F�ĕh�hN$D�ryMMJ9�`}���PiJ��]�>��~A޺����-�	8B��/[���y��(���A��Ra�0Z�}�턈�Bnv�H��$��met|��Z��h�}�Ր�'�[[I:���%58|ښ���%�����.�����o���g~7�3�8�ǎDpD��!'C]g�;��$�t[�/�g�v�>��pZ�i�S�������Y5��]��Z�W��#�@:8�R~�,����L���B{���kؼ�<*0���c��{>G
�!�mۨ������s%��U�h˓���S\*O�6S:.f;r<C�V���'?V=��i���ϣ�8DO�~�ѷ����/��Ɵ~Ki5�1����,��u��l4ܽ���cb���o�2v+bEv��oj���1�y��\'d��f�e�-6�S/���5#�3WK�=�[�%��6�	թ����o4��K�ꖪsvl�%�5�����w�?�c-%��8���~�i�����y��O��w�m��i^�Nb�����`}�~A����s�*����|#KRIZ\\�:o���am�M�e,z^������s��x�9��;_ @0h��G��b#�j0{����'zQ��W�|�W��I�=�p��7�C��rb�*��"�-&�Ү�P<��z>�E]�UVP�}O��g�x�t
)�&�ϐxC��:��|�,���}���Y�7��?���DՕ�Ӊ�}����u�^��]��X�9n#}�|�@��c�]VC�o/19w�/� Z��H�^j�os)��o����0[w��u-Ǹ!5N*k���\}W�(5��Ow�x��hҏ�ﾉB��L����:�ȍ�"�ty����^��7?�œ}Ѽ�u��H5�{�\�D�Ԯ���i��\���hn�5����I�84��QJ���$a=[�U�H+�>�⏍��CѪ�o�0�/_	ia����-ŉ`�~-�6�y��5Y�Ps���K���Ɵ-�}��zK��-H�����=Kn49J1Y��v��d�JF�w��$�3O�z~;�M�sN-��[-6�Aމh�Q�����J�����J,�����tK�O�>�Ig����}��6��|m��yW���2	Jj��hd]�`�1h�3�㶄{;$��ۿ�l�K2h�\q��$�� �Ei�[�m��� ��{���1�_;�^�(��,�Q�KÄ4P��S��|�'Ր����rűm��,{i�L�Z��l`9�76?�����R=��{��a����^G�"���c����Qs�����69?��߾�e�*� ɀ��Ppì;3��)����6�������6]�5��$�缜f)'֮��\m����	�.i=�O_ �Ȫ��.���~�v�����$^��H�%u�QO)}-ΝRE��5�9�KaIQ�Ӹ�U���5�UMw��=}%���8K-I� eb۠a�i|/�9���wZm�|S�"$�<TYLB����K'�������ri������~�w;2S<Qd����"��n��e����ףT�h�&kt\7����=fp���j��0�� t�#�nrV�m�5}��8v��c���ظBj��+��Om�~����x����F'��$s�T��eL,��ql.j��bFEʑn%i%��Floh2��gжk%�{W��T�d�+!��jR���.��Ю��J�X�&�~��*�T8�a�nm����.�������f�۵,�V��<M�#� �RQ�^����T�)���<��蛽Ǉ$xY���:')���F�J�8Pb�N�I��T��ABNz�ؗ(�B|#�|~�e��Ư<�^kI}ʱ��E�ڷg��/�~����V*���5E�2���D����3g����*ó��c��9Y�}�v�ST0Zl���]#����F�O^�s3�%�Ƕ�ny`굍{���#�f�֖%�]�Iƺ*�����C�i�@!6lC���զ �U����U���(���P����z+p���мh��G��|O;p/���ܮ��|�L��p7�<9R�� ����$V&̒�:9�?� Q�F<a�u�-�Rp6>U⋒G^��Vɍ#A�/�U�֢|��4�m�r>�Wm��q��O�E�}�C�Jp0�Vy�!&�y<?�J����������f�U��9cyp�'QQ���c��B}�D�T;�o���߸%���Ym�3����W��|rHN[��N|Oե��2��(O���ͽL�bC��w����f����R�c�������2&&QK�w|ɩ�n�ɶj�1aϒ*54<�@�m����;gߍ�ލ+�K�c�oߪ+�sF��3��&��ㇳL!��Eq��a�6��qD
���V=�G�7�_�fs�_6�9����H��te��R����k��aw(���pY�8S8�,}kJ=mn�7g�⼧%\�(u�����8��6�b�nu۴ڹ���Q�C����>Y��=�[�!F�Ƚ���S;�2N��ƫۯ�x�R2}F�.�&���C��6���$�.����ޖA���H��L�R�U�k�e CwYj�}�pt�	�)	΅�˻`;z��nDZ�7L�5�����6��J�����3�i��O���}���Z̕��p�RV[\]�nϽ�9�/k�ĉ-A���c��>�|�Rv;2�Ԁ4&��Tˌ�F�mĴ�]��C#if�_�\� �c��y�)Dm�1/�u�S���ܖM��wC�?h���<����*j����\�Wr�������ǜB��s���J�vaEE�m����]wn4�^·�c�`~�ԁq��`\Gin�ߣ<�sS���ӏۈ�n����KY�"�a�6�-�꧛��!b�[��F�H�_�+h���vӾ���G�N�q*Qs�WM��H����42^�]�`���X4{�q�H��МK�R�g���{��fl�|��2�x'����E ���!��a^s�����,<؄��sHW���ɤ�UH��O�#��{�\yϟ�H0�Q�?y:7%c[�	��+�G̈��x(���o�̗��$ �[}�䂱:|�}���aIHlȌ��\XM���˨$_�*&�������y���E3F4mÙqX	c��qt{���yz���'�ܝ/���%��Y,U��O�(����L�{�np��h�48-�2�a>qHu���k���$�d�R���q7��ϓJ�P�,Ӿ6V�WΊ@�&�۝GL��(I�LIj� ds�e�(&��p@復34)�Ԋs+��O�o&D���T��^�O����1y��.����LW.�PmǇS����޼z)a�2s}�o�>���7]��^y*��|�$u��L��'�Ӷ ��6����Y���h��c![X|�b	�;��P��C���Աj�q�(%	���oL��6Ͻ����~`�if]5��;s�|y�&2=^9g_o�Xey:��y�
�ڎo��/�:p0yrT>w<�`	rX��ߒ��Rjԃ�ܒG� ������3quB�^qj$������i!A�C8�GP�b,A����)��z�����_���*o�����\|��	&fyqUӥ@��kG�1
M��
)&�%�.�㲅%�ܼ���-q�=�Mnf�����].�^�)-io�Ԡ�H]�g�7��Я��Z8+��    ��q#�J7'!����aԽWm��2�Y�
9z�7qh	�A������F�C�h��(����[[��{���st�B���P�4\B6D�������*ɶ�n������%D���;�c4��=��<�^A�Y���?}u��mhʱ�B��p��-=�c�>?�P�����*d��0I�����f	����c�Y-z��'M�_�C1'g���F˄E��#�!p�,͞f�r������s��[S��[����
�����-�����2�Zc�1�n�ߪ�PѮsJy���� ���|������k�╲�kۤ��4�<�9[�6J�@׎�;��n��o_����q|1LZ����x���.�0Q��%
uz7n=W�<�Y<"w�/��)dDy1')%�U�L5
�B���󃨟��Z�,uO�ES\�3�+1y��%4��)����E�jJf���i�v�q��c���"3�&��8A�R�`�̛��F�G���u�w;gme[�����8�N����:SO�^��7U~n�K�%����CV>7I�kժ]�n�p7�^,%Oh`A���o�v�	RÅ���b�w��Y�k�a��?�͎���#dS>?��6>����A���~Nܓa�O����?��ّ����fA��L����>��ª� ��U*��:u|*�]t����ǝ0����#yJC�Gg�Tz�����e�.�Xk�mB�mk!ߞ[����-�m&y�u�K���
ܢ&�8�3�ÿzup��뺃���y�5k����I�+���,�l9R:M�T�+'ô$�rFI�j�I�ro��Cȓ��^V��M��`�d$�_���s�1!Jl�;�Z:��Z�y���6Jc�����:�����2&m������]�9�ҁ{O	p�p�3�Ү��v&�'��3�S9�u��i���4��|��X�Z���7�?ʣf��6hc�<[����8��;��D�P�y?X�j�#�h-��C�?�9:��Z�I���ND0}	���Ob�HY�XL��6:�?��Sܥ�����+N՝���ӹq�d~��V�JN^
��ruP����#�q�PC9r�X�*/�d�~YГ#�&	����j�m�.[J�l5'��>V�h=�%��݈d�R�_��?�:�y����W�%?3��3I��-�_yT2��0�y�*s�vj	G�D.���LMM+DnJ�*�v��vm��������C�,��F|��l��;?c=
x�y� ���ҿs��楝�����b��ٙa3��	~�L`)C��%`�؛��Tkyϒض\�@�ŇK�N�8P��Cm-�z^�
)f�]v�p_t�z�6�����J����g�2l
s�;m��!�H�)Yx�@�gxYU��[��9;�r�!>԰�y����nYk��fȟ��K_Nw9�%�h���QH<�~�x(ձAm��ۛ��r��(D��4���Ï��F��,��K�)�)a�����/�E	Bib�:u:~3���Y�'�!���&���z=�@�����i�4�����c1���:��'�\��y�Һ�9�W��2_��+�Cc�:I��Ȋ��*��8=���^U�b�9��fY�1g�5őI�+�سMXj���T.�W�x�f��ɩt. ���w�G���s�rm"m/�N�=iВ&ےc�Z�\�f��٥j�ߗ�����_��}1����\{k[��x��1����x��Wł<��C$�Ri� �C?-l�����:�ԃ�Z�mjl4�7��X�;)�-I;n
t��(�c$%]�I���y��1��FI���&��jJ���0�n9�X����"IvH������\cM�*��چh����ǩ�~��WA����N���$��Mx���a��~j)��:�&95O]RF��n`���NE�G_�n�7�N%�{BI	���%��p#2���4�B�/�fl�5Uo\�U���<��n$�o�}_}(�PƩ��v�c77�ܣvT���,蠍V�n�1MoMHM�s������hL^�.9gc��S��_�D���VM���ڽ`�<��Q�.$���ug͞�k�p^���\:sƯ;���7X�9r��aB;Ja�:��Ƈ׀.v�4%wr�6:��Ǩo5I�eb�����.�E��y*bD������CUz��d������d4e�>F�(Bp&)���?>��PM�'�#2������o#٠ܜ�����A�}gE��|Ò��]Up/��J���=/�"Hj���������e��j{��I'���Ĭ@�	��Y&��P�c�Aծ����d���T�[v���Fl>�.)j�]���ߞ	���xp����t[�������+����Ï3*���t���½4-r���wr����ֺ��F�v�Y����`
�oY�pM��g~7��Æ�����jZ����8|��$�C{��l*繭;��;U��΅�얒�<�N�"q��飉���,��>?��&�_���m3(i�sH��S���ʿμ�1UJY��r��r?I�S>��I��E� �'�^zM*��6��8�j�ޥe��>@^�\��{NG1��[�$(f���Q��n��/;�Ar���L,ө>ˊa���;���d�Y;�Ϭ��m��'�����1�yM��W4�]J���f��eP'袚��ì�f�מZqq�mh�G���a*@�"�Y|��2w�z���ymL�?P̯���'G'�Qƍ4 �F)qK��!o��j�4�ʠ��c�B䠔�<�[�}�s2u�^��A{���w����š����DK���Ś[����" -s
��:+��r�+c���N�>�<����ed����"��uY+z��ycH"����o�j��UO�=����9�G�����u�k�I�����s����4���s_��>�v�ސhl����|Z��@�U�0̕��d�rʅ��;�Ʀ ��E�$E�n��@&FۮS�g �M�܀b.W���>Y�' 3��N���ܘ�[�gq����zSPC�V�P�X����H35���Ϻ����6��[�����{�[�Iϥ��<�fnW9}��0���X��Q�����%��ە
�@�
�ۯ���l�d|5��/,o����S�<���2m��@��T,�;��'��s��I7�؃<my�Cs2{�/Q�3r&jR�U�~�>���^�,�ʝ�{��|�k�{�h�������]��`��NcB�:Q޿p�u=��Z�g�p;�ˀ9�M��Cv$ȝ�M�<�D���!�)��m��CN��h%ES��3߯���[q���i���VKB.P#�� ��/����Mx�Z�r�f�����w��{\*��Pig�E���ّ�����(��%'{�����M�z{�c9���Yyx�ی�������ڇ-������'4�hf��v�pv>�d�0K�o�f�DG�6%xn%60�߰/��m�(��y;���ZVW��~��꫻v�߽�#��44���Β�gکev��-�.���¾����Rm��������P����@y���ޫ��9̟��o��-�~M~C��'�걬�������_��)�c���R��t�<\��X���Bb�h\/	�?���7��G�G�A\��k��:��� ���w4�f��H������4�D�	Xz��22	y�fЀ˛���a�w�j �̥t���T����
���u���� �tUu��˲���8�����G�1�GYŕ�E�QZx���m�<�A�l/�^Ba��s�Sܳ��|��#����?��������Y�M"eA_F{�$3w9�f�C1�1��+�ӌwq%]�w���FN�d�Y�5%�K�.:��ى��MҸN��n>Ƥ��M_��֢�r>��RC�K�7�����A�=�>>��Y��#M&;���vY7'�nu�RB(��ε#;��'Sl6�W�k�� 9����w�/��`嬫���#f��R2t�����M�NV>cI@<�)�	{�?�v9
ql��< 7��zf�"���Dy�7�G�q�1��S�הSA���{Aǖ�Ÿ��br�f��&�x�vcsF���SM�*�7��    �
�V��%E�c��
(���T��'Ô��J&?�6��z�y�4���u�պD����viv
�\�nuO˗jGNt�k��>�9v�[�f�o�[J��������ۜ?c�Ky)��(��V�`���b9uݷOoFƹ�g�4�_4!��+\������L�ܻyx���$Er����2f^�hޅz��S/V���;�'j��4ј���Q�bQ�0�PIeoٽ�o��>��t����^�2����T�R.�7��4.m��
��'r���j�<�J�5�?w�����d�C%4G�d�E�:�j��Y�u�4In�'T��<�˨x`���T��J}/���I�: A7�Qe<�R��Y�Zp��!SP|�$y*D�Ȍ��ٗu+��}���JW���O�*���eFG��m�n�bщ�iԩZ�I����w���y)cJHUv+���m'�$'-'�=��xn>�+S���^����-��b��*�<�QA�����I������[��ퟺ�}�Ud`�����S���`g��ˌ/�}�X\�e�)��x�4���-���>I���̇�>k�e��䰡��;I���@��M�J�%��$������_+mϻ���D�l����途omt5yy��+Q-�ٍCi�O�����$�gFV�Gc��[v�b6c�+���*�������������y�����鳚r�Y��ߑ����?u��!g����h����ɯ2���1�f%d+�Dݱk/~���dm7�����L�ޮ��d��:�	�u���9�n�'4�s�@&�M�y�4�&���Z�~���@no)@mO�-���Z%ؿ=�ĥ6zy痵f�b�7���J�!#��WY��"g�oy4�?g�R�˸{��&���Q�����-ኌ[��*��'n���Z��XU�u�3pn��sw�=��t�ó�9��9������%�q ��Z"v�	��,=�o1gmfǆqCy�Jyj����Ŕɋzf[;@�����&�8�G{�����tJ֏��~�����Ⱥ�(~�m�O4�v�� |����&x�����������ܓ�������u���j?���gSc�t�z£��i#�hn���y7<�����\ek	��BO�z·1�ش���A�!�5̍Y�p��jH�<9��m��$��Fy��v���T��X�k`B	l��
�(��SVo���1'fAWЂ=;g���n���`c���qa�
��\��=MC.�[��
�v��ǧ�|�*=�7�.XWCS�
��j���Zj��D-g��w� �����F���ǁJ�(t�*�:�_�����~����DI�g,�ѫ|֦��c�I���\^�;��r4�:ͭ\��Ђ>E�A���F��XV��n_��vˋ�;(A����y�_��d(��-�;e�l���q�4e��,��[=m9ɸ@�('%�yYKJ��[O���`��1�@��H�Nۈ?Lw���]���ËKeB@y�g_���R��I~PY� ��J��7��<��g�g�z��|ڨJ!������R���!��~u��j�n)����dq�皨��4T;~����� ���Q�'ߝ��Ѱ%��)����^g�'G#�\���A&9�s"qO�U&���Ϟ��8l��cnS��<�\����ױ�����?����!?��e�h�9��g�g*�t�~�_��C"���v���q7����>��-W�t�~X:���1���@*�3Q��N'l�0vD���ݫY�	��J�kk��>}*��!t�|���iImw/�a�<tn�o��_�d$6��pI��Oe8��CV�_�y�����Q��b���5wgKy��ebT���Y�D��,��.�<Ϧ�2'��O�u6h8.*O��We�6��4_�;y�?78��/&�t�z?0���$.[4k*�f��va^�
���p�{�m�]&����yK��Z�]o�۞��u���ݱ�&���i�e���ҽt⏬H��;�3�m�z�KC�Y������4�(���V[,�zJ�|Ѹ����}Sʙ�g�c$^oL*˔�������t"CS_Lny2p�(7��C����O=��Yop�V�)mNz8���~%q����*"�ܥ%e�$�rbCz�ƽ�pɩM?X&Y�b ����R'V�s����}����`�LB����X�����~O���/���׆ :oj0C=��I��f���������ﻙ(<� v�6�/�҉��6,��౿Z,U;]�bQ�oz�C��t'�/����S*�h�zR�������g��I�P��_�)���߈�׺��Q�^���N�=�yJ�>|{{�d��~;��I!0g��h�̘���:�*!߮���tk���ĭ$y���X����ʹ,&���9t,�6�d/?��C��'g�������~��Id��^��&2��߽�'�8ȃ�G��'���[S������!��OE�"T*��h�C�59䇔$7����x�\�8�O�|�$�dH&1 �e�5o��Y/���l�.�;I}��X��z#]�;Q7�2��!O�;!���H�l�o�R��>�/�Oy,�7������R\Q*(�x��K�?i���7r=�Ԧ���M`OՄχi~�#��T��wsR���&^�=6��'�9�L�:�8Y�@A<`F`�N.��P9�}L1��u����Oz�S%��dm4��/ҁ���P���s���	Ut����k�W�-)�O���b�=��D*��k)��u��q2��-�KK���n	���Ј�GJ��� 65rRʙ0᧣�vӵ�v�Eq3ҳ�5��3O!SJ��nJ�XC���lU|� �������V~
-�T �{R�(E�j&.�RC��|�oN�ڻ��/��9�3�����)��Wq=�4{Jc��|]�	]j�����-?L\�H��E�8��L�������?Tg�z���D�YqE7���"�&7+eh��Q;������b�sJي�)4s1�:�fGwyX�dA��,����f�o��A#��^1��7�:����%�a�)=+ŰO՞��F�nt����c\
��(;�Ŕ� s��Z�@)u�>�Z��1ܻre�띚7`�M���a=7���ϮB,�w֭���[[-�����D*�C��l)o[bx^�Uu�dŧ�CW�<�a ���#���y���NK��^�5�#������{���t��B�9ç��d)����! b[N��Sq�6�	��r�i]���#���D�<�g۫�&�AЏ��j~}Guo��_HE�@��ͧ����RB�;�5�_�
l�g<�i��3ڲ�ɯ�I۪_w�=S�rO` ��8+��y��gA�����<?��Y��9���r���4���_��5S�U���)S(r(:��!���w��������zY��< n�.���I�k3��gz�s�Gozd�s�ˆ�O3<M)��f��yj>է}D1{豮�͈@׹�Q��l�+n��a�܈���������p�@�����t)�k��:R`\�Aҝ��9�<�d֥��3-�{����gy�������f��G�8H���S���T��?�:��Ć#�ׅ������Sr�����������<�9��4�
{�`�ϞX�_�c"���~����͔߮\�6	��T J;�<�Z�J<��EL4
x5�)�(��)��r���y#新O�~(z�k��	�,���Q��:����O�[Ynn�1E)�m����8��a>�����k�M��EAB��瘘ԓ��Z�������7j���)w��!f�4k�nfj���k�k�9x�<k7�~��w�����L�5'0�3��쏧�^+ c��'@�ۡ����Jl�ND�����t3��.M����G���c��7O���>�m�m�Y��~����o�V�Z�d������=�������<�r'<�ёR���ѥj_�}�f��V �.A�Ě��Ri���i�mp��a����w��VL[��[�k&%6��>���E2�P-�Q޼�T��F�%�i����8���@c���V'�&�-    ��P3a��V�F���ڱ�L.���a�̂�ly�w�ۗjЭ�N~�M��l���D�o��+��dX��W;�Ǫ��ܪ���K��3C�[���D]5�`������qI"6d���s?�fKy`��k_�6�6BE9��\v���'���3�\��i�c���ňm�*�L"�W�_P�!X����̊�x}�x)p�4�p�Va��"X��I�n$R��Yn�Iq�x|�QL���$_$�&y��q�H ��Y~���9�4���=��z�:}�'��t��� .�v���a$S�|�'q�eJ]+koѬ�MZ�lF4�Is�����r�Ot�T�M�O�0�#Io������,�Y�o	����vQ��'� �u/�w��<�8�7��q��Gg0���C�'`���=����'������/�lm	��"-R�/����Y�%+u�A=p�$;�]|�1�fZƼ濝�w����lĒD��U>Kn�7%Sl5r7�;ߎ)n�k��+�=2�p���rg}�p���tQ�`��m�HH���S����
��mB\�ǁ�m˜��\��2�靎/O��"�E����E��*�Mc�]0�I`P�RN����ZS	��>�],�u�?�Y��W�$�_�B���9A��Dͫ���«v R���*�KYVk1������(�+�nIp�t�#⥔�}��zr�,w�K�k��$i�A�gW�z��1ۏ�í����3٠�`;]k/�(���:�!���F��f�?D�,}��0�J5}ZKT>uS����-�iI���
)VX��%�y��Ƕ��͖[�̏�eXa��R��kYi���u�?�{j�6�gzJi��Wu\E��G�R�<h��Ѷ�@�Ҏ�N��]�2Δ!ߩ~Ɠ_���Z-�O%�?G���%�Cd�`y�\r��uN����B�R��%:hJΫ$�o;������o�T�s����)4�[S0��9V����D�B�9���pX����N�=�WW�����l:jY}������ q�wF�+#�TO�0�Sm��R<7�n��=S<�fE�f�B/��7	>'YQ��cϽ�Sx��ǻ�-�
J����q]����t��I�Y�y�]�-u�P}�����{|����*m��4�]3׳Z�:U�=;�:�8���+��9.�l��~��s<$D֏a��o��R��E�z,���Ӗnt'pA�����G-a��1y(���=�����d{=;����s�ʗKx�?z�VO˪�w:Y'�ѳ�2[nq��Y��`m�:�]�g��Lk�����fkH\����E�e᪩sm�|]�^��\��A�����<��5�&U����!��b;�y�i��Zp��1K�{]>���/���MX������ӬH��Ha�b�V�uC��t��BO1��E��]�$����[�5Unz_�v�M���|��A��S�$�<U"%�v/�lJb9�������ߚ#k�%��~jE�1Ko����5|w��M�HX?�R���������g�� �������lq O|SQ���Y�0t�[��0����tl��z�C2۲ĵ�����,������J+�)|�Vo��`b^�e�Qڧ�����n>��İI���ڔ�)W.��g��G�����<q�I��s#��i��ȝ�EO�$��?{)oJj]�cK�m�TZ�kͺj�{��%ě#�1���Vl?�R�w��^���Q�N��E�|��^��"2�>ebf��i���q�田�
�-�S��c�Z�Ug��hD(Lq�n��Y�JS�E��A��1%P˙P�\�d/����}Ʋ:I�j�B�9�����5af/���фGb�=�fr��1�����\�ܭ���1��I��9d��n�6�L��á�� ��1�W�9��%�|6���h�۶��N��9�N�Qw'�>�JX��I�oNm��x�$���
�F�D l7| &D3�5�[����y�@���'1��ⁱj��$Zm*,e����rO�n	�4v�A��	�][bv��eI�dJM85!?�< �(���`;H�֞�����,E�x����[�>3v��W>��j~�劑���/=V��_�ڤ��|�/��g���Y9�Y�~&�z��E06�ne1j�x��>�|��N�8��<�x�H����K��,��Q�����ʈ��a���# $����K>����X�j$ڀ����᯿C�&�!�J9�G�lK��p�E�w9���Og�CѰ��l�>I'�c{�߮z����r��fN�o2sWA�T0�y���2���%4��$��uz��T�J"�b�YQm��7ù_��Sm��w2��#��^�n������ƕ�!qnSqS?�*4�{;���:w��i�F�z�-`�&�;���8�Bp�E���ʛa���cH�ͩ�gIM�N�P������5�����4c���Y�t\q���bb�vdR�>���ͫFyN�s�:�g+-C��7���ӾM ��7	�/u��J�@R��S�&��rV����O�߸u1q4��ѻ_J�N;kv��I�7���W)B�U�T�I)���r�m������eg��Cr�������5�Kh��X������ɡ+�P�Xj;'eK>H>l�ٜ�/��掂�[͂�<�ާo�h��Z�t��{�^��$�aj�P��A<�]���9\:Á����%���d���w��s���I�A^BcMQx���:[Iu�Y%��m����<��ں��¤Fs�����&���Kjs}�׉��2w��$��=_��v�O�|�T-��kV��\͓�M�Z��Q�ץ�����<Z����_FS�S�����'l������6[�,P-���Ţa����>S%4���YK�x�#L>��X_K�~z���e˿c�Է��穃9a��x0��{.�%K��f������n��M2�(~Q�"M�'�r�:��� �}��z(Xf�D}��s��S�s0��%e+�+[�\���ȋh�K��A�� #�I��E�2ފ{0����Pc��ȓOu����;~����x�,�>�u	���.\�|߉�c�ϥ�0��֎3�M2��\�1�F�~�Ⱦ%�>v����YH��$/ �/�Ec��V5r�f�hlB!k'iek�%,��1�G����Ҕ���Cbd�2(�Rpne\IZ�t'u+�s��d�ѻ�s�hR�'������ۛ�����Â�㶗qN2@�r~a�``�ˁ����tB��'f���]��Me�3��<]�wA��&�����<�hM���x���̞mHaTXͽPV��M��0�?1w��WS����ɛS穊�Kl�.K��fmN��vm<8����#P���24/��d��ڙ��@��g�U����<jF��}j���U���+������&@�}J�N_�)#`4?]J�-�̽��w�kL]�K�2Kv&z˧rBEZ�0�q �ʅ ef_9����sևi0\�"��R_�z~�+�xN�J�9p5�	lXW��CDɍ��^[9�;����<�E:㳕$G�a`9�R�����-�x�d�0�z���q��d�ݙH$��k��M����<�1>}l�'�Oyvu��}h�����'�7�����hI�+�n�|{9�c��c��f�vK��$���;���hR��:B�Y�mX1Ǟ~;�Y�9~8i�`���m��y�%`Yӎ��n��1����]����l�{@U��ڬI��
3yyu o��X���7R�p��t�H(�7�6���z�R�m��7/{B�"���c�:Ws�4��^��$��q��ۜ����)��\��z�\B�ɘhi��+q:,$E���I�i�G_ճ.�Y�7�B�)s2v����NO*$�1I19�ߟ.�JN�v�+o��N��A:��ɩO/)(:�g�5Q%t�fg2�!�>�G�����|�T���koEz���OY��r�G��O˳�52��MM��ӿ��t��������x���6l�B��5GCs|5��c�)Ǭ�._�J�Rņ�?�n�!2c���\�O�*��ؼ뭴���0r�qC�}�    �54��|ػ�mZ�	K��/Er�D���u��4�|��ޏ���e0�f��ט
��#���l2g^�v��z����e��0������J�?8�h�G���,� i�Ma���K�%��xʩt�
�h�W��ɳ!7pSָ����ŵG3QNzQ�n		'v�~1џRކ��^��̚�n���W���1�� �!�gr�Ol����ӹ��P�5[�����ϴ����Rĩ��U�e��$�h��Z�b)�6n��G�S��{']K'�(��c�K�m9v�u&A��v�%���QJ��|���Q]�2b_{��C;`�ef�t�	\ֶ�k+�8PZRoռ���Cp	,��{ݾ���Z:+9�=G eKRK��i*ݹќd7�M�!���U@�A�m8M^[�o�i'
��~V���/g�p+�U5W=S�Ufp�]1�!�������{�q��ޙ�X&�)�
�)7%Uy�F������c���X�rM5F�E���)X���L���yQ��t$'���K��w�ݯx��c^�=)���vo�L���eH�De�66i��J�(�ߡY�(�8���7�r�9�,�Sa�U# ���y7��F�����[����\ �ʩV�GN&�*��c�mvmǱ5����")Rb�RR��*��2��5���県�̆{^q��{-��?���f^��u���yn�M���4q��ow���/�qH�"�q+
$��x ���n�M+����#��<0��nIȽo���a2�Q�Jk��A����[l
�L͊��:�l|o���/�ĉ"��Ŀ����y���r��S�ξIe}K��bËq�������^��I�ٜȵam.�t�S�QZ����J�wiF���d��n��J��.��?�=�]�]��H�a�^J@����t���Ӓ�������9WO�l��6s$�^����w lٓ'='�mNg�Ga�d:�-�N�#o��]I�,V׌��Y%/ౄ�ܮ`���.G0��7
�E�@������|���n�$ŦVbحsh2�ؚ�=oI��:VL���L7�bC�ޞC����ӷ-a��!޽�8����l��=�UW9�&.����HU����#��7i��L ��]��xɏ��w[�I�L?=b�"
P�V��eӒ��]%�4l�C���+v�є��$��H��m�s8�Q��j��JT��.)�Ůkܱ�U�'l	[:#��r}�y�5��b�&�	�jz.v\]5�0���;Z���o��f~I߈����'���K�Y#&@"�("�YZ{E�q��n;,� mī�oӝ4/{Ձ��v�_�Xk,����dwZ&P�cS� gOn�o[0��I��<��_��XL�6�.�xz`-i��'�4�G:�����C��pZ۹"ƿ
����-7�d��Λ̶�T�uW���ڊlґ������,7��g��PIJΨ������/����3�D0v.5#T�ݲ"(ё�KjX��2��tx�b:q�L�����/��Dh�c�L�v��#�'�ԇŕ.�XDs>��J��I���ڂN˂<?}�+�6�Ķ`���Hej�r���~��g��q�{+	�X�f�\0!�Z[�O��a��m
V~�������Dw3{{_�������Ѩ��w�cf��03'x/�q.�7n˝��*㙡��f\<�&i2���l2=l��;Ѯ�۴ov?�b�"k��=3��ثi�Kb4�es��{���Q��%���d1�_
�zF�Y�v�!͌s��&�GD���?>��pP(��2��	י��D̓��X,s/ٕ�98K5f-�#����s�)�*˔olR��QkלW�;�ab�'�A�����i��!���̆��p�Y��$��)v���ev� ���,xwS�Wt҃�Y��þp�H��Q%[��mۯ��h���h�*�Q�.m��q$q���֭��{}뛖�a&������n���b��f��(/R�2��.�9�V*Q���3,s�ӚzB��=Q��g���i�)6[.W�/Yg���@�Aa�9@��o�]��po��a��R���)��)��f6�9q����$����gr��!��V3�ʁdJv�m;p��[-],�&�!��1J���5�K�"θPN��5�Ţ.��b^O�w���(� ��Y���y�C�Q첟��ي�}l�Rp�����3�����gϦ0��_���ʦp�_[�^�خW�f!�5��E����y�f�&O�@��bs�&����UkNr��ρ���H�*Xr��^�5�{Sܽ%����]�Wt��QY�ޞ�S��ۀ�p��;F���e����1Z���N%=ݭ���#�B�����yNRm4i�����Y]>��R��ں�&�x}�j�{=�.=�sq�SR%;1�z�E,��� #$��.��3-VQ�o��=ӻ�V��r��vd\M���h�΍r��l�D�=(���2GA@�*��lgJOs�����]�����w��5�8�b�#F�]���sS���*���j�����~�N۲�����+�_�,l;�E˒�I�Hb��V���?���qp������-���r�ƇD�.�7�M����K�yT+j�d�X���o��S��q���ͦ,��h~�����ID�Q�Mj�}�)�VuF=+'u��:X%)�0���S���N{���o�0TB��2�>B��V����&A�?��޾��=s_��1,��ė�����`
���!r��e���{,ۚ��6f4����0�0K{.��%�w��a4�FUP�y�x]�,�s���Z�EKB�Z�]��~e�3��f�E�k߈�g����w�� z��^F��0|�@?/>!�5u^"�����ή	p߽����iu��܆�|�HY���,��7�����.(���L��v
�-ne�ۖ.\�����+��8]���u2��%g���r�ƺ6� ��Y��|sA��F�X�d�[�������]�7�ـ�䝂�~���.y�x�DU?Áì�`:
1����_n4�	1��<6$�|1f������ù��:�����M��$��*�������$}q��rd����Ds��·���SV�����K(�����B����q�t`BN�¿�o���wQgw����'l�}Y U�b��٠�Q#�q5�d�;�<��%jI�J��&]�G=7&@��å��ͩۗ&Ӛ{��z[om6z�m&��~���[t�ͼ$� �S֯ǉ���w4
�E�r���&#�k���_��j��;d{w�R�J��̏���#������f:��2.�;m�e6;Ȼ�"�� h+�\��c�Kl��֔�=~��fFI�R�u~@R���8�F'�Ybe@X�#b5��G����M?Ց���^�q:�h�}lK�+�"]��ib��'?�S�R/�ɍ�����ML�$rz�sW�w�.�mTR��B����dL�������~���qd�܏�f]Q�<��C�0e��Tٗo_�h籊�ֆJ�u��9�T]8o��ʻ����g}W��}6�z���a���y[��3�Wc[�a|o�U"R~��@;��Đ�?Ln��d�\?�
^�C���$(TD�G�픽,﹥��K���k��U��oC�b��Q�G��8us���
Jc;֓�|X� G��"�����/<�N�d-�M�5��Ҟ��@�y��Ne�	ns9��p�-v���LlsVG�`�A�@�Z4/���%R}Mc=�N��ۇ)����;[+��w>u��ew�3c�b^��7�rڿ�N.X�Z��Tz7�"T�v��{�ެG9g�Ɣ�8mmh���!WBZ�D^ш���7lђZ|�/����L�E�Up���(�k+8�m��Ve0ේ%g��J����K�cU���Lu77�.���{H]�;A�S�N�;�aL�+#'>dV�U��s�y䣳u��z��#�&s5O�nW6۹�ʳ_n��5g��E}C6���?\a�e��p[�B�Nؗ�⁐�YW�-)D9#;��N�}�0���)\Pâ�`��nS���I��nK6��z�]&�"��gR�����"B�    �I~�'Ta"q^�M���?2nMi�w�k����6��c�,p�.��]�}�c6���-$ٺ�u������	���NQ
x���MuC�8���swm��a{����ڃ��#ķ�J/mg�>ز��L�?�"~v�T;Dw;kXbO;ᑃ�|��"Z͑�W�5�1
]�]� hqt�<��?H�8�>��E����9,S���*=R7��{��0N�㘱;챴{t�񙅐wR�$+�%p+����PCk��\�ۦ�����:"���:�tX�����ERFK��u��|=�64t�����3���b��Wa?/7!ȉ<�HT��k�-쏖����g/�ŝ���&��]'Ԧ�Y�)EZ	�U1�칮	s}���dbN��D��J9N�P��0���j�=�&�ŤN����,�fvk�t#����eK�C�[y�Y�+�ձ�E�����#�5	ln5�|�B{w�٤�����Sw�6�m���<���#D�rS�	[5WhK����1+8�~�Ft�񁜣mM?r��4�As���-���1t�R.Aj�l�3���|�k�	���'��_�C,��w�|�d߷�J��_�|��G�w���GP^�c8ߺ���e�p�n��\�#�o���s�ܲ���B���Yw��۝s����&�IW��cF�g�߶����,�n�+��H/B�-q؅���l�t�d���������0�0�FV�=p��}M�8����z�ޠ�6�9�v��e�62���x#oY!\�f���~��BD�3����0�1�u��ߎ��,1�	$˼}^S�����8lGj��WPG�(���L5�ң�Q�:Ml����v�$۽�s���ve�.rQ����h���Lĺ��T�Z���2J�kN��y������қy�B'�+�\�E4�u���f�l+[®��{;'���;Y�NkSA�^ߞPLq��(���|K/J���@�w`D��q��&��� b�nN�
�fn�lO���.��b`jH
<�*6�,K�v�a��� /���R���ڣ��i?'CB�1@璗��*;��[�p��L��|����V��Ns��z�tݗ?�l��~9�����m^��v5�ݑݬ5^s��s�ΖCVn+1 �~07N۸kA�א�ƕ0ms�{-���S;��y�>z���zR�cgܪ�<G���V���������Ӗ�lE;�$v�]���e�}�&�5�۽pn Y�O���[�d8����p;�M$L������!w­����t�Ϧ5�o��ܿYi�#�ʜ|v��{�o�n�;��/wWY�!([7-�8�_�� ّ�Z:�-�f_{z��W��)�?��Z�4�+Grq�7Ev��i��}��z���=�{Ѽ�����ᾰ����*�w����+g�XVLu�zӦ�����h�5�?��kqwS�ڲpZA���R[�4��,�o��n6D C�8)4k>b��q���\�^5Q�3`�2�w��J\)�V޸����-YLmV����tn�;gy�IV��e(��4�({��;:zbo^�1����7J�E@�����=�-mn���i�;e�c��K<��������4e�[ќ;��:��8��J�j�,��4���5�1u�-�$t�Y��7w��-]��R����O����&_]E�\�\�{F�32������p�!���$�D+�0��TgC���2�T~�y)�&;u�a�u[b��4���,n�4�1�i�Aȓ�;C���W�G�z�h�ԥ<���my'dy�׶O��a5'#����5[���1��޴�j0A�@�]puĢe��v��rV�-&�m��f�b��vui�xYǔ��mƤ�r�k�\�愂� ���]��s瘬H25��ҠTs����]h��sy���Xh�M�nߘR��w��@ͨ����F��ԤT0͝�E11q�6܅�x�+[�!�(��G>����G�R&���k��Y\�m�� 5#�˜����8�0�Ա2���)"3\+��lD������/{B�.�ӻ����ӁJ�Q�;{xh�	��$��(g�ik;E@��}�.zܺ�;
7I͕8R�;y�O����9��KWxH.]���EDכT����`����wC�5��H�n��c�o�ݲ�Ҿ!wGUq�ݾ��P#a��A�8\�K$��0����^��v�73�G��y�q���X$qE�̈���.7�����Fp#V&��5�n &����$��N.�K䎭IGb�e��?��?]�����B��.d"p��sF]E���v�fP.18q��G{$��|5�Ņ�0鄌�=�+�NS�P3t=D^�S_�~d�L��
dN�X#3(6Ka��g#����wf:e��UF��F�����E��d���[L
L�55:�	"�)ܲS�frV9���Q<�&㙦���1rjE��V���{]�:1�\8�K�jd'��| ��G&ZD����M��������ش)��P�\��c���'Oe��ٜ��H��L'/��S�����#���B�'?����}���5�8���v.�� ?�y�"��{&�7�v�8�=H�܏?��2��3B��7��M�w/��2EE��^�$�5pU�r>���|Wӻ��~��<{QSn;�(#��E^5������ن
�����Y���`�$�?�� ��n�^����y����~X
ъ0���o�A�é�=v��b^��Z�jeE�dY0r�u�O=�r��&7aBviN~�A(6�#�Q�:jo^62@΂�j㍿�u��W�36V�	=k��c|Ѳo �K�#'xvdTy�]�l��"�s�#�|X։�����k�Qe�O��Yc
�mZ6V��|��M��'Qv?�5#��,Ѣ�O �.:��t���Ґ����{�{ ��+��D��^���4�N���&=��ZC��vĦ1K�ȅ���vpm�Iw�;�<�W0�6�s(�\;;R���\"[ߜ�u�(�bq~d��V3��i�5y�����-��H�9�h`�XX��ܭ�W�����E�B�ѵ��f��������+%n:wע�Cg���-�����	�V����g�D�+&cj��Yt�f>�^>����$��{|缱zу��P�?$:���ۻ�V1�58�'L�Ȕ�# 8�/�`����,G	[�96J�-כVϞ=�f�)�\��XĔ��tinӔb����HF��
w6=���<�hEZۀ��{��=�h-��0��jlijDr�鴿��xs���]i*�\���K@��ÿ��侍.��8:8�H��4	~B����KE\m喿��K�s6�����.k�G�9�؛m������e� �:��TN��V$���6��;�i�/y�_n��V֐e̞�B,������=~ىW�/�tL�w&L�%Z��9� [��k
MD���%��H>z�dJ��</������O�&]�su�	g���[��]�g7������pc���80옋1�}HS��K{ 羮��
�Ÿ��.�(�>#щM����Vϑ2�N�\�"O;��b�.�VdO�ݎ |�@�DQ��̍O'X�(Y؞s�9b'0���7��	A{RJs��7
�o��:�l�?�����_�a�$W4-k��`�Z�>��@�?�8%(�cL�G��^|��nªb9&f�G`y��)E�Q�D���O$l;�}�F�(9~�7�>7U%w̩���$?sF�Js'jH���p��F�a�7����{���7#�g�X��s����c��d�>�۸Ֆ�t4��Z����~y>�y� w8֞��;Q��ذx��=�pp�&�:^oJ�9�O�'��o`%1 �9���A���S���wf?��D�͕gʗ�.���rB�xy��}�Q�	mw����C�1/����y�sW��7!y��ӣ(vDH(��l�!H����K�lo�:#H��E>�PЋT�$����Z"pπ�5.g-�'�W	�����o�vIY�m��&����XZ>_���W�Vr��|{܀�����3o9����K�e4F    ��~�z��H�S�A��]u~r��V�o�8�>�nA�)�v���vK�"Y��   ����p���t�uRi��'瓺������%�jߌ䝒%���N7͜jJ�ؗ4�|a��4�N򝱞R�%v+��Y���}d�q ��w���p�Y*������=�bf��_�Lz�2�d
k��Oq�9�yI��4y���l��r,a~�M;%C��m�nG���M�����pOv&���ח��u|�	,�a�:��\wK�
�
?aJ���w�`f���7�$��$�g:���Bɧ���VM���r�E���n�g�����'�}8X�NҰ�,.��m�"O�#�l3�m�9�g�V��s�ڍ]���`�5�6����ӯ�m��nڱ?��sw۟�"�6;��F���6�>ޘ)�c45'��*h�tb/lN��?�I?V�Pʨ�0b�2ޅ��}������o-���x_���ؗ;�K�U����5B��@�S�����.0 ��P���.@;�$�������o�NI�p|V�ꋯ��N�-p�rC�ˏ��7rD�w���h面O�hE�2��)(iҏ��w �"W��	�Nw+p4P�rqM���9G��\Y�82���7�_{l6&<0n.
fj.�,o��|?�0�]����iFpQF��?B�;i鰎 X���
��	����.?�p�rrѿ���ǿ9�[�A,	�P��Y���d_֔�+cM�i��]��ͶqI��g��tav����I{c]c���K��IX�8s%�#<�m�>�F��D��|�9�q�/��AjeN�\6GI	���8�-q��v��_�1{���m�S��dUj�s/�v���VT��hi3k+�����K�4Y��P��ܽ�?o�el���&�D̖�GT��T|�]����=8:�;s���șx{������0�$f5�����;"�JW��{���'Ow�ԫ�.��"F��eU����e-�Ԡ���}5���h��Y�)��9��WT�nQT
�Fn9R�'P.G����=�ˊ`y�_�]ĕ�	E/Ml�Ě���u��2:<����˨����G2�*�#/W;�?��8%6�N��Y͙D�}���th�>��YŶQ�;\Z�9��3�a2��UA�"P�#l�)(s0�u&����Z,Y�����/�H�՘��睨�ZmI��:5�{�}6�Ze�qwR ��M��CF4�\ۯ��3{X���b��G�Q��b�V�9
w��x�sl#熉Ɛ_FiR��G�Evry���T7g �[pذR���{�_�����%Ŗ�%�����n�j����zR�R�~0b|�ፃ�,9�7Ǎ��?�^�>���p�w]�ð� s9�ښ�Qm���$��Q�Oul�,�O�a�5؜��^Cl�f����au��p3)ɘ�W�T���5���FN�Ik�@���ƛ�v�'������g�đr.�}W��g�b�e��g�"4ӿܗ�W?~��O�VN�m�iU@ls��!.+�'��~|�O�ݱ{�A�uï7���}���:'�ؖ[d�X6��ߌ�KĨ���HAVn�/���O+�ǧ�D����L=H�Q,I����}'�wS��H?1��0� ߨ�s�e�t��9EG�o���eծ�<�C*oE��K��v'o���d�ǚ��������^qӻӳ�xc�7�S��`�Y�l�Q��c%d����{w V�� 2 �CC�j[&�]-;��^�|뒦��B�1�Q���v�I�������/�!�wR�o��-�q���y_�|�A	��>��ץ���3ta�"gf��M��������:�Bh�uj#x��>yB��Jك���wm�������.]md���5F웿���d�@��[@������C(E�ĕ�N;�j�X�J	X�6���<f��CD�{�m���h��I���ᡙ�MIM\��u�~ԗ��|��{��IJ���n��k7�8h��o|�D`;���{l׭N�P��%��Կm�Je��^��U}�n~����������@`����G$H�|kr���������F3y�����w}g�w��	��e0O+�g�_�=�H;��!�펔\=��ޓ��?����;���%7A j�����i�m�u?[����&C�*C�O&ż�Ğ��]q��>v��r�Y�n��G�?�m#V<��y���Fw�\ ���ı��JhF�:���;?�@��F[���Y]EＯ�?e�Cȿ��-��A@��F(�Z~g	�᳿�j�!���k�?���[Zw������wc���9ɐ�9�1�W�h�c��]F v|���������c.�k�o�C�r��(����U���N�Iy�ر�g����vM 0������������?Ƽ��V������������������/���={5]�vܟ�l��Ž�o�)��tۯ��g!%��7�!��aaXVp�T�J<Ҿ�*��;/�<��A;��r�Y��vu��ք�M0�s�ߍU/쑭�u`]\�m�8���G��_v������;���l�����']��Ҕ^�J������o������1�rq���!
�A�9��=bw�����J��<�;m����@��,"�����ϟ�[J}����!��,��u�����q�ߝ��A�8O��r���=�o+���������������-���'d���D����?�o	�����#'�8寲��_�fX`��	��tU׿8���R.;���'b�q��Fn�����V��c	��e����u��~�osx�g����o.��+���J�~)�ڬ�4|��+_i�J�W��𕆯4|��+_i�J�W��𕆯4|��+_i�J�W��𕆯4|��+_i�J�W��𕆯4|��+_i�J�W��𕆯4|��+_i�J�W��𕆯4|��+_i�J�W����Wix6��5wt������y�r���u\�=��yrY��<]q�^�+��cn��S����DY���>��9r}�bҸ~x>w��x��=~�r��ܟ~߱�\��)�o��ښ���|�����]�ݹ���'˃o��R��o�c��M�;��ֶ�Qx�����*����{*�S�w�¿>��C.��b���G��?R����?5p�k��/ǐ�.}��~���"1w���n?�b�qua��`ݔ�v��s�
'%��M�6��O��e���&+��	��Zנn��vssy�����W��/?���j��r�R�x+iG۪�)]Ǖ;�dś���r<�����y��[�jC̮�e�e����uΧֳ�+IxRO4t��8�s�'����0��js���v�"5��9z*.��L���ʽ\S�s�����U��N�|���sZwβ>9'���Ƨ��I���ש�u�5O<fP �G�����j�u]]��������O�Z*_��\�+�D���t�oǨEr����?W�!�Yv�B�9�C�wN������G/��2�HY/����D�;�<��O_u{f��y?�-���u�eɄ�V�VZ�Zm)� U�3r{z-�9�5鸷�c�/���$�5ҳ�I��Q����ɻ�y�KF�<�Up�����nS�n����q�.;ͮ|?e@;��G���٥��8�]�8��}�~�'�S���ý]9�>y�3��GCK�ΡX�Er�t?�5��j?�>�r�o��͙���zo�Q+k����t]sV=.{i��?���u��ഴ�?E�󗿰���ҍ��_���������V���{����Ǔ����O������O�~���������'?����O�~���������'?�����>��!�Ä��I�:j]�jKr�}�B.����p:��=W�7}L�}/��ֽ����1�#?�W�����v�ţ&��V��4א�zwQEK=��Ǳ�F���*{9b�t?�=W���5�2��e��$�
�i�p�{�-/�}�^ۜ���}�?>ǹ�x��ϝe�א��54��r����N����g�8�������G���o��Z�QM�����m�vHԽ������lr�\�^}��N�Q]���uq�e��U|�]���cw��^�L��Z��]�=z��=�����y�3?W=F�K9����Ǐ�|�    ��y������w��$�:�T�'��2h6��ҜvޅT�rj|�y从�ϧ�g�-��y�
���_֒x0�̎��q:��S\Z�*�8cu�X�6�nS�<��������}?n�����̮���}W�p��#?��_c��~n{mwAn�
�m]�r���o^s��g|.�ӊ�s�-?��	��mw�R��~���U�����Y���Z�[��뼧$��s��VxIn.�����<�;\��d��ܼ�^R-uvӹ�9������;<o���������Iϸo7�.5����o��jo��o�!�r�e��?#��7iT�a�զ5$��9��j�k:�����K���X�qr�5Eu~.�Ý���J#��ᝦ��f�����׳�����<��8ϗ���z��R�1����}��2���q����g����J�տ>_�/��V���y֛�p�u~�_�<�.`%)<*J��đ�P�s*؟isA�f���A������3�q�́m�t ��o�������w:���?����M������;r]H;�:]	哸�����Us�
�r�4O�W�x�}C~]�SЌzՕ.׆��rE�	��Cb�꼶_�|� ���Q�zqh�F����|�����Q���w��~U���������X��������Y-%ɯ��E��]�{?҃kp!V��E.���rՖ�q^�\�֑&�ҵ�+c^���
�g?1�y������K���/�)�k����͚�^�a�_�!=q[߮s��-?sH�s��){>ʲ�����+�0��r�h�t��B)n�WA��qU�ѽ�mԱ0H��w�<�}��ʅ�j'� W����Q��������q�W�^J��ܨ�#w�^���������8^��R*�A��*.n�U���	���ru�t� �+���硗��B�ƱJ匞��*ϩ#\ێ�)7�k�����+k�酃��vn�qI�υs9�����c	K��z��a��/HGs[�k��g�?<�+Nʅ6��5�&�]5�G�O<�w~��w�\�O���`H���಺k�7� ��s�'a�_��ƞ�j�b��DI	D�yǻ�pPwl�E)�k\c���y-�\3ףV,2Ѩ?�x�W�����;�;_`�]����Nצ��2��GH������R63*8\.�`$�ʦ�ݣ������W��*@��q)U�:Q\0���]`��p���{8��d��;��u�ua�-����/�7�1V
�f,�r�`�&ڿ�	N�[q��.����>#l��ѽ�D�H(.6��W���R����w�0�xt�v`��rNLv#n6c�G�/�lC%�Li^����R�gXd.q5W�N^��ݟW��K㞎�'�:/�M��+>���GO���A%:'��orx9C%�b�_(m�q�����gQ-R"������'����@��} \���nBa�D�_��Nm�@�������8���� �ݽñ�uM�������mE��z<�M���ƞ���<�}��r��� �)�s�����^~GD��b|vU��������GB�&V w� %���?�[�	��؆�~��sF�4�q�������9]���nq�Uv-EE��?n7�576��#;�� ��x�m�q�����Q��S\cm$�S;�r�������<��O�Q���R�D���u�}o��n�s!%��5� ��D/��k970��z^X�=�H$T������|\��ر�{��������D@��Z�E`Q�8b�h��͛��]��n��u���x|��{�X���U���}.���<$C��xԴ-d�m�[:�E���1aiEhV:��Ĉ��w�W�=��ٵԷ��
��~�j�]Iŏ�cG%(�aL��Qwd��z�Q�b�Y�G{F����qí��(P[�؃2g�Ţ ���)�D�Z���$ o]`�)�c�-FjS����w]���t�����D I�p��y�ژ�5f�� :]�~�M[,H��4�V��x�q�(����u^�Ims�Bh� �i#	(����o|ҸAb}ޱ�zd�`����Fąȃ��y��s������Azp&"v_�.]�\�a���h�ڜ���#�$\1� )X�T�/7>���1�ԥ�7���&�ik�C�܁MB��B!z�N�{�핰'��.�%�,��rM��������u�`�u`�`t(!c��'L ̧P�m��8]���z7{��t�ڿ1@�1�%:�:
`�T��s�30��˥�(bR�w�>�����Ֆ���1T�(��t�~���`0%<�É��ȗ�c�C�~}���%
���D:�A�a`72� �7#�����;�$á(<���/� ���k���k�)L4 �5��u��i\+ �"�U�sI �,�D�D$��Y]����V�l�v0��}����v.��O�Pc��{n�1䫻NZ��Q���A-x�f�
bi�}����I�ª`и,'o�e��@Y|�qh5��7�]D�o0q�����]�ڵ8�Hf����Vv�mُ�<�nG�}��ޚ���&2B�����0�<�c�.z^T&>�\�av!4��ݯ�~@F�P�������{�/�`;�~o���Un��F���Y�ԝ�$���J[�#l�X`z?p��P�(/��[k��i\ .�����KQ"~�.4|R����"О۝]�N�Y]w��a�x�]�u'^���5�?Xw�S^5:��x�#mռj>�����_p���sC-���Ľ\"�C=���ǽv[���e�x����GkL�|١\л��TN��m#��%�8)lcUlD�>N�©t�iQ�{��W8&l �³βfEnӮbH��<�8�ax��S�j�}���+��ҷ̏��!��h��}�V�ޱ�k1+ía������ )^}��S�v���7C[n�ǋ|��q�լ.&��U�0T�D�I��uD������x��9�}<5>��N�(%[�J �K4q�fj�u��=�="	�Ű�,�c�f��Ͳ�35E��SE^N�Hܶy4p��L�� �1��:�e�;~�@l���
���5N{xi'q'1qy�͢w vԙ�vo��d6����f����(��4��1�|�βMW�>����$+����q���.\9�᪉�e�&vcq���ʍ����+�D� �!z8��q�������"��S7)N�(bi�UH:�ɐ�x���(n6&��m�o4���fr%��#�5�b	Ӵ|������ԉ]CP�zc�f�N%�6���|V$�w��) ��� �T���\�$�;�l��s�YW~�����H(֌g;$c=%(�0�<�~w�-�`s9DUN@��5�
Ǵ�����}������5�t&���W���46
C`ffn�j���nr}��*���RS#�i�M	��u�c;��cHq��v#����d��y�M�Y�x�~,�%�,�b�Չڐ��y�{M����y�.C�!6C�b�r�� �®~
8��̷�7��l �a�	���-E��6dX���F�[���x �-p ���b��xq�h���O��`�����پc�3VJL�	!8��0ĝ^l 6�/�%�@K��C�N���V$�R{�l�9̼/ Jzg.��%p���Pbp�[�!�� <A���^7��_A��ĉ��J2@l�ݻ��o�9!��$R@ �24��{][� O4���8L�WN0f�[F��_?�����V�3jG�����YH1g����w 2d��8�gwU<�x�]�!|w�3?IT�S����:��,'?��+�$G�.�1i�#������g`��i�+#���^f��@n�@	�H��nt;A�f�l8T ����ǝ�s&�9����3[�騜���T�{MB�A���m>�=k�C�6��2�#n���lL���!`zVډ�6`����%�7��~V�h��z�����\ 0� g]P ?�Hx|
���js����F�V�L(��d�Ƀ=k������j�� J=AyȀH̋����U�~�6'X�F������{�    ����\j��}^��=�+�&@�3:�e܎(�U�t�;�����C�����ٱ�M��K�9�(;����V~�ט8`�Q��BA�|���L�SGLQ����/\��9̢�}j&1����%Щq����=��;��9�A��7#���?�x��-w@ bqv;"�:]���`�pO�×�0hy#?G.ߑ%s��0����8Z.3��4]b5��㭈֊A%JBKke�����&џi]�_ �>�Z$1o��%�7�٘*�6��!�%��a�\e�pO�Z��"��:�Չ#�)4�Q��/$'���Y3H?dㅅ�3~$t��n|E��������N>���wk���ȍ��k1e��K0���Ӌ�ݫWpz�iM�䨸�o�s�Vp}�}ƃāD��ټ���Ҝ�e���6���
,F�����\<��.<�q���;3���h	�Q���<�`�`bTO,������-�4��&��EZOe�\??ố��*�Ŗ! ��٬lVT��<7��"�4 '����6��P��Y����-��/&�� l�����p��2m�4'q��"�:Fsތ`�z/�8���h"iՅ��:,_��`����k�Y0��BЭ���1��KЁ��n��f���TE��J�*.��Yη�#mW�bF���n�w�~��ʣJ�k�M�[�Ȉw�x�I���'�0p$��j�ey;�R�P"�J�D=�@����I�="(?z2�; ��Y�f�։��W���4���)1,D9Oa#2AȺ���<���<fK��#]���)#����93�DGY��Y�^�56E#�е��e�;8�	��	LM��% � � �^<��� y��U�k����a�.�Q�>T�DHdR�Ms��%��O�?h�<����P�6�8~��f��7���&đ�=�D��$='?iDA���(`�zuQv�I���Pڵ��\n}��\|�[J���m�X��p�f�@��̬��<��w�
f��D�f�ЭArXNn�Xh����[�����M\��N��f_���5���T�Ib�e�w^���<�j��(!���SS,ꙀpX�\g�㱏�u�'�Q�.���lV ������Ǫ���w��̣��N3�;����V�vLP�ѷ&��'��b�3[<�Dh�M��2�fD/
��Խ�.��
��p�S��ua:6���b&���͎��&>?�bt�6�L_>�#�/N}�+�*��x�NN3�yF��f򒓸�ս�$~��<F�����W7�KMGSCXN�s'��L7���)BRAc.��~�,2�S/���w�!Y=�����>��[����ip:7a҉�� L�� ���F�s����f����2�HVZ��&�`�y3n���1���̷VAmu�r�I���Ƕ
'�F���s������^�_���N��!����z�5��Ϝē�ݍ�o�2�����P-��N�:�v\-%
����(�4�H(������隆<��t����� �R,�%[��H!�`0��� �N#~�z�[�x���Rݻ��(oiy-������֌?`
�4��� -�D�{ 3D��S�Ɯ���1h #gR�pz�P5@��sO�t�<>�l�n�Oi'0��1�W�_d���s�{���{AR�J�xk��s�Xz��Z�R-���(��Ftd�>m�|Dӈ1���{�Qg�!W�Z�|x��Y�ka�bxǥ6G.�"(3YC��؃|Dż����99�ӈ���9� �P�Җ,�͆7æ���[�e��B)Ѐ���"��_3l� �Q��*P��S���O�el`=�D��7u�x����˴�}nF��7qOy{G�*����j� τR{��'v�������Z��݁���D_AӲ��|5Yk���KM�#|R�ȁu�Y��޺�5�A����! ��4\!N㊹o�'nt,쳨H�);[�z#�� ��-�_��׼͞b�̣���g�� *g���.�^�ں�d�]|t���6T�=f���kX�A�]�>�~fs|��v&٥��̫�G�	�y}CӬ�}��j@�i7��a����%�X,�s5�e�� ,z� ����#h���D! ���0��>�/�]���'�zW�C��h�Ən�L����f3<�$���� TxoY�zvr�'|�����w�^�gI�&҃�Ƶ�;�ESnE�@��[͘cefGY���ea?"?����{ې���KbP�8� L��u�y�|{O���>��1W�[=و�>XP�\����_�c��{��P��8\i�"�)-���U1�O���`:�>�pc,k��M�OK�����s�������;z����nIX��g�Oiن1%�8l�&SGzz���Dmj�AOEЙ�/ʝ����hcǺc.����w���a}�[�+i����c���}��m͔P2n�!������6�'ɹ��ܸcς4Z*F�e�:���	��k��&0��t��y�_��汷+O;��a���/7�;j�[J�Fc���C�Cm�Aw{���D��fH�*� PE�M�)#���$���_q�  {moQ���؅M$ȿ̃M�6��x�f�
\�s�ot{%��o��<#�3?������mc���0�e�GQ�c1+fqg����uZ�*�9�H=���n��]����2-��G����a�qlց���ʋvP��h�=�D���`��,�D~���"9�oBy�����u/t� �@�r�g��҅����9	�8�T����MD��Dt癟 �m�1������g��ݷl��rxF�A��tr=��EL�����o����s6����2�It��[9*}������U��r�GN�}Q����Y>�F�f�/ˏ�7��6�Gd]�4��-�{@n���8���E��޸gabۉv�c���W����ł�#j@�5�p]x,�L�<Cy[�D`L���YJ[�n�ێ>�n��/�a>��-s6
q�f��DL�p��m����eX*J8Z����8�=� ���$,(b3o-��n9~�J�<uO�o'�I�&�D��G�Z��Ǎ�,@����eNL0�������Z��f�q��CG2�<�m�#1v!@�&�9AA ���ǯ R�|#x�~���5#ۨ�F�W���V�|c�V����cE���n#��D*E�&nd:bv�fg�gI�V����5���8c6���8���ҋ�Q�6��\j���Q���	��+����=QO�w�M^�u��,�T.�א�"��a�l��z.!!�0��_��Ul��xz#����<��Q������Z���;��J����L�y;3�Q� �gd#'OAD��������O@
�c*�1W��� bm`��e�=g�|{`[χQII��V� ��r;��X��{��e�Ϲ�L\f�a���N�NNʮeB�}Y�ԭ�
0�sm�:����4m���R-����͞G4� pO��x3!�� ;a����yM�4n8k� pL.-��`�eRpaG8�Z�"B��#�#
�UN��R��d\�n uy�j�t��Go>j���yį��o�?:!xs,��|�'?��sU�(�����c��[:��y�T��rF`���7�.!`� �NA'��8��~fR,dq���R�q��V#B��i�Sg�pG��Z-ǈՏ�̛G������ʖF/I��J�{FW�oٲ�F�E-Հy�g��7�|�ԕ{k�B����X��x"����s3K������1������D��DT��d�I֖�*����l������ ��g�գ; �i��~+sr��M�R����hp=��ēn���z%b��N�4s�Y7'΄X�}�>Z`�B-p]xs� (=����*@��7�b���ub��i"LK����-��
������Gg��̞.`��v+�}�J���<)U͉�K����b9�4ڷ�^b���v���,�Ppm��6ʍD�D ���Y��D�	<B��(�\    #�ԭ����U�v;M|86��Lq)�@�`I��V]/� ׭�֢�	ق�[�����e"|^&�޼��Nݖ�/{Q!���fbe�V[�W VT�QHe.b��C(�
s�ס���Qx:C�<�eS�Pڱ3�n�L� �� m�S{@B��v�_0�L�a���u;m���k�bk���p��`!/`������PވF���:� ����o�gb�.{��> ����#��ygq��G��}B�̊q�DM,j����(Hw&��(&2f`bbd���V��N�ۜn�k����Y'��rdg��\Y��|Y: x�	f�a�.�3���.t�F�\	��<��p�?4�����*�CB$._a�'h5�{ow`{����Rq�֋P�9<�yt����Zl�p.{-oo,����i�#E-�wX�'���~�:I��&�Cy���vҁ��3'�~��,�������tG�O�\�!
���_�o[Z 
P3��E�퉻L�?�s��_>��~�׎	 U;;��EyO�h�Vᝋ D�j�m�m;�Vh ;�n:��7�@D�"�'mf�\��I�6�%�]��X�§a Q���"l瞣�Ȇ�]�=�Y���Y���;�����YDٝ�k�a��Bσ���m7�채������&�rn�p9|��h��Nf͘!3��"�bG����AAz����rQ��H�R�ρ����۩m�&�z6Ȓnm��y���Ϲ���5�T��f%�؞���ٸ[@��zY����<ĭ������?b2Xʓ�Z��|���h�}�!�L5S�-j|�� ?$�/��r]K�mm��X�D�A�����;�`�ӝ�����#7�ƙ2H]:�.Y��P�)��C�F��N���N�.�X�0��V0$�5׌:*�j?��	��K��#�Iv���<�@E����f��t)V΢ a\�����l  4�D���b�T�ѷ��eq1��B�vM
ڐ��(iGQ�#ȖSy>߶����X�bm)�m̑��[�r�2�b��@ռ���"&~�s��o�;>�!��x���`I?r#bĴH`�8jL������`S��O�k�q�o�7�Ɠ��l)#XI=��>Z��&�{���f�M��Fd��:Bⵓ�î��2<��Q��rO�H�l|أO�a��5�Q�ŋqaI�O[.'�(���n�Ϩ��.�1XQ�m���w1?�ğ;��32k�,�� ���i'I�)v;k�����Ҕ�g76���)��o�,ڣ���i���.��f��9�g%l�k�q+x����UD�a^�<���gʖ<�g�G11�J��_۟�ag�}���a�@�g���MGB�fS	�Zq�@��/�D��L
b���iD�����;|ʏ����{�4W����9n�,߱rjݎOb�� �
�!��m�͎���>�� �-��R�@�ϰ_�X���0�`�nM�.y[�G0L$�<L�}� �[`'�;,��,�B��Ғ��Y-�x�1e��إK�0x���{�=$|�y�m��7���;
a\�|$�ca�'�1p6��b+�WV?�{������DSJQ��B ���%ҵvmJ�|�U."�M�Oz��_</G�bS9~�vA��2_�W�<8���恅�ڂ�z��DĚ4���{��p��g���@�@|s�m�ޞ�pގv�}�|�ED�8'���Zp�- �M;��"�^���z,�Un-�C�S�8�q=]Qs������P����E�e����#��Fl��϶�B�l����s�>]ѰdӉğ�??�!�y����4��/�ù @�V{'����c���Ҕ7SP���9���4�;��vFL[Z�׽������S61t����!M6/9�c������'ƅ�.C�q���q�Ȍ/��!"Q��v�cZ{�����S��Ld��*0�{#ɀ��pjV6�"g�����N��7t��i{1�`ڨ&t���ȅ����XŸn`�ƃ�s�N�}��!D��g��4�[�;�!o�(պ�r6Z�A��띱�_��6�7J_���<�Fd��&J	-�p�K�p��So��q+��W�O��Ǌa�)�g�C�m�,_O������}=dc��1�$�����;ӿ+�DjN���!G����OC}Q�qq�;��~"(S� &N���q�Hַ���<���r3 �5��L�u�!ҿ>��>�$����n��8ٮ!;a�G��>�k��#��ڇ����e2�d;������v6ۋh�d�)8���<�ǔ_�i`�mw
S�����}D0�O{���!�'!@�����a�.��B�e<yu��4'��3�p���y����QvP��F[iy����W��es/�:���)����|!Q��(��Y㾱��u�RZ�9�w4���e-F�Pw���8�dd�v��`:f�KJ"��n��T��;I�ڄN��c��q����9�Wu��
�#o,D���	���B�Yh�0�oېwg^tD6pe��ޢ��uu�����r@�9��~����a˃+-��η"��lh]���d>������:&wc6�㍧�9pT��?r�׶��7&X?k����91���^�����ʲs������k�!���%z�� ��0��#c.9��-
4��II�8l�L�f�Yp��5�-W�d"����ւ2/�L%��f����ة/Ӡɡ%��01nC �[P���y8y0�5��dKr&�D�t�8�A��e�"�˝&7�_�Y�@�P�AO�S�2?s͏��#2��b�,���G�����G�
2�J���Q��_�c���!��ł�N�Z��n�ݒ`�p�t����m��[2g�<O����|488��8�5R����m �h�ig�E-2.[����D�3&HP~R��#@!�H6c��xe��=��w��K��l �9_�(��@FO�6ƔQo'ض�BP �L�ìz�,aP�9a	�QοYp�#�R`1�kWb!�ǋc�>��x��@�&��]5|�y��2�~�?"��wOC(;��c>�>���`�k��/u����:�#���C�	�c��jLK�	|�LK�fGd���n�.�C b���qq~պ�����9��b4u�����g���O8~�ϵI/�	�팏��c�`�?Y����ޮ틧�)��q`���2�x��`��S�5�-��@�gv��(�&f Q�
��� u߬�Y <�MWG�# ����D̘6~�7���5�?�1�v9�,�����
 v�{�D���x`�����5����%�J	_��[�T����߾]��4U9�hT},D�o���WxrIYqmL�=_�3O�O9��S����YM@L��IT^�&YnJ��ũg�%��sb�l��B��%���CߢWk?_;B97��� x���\'n��U��Q��KʗǾF��������N�-0q��xT3��k�@� ����;	���Mˡ��4����Exa�,Y��0Y�'�gi&v9&$�!�%|$6���wO����v��}E��!�\�䟜/vL>�ʶ'�-Y�z ��b���͊j	�k��'�PF
�h�SUEN�Rl�l�LZ0��o�9Rp��<]r��M�֛Y1� 8X�15٬}4���b��7HqX�R�.[�t�jN@�9j��v5��1�Ƴ�����a�!6u����XN�<����K��1���:�$��`�O����9�s�	X�e�y�w�Y����R�U���� �j�i|9��|D�9u����W�=�w�S�Z�����!'�%��g��e:�[�ߑ��)����t�癣�MTd�v҆R�����ɻ4h���X�h��W��cN-`.M�`��b�VZ W8,���G%�1��p�՞���J,�Ν�qڌs����p��8�c�\v��+��a�f�~�iv��쉎��d��v�[{��6��ۖ+�2���.,�7�9^�W�P55;{��2��y����A�͹n[��D?�'�d/"2���    �&��w��d��R��6���3���XI����*|ܙ����<�z8y�A��@�Rs(�4�v"U��+��2��[�����gF,���՛�A�o�0i��l�#"?��?q�X��O��`<��׸]������V�("ڦ�;�G9og%��.�Aw�i~��k9����{f޲=���;��ro�^`w�� �3+в�w��[̻U�0��u�"���,Q�;�@�s�A���i ��� ��:, ;(:v:g�Yg�����D�|��K,����e��c��!��8(ci��n�����w�"����wp�Y�]x6f2FL��.zX��}V��߿eH.{��d���xIߙ�}[���x̔H���wmS(F��;��>�㋢��f��E��	,I��@�H0��n�>x�,&^gy�	x6��}zN���/|{�0�f`�LiFW�I���AÉ�i32��h�J�8�֊�X����A ��̋bLE��)U���%:��Pv<�뭤��ԧ��1����81��<�a�6a�i�rYԍ�9bƸ�wz$Z�>�m8m��k�-}u�:��m��t����0jl��[}I�o���t��n�FU�738j�&hX�GnQ�rrQI���i���˔�s�2޾x^+��u��F�ϗz1��z ���1��Iݸ|N���L�Z���]Q&�G�)��t�`�T�+�h�z���-ˡw��,UEko���6%g��i��n��ݘ<:��C�,�EOr��=�:;D��<����<�ܝAᐔ��i��@4�ŲUZ���tAT�̏G�@��4��b��O�_k�tgX�t9��s:�m����r&ٰN�i�,�J�:лn�s����t���Q��`��z�p���m��?����9kSA�3�j7��h�nn殚=�OL~�ӛ��f }+���М\�O�jr��yg;9�C������;������|%A��8����I�KmU��O *7�_�prKIj��\�%�G�UA]3` }��6Q�v|>���j���O d�;��:� ��MH]̩/w^�፭B�$���G4z�6���|@�$�жI��!��2��a�ק14r#f��le�dW��ղ�"pN��i茇u+�L�1B�-i��]0jH���5��eJ[����ƟD����;��b�1Aoے�"@�K����L�N�KQ���c��w�up��ֲtN�>H1b	b��fKK�s��5����i�154󭱐讘'F�e�X#�����JL2��\�)�l����R���_�W��F��gL�S:���[Q7�_��Y��ƕ�)�G`8h�?�u"/%U���i�E���L ⴻyL�Ǯ2@��h	y��+��+ҐGIKxO�9^J��T��	�][�Da���
�0��v21٤`�Ƽ������3_8�n�z��ki,&oo�Q;:KM�X�I�c'�?��4 ��'J�k�V�h�kI�s#���X*V���	?wK�+���ԫ�5�Sl>+����9e��7^�$�ॄw�e������J�Ӽ��3eF��cE��<P~�ؗڏ�t+�![�G��&40�u�=L��a���;v%>
�y%�IM�p� �c�ܳlp��O��Y?���c/���&�4XRw�R���F[�y �Z`�!v��iOv�,�gNE.ٕ�ڝ�F�8�In�v��P��e^�Hq�m, ��8��M��9y ���5�i@���q��\��v����S����dR���^�%U��;��g�Y����7�آ���O0xto���9�ݕR���v�i8�3BZ��/��#t��_j�ҕީ�&]��A�*��6������kf�u4J]��#�=M�tk9���IC����ؒ\���_��e�J������QS�*#�L�0RO}_2�]���7���4�e�z���,'��z�W'�#5�+�`s6H�#��`���.�~�h�/$i0Ϧ�qU�t*f�g��v��e8
���ȦU_�Z���Lm1�+�b�(�$�O~[>����]X��NPF][9�sJ�ks�~4:)�%M̽��z'I��J��#���RiZ)\�٭��t�t���)�%$��FAl�U�y����Nk��~u�lm���%/*�i]v"����ԛ��t�0P�J��Ё����p��ֻ(���n�(� }��d��fH�N}Wp�3�_�4�iؗ��M���'&��ј=���q;����=-�R63���\���\ѓ��B�L��E�lY��8�;&�������2��M�[�č��ܕ<<��Z[�μo3���9���I�ļ"�TH7�I*%O~�i�G��s�����L���z��>��(��t%�z�fZ�&դ1�G��rU��x཯�r��T�%L�S�$"f,OZ�ņ����\��ԝV��K�4�]S�N��d����	Ⴧkr�XjXܢ��fF?�(����g��ge���8��$9��Q&b�K�ZQ�R��g�ö|g�Q�Q>���
�����/ $�
����p��(�*6:ђk�B�_��[J��Q1}��B�8J �o$�;�{�^� .?u���~�ّ9��Z�h]w�IB��l�(��|�.6�S�|�)�b#�P��-�8L�o�L��R�^��1i����v�;%XR���P3�ʺ.cWz1>��)�aL��:����xov�Xg��Je}R�:�����껖[�Q�E��.~!V�=��_���x$|z�ʪ�,6>�To�cG���Z���h ��Fq$�p�3����x�R4z����KUF)�04��o}:��T!�O�����B#ix�%�/!�N��֑/�Q�M�l���#���
�ceY�,]E-O 7���w ��<�+7�\w�ʳ<�h����ŕ�Hxw,C$,_��)�ʶ�h�f��{1��'^R���Ձ[hW������J"���1-Lb�:+v��b叶�~�YJ�,��	�l�9��|M�V@���(A�hY��\���ONh9<}�P6I�߾5]J��jPji���'kX�4=$=�Xb68��V2�����A�pFZ���'�P?��@�s�Ӝ��Uw���}��3�t2�LrDyg��Z2�(�m�WY�b�]��vm��vr�h���h]ԃ.�D�ºu^��y!5�R����?O����]���oV���7��M��o���
�2�H�=굻����N��ۦ؋#�L����dT\����U~E�z��R��:3S�N���a-!~�����<�c�-�:r��m_g�t��j�z�\wt�4,@3).��Tcz����
-����L��I���LH��S��t(�J�9���d6z�X��j�?�&mc4�{�-��֧k-��4���ӗ���Wn���S�}��J]��R�Y��\�l�Xױ����Q�/=�j�����V�O[:Cz����X�s�JC�*A��:�}-+]3�����Bh�{�[�-���ˎ��Xݯ�v��Gg��c�	���=t(i^9*KG���06�����DR����&#w?).�����K�?e��<�V��z������NԪ��K1����k�ӦmŻH�=������mM,Y�lU!�����h]S�����x����r������w�4���1e��o7&��ܝ<�8u�[� ��@�%��kK�B���;	��H�m�3-Ŕ�I�w��{j���¿��d"6��'�� ���ύ�"!0�OςG�۝�m��C�.mB"/���!�i��Ό)y�1�[u]�)��9F
�/>,�7���m�]�_Ы�gvH'���ؽc�
H�7��:ǤuR����8clwg��T$���^.ɣ"�&��j�X�6��T!(�Ҽ��%�5�j�ԙ
[j�����V�BPXK��l�W����,3�F��o�!'e�F�\Ѵ��$����r8m֎� �,��7,
�ү��%W�> ��7��b����f+��%�FJ6o�il�xd~0�/��4��c�lvsϧ=�8��E��hK%���&Zsn���\�.���"���e��1��N�[K��j��Ns��Pr	�� ������CȨӂ1_��43�    ���ugf7����s��l,�M61���H�#��qC�)��GnB�B^���c)��5�m桉)O���M? ����ϣ_m��2�����ZJ��}����3@V��<�|���G�K�d�Q�}��[QH�����#�@/����H���8˻2�cY�<A��]�kɩəia�̧5Jf��j����m�]�Y�>,?����cʨũͶPIp�!�y,�M�m}A��r�}��o5�=��I�o����*l���c�埉��f��C��QΗ�����&N&J#h^d�<���6Ӝo�6bKF��{��3��|����AF�p+\V�y),S=��6�1��$��LA��M<1mi��P�$����ϕ�6�WM�s�T(H���d�O㣷�ɷ����� �||���q]9�1ur�I�<�����tr=�iʣ}LBqw�:Url�/����{���IU�;�����݋�=#���Q�Oas��|N?�|��"��p�̩љ+�M��f�̙~�4��r�yQ�@��/��x�*��Ƴ�.gY2���������&�Qt$���u}����8�Y|��4��WS$�=d�x���s�8)moe���N�~#'$��h*<��mJ�Y���Ϝi��?/�eHd�M�_��N��Uc�6���󷹪0
�������q���C���l�x����+s��|�|���9�՘u�_���u�[��l�/��n�^�jp$1�����̓x�nsI�j�Ug��H3�o��25t?����7n��J�/}<��ٙZ�),��rk�6o�r�m��V�>,��r�S�E�J�^���x�e�Wqj*u��b���W�T����<��������	g^2b\�o.�;/KZ��G��4�R�^�yf��,\@�er.���aA�xs����薧w��)E�y�g��k\�?J�� T�S^҉�d�������D9,?<!n����m�8�NwY:c�pU��9P؁l��u*:Hu5���)����$�h)n��IP�s6�I �Mu�z:y�bw���w��"c��Ή��c���/i�Y��U+�}�t���0��=�PO����`�Ll׾s��� ��tM�o��S�t��{�1|N�YF+MV~�Մܤfc��(���G�'k'�"�uv�y6��%8K\ժ%���q:.h�Ih+g���[���I�P-$�;C�7���a���ZK�p#:k'��L'�JR��@��J����Y������9[J�2���'/�M5�5�mf�WY1��j�
��{4y)>ؐ����LR��߹��5b��z��?_�T;��m�^v:��W��������2�F���ߕ��2L�ۛ��� L�o����rf�����1�����'��'��'��'��'��'��'��'����7 R�9@�<�?~�)����SBF|�����o,�S>lʸm/��yx����j�6��f\�o���ݐK��#��cR��d��z��
���dA$����l�3�VFr��Z��V:�i��d"��JK7`�QBE�����' �ńn�:^�1�CH=v.P�t$��o��ݨ�=G�IWY�|ci��i_�����$�kX���l���^0���~U�6���kY�E,5����7�����G���|L^V�A<7(�7}r;4��1����K���^x����ow�:�!�S�g���}.m��V�LL�Tͭ�Jm��T��~�'��:���󍋔�0�PY�^5�ډ����9�tM_~�A�)gt�����}���.���m+O�1���MK��wxț�n�Z�/^�������#���i��`r�i�V����F��Xf�@�T �wX�3�[��}P�e��~��9�϶_d�s��.�����¦���	ʵ��oyG��X*��������x] Xס$�~��C�9�����Ksݡ�����iFO�s�o�ǰ����F}{r�vO�亝ֿ�S������vVȹ�qF^>۠��)��^�u[ͼ��� Q��w��f��J)����GkgsA��NM;J\ړ��m���m���㒛�Ȑ1�h���O�kI�"�	N�{>j�Q.�k�6��Zϰ��&�<O>^�A�����q���Y�.~����-&V��G#�d?A�f��9͞X�Vk� �9cʿy,��k����>$2t�P����1���K���*Fz:��h��8���>N>w�!&$�c�z7�R�u>�T��x��SX�9a��d3�9f�̥�BLdx��^�����*lMN��!E�6!g�˝�U^,��1��0�HЬe�����2�	��7�r�iҒWLk7�9j�1'��n�H�-��m]^�eS�y��gLL��2�K�!�Zܭ�}�Ev��v}�E�T&[ُt""���I=���\�g:���jjYN&y�7���{Ps�%���"V�e0_��fW�3}W��F�j|�V=C�	�t~�9�,���3��xƟ(�7��M.�+�f��������k���+�F����u.
��<(�B�qS����V���߭ʽ:��^+��y�<2j��s;������d)�$�O<�s�"x^E��?�JJ�����F��zJhp���I4H,L&؇'u�T�����6З�MO&�A�G���T�En�(ο����݅�M��Y��fFΤ$���\nr��8�k�X[��W�;[�W�O�E��Ū�C���m�Ұ��4N�a�
�c�/{�帟5�"�6�]bbr�mFigP~�;-��ڲOŏm�rI�����-C��&��G	���\��l)A�ٞ��3����?�a[�m;X=b��Ҍ{˝;?�LA�'�c�����óƟ%�F�+]����pn77��:�[��g�1�k�]�p��Vb k�`ф[��׎��NP�J�W��&Jʂ�����=W���UX���9(��t0C.|�q!���e?p��m�td�g�Z� b�n��١=�Ϸ��IIK��#f�_��������.xsq�*��-��(�>%� ������ %��pg@�Vyձ����Zr]S����G�P�?nG>Rs�s/ℼ����B�K~��%�Mr�ɞ7�{bx�CJ�yKm5=NеJ��{���l��s�T��ΐ�E��f�@/*:�t��h�8(���]��}�`��WDf�iFy(�O�_>oi:�����˼~ x���ϝ�����>L��y�'��ޮ��r��>
��#�r��s��]M������6�9���@_ɟ�n/�����C:ڌ�
,���]�� �	H����d�7V��y4�&Yk�=�}JԸ��W<�N�*{Հ�Z9��ʦkDG3��)�UrԖ�j�����LM�1���U��vl���OL�K�b����Z�j�u������]J��Px����6M���
���ԃw.	�6����輏�x�+˼M�{�|���H�� �<�v�֕b(3�<���ƙHl���;L�c��+���yڛ�hd1�9_�e�����*����2�Ff��
5�E��y�y�^R������R��HK���M�o��@�U�5��<�W�[����ShLAՒ�����za����Y�m��os�h�:��D'��"���}%D�g�gϜ�d٭%7�-F�Ӑo�Ҋ�CAN-ܔ���Օdbt�N�#��^���Qf�r@'�{NE����Ǝ��0iq�� ;rn.O~�,��4%r�t&��LoY��>�9�����ٜr�Ҿ_�?f�|��Flp���J5C��/���[*�4W�f+?�����w+�w�1��H%�$֮�H��5�=g���Kʁ����w��l�-�Nz��!��	���j�~R��j��F>�kB,Qd��&פn0&����|Z;?�)Y��LTӫ���S�-KC��_e������IR�W8��4���mRA�5�F���y���".�7�~��8��m��v�l�;��b)��l���˙3��e��[�{�r,��W��ga�f��*�Y�3���>������.VX[[�~CkvH�aegt ���c'�翥
�Dttƈ�f����AP7�Rכ�n�j^��	T���8.,�    =G� ����\�t��aǜ����˙�C��݁87��g!�p;W�׺*�n�\�z�Jz-1>?�+���!r���]�(�o9����g�����	��9y_�|� ���d�0]��X�[l�&H�Q�jsH�rh^pk0�^k�tj����e)xѣ��߆o�"nΥ����蛻W�;��nF�g������P�(��n_�s#П�J=Kn�Y&�����!�R0�C��n8�ܕK��L8zyյr�җ,w��Uc�ЏԣӾwa���T�5Ň��5$�%X����Kks�G���S��R��i��Y�~US�r������S���ֲ\��4}&��?��:�-l�ґ���도�d��¹f|]G� ��)�o2�#N\{�EbHYE}$/l�'����9퍣vr�#����"N��!�/�ˮ��a���4���!�6������J!3�}^����)��|�]�-}�a�I� O0Od�{m�q7�"���w>�,��ix�{R���v�x�A/�\�B�.��i�愃�|�z��:�K2�F$�仜���ݺk-�<
�,��el��9�!���dt�Aȓ8N�3ox2����F�N;���g��]�J�7�M���q�����������-'�2-L��-U?!�2HÍ�di+��� �_q��i�<�Xe�z{�ױgҺL���3/�]�1���\�6�|���1݈	3��A��{��x�q=$9گ�U����J�nC�@�B�W��p�ܐ���9O�(=(l>��Yp
�ꠞw��$�L���ls(����#�nV@6V9�)aA�sQY��z�
C�Րu)�ɀl�"u�Yd�>S���OO�����;N�{��CO�g�ã|����$���ʁ�Q}J�����j��#՟ a��p�+�gs��7�=m��ƻ&������b��N�nϷO~V�%"��'����Q9J�/�m>�i��V�j�s�v�Ĳ�ͤ�2�hSg�^��"!ߡ���^�K����(��@b�{B�F��-ݏy�O��}@� �"q�~X����Rr�8@�9/�O�M��[+�2͗fZq�F�I��#EÒ'�U�&16Ͱ)� fH�ư�u�F�6�-Ѝ���FpS�2N[0
tM*�)���$N�X�)��Ms����ŀZ^IW��^�L��0�`!<|՚�^i��f�C_���p���SH�,JF�E#��#�2g ŝF���1������-')�m����ogx����u*s�e�f�9�,w���9������ZRy���n�I>}"����� �4������H��[����N��|�F�,�|R&Z��A�t�VaQ�i��������&�&-̬l$J$-���*�R��$3�����'��v]����&7ߨ�V���}{��j��{����y���ݻs���S��
F>2�&�qİE¤%�!�/���G0Ozi=��_-����Q�a�!��r��F��<D�!��P�rv�G�f,�B�Ɓ�0U��\Eni��JH���B��ì�@�y9Q���G�^�arJ�U�-mFO�Ecv�
���O���"����F�q �?��0{�d���zFm/*<��(�72trx��u������{;{�-@�0�d���Qw=�W��h�<K�:��W��{��v/���9g�윉�;uo�ZQ�	%I�����k����,4'mO�'���pz���K�-��r�ּ�19�D:J�|��08n��,-XeM4�9[W
�D�R#O�x�l����}���7�[�׽�7s�I�K��[Aq1�fr|��p�[(���=�KZ��L��Jb���)��%W�И&-^�!�6kH��_���Jk��j<�Rͭ(�����囜�u-�X�}9�2#��"�v�\�t[y���I=R���U���Q�V���n�ì�L�q��N���'I��ԏf��9��W����?�)EVn��+}���'I��Q�J����[7N3@<]�<ɪ����%%p��	��xAl��ϗ��Bۖ���asqi���b~;����$�vK�f����S����O�鎱�E��hŢϕ��{�8�T{"j�,�o/c��հb	�4k�G�k{)�D�DY�_��ω��~Ӓ�����V�v�h�;D�����&��VI@�o9lK�#%GSY�,�u��a��`�i=ᲃ��C�o)�2���㕴p�`(�S�Ld7KQןI��hWԐ}��p2Ș��@��cm����e<��m��D��j�ڐ���`l�jv���3ԇ2@'UM��[<N�N+)�kOb�|� �Ʃ����1�ȡ�Xy�R��ȉ@P�c�t,/�������e.����x��.�RBMz"W�w",.9g��+�
�&�.���c1^J*����;���WDĒ	�Ñʵ�!���#�G�1����~6�ז�� �~ٶ�\��,�Y-�:δ,�E1��dS$o�ݳuB��lT@miA^���ٮ=�51E�e�l�+7�r�|��²AWz������ԛȾ	��[��(�����f)�0a�V�n|�^� 5�S�])�z�.J�>�;�{�4���&d4���ǚ�mo"�^��15�����5���}.B�V���Y=o3�����a�eޱM�r��d~�dBz�S�����(�~�N�e�C=�%���-ȹ/�����I9��&n��rE��4��&Ak~��Zl��4'I������c�������epYw,�9�c3�m}*�<�	Q�X���[�"���n��2�D��'V&A������~���ʏ�%}���G�|���#MH�T;]{�ǹf� `�!��'��M"j�g�ɹ</��"F��c���1+�m糗��Tڄ�5lKu��(��_�CKRދ
U���J��PN�)L��:"@gf�l�2N�B�RLx;z�p�w��i��-R���ѰQ�	�Y�@Y���N)���t���O�v��T:�$��s�M{��D�̫���fF�����&c���T�TJ[����O."���m@�ϼ�{^�=��d�0�]9�_5�.��-n.P�;Tí{ȟ)�L��m�����m�x�j�3����W�H�,���-h��FP��k��4a������.l�ŗݠ#�) �J[����O=�j|�y)5ϻ3�an�~r*DL��bs���fәw5�:�"���M��u���_�AlT�%�Ma�|���n�Xz�+�����b�,��s+:���\������z��ٷ��zT�2㐛�pa�/'꼎|Q%o���)����p�R�]:��x=ڨr_?�&73�lE�����%�q����n��l�ұ|W�u8����W��L��ڽ�'�v�)����!��&C㡝�r�ʮ��U�p��Zj4�6����-��D>*-
G�.ِW�쁜{)i��}zY�Ff$��ܝtt���5�Sƥb&c,����k2?�@m��-���J��@ƛ��������Oo���c��G�^I��fSH�B��ҙ�7���E����ՙS;c|N��ل��3w�ie/���}\@rO�$���v2���Af�B����Kg�t�.����J˧��ș����r׾���}7�`�q�V�9����Z�Z�Ծk�\	�����N/bGBK��F���ܨH��(�$�/f(��v���On(l!�sU�KV(��Z��0��;�̞��?i�ߩr�����fk�i���h�i#̈́��>�Z��47#.����Fݳ��ͯ���E�dO~�EF*�.��2W0xm^kC����d����#����v�ǃH��!u�7EjBG��(6����%5Øa�ZYi��tN)g9 ��m�܈�wS6���L��E������Mb��*�IZ�-Wh���ۥ�����P��I��RS_���m�Țr��]I�G������g����9�Q�˔oL���f�6�c�&;m֔���4��)��s�x7�37��<�%%��3��s��Zǜ�O��`J�0or���ONbk��95�ů�'r�O�O�8�9i8�r���h��INRz��b��&SU��ʠ�q�#=����U�bΟ��AD�������nv������"P�    |{�t>� 2��:��؎�ʏ5 ���V"6�Jg��+�2�t7��pQ2(i���.�~�L��,�bek}<0�}H�$D5�U�ی�$O�13�H��ژ{
���l����CX��,�ՔG5Zf�d�[t���"o��)�7�5��2�ƒ9cD��f�VjR]�=5(|
�R`W���o���i-���9q�(����5Gw��9j��\&"����ܫ����d�"@�'�稌4WN����i�8��Ǣk$�gʼ��B��*�6B��=	.�iX�5/K�����y�n$���L\;��׻PJ��<��=O5�9�=ׄ�ƖO+�}Z����;k+��8R�{Ƅ�Z��.��X��{:-&��l	�
����,��M�6��$&���t�`#�i؍}��/��97��>�Y�4���i���?V�_�1BZ�~b�Ϣ��Q���i��7�ț�zhn�^n󩠙{M9Qɋ{m�=r_���`z�X(M3-��t"տ�d`%�>'ΥߘP����!7��?���D?%���&�s,������ݦn"EN�`���ާ �Z�|uF�d���`w@D&BV�L7�b�� �߅h�֮�eAE�V�0�5�o� ��a��a!�����>v����v�nCޤ���(�?뾹M?{
ye�'n��&4%8�Ɓ�!;ʕ#=L"Y¢n�\�b���8 �q�5<D�>y�/O�)�1/�$hn�Q�Mϙn{�v�Y����ʱ��Z�Oi�'�Cà����q�)v��5�\��T�CjpK�9���u(��Lv9`��Qw��+��;_�q޴��#fH�-�����,n#�1��T��q�j�[ς��H`�����k���j:K���#ҧ�y �nJ�H�5WHĿ/��cV��ƀ�4ݤ�s���)�����Ӳセ�B�&���^Z��D��>�����MՖ\�4�����6(�:�N9�~�����Wa*Ck؍d��W���B���Z�v50�hM�$�a?M�	U��l�]m�hҹ.��I�039�P+���K�iB�B���%�o)_�ܤM�;��w���w��x�Բ��sM��~ۊ$�w�-��4A�k_�0u�ȱ��e���tprLgf�f�/Oc�U�����y�,KY�3Wb��:ʿ?�Ț�4�����LE}	_DL.m//��7���
����Z�{&��c��>?��]`u[��}��#�Q"�Mz�G������ʪ�6y�pξ'������6H=���s������*����-�d���/��k�f�S����T(wm�S�&���@y�X缡́�w�L�9û��E�r�RV>7!��p[]�����VD��4a;H�L�,�^�.s���v�9��S�����k?Jz�:7���$(v�/HxzZ���2�(�Uҫor	�<�>��NY����h+;�eyW���Ǉ@�C��s(�;pQ>y��g��U���1�:����"�j����'<��u[���>̌�,{�����2�E��:��/����t�NyOf��_��Tg���^'v�u�Pc5��Ɵw�Ǣ�� fJK� R[f��eɥ�BK;Y�so�v&�ki!�gyՎ���<��A<"r��r��7j�1?C:n��3]�y´�{��1�,�>Q�A3*�D'�uV�����K�o[J���^�8&8�*�M��E��^��+W�-��\r�Ǫ~�Iԣ"����Y�5��[Qg�Wrm��<d�Ҋ'�D�R�49l+�Vҳ��r�sSk���g���M�9ME��E;g��6֖��gJ���T�DΉ���#<�����|<K}�+�ӊC�1H��EI��|,�m~~.e{ҼL�Z��tΆ��WO��������.������/��N%߽��k��7���{<
	����u�`%d��Eo�8������kf�F��	���6�{	��l�o��� ���s�#v�p(���9"}����Hi��P�;��(� 	�'9z.9�Sz/~T;`�����+�|-��Xv�Mk����xt.�Eq�Ij9H`�լ���CK��V���G����t^�L��+�+u���q�4�	�+�c@,Go�� �K?�7ܥ���פ�/�Nt��?��,���<�L^bh8��zo��\3{;���3f͓�R�O����U��=L���/�W����?�r�9�/�F�~���%�D#��*nՇ�~U'�F(��Z���FPX���w!�β�J�>o���G�����;��*EZ���,*�d
>���To4�#5ƭ}a�S��u��9�<(���iު�<��O2�W��Ӵf�s���S�����=����XV�Lza�[��X꣇<��M��n �m��T��I3�c0��#&#�yi�ٕg�,>�`_�\��:c�zB��ּʲ���,y�%Za��Y������"o��99�J�'����_�fx�l�[�{,���ɢ#9䮚wT^[q}sh�MS��V���f�-��ڈcI"ڛR���E[�6��n,����9B@8h���,���\���HS~8�����#:�����wa)�s�Q�h����j��B�򽾢��Y(�ʼO;��L+�-�����)�@A~N�6Mj�|ʄ�41�l��9�`7)�G�MdO&�.�x�i�S}v�R�	��ģ&fY���$�z��d>�Z[�}�9�ON'�,�Ի�(�߱��0��t	�۱v�eժU{>��FK�S:�o�6��:���[7�OR�O:��� ڏt	���D��b�q�?���-�L>�Xy�8��x��V,<B^�S�wV��\q(=:�A���Q��pQ����b�q�MXa���x�a憠��X��U���,���cڝ� �+!�|,�>� �R���"�� ��t��i�n���Gz�Doҙ�����/��N�R���_"՚��3�8�P��8ʐ�8�֭�	�BV�����*�ŵ��_��ɸ��������$A��հ$�q[�c�<�{BH�a&yo����6���=��~Ui	��=n�u�%�[[Ν�*/>�Ƅ�.w��<74�6]N��ae�yq&��#��b�
��wI�`�2x�!��Zu�sx@�Q1`j���o�<-]=&�9�X��6�ʫ
����!ٌ��I@K�1/���q�ci�U�%xq!myi�Si��qn&�x����n�щ�1<SߝF>7<�ٸ�T�᚞V}��6�,l��X*�~�Eɜ��:�o�]��2��+r�;�������-� rH��$��ݵ�V�5�Lq4�s\�HK�i���G)�N��KQ��R�my��@��L�h�@9�ǥI�tl0��X�$�����?I�kZl���5ڶ��+~��,���3���!=��¾!4�	���"��c=�Ր
���;	gE��~���PZ5u����鮹&dڍ5��j1ҕ��"G��|o˴H�oP6SW�g�\�Ф��J�Y$N$�3��^����z^V��R��bj�e�3��?����X���"�nL��v��|�n,ߐ�b��E��\Ԓ�u��ģ���}���˯T_��ɏ?��'�	Wd,-��f|����IM�[�艊���I�P�=�^t�n�y��I#�\k K��4��ig&we�W��-��6Dќ��2�a��wN��O~L�� r��Os�s��8-e�-����?���-�q �ܷj[m(�.�����mL=�)��y��]�t�$������� y0�8ȩ��z��,y܉l�
m/F��)cvc��31u�"�_#ܔ�vq3���g5����:�I�5�����3\��PD
	�g|�[�Wy\Iܜ�.^s��̦gW�!�㹎� �p�	O���*���	���,H�ۼ�	B�U�i�Kk�q�vv�>X�veL������G���t��vw������/҉m�Vdq��I�SY��)�A�h������R}���^J���}���Ӝ��C\?�4W�h���n%���kåO����˒Ζh�0�kB֟|�͕��ed���i�6S��x@lvR�JJ��їV ש@d���hT
6���0�$��u    fq��,�7K���8�|pD�|�F�(O!�F��6߷�o^�0�&o��	F	/PO&ی#�a"U��f����b�"L��f�Tf4s~����N�`�{R6��L��3c�潒[�/��.
|�j�I~��.P�H�m����AV�䩦W��x.l�H���s֎���ۺg�� �{}�Iw�jד^R�'z�B�_��na:&�Z��Së�K���VA��k2��e'��6���7��\��^� �����n�n.W�1*�K{���!G�J�Ys`��n;nB
�T*�#�)O:Em�6��_����;m�	�.���ͩ�;K��m9�$���t�D�N��)�sJa�v�9�"Yj�;)��4�en��	�?�s4�J_~�� �'ץV:�����+h�h�CZPkq^��h����Lim�˒������vf�wjj��v �K�<׾���<y�\��4�ϔ|`a�|��pa[;�eɩ�$�|0R��<'��tb�{��������`sC0��2 0$���8fd�5$�ތ�W����Z{�;�@9D��γ�X��xdzJ	RK7z_�ٻ��qݒ�G��ূJ�N����0?O  ^���)�(LS�8`�ag6�1�8�����;��z.��wa��}��eݵgu�fQQ�+qe��}AI�Nk�"_��I��Fk����@�^f[��j��[
&��C�;j ;�CKy�Z{5;��rK��^7�
z��[�wڒ�oT�>�2�|�2�X�$�5�x�u�ɬ4������m����E�]����d�&�L�G�{j80��U�i�IJu��U}��v� (X^u����z*vPU�.i&�g����t�ԇ^�^|��tV�$i�W3��q*�G>��/)�^������&>g�����}��i���z���R����67��W!�<{M�?0ŷ�6��y�T��U��D��z9�^ib�t��k�xP>�j�(�RrC��4w�K~Y�A����	�%�p$��&��9m���Te�]�2cY���}�����g�;(�ӥ�ߦ��{2�+D��VC�4 0�9�#^F
�����Nqm7��Te�N�{l�*g�<���|@�	��w�)�L�{�ޒ!��T�kK�p�j�;2�CӲ�e{��V޴�g*���hPO�����ӨF�	/*�f�p�j��}N �wr4T\�J�7}��M��f�@d���[ʧ"�*�m��ڮuˆ���3�HZ��R��D�E��:nA���Q#���[pX�C)�-�O��L7U̵�d&oV?�M(�F}Ou�(���p�j�t��,_���a�E�A�n�eJ��B7�K:I�ي�'�9�i�sȡs&��s2�Ni�zy��Vp��"G�?�9S{�t�w���M��῰PY���͟�L��h�a�j���ь)yJ� ���w��Kub�*~T|�H~���	�Ԣ{� H�HG
-��1od(z&�@�;���b���~�u|)u��,�v"�:[T�����va޴59M#�N�S�~��Tbt�6=��S���Ѷ_ֽ	m��w� ��c8w}�A%����$�q�@>|�'���^��Zf�y��%�@]�zW��������,�.>��nf���M��_3=���El���Gk���&S��L~�î"ϔ������<���;���S�\}צ6{�� a���*&��%ĸ����0����;���X��'�@�{~�D��h�G,���y�dq��x7nΆ�-G��������Z��hLǏ��7''���Iy�]q�i0����nv+�r�[
'�B2�#�+(�q��y^&ע|K-�ujPgÓK���R�ɢ�ή��''p�ؖy+����-!�bٝ"����׃`ףp,TvD>���j�i"�����U'�|���[�1*�^��9n�[i��	O��H�Yt@�r�����S��Bgx��x+�m֍�p	����SEqp?r�g�	?�5�ek3����i��LV���}}�.3��؎cS����R�, �B9��Vb�+�iB0�Rh�h G���	;w��%��_nn-���㲶a��M�Wʵ��V�Ag�Ԥ��X4�	�#o�%��5�[.��a.[��T�ҥ���\�j�ԙ7|�[汌;��0��ս��4(G.�&i�{��Rh�,Jϔ��|��p|�?����9�&�j��L��;aĖ;Y"�H���<��5�1e�<P��z��.�6�ۢ�A��,%�
!v���O�M��z�䢷�Y/�lM�����I����!��a|�M�q��%�V5�ި�K_)M�)K�T�������N
)wId��Ӷ�4��gk�Ɣbn+y�i)�����>}��M(Qj�:%���ʅ.���!��4u
����+m�&����7{�TmOi��3�4ioR!��lc.� �G`����u�0U?Y�nھ�M��a<gV�+���:y�Y��`^:�P`� �m~���&�WI�S�4����q0�y;��T1(�ɩ B����d�;H�����A��,eĳ��ARϭL޲l��R�	��N׆2��O �M��7�2�N��1���N i�[a���]��t��7��s+�DQr����6��AV���.J��]s��+�&߾o��:9R����ҿ�jh�'k��,M��%�X�)�[�^Z�+�
Y��)�W/v���J���w����[��O_9�'Z��kKϐ$��ao2�71�;4��:��Pb���/�����@�C����_�YsQ)%���XR������,�0/����L�����A�Lz�E圦��~)�&q!γ�^�&F�ܰМH
3��\��GCa�L*�� �0t�1Ae����~~�J�
d)�谛Z�ۡ��6� L����B+�C��72N."��t硼������љ�׃u�G-���H�XZ�HŶ��{Ј��A6� _�)���E��?X�%m9�#�S����'����r�ݖT�Ra;[OW��(�sHN>�)G��	jJ�@���G�nN��a�Y��ecPd�t����B�\�ע�^ߙR���x*���l6���/����(�t4�i���Ў[b��Ьsp��ΙO+��	8�܎]��LbJ���S�˭��Pl��K\Hl鞚��Zi���
����;�ާLW�ְ<)\�T�M�=���أ�Gu G��r,Wh�m#~��Ɂ�@�m�Ų�z��Y�I�cûH�q�ү�hV�y2W/�{����W|LL�������e��NS���R��1$��Y�w��d�/W��dx=���`�>�;���'n� 9�^�B�A�x���M5���$�^�)����E��%�[1��8$v�ߑ�H2�i��8�����s頵R/���*moM��>L$����ޝ��=�y���ژ� ��w��jW)e (�fx�[��t_����I�h��4���Q�k8�}%%aN��Ч��M5�ۑy�%��K ������*���0/�J�V��w."]BZILO����?CKF�k���%�'�r�[�0&�ܙ3ĳ&���B��'s���X#����ei�>����_��yj���QIA�SR����ȴ�'I����K5$�c)������%���\�6+���~��vx<5k�ˎ����L�I�<�җ�z;�꺆uo�u��+��p�rxJR)E��2X�\��N�h���ɒ������Yh�c�ד%M��m�yia�������[�O�"�l�!�Xy(��A�TU��.����㼢�O?���z/n`��Rd@����T��h9�7�S�T>676�Ŵ�v��������Iu;�g�:Ѷ�F�}4W���D�05P�����f7�:$nO�#SHL���`ve���&�C��ѺK���)Q�K��6r������C�z��V��E��L5�Ԋ��&�V��eB�`*�y/�)-��\F�h�<J�x>Z�1Κ'�Z�$�� �|���Z`'N�Q\4� cNJ�jX��l�d�]c=��=��J�&/��y�}���V���"����AP�=��|V7�!�+ �3��+np�Nv�Ę�x�?�;����)��C�U9&���-��U�qʖ�������n&7��J�:+�^I    J��H
Z%�H������Ss����5�e:�s)��Ŗ�5����:�mf�[rs����%%����K	q��N���Ȫ�4Jjr/SrM��������v{�pN�GG&�dWW�C��HCʫ�r�ȇ� +�B[X���:�~1�5�C�\&�y��9P�lE�I<~o�IY��Ive��C��uP	C��<Onr:k[�"ԓ������Ң�)��Њ�ёt[(�І�x�l��ƅN�_Ӵ���E�΀�_K��,)~�W���^;�d�D�\?�Uݩ��WdƐj7�&:x��Asc��g�HŬB�z���E���"�S����W��ǘ)�[�Nj�=����X�y����m�,*p��N)M4�#SS���>�c���5���hb;�X�%`�m*Ő�:��W�+�G��m��oN�Ӕ{W��t����r�^�T���{���NA��8%����?igG�@��C&�W޶f}؈U]��/� Z:[G���%^|��x��)��	�kӵ�~N��1��qeҕ��]v'k���	rm,8�HJ����H�� Vb&�\����R�6��;�����G�#U���nF�ӯ�s���i��������	�q�F��R���}$��4���9��6�B�K�� $�G���}�͋�{\�X�S7�wF~���K����D���>��Hլ�Λ:�̲v����!���D>����I�_ct���C¬Q�g�;�����U{炑�A�a�g�h��_��ڦ�e���}����3�#�e�>fW��H�ؒh%G�/	A��IIu�>a�����O:@��ZP�rؔd���kz�T�%���l2��R���W��%̿���e��pH:i��j��0�U����&�et���醡�Y��S͓Y�hL���DS&1���9/l謹���@����|S����uKKD��L��"�	��N�g�Q;�o�iΫ�O!*!3�5������W���Q��b�72t{���8[�:���q_(ǥ�{����y�I�F �i,Cp�����b8��,��)�^#84̻0�_�Znx^fb=K������I�f3�e���]��xؚ;����(� lI���ݛ����5���m<Cx��u��o�B�XJ���f �R��%F$Po���j'�u���Z��y�줌��/+����+)�ʡ5v�q��GWe���3H�ab��n�l~�\����̣��b�v&�uH�Kkڍ���n�3k���lV��En�A�ӷXR�8׭EX�$B�5Cm.�6Xi���B�%�h�5$'~��MG�m2inQ�|�����PW*"�������:f�gb�MҒ�D���tޔ���ɭ1D�S Z4=sm.s=��(3K�ַ�������oA�&�^-��@Hd�����M{ĺ���$�q�D�|�~��A����7��^lJ�\�_��?�G+
�aM�/�jDW����{T.��J�/5�Ğݐ�Xj��'�(b�����?�輡6�ӡNF�3�"A�\���$%����6�kT%���}�,%F#f
��WIr��������F.޹�<m]��c�Y�^ixr�F><��6K�Z薜����Y�܍�3�ƅ�Co��4k���L���H9��Mg�;c��]b[�Lps��
%
X��� ��%1N�`�A�8��m���{�����P��rL�1=N:�Š��.-�=@�/U,�P�ۻ�zn��ӌ�c���������K�^[�'<�OYtX��s����p8����-$�*���Iު7�:�,	t��l��9{��U7�x.P�Bl�\�6iL%>��#�e�uh�7I��|��������5�/��k-��b�*E��W�s��wI�R�0ͻ�dk�A�D����R-��R2�i��:7�@����4����ĸ�4�m�+��/��'�Vp��}]9PH��0������rև�RJј���P<jS�X���c������Ù~��&��Y�*95���	�a���&�lO���1���iù��O��^�ZY);�f㹋)N�/?� �4b�*J�
8��L�eE%�O� 1/}�P�H�ZY	�o���cGA~�������[ᓒ�Ll�R���C=�~�g ����%>�p� ӕ�k��#���ʹM"���)�G��	�`M��n�4:�fx۩�+�3��'�����)Uڲ���u��� ���o2�˵Ր+�`�������˻~5�����k3��/�����j7�n#4��6�������a��mt=C������p#4v7�l�,�����6�[���*G�`�ӓ����ce��!�Z���aP��&gL�1���Qs��Q&)�!̼�J�xW2�y��-Knf�`�J<85��d�E�r��J���R�ٰ$���<iT)��bZ���u�^��42jC_;������L�u��cn�s��r*{�1�Q9�ٟ�}��'� �R�'���B@�4㿚��,��Ѿ.HƸj��@��vlE������ v~���<����)��b�Gʟ z��U�:���1p��O�<���3�D]Rb^�H������]�Α3ǫN��d�0+ SBRg^a���%��-e�- r�=]�M������ݗt�rUC�~*ʏ2l�*�L������3M�?������w#�PQѺ�|�q�eI��^�X&���}m�8�l)|ذ,��?j��A��.�FnU5+���j&ċ��6�.JH�Ct�k�i�	���i.o��㵋r6��^�h�)�i�?^��kC�A+g��ou��,�K�	^�z��WA���/�>�h�!/y[)�1�LW�[��i�M.��|�V{�lZ��ز�,���ⲉ�20���Re�9QMJ��
��>�K��D��*zuG�^��+���O�Iqc]��o��Na�t�����+Xz���#v� a[+��;MH��lUx誰���3�m4�`*�v%gy��D�q�H�-ՀF��`�!��Vj�Wϸ�Z;��_�����C��W0��O0��A�/�TF�tP�����`�37E���Rܾ`���@E������'vBѥ|�q%���#d�~�I��o�K�a'G� �yo�V@����$�/0�<t�-b��Z<����}�;ů�o��YN �ԗ�e�Y']<�g�ձ5����&��l;)�$�R�\�@ߖhkh���)�j�)r��@w:7�<���n�ߗ�;5e����y^R\���Y�Խ�|���(+�	Q�D���l���@��+�ϔz��ļ��1�i��n��!�\}mW��m������L�gԳ�����<��p���JS:�x|�=��Q-[w�]�j8���ɭ�6&���<'�n�Ά1_k����+~��y�Ū��{�P�6�����c���uv���d��X�ܚW��&w��=ӱ����L�J	��A��c^g��T(S�{/o�܊�����|HQ!2��s$�~�������-a�qȖ���j}`J�2yd͓��~�󔌘v�<U�i|��e)F�u��n����$J�GC*�R�`K�\F*X#�c��T�������le�<�~�KC����L�g����-�MN+9�C�+�^�7�sIINI̎3�O����˹{��ҜZ��S�9%��E����L��YA���`�m�r������\��K@`���b��o�vv�7ٮ������k?��N$-NQ�W������椕?g��p�-Y��l�`����M�ث�,g���H�@n�c��9�瘶+w#�c4�K���B�{��`+!���q�Pc,Gΐ�j���&��q/�Y���p=�KY^>�*����T����d���!���>��Z��5�3`Q�eXԑ�)B.�n��&G�����$�I�j��3e�J]p�	�X=+�f��D��4����E�9߼w�)�9��N�K`ܰ�s-�}.��;=t�� b��E�<q���K��|/���2�F�*e�˝�<�-�=�o*쓡��Au��\�%`Q���gN���%��x��]���˥��f��Ҍ���ϡ ��SA�'�EB�x�Ͱ`.����Kn�l����R��GP    �8jHy�X<�Qzr��jG�����_h�t�O]�-������@¡3��/�y�WB#Kv߉S�� �s��6�A��SƧa�W��>� ��<EY�`��A��5>���G�kG��V��������>���<r��.�sf��d
(쫗�J�A�L�B~�e.�����ƽ���~�γ:K;�F�n�&���(��vT�ȏ9֥�e�ffc�o�������b����P�&>q9f@k'?��+��$��{���O?~��g�l1�I��?O�g��=�ל��!&>�\��i���FH
�������.�. �6�{ҹ�N�1=�r&�����m-�ZHO��4+u���o�ۮ��w'7����+���'�M
����Z\�F�']X�F���{�+<r�X�u|΢lL�����)ل~���1�,���)�H���s��#]�a�T��7Nss�i���Yz	�T-x��˛����dy۸;*2B&)��2!��.�Ë�a��"c\�3�]�$�dQƻla y�jmSSI��l��d��a�mЗA'����0/�	ɂy�*I���Cr�����ML�z�D��8=K朩�����o�Y~�)u�܍5׍��5����I-}O���+��j��X��������`���S��m���B���I��Ϋ�m��y��������oM؍㋳�³�#�P���/0�MB#|�gJ8���'y6	|�=�>m[�\~P�ϛ�������x��3h�'R���n�/($���*	J��V�4�^�j̕d�\�)��'��$�m[�'�_x]e�c���:r�I�n�����ο�6��##Ž��.%�\ߖ.�;�nʁB���]L�2��-]#d�lU��M7ܪAS�����뵠�yZŇ��`�>��B�����]��w��Lq����ӧ0w��q?��|��g{��\,o��r�$����)I�l�ѫ�{�|ݖ�$�9��t4ߚ�>�Xͳ��_�G��Y�3�ɬb�RH�>�DdXuA��sQ*��ʃ��e��z��~�SQ�%J@����+q����N8���.ti�u���K��|ӆ��Os����|8V����̃�c�H�X�r����W�w)^�����ƒ��5�M'Z������k7��<����w��������Rh�t���R���,����ZǊ�hi�VVM�.���)V������`5�|V�8k��:{�Ϫjq�N���
�k�a�Hx���.w���3�y߃�%>%~An���c�g$��}A~��+��(E<�F�P��=�0$�r�.�V�ZK��gqīt"�;$��s�0��4+�m�<e|�۩HL�����U@b:�r۳�	��hs���#��:��|˛�#2ΝҚ�k�v��9ￚg�q�Yn�$C��w|HL�b�)�!S�c^M}����y��9v$��4���,nwAX��̊ǭ�6^S�t�Q.�/ �K�\��Bȋ���p��^�.w�V��:�+�ķmŽ̏F�^{���MQE3��Y�*f౅�G�6�!�2�Z�9{�0�6��,���G��M�ܽf~��bA�	���Hn}䍩-�X&��݀5ƆD�؍]�e>
m��\�ϛ�'?��[�O	����J��[���S����n5�\�rٯ��yf��e�Ao�����ö"3���~u�R�y3S�H����lz�eЃ^{U=��r9��Sʌ���=g��n�7�6�<�񩹍��g�6���|�_��?/��HF��>{�̞$ݹ��j�[�V6u��B�L˨2r��Ѣ&�|���P�Un8�~NF
����^�=�}��Iy<J��>y�c1����&��tG?RG�rA���`��������3؇ \GW�{!B�	���U��S��R\d	o�ґ����Sf\j�����7�j@�#Ʉ���>u��	��UV�CMeB�0�:n�N���l'l�2�;��ۄAB�yދ!��C�=��=��}���

�qW���I�9��E���s��6`@�<��P��pKq�3{N�w�wܩ��.��I����J������j,w���i5���:'�@�k�l~p�7�֫�N�� ���m�����TS�@R	�WC�m7�?Q��'u�	.ٝf5����a�x&"�B��f��<�~��,sça�`�I���zӼ/T�s�z�u}аa�^ߺ�m\�?4&�Di���g�E��q�Yh��)]�Vz��t-������g���q��iL���	[;˅��G,#��͛�-ԫ.H[z�����$R6�D=�tCT5�:�槙#��W���$���9c����J�!%O�ܠ�ʋ�m�fI%�����:A)ח�j�Ҍuk/7�j����:�I�6�Y'����?�3��)r�m �'�k���K;@��2`/N��1����02��|K%�"`�\�L��qUλ���ZЌ)0ƓW����w+,�n��;��"��$o�� ��+{I,)\Χ�z�]i�[5�+�JjlJ,R�rm�o:��9xl������4M��SٰZ��2Mwmd�\����iyF�Q� �I׎��WA��y�cr�����!��l5mk�{�U��X��Ù>���c�\/ �ok?��]�#��	I&!]Ҹ�Y�'c��Qd��(�^�]I�@2�wŰ[4��j�w����j�ڳ�V�w9�7篅��� �@..�c�{X�s�lc@����%��oCքF��5�!��K����dV�$0Cd�ɦ��:/��5�/w�̬߬p�i��6���:%��jؓH���`��0�|���W�>�,tm������qߤ�O����	v�R-Қ7t�5�Oif�G.q*�)�`UV�����	8	>�7Jt�)8�%2
��0nGY��ĿԪ����ƅ�d��Ll��Y|����P�$��;1&��d�=�Y�f��5�A�i���g��)��q8�V88�Os��&k�߫�ZG)u�]w�O�nm�9��Z7J���+��"/�M��������0y������`0���=�;n���_Cר�t���Vn����c=F���Ӥ�G���y���;o������I'� ��{�%���J�z�=�//1%�<��Z���㰊�i�|�~߄�}V��ۘT5Q���wX������8�~3����mU�eD��ڒ��wϽ�4m�����IiMi�D��A6�#��.7�|��������͘w�{o��4.(���g����6y޽	��v}�;�]����c�IH-����N�$Z�y�TH��CK4W<�*��3����'c��;�槽���B4Q��ո,%�𼿘*��������L��m� O߈��[2��i.�k���v�}*u����O���IS1?�w��?q���9�wSqk�N���-�>HJ��sh�N��{Pk��)���L���c���Sm�����ʗ2�Pܬ}2C������;�$[r$�n�1����%P��oU�M~Q�"Q�R]�����ڤژ�eMH�n�B8����<�9��<͛�7�I�p��\&+
"83�A�'h����*��y��{y����5�}���Ԯ��Ye?
�%������#:x;5����P�ҵD;���jt�����<��޽J둉K1vj���eV2~�Pc�NPe���N�,��1�;��-2}��D��ި=����A�%8\�� b63M�4���iGV�Ql<�a�03�8�i�5b�����о�ik��|�7�ɌeR0G����.��b�[���~�>�ٿ�XUt�s�z�x�d7m*X�2Ci�h�N2S�
j���"�D������ӧ������gk:�?���E�i��yn{�.,�k�s0B`.���2����a��=��P�#��yF��}:6�2�,km��2.K�~�eɛL�Q�&&x2z�7Z�'l�DWr�Rd)=DW�\	w�@5��Y|��@���_���e����
�����0�:O�gG�7M~�ԟzwC��Io��U�BL�������1߈+uD���R�rА!Sˉ�su�#�ys�!�U)H5U���|E��J�S���0n\b7Ө�m��[ x@�t��(    (D��(f7c~0�F���{��A�����]
���7�5㏴7YǦ,L�V�U4$��Ǽ��51�DO5����3nǹ~"&��"W��]�P��*h�F�Q�w�WdX	�A��A��4��I<`R�� �l�pJ�g�E�b�`)^e�ܤ���x����(���q`���q�nA҇N�g���b��V���^�Ln>�T, �QŴj�0D�/�я!�+�Q�xD�η��M����A
�7H^+�O���<o�w�;`�ER���֋����s���E�NA�b�%�a �ә���Į���7�&�D:��Ъ$�K,�z[���b&�A�=�I�5�5�LVn�1ҭu;�"j6� P�/]W�LkdlO6d�!hS�ȅX+�~Y���K�6���D���^��3uϝDnZf��K�5�Y�(�]$��XW��	�����͂~��fɩ���?�U҆��噔ax7ٌ� 1��*Sٰ4�����l�3�E��Xmb��Ɔ $8���ʛ��0�)EU� �	֗zr7ɟȔ�;�`�_.QB�� �[! �uHX�%c�/@.�A�i%0���$�ә���"<y󩈃��N��F%Uփ�Tub&�i�X��uC�$�Z���y��7}"�������.��t�UсsP�u렏P�O���Y���&3ݰ�ͨ�
�ίpMR�t^H�
��M^�=����Ff2�F����³LUY_GTkѮ#/FGp�p��O|�J�(�xk	��Nx �%笠s��+�w��*LHo=�^�%t4iz�k�0Ǩ�@��fE���(+e�6�m���Y�w:�ܭo�N(ř#L�BƸ[m���,�؋��h������%� �8^M���C#Ӎ��(\0Xt��DoӴS}����� A�M��N�1��U<a�J�2)�u�P}�63m�h�\$僁fRJw�w��`�G�V01�h��ǙL��ہ�M���/��T���ry�؛Y�gt�W+;���w�0&��4B4�jf��	K����C+ �xB�L�D
E�b��T�S���)[�B,��v��_	Ĝ�W��ɢ�zd��л��3%�abY���o�:����B|̔d-6q�T���Ŗ������:1~4�)v4�eO�f�Q�G��nX����JǦ��8e���;��e�?=&}�	F_�j�̀�/.�R��Y�(�a���RV2\�ʤ�G�d�k?��.�=����!=�Hg4dw��j*�l8::�B]�C�r:��a���%��X\�L �G����d�5&��Y�U��h�՗Ѯ8 �we\�9F"q�^J��@�`T�f���5`P(}:|��qC6M���e��/�e�����d��F4�FN�'5,i���2@�H&g��H�M��b�Lp9��Iw�!R��X�����A������L��J���f"���]˥)��s���N��3��4�mh��ai��)%����+0�x���CgL۔t�FJ��d8��4R��E�P�ȅ��57<�ބB������c^��C�|��r�h�&}ms�+�þ �����$��\M��@d�u�8�m��9̗�c]��D��ޓ^:�BSEK��/U,I'���d�Z���e��j�@Gr(N1OK���a�ߞ~r.�_�Xρ�=ѐ�x3	A�Y�5���#r�5$(�@m�&dX<BϐiS8��B�I����d�{�v� �QI>XmQTQ��*�`[#�
?��G:�DtS ��0���`#�C�@k]�;=�1o��X�d�!�ٌ}�,G�,�v�f�w� 0�l��-���V�b��8 �#^!SL~T��@i���O���΋|^t�$�%���gm��Ƈ^-�P��l�̅k��n/�96����d��od����� ��\R���N	x�>�u����k[� ���1����$�z�ݿ�qc1Z�v��Yo"(Xit��C����I)�˨N�VYUJ�p�+�B��Y�o㟨�gB��?�U.��~�@��Y�����]��?�Au$k�Q��l�e*��X���r��c�n�@�/�fη	p�x��eK=���/2�����i�)��[���Tl.�"с�e��c�R��U[I� ڌ
3��4Ƞ�Le%Y��]�_b�`�z��M�3��^�.8'���t�e�w5�jV,i���@��k�±���/M+����(".x�dI�m��2���c>�B"@�_��Ut�F��n�����Mp�t�&S609Sp�@��Fv�D�o�[�w�G/��#��W�I�s��l;2�#)�&�I?o�S�� "���@�m��N��DSQ���Ī�hI��r��ڹ�B��'Ch���9�C3 �`2����#u	T�*�V�x�8���C��7$��>�)xhݫ��d��������XL)$��O�IE|=<h�Y�o�F��IpqBpjTvע��
Q��i�ɔ��8I8��Q��y�8m���*F��P�D�$	�̛�(���7����~���p��o]~Ak��*�I�����v�q�d��:���7+����n��?ב�6u,�5l�t�������@*�N���u�3᷂�"�h�rT�[x}u�'�X�I����F���!� ��l&�
�̯�*i��1�ي�U�Y cP���-7���)$(XXm�屫��Z���0e���ͼ��D��� ����6@'�:ӱ o�+h}0��&ǂ)V�>� 3�d�h������g�M�JUX2�<	T+����g+=�s6b��U#�U��%�N�hZΥ�D��A�U��[!��X��ܕ�B
d�H�
�%�����~!���RH���:�<Hߛ�)DP�,4�;���������O��!��Wu��i:��O�{4��G�ECn�?�%�n�}>0u$��f��O��h���C#��N�'ǫ��	��%p?ts�n$��8�Z�E�ܠӀ�=���d�6� `I��@V��#Q
RƘ�_�$u��;�V�Ӥפ)A� ����n_l*EP��0�"��L��i��и� ��&į��7N [��0�GZ=0:�4�xX(.�����s����1�2<k
Z�2�AR�`�!��Q֘�-é@w3��1��@��V��M��-d����̴�ǉ�"Coi��GЈhI�y�z`���;lɾBɞL����Ʉvៀ]�ɪ��<j��H�����z���j/W.�}�(�drL�[�<�-3�*S������B�\Ť8�����0�u�
��I�1Z&�p*���N�:���}��N�۔	6��L��<��c-�e���"��L*���� �1������]�k��Yk�e2�
z
L*�����~������1��=}�[!��5}���ۨJt�����	8<~s�>�R���i!��%�,�Nw���4*c�-q&΂�P�B�F�ta���`����
��	�`Q����F��Nm$�����t�'|.
�.;M�96S[P�0��y��D�c��sCAa���o-c9\�.C&D�rM&��H��C��x'	�FV' �"�p���$uN�zt����c����C�IP8ν���;7/�3(��ʀ���<B�/,׻�u�lE�H�h��R����`sBQ[�`j�4�G2عX��Ys�����)B�X6i4��:�J�,�I=YUs4c=Ǉ�Q�\��POh�~֛e5�uHg~�T�d�
��/����M�{>NHd�dO�r:���0������@��k�=���O�wbr�Aa�GBW���2" �ߩ
��0����G ��N�RQ�����}d�e@��a6��l�'�%�*��x��	L��"�WH��ehg��Bwk��l�X̞�]�d ��Ng��Tx�|�!�k"��U�}�L�
�Lg���1�uh%8,�A�ť�E���[�CCiVl�����B��OP���:��[�@��AiKF��*rERB�k �c��)0iX23�61GG�"�~�I4{jp�V� �U�O�)EhyAb�E|�;��-���f    ����!$r/���z@�L�'��������*�(tpdoh1-&#�0G���wa�Ym�n��,�"�Ą3(��ø]�Y����ukφx7]I�`�2��BM�
4F8U��S���2]VD���o�5�2ȧ�S#���1��԰L����us3Ё���������#��w��L�ڐX�Ȅބ�(Ғ�p�#Sa��E_v�ѝH2��^����5�k��ᠮ�����BA�K#ф�Z֑�y����͸�Qh���m*U"g|�Y�-:K�bm�1e�n��8���cGA������� �c|�eEI�OD�5�X���:TP�hr!����oe0�h(�?�Y�`�P��XdfQ-h8��Z��[y*&���sK�zK�2�*?��16�E̩�C""j0��2m9��hf��5d�T{"��{�V�T`�UHݦ�������c(�QG$��XTp,��}�G)t$b�a�(i!H������A�\�����������EIA�F���N� ]�IAKQ�CN�-̭���e�� �7�.���;�A�u;�`-�7Q5�LQ�h���-���9��!�Đ~dPCΕ�	�#��

�׍͖�F؏;�6a�%�@����	+�L� E�;t��\��������~�▇�)�8M+�XȮ�:H���D��	)�D���F9����AXvʯ�Jv���j�.���JD��m��Hjd+J4�e�?`���e�zF3w%s|����Lb�fJ�t_VaW���n������b����~LSt���>+V�
�зe����y{�������gL���!@��Ԥ8L��!A-�ԐbI��U�d��H#��L�M],]�l19vz:ŉCt��ꐦ+P��4�#�ӕ�;��L��FGu�?O=��X�
����|�?2���'t7a&�r�yz2 pX�|�u�`
���>�p���I�"+��X>"�%d$��.�zB66���}����#ah����U��s{��	Ð��$��F]_V#�������+�:��'�@��2�0���U:́j��9������v��x��ښ���팶�{O�D��)['8�7�gԡ3$o�IY4B�D�`��RP�s��� ��{	"f�Tޝ��<P@�GqͲ�(^D�.�a�LN���"XU8�e1aJ�y!��$��4&ޘ�����9�z��	 ��A=l
�����I��C�����h�2-<����l�L��~#�Z�E��/�xL��
 �:i�g��qw�$-� �"��qo8��{Z���9��E(���\*� �Q�u0ڟSCQ7F���f��-�Α"�I�C��o�Lɱ<>d�A��*���=��r	��j2/1{Co�4AJ�ou�z[H�b+n���AS������9���"(K��J��8�$��`��a<Lf �;믖�u>�w�~c��F��A/X6	�ڄ(y�|>V�*���í, E�~\z�\uU�B��R#DS.U���=�Ht��&pN����͈�AB�;�(�!d�� !�#_�-#��������P3�[�d�B�$�䋞eL����^-8��Φ��H3i�����H��IDHO!>�e�Uus�'��2C2]�I}JYh�h�tH��3��@u�^(R��%�M�#P�D�\�<��&�<�0�d@�]de�l�,�\����]6Eo��0Iiw�7�H������rʦNt���6�&s�`;�H <0*�|V�,0�Q{�A]wB��G�vs�����L�}�b"����Qg~`���h�q�L���"Z���򨊀���(�`�u{��Rc�5R$���#�@� ���ձ<�0���A��	mP/#
v�X��	���&X.���(�Sk��L�_�<}t� "��L0N3-#�ݙ�dd�	%���t"h�PB���|�\�� �%��s�ͩ������ꠞ��X:��a�ey0���ݼ��|��j����fr��&���'����\:�JҤ�N�Y����e�B4�C/k��n7�DN�kD�d���*�<$��H+�xi�#�>��h��i;th�.t~�ɣ�J���U�%/��Z��o&����t�k�
�r���p҈��=ݬ�V��9L��C�py��@�9S4A'u�+�bT>��4�@<K!)��+���C�[.[b���vh�&���?�e�m�zvs�uɜ� hW\\�j�f+	AG���_�X��=o�C]��(�f���`h���,2�񗲁���D���1�a��hZ�`ۀs��%���E�V�I�ZD�Ip�p���X�24�;ﭢJ��$yf�'�^-<�!�Pf�'x"C�PN��n顥���X2{Ɣ�09"Ef uAKhcb'yC-�8�ɱ�i����������[�M&bd�s��ʌ˪t�`=�I��.;x}$!��KQ�rȫ?0���=��~1Ѥ���B�젍��0��a���x4�y*�V�4෎-e�	�wc��hp�g��G�<1�M�2k���qg���j�A8����h75Zg�}�I5 ���)�-��m�'���py�t�C�|ہ=8Z�G'qD�z�[��H��v+P� ��q�!���$�	a��U���
����B�e!'��rA�[���~�T&BfP�u�@A�����\f�$N��+��(7X���T�����p��ƗA�����5K?h�3q(�oZ(��Dk�SlR*����4Yzo�.� �N�1�h�d�� d�����-M5#�	�RA���c+Z;��ڶA|!�?�2����X�bѕ�r�B���nM9i��P����`��&�9��<�h�БU�!T�-��k'�W�1�~�%�i��Y?ҟ���k��V2�HE�
%;��k0^[���ܞ M���C�=�@��2a%����E"�R��c��xW��oL�=�-2ʚ�z #�
r��wVU��ic���
���k hV�Q��PT ��.Z�Ǝ�
B6S�T�He�I\Hnc�x0���H�s�.���=�%�������4��J~6�����wX����I����:�JqcC�O8g�A'�R� nӝt\1�U��I�Q�@�P��/��B�y]h��3�!��Q�IY��Zv����	+���p#;�ʰ�O�8��|'}�8�;���Hֆ�G�"L
��N��V��|N���?�у���C��@lFre�������&�B-L;���5�����l8m#���E�A�O[!���N��+��(<ȃC�9��3�����Z+�nX��a6���NEQa�=��� �ej�V���!il}�F��O����FWR�s���.xg�Ap9*�GA�DՐ�	r�F��`�Ip�	c����2?	�L���b,8�� ��r5����^�� 4��Ь����;�,�Ό�	��p�]�#�"�(����W/�H��7�6�&�O� w8Ѵ�iWӿ�
�A����������Dnq��S6m؊X\�:�&���e�*ShФEb�Av11��M,P�l��h�W�i��I��Fa|`U����{��=7�g�����hF!P�С�� ���0kcq�\�����\�M���1�X���/�;�#>v�{��O$�d�9+�b���@U�����kuM��7jQx��5&j@��~�iv)f|n���9K�~Vt�B�,���I�-��6(W�S��;±�y����)�*EW0�"�
OԅthI�[�fX�t�AB�t�>|y 0����4��?S]�<4+�+/\�o�4��K��.�b�
*���(m�	��e��ŞlG3��L��ы���kh]��f�W�p�̋�g����Pb�C�?s���G�����ibE��[b�2�
�x�e/��@t����fXdң� 0�<$u�+~w(=�F�������8��b�Y�;��\N�].�v�T.#3��	r��D9�Sa��=��Wp����u�b���<t/�P��H0����ᥠz>����u�0�d�[t��gl��W*
	<+��˷g�fj���L�S���!�y�r    J@��6���s�����q�с�8����	9��׸�u6�{��dݷ����$��!�2����BS�*��y[��
�R���˔��Dc������,��Ճ�P�C�^�ΦY���X���3��EUEH���=��p��aF�����������x��XhMh4R
\�#ǸC0�{��+��}l���W�"H��%x�� �=���!ꢟAN���h�����m��iDŜɕ'+��C��Zm�B^(��@a%���^��Š�pI�W���;Cy;����-�.SeP�P���F��NA�n+&���,,uꦑa�']��^�q����$��7`��R4��j�_�2s�
S7���U���i����c���}):�D�r���cKIvc�`z=$�t$�b@ͶS���JPg�s�}�,_蜖�C�J�	�g�Nz���v�	���"VHz�b���#�R���8���}=:�T�:�	cg�E���F>Żh��md^�%ߑA.�:��e?r^��
�:�О݈���g&��E��m59v3\���E-����y��ƈ��@�.�� �T!�G^T��	�1�.h��jBir,��ۼ�o���j;�J_	��ќ��������D��%)Ʀ�3/󋺳^�*�i6�	$�#��.YJ�����t����\ |�ZAG#���B����*�Wq���0�ׄ�����/��~i��`�m�E�&!![[�YžNk��ѽ%���}�������%�ۉl%�B�_�P9@J^�{���N,�S�С:P�����ۺ��Uu�;{�d�����v(���s(M��{U@7�{:��,Gi�7
p6zNC󉡇E�0�"�f%�������h9Q7(0|����v$�x�m/���Ҿ�ۙW�jF-�ڛc1�+4'���cgc��7�v8ϝ��
��h���v�V�T���,�|�ļ1Ӳ�ՈC,h���E��˘8hM@�TAχ=�|����(r��[d���~òs���}��RخƦޜ=IX�B2����C�Gގ�/��]u��ڼ<[�1]�'����%Tp�L�,�s/�6�Pk�"3ΤV���v���k����眢GA��u�:W�5�S�rx�a��������v#A%yn�2�F�+�s�6�{!���D�HJ�
X��s�-�~Vwz��`�r����lZ�1�:s���^8��6�\��j��Һ�efyV������!?NDgrM�1k_�[�gb��G�@�(>W㙈�:"c.�8��b����	.����2������*�[Kna]+dk�^Z��^5_M#o����G����:*����c?*��cr'�w�E�  3U�{w���|9\�b'T��_��$��V�G(:w޸BH�ut�>���Z�NΛ��]�zV�乳PT��z̜MZ8���m��i|��>c�=m�H���3�BO�%?��M�h��PӍ�u�y�
�R�6}�hG2��yCIo(�>�B��fqc�It�p�ϴ5e����#�猼���3cŤ	M	E�
ޱwr��`����n�	b����Wp�T7U_�/W�P�P���@O���as&��6��C
1Q�%K�u�'+�7u�����ͱ{�Af>#v��[O�ȏ6���ef���.?�?o�ϫ����w�!U�g����Wʴ��&��\'�_�T���dh73,fq�v��d���B2�"i�t��r?��0()�t�i��N>sҋ�IjƐ`�a3S���3Pϱ�8�#\�D�إS�O�v�3����Z2CM��?<X����7�24O�K)n��f�o�e@N�߾�l�$B��>�q �����{���͠��p!��,����V��U�
�>�}:7~�R�����/�2J|m�g�M�lr��zjC�wFW|�b��<7�'G~����TG~H����Z9�햝�����������]!��l�	�����THt�X�δ�"ű߾:��jٿl�*�$0"��lXs�ӗ��C�I��ι�r3�Q��.<��B�C{~�+5@/�~,M��
�i'�8�z�ݘ���QU�OHHu�����=k$��I
�K� �2�ɡ�E��?�����ɹ�t�y���Ә�'�����}�����Շ����O�{�ߓ�����'�=���O�{�ߓ�����'�=���O�{���'HM�'��*���<=������J��+u�w�߰
�'�����)��Cg�����5ۚ��*	�h&Q�t������:���@��|��xؙ~�A�Ɖ�_��ٯ�0�|��������'�=��	O�{��������'�=��	��>�D1j<�Fb<f�PA�S�V���z�Z�J�����o9:SFhLC�����2��U�Ik�����.����?W]��#y��'ϩ}>��I�jŻ��BiC��zk(�<�㑖��>z_��Tl$xX7l!6��˃�Ɖ��_aD��Xv>q����hKC�kj��4t��cD��d:�E������� +�Q�����z�Z���A���<�<?Eek��>g��Cw6ږ�T��O�{��������'�=��	O�zB8�/T�?��`niH�\=s�s�JF���]���������g��S��	2ޓ��d"d ����MH����̧��Y�1G��2gT�A&WQ�[�i3���`����i���DMe,��.����TF��ڷ/�i���e�3��a�~>!_�|ڕY�0�F~Z_��?hOk�j�Z��lC�o���@A��{�]����\�9�;�G�sg��uWLa�.���������u�� �F<-%�s۴7g��/��ȍ��<�Ӥ �G4`��I�qEO�9 ��lKe��g!�up��t����Z��=�%a��~z5a�{�xv0�@���B؄@��I	�ͺ��(�v\��fm���kXM��͖���S1:�ļ���ŪX�a��Ռd���]7���M��d2]^�L��g�{�3���[���;?*W����3��Y��<�,Aߞ�����bl9��_��#�����P����ؽ`��^�8�oX�wv��38"fZ�I�!�T��O��`|9��}
��|�PRB<�����:���~�T���ԧ}%�����@�¢�]"���m8_7���N���Ȁ����l�mN�Ct�Jx�^,��<���h:0oT��<y;� ��X��1儀�i���+��Q=�"C�#���/�����M�}�ʏ����o�geݣ�-�vvnK0<6�e��7ї�wd�&uB�����ܛ����Ϸb�w��kO�c���^lg�yy�G8Ïّ�g�eY�6AY}�+��^�lpJ�ٲ߲�oYE+r�X����]0��K���o��[J�t0�;�h;{w���?S�?#S��m�:I��X���7� {�;�����{Q�&��_&��,���'���ԢEi�����Ҟl�O��Dy#Dݎ�a�-���U����8;CǙ_V�Y��L@f`�~/�[?~o��o����7�ѧ��A�<M_H"�G�__>&÷�����$C���mAH�׵�2������K;�����8�\>ڔ��-�Z��ֻJ����y��nDv���ྔ���-��^�p ����6k�2���'��^���.ݝW��)v��u-���[�������e{W.���]K@������9�?iZ���!��v��=	���Y�{G��Ya/��59�����]��`�[��2B�y�ʰǌ�ߛ��k�]����]H����J�p`v�;�,����KY�j�f^L�6*u����o �k����YƸ;�����!�U��C=id)k����.|qOQҙp�{�7X0�xW�x|���� �e5��� /����v�>���m䁓���por-�U�0a/Vv�{���fvGEB[fG�6��H�����1�Y��צ��-��c���#���zw���э�Pfpۅ��_��¸Gkr��[�e8%��_�Hf˽)޲��-�|:gJ?�b�:xߒ�)8�/#L�@I[�&�    �mtz1b�ؿ]����r@����g�׺Mh���N��i���^�Ôz�FJ���V`^xP;�k�$C�y8����f#���W3�Z{JD����<ah�BWQ�k0�8�V>�P�Df{�DS�$��Z�\84�PX��f���.@�R�
���-_ܵf��	��ɳ�"�8�u���;�	f��NC���"�aܪ�O�m����+P d�I��u[���� N��IX#��I����l<my}�)sB��%�"�P��Ä ;BMB�����]����K9;����-D��"y�8�ȬG� �몱o"���9�Ү��~9�b���#z
ĀKn�{#B��c4��I�}@��Q�)�:���I��B���yپ�PV:��3[�Gn�]O��N�_��8&V
[�1"��
qZ�:��"GnZ�ZL���<,B�;�2�-w��֫7�ao�߂�"� ���#��yc}Gi�5�[��@oK����nzJ]����jqLx7 ���s��*�!��k��c��N�p��%�QT�:���2Y�Odë+p��@�O���J�1;�g�!3��|��h��v'���-��7��ϞZ��D@m���+C���[2<P�%'��S;��������<k9c�&	�d|<�{u.��>�9g�q�K�A�Rko�0��Iq�6akejt���n� ]�S ��M���Pt��?i�lwM/-�� ��Ӈ�b�Ą�dY��Iv,o�f����$rH���U��e���.7a���
0�:��:�Ѓ��G.>�l���Һ7Ug��v��BS��\1V"]a!9vz���G����jۘ_B���
G2t�0�9�fR�ى
��^T�:g���0y�f�F��[	��a}�g/�d/���p���L���	i��|���T��^�7���S��䵇I-ꪠ@飋;#���]�������o���7�c��;�w[!s�]�vv�pJ�
�g����Z?�	�*�I�Fm�����ܔ+�e�\&]�G��b�h�Ҳ�����hL��Ԫ�eLVa�j\F��2':���I�!A?(�4tr��(��XΣN5L�-,�����0a^WHXG'eX.����þ��W0�i�����S�u��0���aHD��w��&�&�ǐ�ǂ�am�S`�MZ��k��v# ��2���gLy?ȷ�g�$�Z�	s�g�2�<�+ G�����2�Z�f�R'гc��*LV�}֣��CǊGn^3�l{��>W#X�a�f����;#l��i�L�z��������l�7C�u���4�_8�ϭj��	K ���ÿ<�z�z���xA]��r�6m���ɿq�9!�
��x?EF��ꊿ���@���bS:h¤�1�Ց�s�:���#˘AN�vs���4x=��:_y�5wtl �ݔ4�xt�"G�����О�����bW�d�K<X��; �WHH_��/dM�-^�eA�tbd��dK���T�����m�
/�g�k� m�:�UV%uh��/Ht!�R�������υ�����(�{��΃_
$�z�0I���k����z��:���{���݊����=v��뼫��_r� Z��e�
���5���7Y<��q!��>ŵS�o]R ��^b����]�Sh��V��U��+��r� �n�p�Ґh�������}1�D/�@?9ɚ!^'� �K����~TH2��҃�4�v��ؑ����𤺝e�V�]z *KH������ b�Y�
Ԗ���~G�QA�>��m���� 4z!-�9�����"Ǒ�U��=�`�
�G�PgV��2��ȒX��."�7*���N��~�/yI�w�[��X��hɒ��`�ds��n5�7�Wdia�(�Rc�"����7&��G��|"���`�L'U窘~�����~�(�7��qV���Nh���{���~�N�>�;O!Yr�8��g��zJ���s:�_N^�-��������a��0���&'�I���|4�I�U�4	G��[*D�J�2�y5m��"�:�U��g���e����C�ܪ��v��R�:[�L'�nk�DcuP��L�<��ۍ�q���0��{���1�ߛ<�.���m�0*����J!w���X`-������Ʊ�P�9h�Y��e���j��"F����^J[8�����FC��M�Qv������Rë:�D>��H����		z�t���%��Ju�p:�8��T���/�.N�?}9F�X�,R�:��"�|�B*��h����Ȭ�{�2T����s9{��2��Vr}
g!���;���u��Ѻ����+ۍ�dF������.!5���?BfU�+4r�]�����LMY/mrDH �n��j�xW�>Ru2!:��:�|��d�a��B�v�ɡ R8)�������Ǩ#�ȩ��4��W�8�pw�cew��|1�>��B�`VZ�$�m	f���;�������-e�ej�~��B��ZZA/�:�?5��*B!+�-��jk��؄�ۤXct�?,��>�ld�Ӄb)S7�'�{e���7z�Xb9�"�T�2Z�Rd�Qa���*�m��m�����O���=�;��da�w/Ǹur�C6[�QWX[��E��J�b^wmc?eaP��\W������<��"��c!��H[�0��E�R*�D��f�F�9'_V�/�8�1]&�U�Ć�.�"H�,:�I�!���c���;bL�{��I�	Cщ�n����t�W�eNH�zAp��ьx>�tnm�t�q����y���GV7�E�#� �,����u?�Z]0��K��r�4�k�N�#t��G]9}������JV�Y�1�Ϛ��mW:^r��%�<r�~^��t蠤ׂn4g.B�I�G��8��T�J��$���=Q�P��ڲ�/��8�g_�h|�}��qkJS?����(_ ����p�^&
���q�(\j���Т����bڜ����^#��^�f|�4w��o3endxELx�ofz�pvR�N��� ��(D����vZ�
���R�Μ�j(zS�Tݷ/��A�B��,Wo��
P�bW�'��|go�#w�����ξ��]���% �r�>wS�^�x�5��l�LA��|_C�E�~�������@ɉ�?1�n�"�8�%��di�I��^��A@�l:E��f���Vt�em���<���+�Xhd����F��η��Kn��Xܹ���}yk�����]�"!a�Q����t��zݳN��5�����gL�A������)��>ƷHF�ѡL��`[���p�m���f�ɓg�;�H]��l���9���I��П
��A�ܯ\|��`�-%�0����X�Pw�E��b�,��F7�ɓ�
;ԹS�T��Ni�^������!+�n�7r��=�
���п켞��.�bD`:ݺź���RHo,��������x�%ᷞ��)��|�r|Yv�v�QٔmV�д{�r��q(H`�t�"<�>"@�iV4g�U�m8Qo�GoG���iX�����Ĺ�oz���A��u;��: ���A5.�����P�#�f�?}��0������Ɠ�S������V��jS����+�HK��B�F҈%�fOԷi�!�id��L�Z��H��GP�e�=
��j��\��HG-y���'#�4<���Z<#�vC�x�����qQ��g�S�_L�=�>-���s�JM�_H:oG�����M�9�$������n���o|���O�[u#���A˰�+�r��׿ �C1�~_�ߝsB��!���3U������|�F�b�z�����N� ���7��]8��Ie��^QK�<b�:�L.$�b�
�����@f�䅹�^����A7]���g����@�[3����羍p�B1b��e�\)t���(�S�Ln���6�!���ν�d����g{�O7�.O�l�Ei\,c�����`8���<��=�.�h�.    N|��`��$Ȯ��
�����:�sQ�ܺ���-=B=��ӌn�j���t�u
�μ���7��!�>2U:��n,dұX���=Xy��rݐ��l�i|��"d[�#a�ڌ����mܳW��TA[B|-���!ĸ�?s��&��;�YIh��֮����0��m�滥��wTU)�gS�G
�꾵��l��BG�\6D;�>*�r��5-9��ʚ7�F�=�s��R���N���q���!d�����@ǋt�ƾ����N��֋��NɎ$�k���o�~��>��lΖӧ�G�$_�g1�Ci��:��[��+;��#�m�O���,II$7����~>�%A�Y-������3z��7o��T��-���=`��f�E;}�o=Vz��fr��Ȏ�7��?Y��}�i��»�������C��*6 >��'�'�9�}3me��tbq���!���|��U����7��y�=f���o�W��˜'Z��s������ݙg�WNki�{?��(���d��LQ�v�&X��=.�d����$�$�o�l��#�`���m��¥���7S��2����x$�n�S��dᐃ��X�j����y���K��*y*٦���2���l�QЍ�����w�<~��boO�<??��NȨ�z}s �7���*��Sq��1|��9a��@�_��a�l=A!����
�G.�_���5�v�{ґC�y��ŋ��X{�����RBp]����v:�!J_qiF)�N�q��ዉ
3�_�i��sޑ���b;�	G��#�&��+��G26�{���Y_���3d&������"I���83RG#�fA٫�$�л�iմ�S�I��N*�I-�Y��:�=�X;[s$��@�9jz� p�0%]�Z����Q���}g�_���zF���u\�E��|�s&bSw�G�m�a�Ez�0���7�0oԭP��2����$�K���o!<|>\����0�$Y�~�ғ�������7D�7Mnw���b� v�UAtUg=��wE�ֵ�~~�w��@�/��q3��E(��v3���	t|%���Z�{z:���3�9M�#Q�_[�N��\NED�"}�ɣ�@o�scl4�8��Ƀ��p\��(�-���b��D�\/�
�Y�p��"j_=b��Kե�������{����5xY3���<�b�"�����$�KݫuƦ�S۹Y�.	ٖL&+���ΩG�i�2'1��b�W�xC�G?)y�)���{�媟�������ݴ��s�=���
��>"[�NO&_��	^�[O�`ii�Y'��aD���w��ˆk����N��4B`G���y뱏�
�y�[��d)~E�B, (��f��DI�iX7�3���pVHVU~��-�d��quM'��UC6]背���C�U�k�b'�D,��C�OBO,�uZ�q��BY����Ph�ӣ;|o&�\m)Z����"N�W�D��%+��J[���b�Au�ȭX�m���*�P�#������D�d����L[�Ϗ��u�<}qL�~'#�ɪ;���9؍�NG6|s�M}�w��7~N��� \����Q"�����UIJ���`�v~�kE �*b��iB��ㅝy#Ef��nJ&yRk�j3����	m_T�;��~���і��e�t��A:0��x�5Ř�>��o��o͍q���V<)�!ۮ�X�vV+(Dv�ԛS]�_a�ě!jnv'��u�7�I����[di���F&�5*N��O|N6����N�9L�6��I�Z���F=Yg>���o'���LЕ�R}���n�+ ��x�8�كe�wH��jL�����>n',(/�$�4-���E��@� �.��.�h���:��˅��te��P����9ּǶ<1���\{�[R@�b5�w8^!X�n�n��r	�J#*�)���$;u=���&b��^kY*�1M��D��ߘ�>Wj�%�#ľz�D���{��q�)�#��������J��P<rR�/����>C���ʑ�,�Sv��R�6���o�h�}O���W�\Z��:��/t����4�`�#QM����gN�|Ϗ_���Q"L{O�l�V\wy�a�qZ�L��|��-�*XZ�և�~��PO�)ߕQ��V��<���l�%mz��d�68��쒮�=��?�R� �Wo4��E#%=0�>�k/�_�5��D%7�Z�v)+vtH�u�]��
3Z)�&ar���ѷ��e�@_�E�ZK��7�y�w����\��k�c�������8�ٴ��Q�u��Zڦ�ԗ�cSd���:	�)�*߶!s2
����T�!$U��>�Pe%�2�hh
4�.����£��0�@���"�L^I�ɿ;6���_�����_o���<� �����q�%㔑1�(�2\w����g��QRh��7�^}f�����g9��߯�GW"k�,{���HY/�"�,(�xq��ݜdO������g�%�h��j>���cϡ���Q�V��.(�Z����Ȯ��~'����;��e^��y|��>�P���fv��l?O���b�{��L|�f�
�_�Б�Td����r��Z�L�H����+�@��v�\����~���^o+���ޙ�t:��W������A�Dd�{�j�9�&K) "�g�0.Q�Z���o�JU�xʬ�0R�6+]Q�cw�;Z�/>I���$6�Y��ˊ	��+�؉�*_�\���Ly_3WC�շ܉5?֙�%���v�����@7g�L���?�(r�˼�#3ǥ�����NU�N~�>׉�:�z<=	�˲���s�QZRl҃K��G�/������BŤk��d�dy��Xⲣ��ݳ�����3�&J�؍�)��"��M�e�l��<�^�;]�|�����#7���$�o-�����C��>4�D���th�N�pg�V�E��<�L/1�ޙ�H%r#�ɠ�0�䋒+!!U����ݐ}~^�_��7�i���X�:�Z�D^�:*�z��@��P�݌zSFA�m�jُ��.�Og
qL%=�2��o�Xhϔ�Nv��;���P���N��/��MU������
VҦ#]r�/Uj]�j����2�����\��v��;�Gl8�w�sW�Ы���:��N@+Yz��p�`l�9-��ȼBNޢ����t-�B��t3yZ�+��DZ��v�f��M ���?�H�$�QяH�<�޽�yV�geˍ����L�k	�ȰM,0��O�CNX��s�I���)�d��������[^��:��
�ҟ�M|���{.')��۽Y&VL B(Gx�uFW��7����nr�Кlx-����$����R)V��q�͝�������N�}������׫���
�����z����,:ݲ���E�{���~�p"��N#�.$��p]|E�2c���>B���km����1��RX:LA�숼V�6b�z��V���G
�d��HdH]?��L��'��B��oa������Ly���~{r��'~�����7��=�o{}۾�Vh�����E�[2\-��}I
ɯ��aC�Z^O�>W�">��Yױ*��V���{��u��ܨ�f���NP�҆�� �}kLG���rw��r2��,��2������M=�.ˆyt��'��,S����|g�͟�F�<��ܵB��ĉ��;W�D�,
�1�C.��^ݬ cm�RH���^�[~�P2��!�jq���1��,�u�V���$Wuj�7�1�2ըR�Y���ɧ萿�f�n�UF"�;���S\�H.�jX�x*襳Ϳ��_�e�J�>�JU~D���j*7r���(8��T���%��u�d�X��0@����G�Au�����%����e~�/4\��	z����͚�y��6��T�n�1�Ԩ�;H̐���Z�r�b�ٔ67ރ٤d���|1!�E��޶��6zP�̚��ʯ�����4	����\�N>����P��|��q:�-�[�F�Xۅ"��5N�v�`m�
�6y~�R�
fW���?�;Y7r���+(�C�2t���z
�� h�D�jy�:�˙$�7�E�    ���Y��f�;�B��DR��Vr�&��.eT4��i���81�������Y"�1+ʓ��Gh%n��.	����a&�&z�����e4(Q]�c��C��v��bb�Iu�n�k���Y�b�o���/��3�5�ݳ��^�!}���V�NB��ɝ�[��0z�����ԥ��F�|��cnU`2hA7�v ��J$��Op|�E>׵�.H���������S鰕�7���b��Vq0�?Kn��p���n(:�|�NX����c������ĭ��С��][K��}�|�)��]xE��M���Ct�*@�7s`�Dw�������z��l��8�F�d�bI�K}v%�h��җ-I'�z~�E� �n�n��@m�&�}����ά]�EAa|X5�1���c�lXo�Y����ph���	��؛y�վ��'+��x�}�i��K�H_��w�%���M�r0���#��T�;��\[�$@�&\�6B�7�Sp��.?� �q�G��i9�v�=�t��DS�3d(��e��k�,_Eo�j9m����&�te'�;f��-:x�جX^p�_ӂ�.=`>ߜ<���d��tQ_���Fc��qp�:�{?��']73�O�@6UP�y�a�Gt�
�=��Wm�6�Y��ʞl�u�3�����һ��쬼^b����n4^ۀ�a��فB��Cи���mQp��k7��u\�G�aӠ;-�!nsL�D�q��}}�,N�ޮ ~j���dPlC�@l��90CƥT$)t)���t��X'�C�f�KF�)9���x��ut�}W�v@4[rf��}G����k����oN��^�y�/ߔ���$�LrR�����44�i����02{r��l�κ����9<���\xe[.�����7�8�U#��V,lXi�Օg 5���-L!��vD�W�g�y�;6\o���T\�a`yd������txZ��fCޓ���f�}�ݧf�+r���4�3��ų���/�tN����7�紱�Y�I���OŰ�oMhDN�VnoQ�y��������!�b��/!8��.0�G{C���k�����-���$��o��O�Cn��BoN����T���̉�z�	<+�uHPD���/RN�[u��5LD�T�d�	N�	ň��fu��D�t��������k�|eF�t�|<�q�2|�6aF�-�������m���-�����[��듽r��k��>����Q?���'C��nP1�@{�\j��+���t�p�����o:;�����Xc�iS����ო�B��9�{ų
��;�<%���2����~�Sk��]�׶�#�n�����	Ѷ� {5�0��vV�_�4�5P�%c�y(p����E��/d@�0������F�MFȻ|�˫3�d���~1Ӥr?ڳ�� �R͛(�1��;�Lr��x�G���Rx�����يt�����
��ɘ�ͱVl�NR����3�l����͒G(��:#g���,WTǍ�����1-�R,�`u��
�j5�ͧbM��}�:�9��C)�t�9Mg��J*���T�vE�؉%EF�t�\�ZX�e�HI��/;h�u��:FN�z������R��B$��;���(������ ��Ӊ(6��Ř��NleR�Q�6~�K���2P�6�N�0q�C0�6Se�(kc��L�)_"v^1����cb�������,�uNw
�R��Y�6���l��s{����[��2�RtkXU$M?��Nc���1̐ֈ�1�M���쵯��ȸ`�[�|/g��b.�
�,���n[��"����* l�Z0��-fDҒ�Zm����*~�L"���uK<19����P�-��X9'��:��x�=2Ҫ���w�[T��v�S��%����?	�C��LF��f�ִ*7 ʒI[�P��c��2��8c\+_�0�������s�`��[;��k���q�U,��0�"�Z�q|���9TÖ6j[/������O��@\��0�N5]k<E ��^xo3����~�IA���P�2CHN>�6�9C��h�v�^��x��\�p$Fx��"����"��A&�xD��q����o��^� $�]Eںz��׷DGg*w7XY�����QXU!�ɑ��@�6ݥ�Qۜ >0�tڋ�P��Bk�➸��@��Lv�Q�u��C�^*d*�������9$Mu�����_\e�Մ��AxO��Z�>�t��_�?1��`���ͻ�D�ز�ΪA�W��&���+��E�=2��6�6�	:n9`>r]xB'���u�t�'�0�Kd��'��I/�
�R=U'd,�D����t�+<���)�h$$D�i>Y�H�x�������f�Π\E~���K%�}�>�c��P��^�,�X}C��y�d��7��b �VZo�Ӗ����ă�*�q����)��Bp1Lb�z$B�+|�.���t�R��S�c���Z�p���L�p��w\@R�|��~����>�n�W�ؠ�,��8!��&�B?߾h0�V�7�ZiX	����>�N���Pd,�=�,Nz+:���.c��2��%xۏ\�k�(�f�G�@��Լ�Bv/i3dvr7c$��Y��,9i�bPIj�U����.�ɗ���є]gfK��Z�k��E��ɏN����B݉'�y��k���)���n2霔_�CNXF�s?t��	а�ղi��:��v#���=Z^���S��I� v�Jh�8�	.u/��L!�JRW'B�
ߎd��
�0We!2���?�	��6����ޑٶo��QrϯǮ��z�|��O.��S0�d�[|{���Xo\+�*�dX���B�Dfw9�����.��H}�P���9�)2�eC�4�3�eW�+��)@�N]�U�k⭍�`k���e.����t?O�w��[َ�}�VM.ܘkY������UQi��	,%�ЭU��/#Xn�˿h����\�I@;Mg���M�O�
��᫢W�m,[����_/�1��&lY�l���r�U�l�F;�d	�����Ss#�0��͍���z��XN��M:j-~ߚ���A	�ݚ'3���8h2�e�..S�CRc��o(�<��&ʘM������v��h]�c�T�:�(�A��]�=3\·����ˆ$3(A��v�i9h�:4U�Vz�(�v�>K��uxr!���CV� ��|��Ǹ�l6�ȇ<×����l�G�
��� UE�����^KkL�0���7g�DF!,��g��P>�����|��T�7z�~�9��L��{/�T���Vqbt�I�q
D����Ѻ`��o���>��]d�9O�ױȺ�0`N����3�ѐ��]?��c�_��J08XP��j%��cF�z��r���"�� e t��FdG+�T�ܓ��`�A􈗬�bj	�)|��1�}�����O���͕/��1,IDn�*U�D���A��	z¢G�Ӵ��T���f�`6�\�<!_&e���֠��~�,K�9�L��e,Y��ҕ��7O�t��W�#��*:���p�������F�'])�T?63Z�[��������}�Ql��`�����n�� ��>���ȺY�X���~F���_g!hS���A��K{���q�<��m���1��_�������(��s�p��=f+����;#� ]I^gA����i�	���tLK��˟LF��^5����vxyO�G.t"*��l����p���ږf;�w���<�@`�z�Yý�[���ZY��g(P��#?켇�z�%������3���J��A��X��rRNV�^kR�ܜ���~�\���Un6;���
��q����߸�XF��Կ�ъ��BN��"(g���V|e��U��=w��}ET�_Ō� /3���!F���R) ��6o�R'a�^&T)�Q]�aL?=��--���L$���MrR��\!�H��P����2�!2��4=���U�*S<$q
�����9~a��ОМp��$mh�LkMtnkС|A<E�̬~a�    �����0�_4Hl�s�x&R��K�S�ؖ��;1�.Dm��M�3H����ŏ?���c(!�b}�,�s67���6�g�=䩔��gvP�(*���#]���i�O2Y�s��E�����g��i���P��}k.��~U�3]�.[?�,PC��u:��o�aʕn� حd��>�z����\��@ȃ��/T������u�eJ��4[vr�5�.���)�� �].5jyR��cP/�
�U$�%�b��Šc�x?"�^t;�ծ�D:��WՎ����⅘Ԫ�I�v2�Eǋ��x�/���	�m�r��dq��A�Yq%��������Rx~�y/:�rAvDva1��壵����w6�fC����d
��/f����X��[�w�
4|�<N(I'��:�nE�E]�~dX` 1Bi���0�����N2 �ev�:~�-��id��Ոљ97?��4��h�?ڄ������ܗ�ع��e��hM�݊Ć���p���2��$}���R��M�ͺ�?=4�ɋ� ]gĭ���9\8�~
M�dn�pU�y̜r�B*7��v��*$.��@@(���}�p��}�Y1۹7E�A1�{unH�0��}SB']��)�/�%[���`�*6���ag�%��$�+I�8 H���#�2KR�iMkZ�����f�rk��aϖY��B�����xx�M����bm�)��(�t`��f�LP�n��%����$��F �8o���;[��>s��ϜE�5�)h*U�v���X�~�b�*O�����.�yDfq�iq��G�g����������:�Iw<��̀�;��'g���+�����E|�.�3����H0;�{�,��O͡_q�������漗{��"���,ڣFM���Ofo��s���1�/����#P-/r��ƅ�8l��+bT��NB���H�H9b1)'��i+���q�ׇ�[<u�4�o1l���`�)��"Ni?��t�t3D���fz�N�
�O�o��ȿh���¬�a�����#�*.5���Y���3�z�a�_���Ȟ��&9'o���=�����Ne�_�����'F����!�0��g�[eY�vHV�w�����)��EV�z������C��h8�U�acd:�]��j�����|��{���d���'0{u�4�;;�87E�b�ϭ�_"�$=pپ�y��d��@C�S1�׿n��?����ВO�^f�jV=�� ����p��a��~�~������N��j�����?e;Z��O�c`�_w�����]p(c�D�kl�Y���.s�{�?�NV>o5�Tl"*]���@1�_=���+�n�o�qu���S����u�M�K(mN�r�S>��F{-�+�So�c�/��/�-�w�ʵ�'�ߊ�O���Ɑ��bD�׶"d�#;�qT�L�D8���S�Ջ�}3|'�}�,���Ov���"��?��=Բ�j4m��,�����HW�i��;��r��~˦��M%���*��Ƃy�VU�?8�n��3�*95{�_�i��M���"�ʊ�~J���_/�Q��$ �U�5}�$��Ο�VPһI�|�#����Z�^ĔV_\1E4w���UD4���櫸Wm��m�)���:V6��i����������s%�ǈZ��t�]�5�h�N�j�o�� K���	�H�Ќ�쒂>Q��d�Q��}dð������5'����$���A�9���;�\F|X[t�|�"�P�/{T*S�=<�u�"�w��R����Jͯ+z��qd�n�#�"��Y�5u�:ܲ��d[���&�T4�
���(��������rz_��`��̞�"��ł`|d*cŮ�YT��DJ��X=NI<��`�:ͳnK�y7�;9E  w�ũ�C���s�Hr�Kd#s�,��S߾�����s�[�8N�ؕ+��5!��+g����r�-��5�g�'ݶ�nWJDg�͎&�Y����x�C�(�f��x�w���>���<E���x����g��R���.��_�}���:�v��g-��gܔ��3��j����M4��u�Գ\��Z��Yy���jK]=���#vWy��6����)����b�V׾�wQ�w�1�a����j�o?�1\%p��zh��˚<�$q�g�=Y����_m�����v*y�m�;-o飶�Q��#�}�s;�ߕ@P��D���Y�۞���p��LgYw����6�ᲳO��;��d��ښ�x�+�������k���B��$���C9�<�����k̡�@�Qֶ"ɞ�|O��>�1�0�[�r��8ﴐ?^x���l��\�ϻDı��a'������G=�瓰K�����c����{�4qݧ���y}N���I�Cߩ�U5��J�_�*��'�M�m��v�n����>��N���Gd���(����)s�?2>{VZT����=f��W��ѯ9l���� E�>����}�(У�����ٵ��r��2���d�.��}�6��I���3c��i�o��T���l�� �/r�t�����>��q����)�����m7��gtI��H6�$�Uس�9Jt��ms)j�X)��'���ǃ��� ����M���>w?�b���oT7��:� ��	M	ܩ}�?�ϩ�\���oH���o�7�;��p�`# '��(N�9�tpF��Œ�}w:vڷ��b{�C���m�tʑ�&�U%�I���SP�s�;����K"�b�^8���\�E+���_�O�����v.-�-z��ʬ,JB�c^�*�D$��|�L���\�{KL��l�/��*{���hX9[�q˷{0���lc��֟Z܌�+@u��F
n��]��k�lz�	\_?h�YS����mqL.�-~ӷg�jw=��5�y�NpNU��;h�_X����mV���ʍ�
r��r�z��g���+[�ӣ(2W�����EP�\�z�+�y�o�qUw���[k.�%&����Hp�#znq6�Z��Rq7&b?6�<D����.��a����J���޷�ؙ߿g�Tׁ�7��_�y#�_gY���y��Q��h��-N�QFa���r*�����z|�BǼ����,�]�Z}V��ݩ!��]p�3#k��y�pINw�H��Sc�B��Nu-}��:cN�w�o[�rm���7s_���.�����3�?ϳ�3lj�����"���������C���?� >�z/����)ˣ�c��1���å ��.�(���g�X�*��J��Ǒ�YV�}!��Q�q4����V�o�q�2|?���W�N�E�:���!�f�D�ǽ,��aNV;�TIG����}�Z&���3����g��+8{;ey�u�\�g1x|�5XO�b{�p�<������U��)y��������i�+��W��j�vضo<��xI���O����������GT�C�)e�ʵ" ��V���u�ڳ�l�_���B��k����]�w�ZK�E��Ǥ77(i`.��E��-l�9������TL~�HԴ#ڟ��r�%��^�{�=W���N��+n7�;Ŭ�/���7���}+��)��3��W_ofv���gy�a�k�k5o
�F%�\��SB�b�)>B�L���::�@�~!Q�"���
�7+�~�p�g�=�58`u~����Nn�Q^T��B���ew�<YW������9��'�͸ӳ���Ϙ�c�B`�Fm�%73'�ΠS�W��k�����,F<��X�q
mjY�+׾ܯ�����&-������Y����H�fV��q�V�RV��ƫ�]����`��Ꮕ�=����K���j8�wq�_�)4��a�N
�M�Qu>1���o;�>/� �ޘm}?PӲ)Q�p��.#q�pi�1�{��!0�,?��4� �.��~[S8ٔ``��p��z��K۶�'�v���|��S�܎@?�Z�<�[O�FeF� ���Xۀ�f#��U�zQ^�}�s�M�@g��#M�@KL߈�z��,m��z�ȧŤ��B<�]�j1	+�&��3d�Êy���QM�q������V%U1X��P�����9~s��^��>���%��<���[���T7\}5�:�����    'nMyT����Y�1 J��QJ6B��0�.���pf�;�w38=�dO��cf%42�w?��A9x�u�o��P]�$��J�/��G�"S�+'�e���O>��u�zeyC���^�FO�q�K�O���zE���tڣ�`(�%}��+H$0P±ʾ~3}�e���Հ�$��j��7�%��9g���Y��o{׀�f�9����C�ieq蚧q�D~h1b%"��EM���qw3��暡��(��%g��F5v�3��&_�6 3����>/�E���QU��x�M㾀툔�o��7������q��m���G�?���u�f�<G����>2GwP�n��L�!�D(�t��Ϟ��A�?Qk6p���"��q�ρ���Rx-ﲴ��t뎣q��jD������⬼w2�4�QFVk�~P���[*����t��L����u�|:$O���G�B�t�����u���3���O�g�����	�m��:B�.����ʂ�vEcl�����x%���#r�'���t6/�E�\/ֶ�Pv0?E���я'��:W/��F����0����z�>�n�CLc��>��9 N}�|���M�Ǣ��Ja}���;e,�2X�q�:��_[�8��Q�|�����*�9�A�4,M��9�{e=}��}���Tkl8l���l���~[�f��"|ey,�E\f�l��,��&5����F}���� �O�0�o�8/�\<�E/V��턶��jx�o���]�+ˎ=��C���"5N�"���m�����~Ϛ��k6�S�xT˼���p��f�Bv�(�e�����ì����#���� 3���/_c O�.�I�����I�'��-�պ���EAḼ4�y$Ϣ�i����*>�i������9�-�*`L�(����,�c�;���l�b~W�p�v6��|F+�19?[U�5�r����n�,TS�9=����E�4ig��|O�<�{�e|�gNu[^�`.As>]f�?q:0^?-��@p��p��}-���!B���mA�L�C�1�=�X��KZ��ٍ��*J۩��h���*�J�z���?߈������;p7�����_wɂu:�c�e�y�����^��.���n�Y_�ů�]J<)��0��-���gb��X.uHa�m���^'Z7#��|�6�<~�epdR }��,R}_?��V^ӷ~�S���
?�n�F�r<{�uP����I-�]�5y�\s�n�L�ש*A^5�\֝�1W*3Ǟ�h|�xy�-"��N�1����[$��`�nAV�<�k`@uǤ��\U�`vL�1��+�z�`v"f�RyV�`�q�/x}�>j}�Yo�~v8��<M��Ϣ�#t,����L,��������3}�;Mj�����ʏ�_�F��Ҧܒ�Y���ċ���J��!�"��rd+큏l�m��A��p8��c_=|"�&�ȕ�bq�eu%��	?8�w�T{4��3^O=�EJ�W�_��.9!�/�8u*bfǊ~K�>�NǍG��On�[�F���'y��쿑���#Y%K�X��؆��!|���?jѪ�*�˒g����;w�q���ۯ=�c1*���aSs�<�5�%��=}8O���pI�����l"�+|�NN����{z{��<��]O4�x�#�~�����u/����sR=�6|m�nl��$~92�����wZ��u�#�L��ޛ���6VŶ��ȳ��2��������&�K<�/�|p����h�X����/����׆2��?9�O5J��?Ļq\0 ���c|�z��Эh�f�*����3����q�o����5YSe[�������Uy�G�ɦ�{��*�j< h�y�Rژ[$e_K�H�J�Wf��=B��*�&�:��Ǧj|�W%�sq`�G��bÔ�m�xE�y��|Y�ܖ�fq��6�9M����ު�D�d�E���s5�';��9<Wol��� Wߖ1��f'�TDh�?���1��nw;���ֆ?'�l�+���~�ARYU�}Nm�e�8�܏�ۉ��'���5i�mR[h�?�G�.i�Ɂ+��*���뵓�o�H������h|��˵9jO�S�w�Z���>�82gtT,�h�STnդ[e��1��y ���O�b��g�c��'��
����+^��J����S�*�͘�OR�/&=����^�H�`��P�sys����T��G�$�!�y#���x�����e��f�#?�w�N�f�m�u_���8�k�X��k���0$m���|J��F>�1إX�[���>}5v2ܠ�4�)O��;�0|g��_����|+�jHl��PCE�6��X O�}�Ծ��j���pN��߱f <�\��	a���,3�wRd������e@��x>����͔��6��Rk��jێiMV]���}LN�Df��	O40��g�e���I��]̞O����M�nh�.�7�ږ�}����#/��I�ɾ�ŉ�>�8���O8f�"��GYT�?���}]1���>�ܱZ.����BeD���+�[h��V�^{*֬}�l�Nr�^v�F6��1���`�nǲ����A�&�#�秣�/$$�^ ��e�����&�~����#t�R�l57J���t��8}A��`F�fy��6�n�|[}<���'*���_�N�B�����>�O�`��>_�*�޷?Q�r����@s;?ȇ��-%U������:��@%�_�p+�9b�"_U��!٬s_�9�r/�p�?7B��=x�՛���R�_�be/�k\}�\S"doa[�N���%�VO
�B�t5�bޠ���Wmb�9<��OaERD�&u���[�3�=J���֖�f������������6������{�8�u�ޯw������l鋐�`��� �G�����p^_��vh�?���s�d���w�7�Fq����8�F��VT���V>��Oy��xԂ�����Bu�s`<�ιVd0�Ъ�כ&��و�ҕ�97s�Rk|�|�����e�gXO�@�ڍǺ�	7�9����m_��j���@/�o��w�ݫ�v�֟3�b�0�׉��bo_�$��z.�=��q����L,
��	��.w0#�}�n-�i��䯌fر��\��{;�U:���S���3F^$�'~ţ��})���g:e�f-dv�������g���No�r��M���Uԟ��m)� ��Y��D@;��>8��S�8����������X�I(�I���8D;g��5����mw���t
�T.(�H�&I	��	n�|�ʸ�?�MǦ�΢W`z(�bJ���x���z��ۭ�٢�EV���錌�6e�����N`EǬ��J��~���M��\���qX?j�;b��QW�tq�r�Tp���XGMesP�.l��@�*�-���$�y��I
��
��S�d?_n�~�(
vȷ�G����L��!$!A�eeN�ЕEq�o�z3�oDه���wu�͎0K?~N��](�m(zH�tuq�1%��J
�bޤ�s��L��$�`���[v���������� �����a}}�/��_2�nse��gϧ%['�g��_�
�@y�m��0��$KY.��ӭ���9��vZ�קF��I߬��z�~�X~�x�;�ی�g�y~�����He�m{��Bu�_	 ��
��҉��Y]��QnS(j�'peY��������|d����9��{�s�����~�ه�"Ә��'�~S>ַ5j7�s�"���&�����Z�G�p�������'Eb�5;0/Y@�C5�Ğj��������j��>O� ť���� �g�׽fW_����{mi9�D,�%<�|1>o���5�e�P���Z(*8L�g��6�a��w?'�1�%�����qٜ0�N�ɤg��V(�|r�f��gQλ�Xuw�&Sv���8%C�B)�"yƅM-��?���̳�i����bF[a�1�u\?wZ�R���}�{��ݯ�ꨋӪĔٰf��b����0S�p�I��w�Ѣ�����5&���?f\�X(���*�b�s������a^�3�����}ޫ���=	8�7����WNy�<��łR|VZٵ+XCCA1��w*:    +�ZM���K^wiDFʬ���l_����{�T4N����<�� ̩�)�>��G�� D�����ڹ֗k�G��w?v�����S졻x"�G��'ܓ]3�<�UKzE����X�o���pV<}'|w����f(7��-�2�)v���iB��pg���`�Qۿ�Sd��E4��ձD�G��2��ǘM����CՍ�|=b��+�s[��0g�q~�3�}�5.?C�\��D�ܰG��cᒵ&���V��6{��l.E���ʸ�S���v�~�o��Hֳ�鿼0f}�f9Y�����\;%9�4�r�v�<�r�]� ����}���T�Y��G۠�(X���wC�
��JDȥ�>�=�%ν�x��E�ͩl/��l����{:È�|(#�kz������(�e�����tc�M�m0�<ւ5x���P��������i'@�ab��,M�7a��MG�9����B�jz�a$͹�%%�k�D�#tsX[�E�-�u�Ȯ�����]̯��j)l�E\ty���pxC=��6��?ɾÿ��g��pɆ%e=�SZ0�ėV,��2��K��p}�BE���r|�j����-fI%`7���r��4֡�M����y>G��$[z�;52�2� g�ٷW��K��Z��*S�A�>n�)l�Yl�F5�mr�D5�F�l� ���ݬ��.索3��w_Mb�[��$������`�;t�օ� ��Cf.�)��}��E�k��@�&�L1��D*q�f����:6�pa9O>�_}ZߌMa�GPs�o﷮�.�I�$�4S�R�a��%๒�C��>O�;s��R�I/�l�A��������xN�$q���}���W��5����C�+�*Ыۮn���Ӭ���v�����iP��Uٱ�9Jc��ژ��Jz�#�D�� 뤒�ڻ&� ְ���u��g�1X����RΑT����:n�x��)�{�K����8�'���W ;B���	;]]�7 M�u��|���K	7�RZ|��aq��3/��e��o ���ƪ����X<[^�w["1��>��'?���W�;����/�$�|��������H�v^l++|Feֹ褫ݗ�h��#r�e�������d�B_����-e��~Ĺ��'�;8��Z:p�8��(@���z���0�1��ZV��\vr`_<ۜM^�Q;�� ��xe�>�`��������K��Uq�C��Qc��{%j��<�󄗁�7�W�)rXP;�8�-�i�TԸ�q^��峍��٧���U�ꂏ����jv[�il��t]~oa[	��Xe	��|HՑ�|υا��XW���;���ؾ�J�����c��8�:�: ����/�����
&��x<l�'���O ��A�:��Y/L�S�诀�����8�kF�k͉��Om��n�(�u��[��[�a7kr7�f{�}�Kx��{c���לa�8)&Ju��Ӑ�T�S�v^�m>i_�4q�0�r9_����e��� �%	e}$�ud��Z��`�,'��,B�~K���)u����.T>lL1/��B�	`9�ǭ��ZA�i�*���4R�����W9l���ؕ��J�kq�W�D�a�5�}���)�Ö�ҝ��u0.�~�8%n@h�'��ʲ4�f)�Q��1v����z)Q�`eĪ��6N���^m�<g;&�a�7T��Ҽo�2?����qĖ;�|un�K���ը����EIR��&A��5��Ґ�$��n	��9�%���"��"f�	rĚR�!�\Ӏ��L�8�̌C���om� b�u�qp͓zx*t:�첓$��	��q`+b+[ƙ�`j�N'+��E'�PSL�jB��ɕ��NJ��o���9�#�nJ�����I���X'�n�Sa�|��R����7�9���TS�g�<c�j"n�&q������	v�G�a�X5%���񵦊
Pe�w@��U̡8����2�n<��)�L�2q�*�]7���� [��*w*���@@B�H\˦p��8��ɋ�����5lK�kSIyd��mO3�@��6+�f���Z31(I�t��mWb粦��ɵn��۸^f��̜�2���bO��	r;����Y��ƣ�d�JT�#�N�%O����r_zU|P��C��y�o�i�%�D!쳰�qys��u�E�2���]�������H���G+�%xes���}߳b����꒰��!]����F:�S�����zKjkbDgT�K����ҥ�>xz��i��!n>"�EM��>�q���H��р��T;�gu�������8�Gm��U8%�#�3КIJ�j6�K��T�Y�ۦ[��;�.���*�N0Q}}"��$! h�#g��̊)
uߕ�j��\&ҥ�L5�Ow@r��~ǖ0+��u܀��{��̵US���;}�,�w��#��2�<,'������+��
_��9oj)QGd�!	�F��c;�۞
حn:�[_��3lc�垹���c͋0��ĶF/�Y �)9��@���C����G��C�A���+n/+TD�[
���rĪQ�5�ư,��I�央�h׆5�|$Ɛ��t?�~�����&��ݘ�����T�,�v���-�A���+�e������f�0��/<���O��3L�g�6!���'��_-p�!��&���>M���$�̂����.�۶4�	8�0X�O�I���^g�6���B��We?YƲ�Ȏn|@(V㉒:@J�gj�z�=�P�!��/�조v�[�%�zc��u��oWUnȈד-w��0�6��~�9�J^�v�@��>i@{*J�ԣԽv�Oi�C�d�9�X��vX̄�	P��a�;x7�ݾ�l`ymR�vq��]�C�;��E���6���&9��r,'A*v�h��H,ѰP+�T����^�.�a��V��I�e���c��W;ȓ	:I�tg,/c�a&üQ#����^�P ��7�}�eԢ6�hv��(�)[?ۣm�>�����s�\�h1O��`x�12[��+�k�T� $�:��@,;(������EmɐRLb�/N�e��X�f��*/R�r���j�����\�H���d� W4�N�����V�N�w�%Ш�n��@lNc>i��.Iw�<zI؆�f�bik������6.K�c���H�P������ϩ� �^o]���p��&x�u1�(8o����M���M7x�f�����;���qvz���n�Ȕs�q�B�R9i,�e�yB4	Fx�3�8��Z�f����G�!�����w��y�^��6t��e�}Jyc{��	p�yy+@�F����1��+� 瓈+�U�é�Ab�2��G���~[�4��a�m���:�ޮ���}خ"cȴ5�%��v`���&�R�D��r��.e`?��I.����]\���;[���l�'�dߺZ�\.�g?C�[����%T����c���T�l�C璉�W�`̟,|���K�RgF�7��|�>pm��ʲW��U�bb�mq�Ԣz�{���cIXs�3�k	S%�|�X��i����&c�ZW��50��d
��pe~��(�Pϥ��'�҉b�t����A���k���Jަ+b��{c�7;��ӝ���3����J��Y����Ws����qm{���%v��_@�L�%����[|�^�"9c	)�Ue�	<�������=}�i���	�͖Nb�Ӫ�`$	�1���������-j�X�P�ub㌿6y΢����Qa��5o��	����#Xw�����R����!6���N 5�}��Fؕ��51Ʒ�ؒF|J���q���ؘE�-_��ķ{�����I���8;��|��g�%�	��=�Z�U��N�$����@��_IB8���AȎ�Bl�����vn��P�-�pd�p��t♹��Y$<��۩�<����P��
�{��/�zW�i�;ξ�~N����'�ܕ�*d`�y�1��MDF �q���@�ug@���1FqD���8��`�;����2��+����0y��    ����5�I�\G�r�*	�Օ�l��|8>�N�h=kk��ø2)l�A©E�COD�J��t\�s$-�J`����ͳ�ϝ��97�j�_G�;��
m*!酮�֗�X�X)�eK�ǈ��/!��u��K	�j,�{u�"�g6w��R<���|�m�B���v��f�&w�h�||j��U� �����d����4�k$c���>��w��D�c�a�&kTq"A3����������Q�6�(D����w����Wꘙ�1��8w�#.n��J1���ӧ`����%���B+7��Ѱ��D���J쫛�c�f=B�J�G�U}_U	#ύ����B���]dU�#!M��"v蹄��@���]&��2���lc����A��B�z����w�+�Gb,��:��ƫ��k1g�?���:���3L�?��x_�g����x!m����g,�E���ѭ�T�u)��]z�C�6ݵ3B����9?zI�����|�����	z�~Q�v��z�o#"֜���;�x+xߎ����J��"�q�0�+c��"H��X��Oi����y7��C�0�Φ���)o1߭v9G��KJ~:} kb�q��
�r�Ǯ�v^�ϖ�w��@�2\{���^Y���S��y=6Ӓ�npjm�E�Rd��к��^m���8���I���c�FԪ��3�CvG����'�h33�7>3[v	�n�W����M�`p�����0q(@��1��W�vb����Y��"O�mH���G��V��G$�^��7PXz���|L��D]��������܇�Zx��p��S��Մ��؎+�<6�;����vE-q�L���Xu���46�Ց�d���;o���k�A:�yև�a�+Vc�����I��l��s9��&���^��oe��:P[��/���,2q���Hs�W�3k�/^���"yٓ`��3織$�H����)rT��Py�S�7��)Yn�r����2g���m��a)�qV�u39+������^ʽ&�Wk��Q��s0!��h��l����ڹ�~�W�.��I��6SފtJ�'�؉٥�t�ʆ��(��Q�ՂJl&��6����1n�d��9#ۜ�Q� ����%�w,���<����f����Gڊf�q �!��O����{�e7t�;ʤ|4�a�����P�	9i����I�|4��ª�͖���<jU}�I�v`�	�K��k�0v`1�!�{@b�튐�F��g�M�8g�0a:ߪ̀�Y؄h���a�)���-���]	q̹���
�Q�����7ǈ�j0��Z�
 �F��;>�rq������|�e�*m��q�`�b}J�V���=���i�,�^?5��P�S J�MtFP3/-���-�(e:T�%�&Y���Hlj��M5�B��I8�J�^�bV� Щj��@?���8��[ĉ�i5_}�	{ؠ�Z�8���ɉ��rcѕ��u^�U�*�����D���/Y��h��i��ȟy9u|J��HL�l��xd{�Am �GEn���cG��#U8�&-��Qp�
�'�HL�E- ?)�L��nPTՠ9�֡�e�/Z $��#�1�OYQ�V�ky����Z=l�S_�tE)��� "���b�KR�`��Ӡ�V�[]��[�c֊����D����@�f��*��,��x��0�x0)���^�9��u&P�W�7�8�)�K�p�#OPhu��oe�� N�ř�O�d�ל����֧[_i�M��F|������@��X���u��4�+�f6�n�`W}��U��iu�П&�=f��"�=������X_���Z�S�ΰ�3�Yb�Tb��h.����eSWJ��W�bZhpt�M�(���L��*^��qUK�ST/�D��B�%��r�.��Ե{ �-�u�R���[�x��E��ydv�����!5oT�e9-��\�6�D�z�\�4y8� �a�P�خȠ>��a^p�^0o����J��=�*x}n���-N��7oH����:�b%\�@��!33A<����S)�4f��y81Վ��V\�����W���$��If��%b=6׹Y���!
H�C;�r��X���.�]��OĆY8ơ_-�l�لvt+����	#�f{���;V��]�����uŦ�d��I�f+�D��j�b����/s%�ת;�g�aY=��Ǽv������[G�eٸ�#�n�ch��-�6bX.6`�i^X+���D	A������0
/̏*m ��IU�j����| ��u�;鬢	����' .�m9�N�V��8@`�マ�ȃ��b� �����kv7�.k��Dɴe�9ȑ��V:��n�V)�0g�сl�(t��J��}w�p����Vk�V�ع��j�j�j���v�9����6�r㤙%x����*�ʢe�J���~t+�za�ұkMR�z8l�َJ�ٺ&���T�{K=|Ed��Q�9$'OyL�����)02����w�ϥ�Gt�߲���X�[�����o`�*�O��H�)a[۸���sy)��g�1�.���P��}�Sa��6����e�;EK���΋�
�D�^�|��=�8v��7�h�n9/�S·�e`r|���X�N���=:�&M�����C�QKd�f�0���,(��}�5h���*�͜���H���Qq�Ⱥ�+"��nK֙\�|{��lN����q�3M4l�:��)d����X��f����O�a4��$i����Z�f�a#�r�eD� �MSi���w^�%�4}T���vW���uS7�>�ne|�(��T$j���.�/�v��ơ8<���2`�U���(�*{h�T�y�M~в��5�c,da���3=�ʏ!��m�)�.7�|��b��*-plX��b[N��l(��(�7(�u�Vr��ӳk�ǋ]���QUژ�>�Cb��1�4�M����s�l�;g�{2ِ��].cylŔ���j���2d\~.�d ز�g"mbh#��q6�o򥩶��>�z�ܫ��)�\���P]����lK~
��T�Cf���{Jz����	�R�JX��hW�� }`��I1��E���	���BTc,lf	�K�ډ��֕��9l>�ݸ�HR��ˏ�Z��=�ݏ_]Px�dĨ���8��b��h�N(lvS?qqKO���e���E[��V����;��N'Q�*8])�#���Cj��v(	��U��N9����xS��xFe��w�8.93������QPb��ʕ��+F�~[_:ψm�.y�3�gi�2|R@��Wv��j�5jv��b��uc�Jf��]p �P��k�����"7�1����������H�n��I+��V<��3|�1!��qVl 0�%�Ț�nl�cυn�2F�0OS�rCxC��&:�����ڝ���Iu�*�8�l!o������ENʥK�k?�;ؙ{>
 ����ĽH��/�GWZH�5�.K3Y>���!<C���U�͚)pz�Kh\ξrd9eJ����Dr�9��lÙɺz>$�T��CZW����9�3R:z81бG6`�-��.�'_�˺��%��3���pFdg��J�!b8��ж)�w��{����%8��%�V��P��G){���0��+����e�W�*?�E7�҉�z�ᰁ�f�����e���ssʮs��_�L���3�t:ҭ��K~xU��g�[-:0�	�/��P��N�2�Ō�K���B
�j�Ӳ|�ش�[L�p0�=��X�����;�d�4�S���'6�۹ϘA��b���]b�h	�;FS�������M�Z���^�N�-|1�5׉ձ�g@��T&e�����y*��,/�?<����x��BA&�e)e,nf�ۇ��Eה*Kō�e�:�����(X-嘤���Z�_^Em�'{N��,�!�t�s��^�FZ�`9 R�k9�$�|�TѼ�4�Z�r�o�wVd{�gL��D:i�ǵ3L��nB�j�g9���TI��GGN��`>�'!M�PW���u���J�e��5��W7W~5'��4�-<����%�3�<��m��c    ��'6�R�2J\�ȱ(�!P>�����Qٻ �Ƶv����r���i���J��!SO"��p���)�8J�F%o4�xs1���5�s~�S�հ���!���a�qP\�}m�s���qF81�� �<I���`�d]@�le�<^�@_%����Y�
�_�u����x:�ī����d{pY]�����L
&?�B&�/ڭؼN�DV�%0M�u�X9�T\gM	����� ���A5��;	��-�x�h���baXQ_`&��){��qPF|3�I�"�;\:���f�ۜ�3���liϞ~���fnz�09��o*�F������*&�/��9 pp����$�I��e��UZ�v����6��� bP�Z��·���C��uW��|eb�K��������dW+
�U�9;��R$�g��8��'V��A��7m����N�u����Ir�9�� ��wp�����me��W�	�1䭃ĪK�4!��D�����[¥�6�N��<`!�au��@ �Ӡ�8BA�����ڦ½�S�#�?�k��ڣ=�ԫL�e%��G[����d)vy��q�N �}��t����
��d��ľ��j������vθ'zj'�W���WM���a�����u�{k��X��|��g��nJn�����J��N�rN�>���ֆ�3�J��s00�f����.[.sҢM��$�]�!���ؔV8\���c��8�-} ��Φ�'נ++���	��8!˚6��D����d���y.�����W������s�1=��V�U��Ę�r��mv35�2yx��T�Z;��0`���f\[��V�m��ݯ�nx��y�N�>l߼̲gq��7g"�`�v.v9Ӕ+B�*�:ϊ=����ʴ�Ѐ�`떩��>�%�rUewܔ�Rx�S����5lqz���Xɞlo�E[VEۊa]�=y�b�l�
&k3�o$z��q3U��61CX��ynWpoD8��D4rmw�}���|l��>��4�X��������� ��|��ы���#n7�绵�/�(J��1f�_����7 ������-�Ŀ��@^f�nG��5|�J�����=g�Òǩ�ؕ���H�˓%��~Rl��}�"���69ũ�KO����n{�O����3�,�b�Z��R�s����p*0����̖��ѥ��K�p�PQ�����֣"b�X�W2��_��B٬*=�%qN��O����!d�Kv����R�M��4�-���dܚ�脩�ȗ缸Պ͇:ƒ*ոl_Z9s��iM���e���<&�p��R9L�l�X�� ,����Ig̼v	�yΟ�xw ȳr���ec	��sF��S�u�����pL
���J��#*'��$���Dk�!��6 ��mO���I$�#n��6@xY���j�`�tk����Z�בB)f�(0���6�Y޹�B�k�M�;�����OV��;W�����n�N=zD=�ҿ��f4z�v�=�R$+G�UJ=0qMN�T'���������^F��І�w������'����nE O N�tZ�K�v[�J9uh�63�����#�8�`�>���E���:�w�Α�:�b�����N�賲���B���'\�K�
~�SW��c�/��$+	_'�����sv��rm�JX7�Q�>6O"`dZ{�y�p��:M-��Q���?Z���F	s#�6!�U�$TE�/a�L�b�e���
�xF��W��cD��)�����r��ī� ��\n���d8 ��Hr�+�b��E���Y:��Q����(��>�03�ëv8	�c��V�h:ut����ՙ�7�b(���g֝�$�*fņ���?łK��m@f��JO�8b���%���q�;Z��Xs�q��I�ї /�A�C�%�p�,�i�m�V'�kQa�g�(Y}.�蚌�X�WF�:W�[ʽ#���^v�	��Θʬ|��T��J� �|�,�g�p=8�;f�S4E��K��W�X��>��lE���~rv�U�wW�e�95U�ds�b�?j�8e������ӧ�
v��5�c�����Z�b*j�c��֖�1�r 5K�ɩ"��%6����5Q�������u���"j	|6�j;V���}��q{�:	�Xض����
��B&;V����^e˞X����̮>�O5��s�f��,J[�/
��2�!Fw[��8�ęX�1�e�+�a
:b����];F7���-�t��5��xK����jaqc.zA��f�u)��A�[K���Y��L�.:���K��]��Ύ��Ő�v!���'jX��A�+��^5P�.OWTe8^�IuE�#���h>�I^=����7:�����4c�)�T$������v���'o����\�����}Q;bƓ�X͜��1�!cx��K��-}Agh��HE�ݥ�<������S�qz�Ϳۨ���ܱ�)�L�:<��%�\N���T���Y�'\�P��q;��*0'���<�Nc��X� ;'K�-�;8��SŦAU��Y����{i�:�����PN�Yc�jg)[��-_k���O���.�@|����\%�3�`O�)�mz����?׬��|�a�������|�6l��� ��1W,����9r������g��%���%��t�|����T��: �D�����5<��7������"�+= �܆Sc�]�z���5^�[k6�e͡��$�s6���4;�>�W�50cuk�ܷ1k��s��Yyk�mƬ��?���x�=��k0̣�%UyͰ�%�"���Ty�<&ޥX�o��l�]��-\P,�|�oJUiw�	���㟓U�ó�����1��='�W]X������+B�Fx���,OL�#��v�9z���J�l���a����F,箌b�]�����L����#�A��D`W]�d���0�5���O�Q�I٘�q�=V_MXIα�a��Ϸ8H�\�c"�q%�%-]���[�)���{�*�M����0[(l��|v�i�����s�$��Qx�ޛs�DW��yi��~�89��vZ���:��r�JS�m,o�-c�X~�H�S�.�}O�J��O/u���.�߻usi	mc�r✿������r?�l�i#���j�)�7�`��:.����)Ha6�FN�N�l�����������2��0�T�8��Y��L���p��_��c��o��5������#���'�&C�j�'�L��L�`ψ���R��5[����+���m��в�������MWu-$`��V�'>�A�o�Z������:ثI�0 P�}�ε�튪����� �ע�E*8�gQǃm��Uά�nw`���
�)�<:m��5�M�w����tD�bb��ԉM�T7���Ih#Q`���Vu޻�1r�pi/�E�f�8��5��Z~�����qE��B��q����9Y���!���w6
Ug��q��2UD�[[!7��(��ػT"3_��u�{����~�q�C6Y�B�Q��V0��=�������@8�����X�87� 
�'|X�N6���q����E�i��0����]r]f���e޶����	�����ZLMۣ:���џ~r���ֳ��T�ۯm|w�ϒy��O�s�t�RT,�o�v�N`!�u���0+��G�
�d�L��ŁřY����aE����^���@llc�� ?�Χ{i��E� |}v+�M#�����m��o;�֘���s_ү�G\�D����	��H�4ۭ$2I.\�$>rDXs%��Np�g��>�	�)!���4�D�V�＼ҁ}�M���N_+���b���X�y
�M^9�u������L���RL�l���K�}�ɜ�ս�ʤ�%��a�h�P�W�=N~��i��-.�  )� ����J$��m'�Jξ�߷��``�0r�m�y>�1m���:�:{�(<�5���U�5�§.K�h�
��&�Ʈ6�ev�Z͆
2o����,�_�N�}��-ܒM�2��q�ׄB��c����z�ة�l�H��a'����*�N��v3�8I�¦�h,������8���%z
��_���    ��u���jf����3|�ߡ��9��k;�1���#�^�Z�:����V�ˮ��nA9]́<��kӲ�t���6N�#{@ȿ���f�a��.�*;B�=��'�BxUF*+����$���Cy&==IYo �O�K��6o��,&>C~�u|�6�4�,�y�^D\Ԣ/1b�q7��x��n`Գ<nިz�∹���=�R�j����͖f7ռG=�8vr˚�>;w(��]T) ���J>D���!2�*�Ӭ,W=��ڡ��	j+7<�\�hiUcYƞK�Qsb��&�\sy8ϝx���8yQm�9N]�n1�� �ɫ%�D~�h�Z���y���>F%;�X���%�%�WN�i�X�"Н�"�^r�hc�n �R����>NC���V]�)�v8�Y�@�vrM��f�S8�f.���b�\�r���0�q]��vB�V��.l���T�Q/��QR��A5�ج-+����:r�ܲ�N��Pp�Q������ݸ�w�Gص&�Os�歫]�B,�k:�a��i��~�`3Q�qC��C�:�9/p���B3��]��ܗ��`���!,��ȷ�p��f�W���U�p�����Oٖ�/p�N��L�Z�#ڝ������`Q�:��[͘M3�QS��"�ٽ���?��sLK�<��D����up�Vj�)�����q~�Y���	!�h�'X��庄�mU������k8�b_�����Ć��ߙ��/�/��λS�2;��O%�L�ZG��"\+�"�(>)�3RʽG=%,�}L��3�vE��v���PvY5��5����ň��lyrԅ6��������V��y�sU��6�{���l*���g��I��%�S&�|$˷�9���6Ȳ��Dt�3�\���!&Y�'��)�vR��r ׼a���=���[�#�k�D$�c�̈^���&����q�XSp��B�.���	��Z7G�Ϗ������%���ב��.���rd�kl��M�ۿ}��#�HIl|Pt98ϊ.&�Y�����d�Qs�}I�Θ�Q���$*���"f�D B���B�R�4�)��nǹP\J��ɣ��^�G�����!Kxr�F�]�r�;%+��'�dǫJ5dQ�4�g��e�fM�%�kT8�,��,���q���i�8�U;~�[C�W���4AJP����r��UL'���R�S��A<ֲյ���>b�Ϩ۾Z�_�������KP|�0��L-u�$�Q*�{$��
ͱ 	��b�0S�(�t⿦gC\���޶����j9_�IXh�{�v9LBSWQr�O�SLTi�6vL�rbh�������������8a����p ������N��n�Q��B 8�}L%\��&�Phu�i. 袌~m�}k]���~G�[ķ���O`����LGib߻�	w�x�N�>�C��8��b�����<ط�ۊ���*����t��H�)�EP�{�m��s��{Ƚ#Ե��3=�9̚L�`��z��������=�ݨ�",M��t30[l��g���Kq��l�����[�|,�&���S6i�<����)�m�߄�}�|�X�S�*8�\���<�E��	&�Щ��j�f\f�K>7��?B]���
lj���RR��,%�>'���&q%'���	Z�G����}�V�1�t��c;�oa�]^�P�&cL�u#�p��ЦFe��|w0y������_��9|2!�y@w��	���ՙ.d�KzO�G���!̒�ީ`�<K�����۩�>Rm<k��N�U�~�D�\*+�%2e�oN�!=�2���Kb��S�x�k�_ܤ�.�4[tqƏh:,�g�ڕq���WS�(xĶbH����(Kh��|X�|68����䁰����i���蹮l��Qo��iQB�Prj�f���+
�Iy����a ��b�"�j�cX.y���+��{4����J_Js�	�'����A�����0���@�ʊF!�m�N`��K��㐐��$-��ʪ]���Gv©��輎�I���y�թ�^U�f`r0{s�^���ʉ��'��\���m�Ӧ�y��/G�yKCpc��t�T��$�7R�?�e��R�s�Br�V[�]��& ����i5��O	fP��{�f5b�����)�����Qk���H^WbR�n��%K_�x�E�h�8�ن:ٍ���ǉGe��(��{S|�ʽ�2��`�B����Qlo1q�5<���<�N�hiY���X�V?�s9_e��J{��J]���gp�?�w��u��z�-��eD�j`vL�C�Fvr�Ⱦ�X�����$��o0R�
?n#�t!U*��O�h����%��?��U&G�,Tf���5`g~��{KH?���5ş����j�s�Ӱ����#�vE��.�����Pb��#U;�s�v�[��?���y�Ğ����  �	�yf�M�gOY!-F�&y0�\��Y��s-n7�<#�v
H^�f��k-_�1r���V���E���M����-޸��,f��S�⛋d�ʙ�~:$
"�F�:�G�� �:�/	��2�Ȕ^�.DF\V���g,x8���S�K�VN"v6E�P��<��f���pۥ�r$�'7�$����jNaZ���0���2N`��T���6k��%79+Lh�:;EhX�h}�f(�l�g�q���yy��ˡR(�Ӟ��|�� ��O����iyq���ʒ��Q�6 XpH#ă(XĀ�qd�f���8���%wL +�<`�1Ӑ!��xIe�Y���f(���H���F��P)F[�d��2CR��֦��$_J�a�Аpj4s�]�M»���+X*�܃E�<�#���j�Uɷn9�X�|�>���e�U唶f����Pdז�Ő�Ւxm��<t}4����5S-�y�M�Tሳ)�fPq`��]u�d�������j��veշg�V2�76����q27�~���Ӻ�m>�M0'G~k�F+�x><�T9��TK��D���\6PT-����΢^�&#��֢iU@�T=�zT!��w	v�
0~5���������j��J����/���-�~F��ô�\O�J��Ȼ��Zuoނ����K��;��ڪ�Y�J/��yi�n+����z��S�ʷ�$9ꃗ�FpS�샀rS�x�W[��A��a�n��B�]���/ؗ���k!���I�c~ps\��4�ڡ�Wea��>��(�L����ԅ�+�^��ui�~<�:�쌱Srr��u���EA�R��>3�:��l,�64P��v�o-E�g�ֵ���ҙY	����^��h-8�����=��)��9��LO�2�H���Y��\�	�3�
�6�jF�PVW	%2���d�\p��'�.�O���V�R��8A�Oh�O�:^�H�F�[R4�H)|0�2�cu{�����pl��-J �e�X�ʆa0c��כ:�HU<W�z�ɱ��mk��m j��=�� 9�{F��ϑ�p��;�/m���2��F��'�Y��ύ{���l4����'����|����8�D�3h�^��_[x��;M3)~�@��Y�*��j��At�v��?��C&��ޒ?�J�f/m�6~'+wQ�t�fWU`���C�i3����,��3�"l~X��ɸB\[u&�9y�r�·�p��1��S��Eh����R� ߺ�؈ђ�.Ia��|�?�}���,4�����Z��I_���Pes*�~�;܀�c:�G�N�5���Z��b����4Ǫ-��`�2"LrZ���t�G�l��RR��t?q\BIV�]������-���#M*� Z�`���Ϊ��%|St��n���%:�M|��U�X�8x�/;ߞe1�hI�"#D��:P�N���'��.�S��Z�1����1��MM�W5�i�~����]��q~��%:�5��QV;א�x(�S;��3�N[�0Lô-��W�霈�)f���,�98��;���66�al(sH���
��Î�3���ń�� 7�x�+4f⥟�)��:��=����r�"�vJO�\�X?�[�	5i�"cO�g�#�TN�&]KoJ��q��]@��`�Kv�ik*Q�
�5�	\��$��l�ꑖW    :C��'1mq���������wITTao5�-�љ�~��9e���.��ZG���dE���I�Q����>�]	︢ʣ0{6i�ǻE�N����&?6�$�6z�fݟ�L]O����CX2�.�Φ�H��j<��6�OLKe��+b�8���uԈ��� p4be�_������lS�.��)p��I|?�^��Ȓ$zA��[Hc�$��ߙ�21���Z�5����~z\G���n{�o���	:��+vZ�:Y�k�,�jD7tbD���2���8,=�\h�t�=X">Ө6F��3T.�aϛa�
"�]�jΝ�q�i�`��-��cX8�"�j�}_Y.�Qa�ݒ�58XW�$��!+j�f�윏A�`�6��|�ަ3 �"6�\}��rJ?�O���H/��mu�DqQ0�m]�r�|�p��{�R����b��7�hwx��<���+���M*�l<i��P��Ծz_�6Ir�bݛ���Ғmw�qJ9 Vm�9vR�r�R<���/���s� ����1�v/>�>�º$JV������\��Vp���Xl��V�v��T\����`���t��!N�uհ{�����i���`�@.[��#���� TЎV�M�m���w��:�p�Z2�|��I}�=ey?���T��U�ɲ��vbug��J�I�c��2�Ǥˇ+#%�ԪR�"\�W|���&����9�dQYw(!��t�{�K�q�.��2M1�:��m�Xm�M>����6;M,�jմr����r���n=Ť�#o��m &5��459yF���Fw��rjÕ#�!x.=�f�;��1Ij�:�.w����P�����D`J�s����:q�%��DJ�,ҏE�QTC!�ҝԐ�bqڙ"��L���v~��u��(�|+�6�v����l*�]SwT�[
���g橜:lB�1��H	�z���$03"�ǞV������*��΂��s�/O�Y�5S$i��2={6����: 	��׌Ie`&��D���9,�6j�=�!;^��r���$B��>�#!�Ge�.�� m3�����~(���fK��,
���X1Ué5}2į�v����JD.M�x{��t���-[h��Qq
���%~ӏ���h)u�"�͹���x��=����r�Uۣ������If8#tV��ӻ�h��b�F�
�,u�Y$�td%�[��XW�����څg/* Ν.{(�=�������T�<9�v�E��|"����;f��3��w���N�M9��aǢax�0V%9�$"�/��lb%}�c�-�k��i�F�9�@�)���5����ʄ��܂�bcS^�ӝ��zG��17G�J=�j��Y;�K�dEV*G�1�1-O:O;9�ı�1�QTS��InAl3=��E���Q�XƱ����,�U�G��"�O��\�o���܄��}��өs��&e�V]AG���aڷ�#N�4�d�5�M�;�=Eѧ�%�&Y#%I�<��6�2�ww��4G~*�%��C"�_é3Ν�WN���k����F����f�N�_'����UG*FY/{gCW���K��i�k0,��n�ߒ~#)�Ћ�(��� �	�`;b��u;��O�����s�%sQ�(�#�E�Sӡ�J�#5�D�t.0�Vy�W6m3Ȕɥgi��#�����_v<�`V^<����~��@�DyL�e|��v�Ž*1Ʋ��C����P$7+����v`�8�e�{�P�C�g��kB�ٱ�8B��}('�;��ro��b31���\���.[��|�d�"""N��ܕ����M1�  �$;Hz��!�ܹ�\���6m6�:��CG���1�b7p��=�4I����)u� mr�\oN��M��K�xj�ؙWJ��[ ���9WI	�65��i\�*��~�7��i{ȴ�ӦSNH���0y��+T[,�o���R��l�ڿ`�lJ�L�{+-�o;�q�U.#)�Nw/���g�<��b��K-aˋ
��K�M�nW��o��������9������.���{p�wU
U��Usf׳�ӆ=~��<��s��lѴc�x�y�K�!%�=�ae6������<'�z��/O�⦒a�s�ͤPʭ������rp^I5xt��bIIگJD�d������V^h�"l��j���eN��I|eۭV=��c~�D4K����8�FL�y�ڐ��6`��贘̂�e���\"=��!��:M���MqlN��+�.Us�kw�&�I��p�Z^�NY��:<�K�Fy���.W�A~�����rs0s��&��TPm��ؤ�z,&��PC��fҨ���������5I��2�;�kFz4竂ù�&�ʣ�h��ہ��u��&{`@�R	O�Mt�� i�6��ŘA���;x�V�����28�W�4�N"�g)�<2�q���J��N�/l��������ID~_��J92WUїՙv���]عj��L7EU��}�w �{���Z=��/�F(����Rw
ۋ�ݛ��<�m �Xg���.�Uv��{���R����r�'���|�����o�Ki�p�������Ow)�P@����X>G��-5���52K����/Qͥn�4�I��ͦ����aY�)�|!lf������g���ii�Y�Z�A!󾡅d3y�؄��#F�1�5���t�-Q^%����;�4m���S���*�y?�����=�Pq��~����c�&ql/�Uj�����%ݑY��{F���]tC2H����7���U�F�����ӇU��OF �ឯe��5c�̔�+1ڊ�P����+���u��2��T��s�K������o��u
�Wi����\���%+��hC�sP��A��%T���by)Rm'�v]d�:�s���$���MC=Z�kJ��ƾ��8i+>mrg	��q~韪�p��'���S������������|^����3���u(���z�Q���N��՘�X�a�������(�r���m��g�r��R�a������Q�f�G��>]����7�6����/������4T�|y/�0�f���F�o���8��\W�V���^rD�#f�*�M��=��.ɬG����V���8��= xp7b�rNiɶ��&t�/~��%�"�/�I�K���Z�"�i��k�ٙ�^֪K;�h���Z�}��H	��M�H?ޤ���s~��O<�W}Mv�#E��@���g���jt>�d����$���9�l-��N���Zϐ -�I�� ��=P�+Q�#�+����b�7:É���:�s���n�5�d��T�:���:N/���JǦ;�.�#	�]�M��)u,q��U���<����\�������b0Cj�Z��C���L�yD�]�!MpaX\���t�'_%��lx@1E���������R Z9؎�4�hW�������^y�_'2�n��4d��>�!���)o�"7��Ƥ$�v��1L��';o:$B�Ϸ��W��//�J������(0�8��H��8��w���H�w�翘e�^���S�B�c��N}j����\�	�Xy�-Yz�_��hg��}+�l�$�:����/7|
�% zVH����y���v���E��=�;j�,�1sx�h�U��`��+��mKĸs	Z�xGj2�M�׿R)�L,0��]��&�]U���mXy���z���^�z�9S�5_E������V�~s�{v:��=��m*��U��y��S*o�%��v��f��AK��eH�̟�������5e�����6��ç*�
k��H*��vmA����~���Lˈ��҉ÓSq���:�(%&��� q��L�}'�.W;ϒvm:-Oy�n)0R %]&�2�%ބ;c��(��d��Ҟ�t�]�/��u��,�`�]>w�Q��<�������0���7_a3�O(.�'�хDr�t���s\ޚz�71���۫�ox��	�'Hk>蝭�{��-?R��\ϲ�N�ڗ��i�qѢ���/��k��s�Ek�J#��M����*�����"��\��e��K    _Eoj,���&�'<��Z>̳��e椶��]�yh4��.oWc2��s�!��!���f���V�erL��Q.mP��pXu��r^����neL���GU{W�?��sꭧjc��A�Lq������@�a��B�$P=,l�l6u�A�q�2ͧᴚ�Mz+�@ߞ]����QL�CC�Pd�7듂��e�2'+@=}Ã�1?M9�-��IKz�^A��ޥMw�=����g�E�w/���j�X�x�OG���{'�V@J��̀�ݩ�b�
T�^Tˡ�_sϯd7?�V�1w%��8e�S5s3O����ٝ]X����K���]U�m�o�IѸ�\^�V���	�!����S�����"�Ԟ����kg��:��A���+CK�Ӓ�#	lv�ر�>��P�'B����滃�;Un�{��
J{<���V} �����A��$�SF�f����������Ssp�]��˙�'������O�*&��:��S��y'��sCNx{�f�!u_�h1��))}���U���|�+>=����h�.3W����m���u�Q{�=��+��c>q2I=[������䵶M6F_j-���	m|���*�|�s�Ϙ��ٮI:�l�/v�qA��,#������F��O P�W[�zh~�H�9��+?F�;y�pn�B�s2σ�4l?�	ak)/��#'w/��~m��D����[kF�ݍ�R�e�g���	w��<��}������5l��&�6J��¿�R`���UU���u��f܄|m�:Sj�����+��.d�P����q������yyr�T9J7�yy�	S�4\��>�����֊?{�:~v��K�c՘�:G#ڠ���±L���D.P^hn��8偁�*�a^�8)��/!�Q�Q*��������	l�O��|m=����x{�9�,o���%#ZF�)�.����ڙ���埧"A2˯�S��k�* 鵦�p4���[�GKa��r��FJaqU���Do��GG�����x�r�8�sY�n�94�l����r���b|��,o���J�{`���yE��8YIť�I�rSȉ�nB��F��ݾ�2��]��iA$e"�i''�T_�#K)[5��9rw����0���/�?rD@��u�m���7ԙ3�q��rvY~�R�t�G9�y���]��ˋ9�ȫ��]�Sf��4Ԧ���������
���wc�46�Q�i��w|e�pɪ�3u�!;���܉T�u����Ws�}��w;��̟�S��Nm��R�\���g͢�b�������s��[���_���r~'u�wgaC�o,%Ԟ�f/fآ;���A �[Q�I�Z �����N�p�U��X%��ʱ��g0�sy��]oZ=xi-a�uR_�-x�vL���%�-�kk8����0�&ɱ�zͥ�TvX�Q(��ŗ�����ة�Jmy�[ �3������$��'�x����s������a�:����&O�*�"�u���A9/�؁�J�6�,a]�)҃V�M�1���ɳ�]��O8o1��BhnoK�I��\���� )�\e��`�^K4�x637cs\G�-o��g���w����F�CG��Z��{	��XDXmO-�O�0��g����K��;c��F�j���>6Q�!cl�L��h�>���B0�N@�j�\e��vS���6KvR���������]e�a)AxN�e��_w.%�#7h踼����)ݕ�֫>�9θ����m�������u�v����V�A!�w���Ϝ`�/*;��;���ŬJ��Q��ƾI��}.�j�u�p��~�P�?��<��y/,�vxm]�w
jl�2�ᙝ\�k,����4s�z�;NѬ4�O�R��i�5%ҙt8���#���A�)-�L���P�#�c��tt�Ƨ4���[��'RS~�JN|�ABQ!����R��<��4����߭�F?�O+�u/ؑ��
����d`��|�&�]��JN���;'e���v+�@\�abG��m���DAnzX���+��4Ɣ�ܒ\f&I���S��$1h^���	 �hVo[�ɱII�k�����}}t�w��4f>z��@K������_o:�M��	���8�*�sW��s6;�iQ�/]�{�����o)٬S!
����*>���>plK�Ji<�@-+h�Ն��n��`�nv*�\mS�D�+/��O�9�Lҕg3Ӽ�8/JS�蒗�7rJ�MYH�����~��V	���pPY�{�=��Ŋ?pA�}�W�ư��j�F25�N=�x�E�OP��b�����.7�-�:���P��z�0Ou�u����{0]�bb�b��l�|mA4��d����d��Ky����ޞ��N�:�ɹk�4�*ASWҶd���#��u�)y:o]�	f���[� ��F�sq:��ov�G�RoU?[���������El�����Z�Ϗ���1��yx'���\$�\�T�k�&���ޘ��k%P-�cl�'���\��n�s�W���}[�\1/�lܱr�j#�� W]&[Ŝ�2މ��wgM�ܬ��j)ٲ�ּ�mP�j��3n�DED� ���&
�l���:��ׇ��M�)*��fG����V�t���&"��@iIn�}���@X6U�V�Ɠ?���y%�_$ݾc�f�~��v&۽v���Qh�u���Z��疏��ֹ[�h;���-�eiQ�U�����D��-1�~%x���JpՈ!t���翰!��)f ��D*Щ5��	��˵�m�s�0�j�p�T]���#k�l[�B��UN�����Y*�.�X�9��5�zS	�䍫�G�m���{�(��zN?�G�6���0�Y���b(��xV�.x�t�s�S%�b�LJ��ў�k���נzqS~�V��u���70(<���<2�+Jv�%�Re�aIR�f9ˁ�I��u��RO�����!�R.�Kr,	��~�"�n�a�,�z�$ݠ��r��D������i�]��p�Vb�i��$&��$ܰ����\��	��>����Q�Q�9 U���8�Si%́r�Q�e��%z1q�b�zP�x�����%��a�W�g7��W�r�u�;���7z���nz�8Y�ۻp�^�cv����������"O��j��y�[����b�����`����Zy���R�J�J�]Z�WX�s�R��T��� ������e5?�p1�n�Rk ,6����}>�u�O�y�4�Ь��-gu��hs���IOc��(�-��oJ5�i��x���8��9�x�tz�OC��H���M���jU�ԕ�,Ioި%	ض���q�S�Wh�Tz����� ��ħ-J"�}�d/�W^ ޛ9:s��NY��ѓ�pP���t.D�Q��_A	�(�[W�}<s���jD6;��e��ܨ9�1��,x�����ZmxX9%�RU��OPv�՗ͽ����ዌ)�x��ɧ��"b��IKO��I=�9)vR#�9h���%�b�N�?J ��؅�qzs� 
v̉c9ҜZ��ΐõ��#�4�6#�XE
N�(~$�/�Goע�ƫ�5���׀l�<�&�ݏ�4��8ӷ���	��qF�Z�~b����ڗ��Ks�F�}�)9'�������f��o��Go��o�%���l>+�S�'��Ԇ������&z�y�M�d�y?�f��4[�NYG��Ω���#ejN՛j���b�s o���P3B��rȰC1|d\s��u��1�{f�U�?�B����C��������I��7������u3h�C���%ܖV\�����>%�薒���t
��N�:Xc)Ԙ�nk8�g��u�N�>��ߧߟv�i��|�P�!Kz/lE�ƞ�%�o�Nd���@�*���<�|w�j��w ����}�u�mj�z)�|�z�"Ɯ��. ~(����">$�)���$��.�߿�;6�ν"�#Z�R�K�� ��yȀ�4�0'�A.։�~�F�&�D�'�x�֫����9a7wv#���s��P������>͔�K�yޜl�PҾ�3�F�]�m��s�Ou.Ë�v��L�dMy��2�j�=�R���x��*n7�����H=�T�q�Ϋ���y�ԟ+�    ������
)Eֻ�%p+��z����6X|&CZ�}�ܗ?u����4Ş�y�0ް�����Z�ǰ���EYc�g�\%�<4O>�HN|�I�.���ؿS�l.���R�|����sh�|��fַ�Կg�9,z��D�ȷߍ��kV���Cf��t�[�SW\���>�],1��Mrj��I��Y��{~���$�?��|s��pex��~�Q$���S��:iS0��z�Οba�����s�R0��Gȏ49�}�.���{VR)�w=eQ�FG��ܨI�Vyo�d�ȷ(�czn��oH%��uz%�&Ϻ��ӷ=���L4ٴz���`'>�yO6��I��ֲ!1�����-V`V���YZA�c���F ��oǪ��%�U�q��\�k�6��z�91�O(�}Z[�T@�W�)�ʏ��{������D�?�3����݁5��;��䴊�9ܹ�gj��^����� ��yr"k�x�^�A%��6�|����E�ts&VWS2P��2����z�&�4��J��&�;�93�Ь�_R�����h���,���K����b��Q^:�)��tD����v��"9��w ��cb�w�$�M���h�X�_x	�;�wj,Řg����yx(zzB'S���M�<���g~������Og��}9�9#�fZ FN��ic�˖pU:���K�e(�c���7��2r�a`�
@d&���<��;�v	[O%�g�^���������/IO�R�ŕ����=�v/b�y�γ~nJio3�%�YZk�������K�N������O�����x��E"��8���i4%�:O��I��ͳT>��JS�ŚHc��ԃ<��v�f���7H7U��&~����T���K��s�q|=ZZ�9��_�V�u�mV1�D Me���/�3g��z�]����c׸_��%�st�8����칍Iy�kA8�.���'ՈAn��&&�5W�'�k�N��v���a1�$�sZ��Y��Ɖչ�h��h�H�R��霚�Д��#�z����qG�=2�N M���x�Wy#�̀n����*^�A�b���LIS*�8�5qY��N�f�n�qЊ� �M	�i�>��:��Υ�fι&����䆏�ZcF��w�x�aZySϳ��)�Z�����p�|�4�&�|�>�-�Lj#¾Y�ܕ{%�䋽��P��+Q
��pg��5�<p!�k���@�&gʠ�T:A)��F���Խ[�I�L��h����ؗ��.z�I�S)p�a6ݾ�W��Z�o�lO ��� 6Q�/B�=њL'�{ڞߟ�w�繪���M��]��,ٜ/��I�$�pi=����k4��b�w���&���{���w�1���kN���*H���P\���R�Hn�������L��3��;�\�8��*�i��?���|��R�~Ep�r�ރ�K�ˊpcG�o�n�U�%�I�b���&�����.�%���w	�$�'�_�g��$��A�����  �pEVV^�����.LR��x+*���u�n5'^X�z�} 8�M��4�@Ժ���0��g�g4Z#�ܻ��������Ɂys$��m���zM���8FF�cG�q�Cj�`S��� n�F�,�i	�Y1{J�h����|�ߙ$�߀ԛ��V�M��:��U�����pF�Z.��P�H�V��#��k��\|]����B�g8/�!@R���a+%��μ<��P����5���?P�l����_�Y���݊��$��;	�L[�l���o3H��̽M���,R�Y�b9���3Ʉ��Ե��I�[���l��BH��sv�?}v��g���������Zu䯫���'l)�M�
��ss3RЍ8��Y���#Ǚ��4d"�=ҡ�����TwL��~����yKf�sĆ'8c�*�>Q2�ܷ4����y�E(�!�\^��w���_m&X,��*&Ҷ�ƺY�N���/���m������l�.S�Rs�9�c����wH��o`*��}��U��Z���Jyj���v�A���sG�q��l8g�&?�@]���޶�$���qǜ�h����� 8�D��ě��O9�W��c����r��^��{�7�%���Ou��PY7��㹂���"���}J��+�{���U���t8W��|"��}tev��;�2�z3��fO�Ś�r���'�zHN)�:�����~2��s�6�u����nW(���@*�<��o��D�>Zʂ���X��W%N�Ou�]����B|��&o�ç�Wj:S�0�1g�!�ݮ���o[ך�����8�f_l�G@d[� �\�$ڲ�/�xڐ��ev8�ܯ�����>�x��x�y�k
� �m82�%otʝ��BF(�r���7!����TN'm���:+Q~=���7i7f&ǋ4� ���r��ŵK�L����\]��*o���*՘�(�r��r�:nG�(��h3E�|�	��������ki�DO��\<�y)=�o.��ǚu�* ������}u>�B��$�Lr��Qf�#-s59�M��1�&y�G����zD��^:��]j> ��)��%E!z�ms+��X�Vsdȩt�7��c.������� �%@�Z�e�]�m�����r%a�w)k�¸�"6��	�Wh�;dIm����@�.�'g5��ba�Ω�!zçi�Yσ��중�D/�KW#_QRW}*8�uok�5��r�l�����+z�y>�(��ۓ�yZW���<�-�;1]��(NG~[�x�	��*�RP�=�t=�4�"��yr\�Υ���sk���/M���	�24��� �|-	2(3������@������ a%q%H	���9֧�m���o���!�Sd�?	�mRv������xӝ�'rP(��R�����&o�+����Z��Ic��_�XN�|O�
�ѭ��PيS2�}~l
��y�h����Iiras�tb���L2뽼��W8-�˒�]"�ܤ󙊾���IgrPr�����K^J}����0��u&l��j`D��cJ�_9��/�t�6$�\�|�Y7H~���r"���{I���5�]�ݠ���{�*[	�NV��(?rӘ��H��Y��Rx������N�b�u��XɻS��(��������%�&��ú3�yO����7��;�֤[�:�0�i�r�W�0� n�70��K
�'�'S��Ƌ����&>w���i&�R�����GX�~�z�U� 3Ϧ�tz�BI����K�R�\Y29��2	K��I\�/y�͇>8Yo	ʹ��{��6zE��)Tj=s37mbe�Š����a� _�Z�;�K�KuP��w7����5O-@�wZ>�eZ��W��`<$��-I�^2eN؜{7<)*ۇ'˩YY����I��ZRK����˵���Q�gvc~J lcUm��j��ۂ��n���7]����ɺ2�@��P�^u���/9���E�7m�V�J��ϫDvFג d~`)����k$D�oO��6���h�'����s�H#r��i䙑�&y,`of��,�[�k���f�R���ʑ)�P���VN��k��1��)�#�˒I��'D�%���nU��Fy�7�g�k��(��T*�d�o���FC){$q�L@�+Y�S�n�q��TJds>+��y���O[W���¦�SKr�B�Z^v�^Hnrb�eGF��gU +E�����7�������N�d�v�T?�gb���Wj��vOJ�r� ER>8+c҈���Q��|Z)IR�H��7�)E��#������sN�����]��`l��k����J�� ^%=��k0ꖪ�ؔ,%>Z���ۍ�U���-��՛)��ږ'�6]$Li�|I=s*6gS_y5�	zN�M��冣��I�������y�~s�'C�k;��2g���`� �5����g6�\��Y�5��vt �μH8H��૛[G��o��k-)A�}��Z�-��$�����Ȓ��+[�OL����"�5J"���ͤ��rB-�ރ��U �`I�������ρu.�'����]����H�����U#@/�&B�Ffx����MgN��λ�Y̫3i|(���6���a�:���SԴ    4K-K�.��P&gsi&�H�;���'*�l�����]W�8�۵��as�#�F��Uw*���_���$+{� / �/M�7G�/ۘ�T�|]S�_[:��)�y"�f���/O'�f���z]��ڻ�����U/e]^lb��~u r�&x�=�F���q�_]�F�/�,�y����:�W��c�3�{��<��fk�g5��DϜ�`�;e�g/[sƻ�b�x�O1��V�m��d{7�'.���Ԓ���g�e�c���ﮅ��v�8Uq�5!>Uu���;�m��2�y�a9��@�Q�5��S��%�\�79#|_��ܙy�8�2�:�R�]�^�K&%�-zl��*�J"�c�h��W���r���H������"W̝�<0���W>�j5bC� A���Ϲ�KM����(��d�_c7>K�p��N�њ��g=��T��P�N��+]�ǖ�j��{r�WI�v�e��l#���0w_Jm��-��[q�FV6I���C/B:�a�;o�gr:X|hAu�2�Lq�@��DO�����`O����
��M�{��^���7g��}��|9s�͍�'�Wv�������i) �0п�Wc��M����X�n�c!��X���㾃ާ ���"e+����! ���=���sd&s��6Y+�Q�6V^$�R����s�S�F��N�U�;����U&��E�n��@xROY��t�N�k���\l2,�� �0�l����Q��keJK��>ڿT 4oJ�`��,�<tZ�ʃ�u/��K�(��n�dmԣ�M�[I�S�J�u�v���՛�D�%B&b%�>��\f6��s<C��(� �I�%W�*��$ӿ�Դ}��(5�즥`��LB�e�N�Q����[�"\�ai*�NB�ڳ���-�48f�������?��5���F7�O��ZF�y����#
z�se�".j��=�K��%|9��S�*��#�>�Zi�Ei6Y��(���T��ef�~f$��`0�q��B�RSu�u��JI�s}�[���5���.㯻|��`��%Y9yص�3�j�y��
���p 崒���B��"��lO�e+a�9EfKF��>�*�?�.�:��
���6�^�0J���KMiPU�T���ZƬ�����j���[��V�v�hZӈ�*�+drT��r"�de�Ĝ��'�I=氿�6���i!:(h��J� |�2�/��\<F�x���Yx5Ȓ��y��?OR����`X4'+﵉D���x��0�4X~��W3c�}�sR{~�Ӽ��uu7�p��[�y�b�0xf�QruD!���<'1����Qq�@��W�,���x���hQ��ќ^4��P�ZCg�ܲm���i��w\S塷H�h8����ZiE�������O+/j{�R�*I<��,0U�� �}5�1�U��J��:|5@���� B����u���O����nd�U�s�"N^�4�.̩��T��dz��O���~y��'Ɯq,ǒfz�"�(>��c2��2;��Ȥ��@� M�f{��LL�e�Ip�;��I6�����s9+���� �!���b��𬩁��<_�Z��ټQm|J(�w؞Z�>��I�����wY��-. ^/�RS3�tD���GhH"詴o�e�ej�s�5�NG���̡%��H���d�=�(����s�΅����*8�K�ZXj%�L�!������ZTME�,�Gޛd�L���F։�׶"� ?�����<Ĭk�ȐbyV9��KP�o��G�o�%�9��K7I��HE��e�d�.?�������������U�Թ��!C��NS�9�r�Z'��S���� Oۼ#ǖ���K˓�/Nd�8;�m2"�i�"��:��[�:�6�v����/�'�4�~��j/;ȡ��yc:5#������u&���c-H���e@�s
Z�rr����Mw90�ɚ}�Pݫk���l�A-jg��� �Tu����)�����Ǽ���}SBx�7�b~�Hv�T�g���~��:�a�����q_�����Gcz�������UY������R�	����L��>�H$�����X�媦A��OBYN\�TG�oIQ���t����u��C����܌��ꋽ��O�j��C��^��g��rk�Йh�k�k�X��]Nܹ��C�r	�J)"�Y������SmS�ͽv _�9mjK��	��
 ?��ދS5�2v
���Cn#喢cM�|W/+� ܢE�F
Zu�] 0���q�V+u�"(�~y�V\"cĳ�"�[n��;�D�[�	_�����MzH�h7�-��T��a���#q&�1�v/қ79��yRB_{)�<%��Ǡ��龳\���C�cؾջo���x*�;H���a�L�m*�-�l�|{��rb�5���^ҩ��'��j@�G
:�rr���Cj�I٬�O��9�cjxF�Ĭpq����X�Y��r��2hⴸ�I9Y�s�����xŞ�-	*��Q"(:r��'�����A�������u{�=�Ƒ���ND*٤ے�NXg�0�O(g�Gş�bq!^9oDI�s���ͪ��9��f?���2}n�7��(��zP�uC�Bs�m��%��(��TM0�vL��wPL�['�}l��KWn>�O4�>]�C����º'1�1?�R1���Q���,"�[��N�rO���̖  �6�է�����Ç�G�1��N1��U[����g�* �r��s[���Jod�ڗw��Ϣ�����TM�w�v��*L$�;�sB�k�ʹN �|2IشF�֗��X�$'1`��OQ�{,嶱w���i��%ُ�t��Y������?WB��;{ؑO�&��;e�/[D�@��Y]�� d��N�Ds�D�� a��x�w��dTw[�Ih�Q{�{�n�i&�X�Ձʅ��\�yU��x�h�*_Pk�{*��R��F����Us=��g�r�B0%�|��Ԇ��I���'@C�|�v��<�Z�b����yc���u`@V�u�� ���|4���.�F��mb��y�߷�Ey�M�7�m$�㙸p'q~,��mP����;��X�?�-�{��j��w7v(/Vn��]K��s@اM.�2&�͹8�5+�A���/��������	{J��x/�
��z&��CQʷ���|S|~�U�=������=է,����a��A3������f��ʥQS��w��Y��3bS̺�I���{%��V ޒ��6�32�&��Cp�%�8KՖ��;�F�$ݔ�Α��i(��>N}ޓ?��	��&�F�LxD��V�ڔL� -�jOI���^y�ˑ� \h	�ȓ�p*����a�Sw�TԭJd>n��g��M����)s�&��oy��؉��\�yd-�A9�����Ω6觗Ah�|l�?�=�F���mOS�;�ZO �}&./���X�t�>r %���a�zR��ԞپEJ�|:d��T$���Z�0�j�;h�^{%Č�7 ����ޯ"fB
��#7�f�r_��q=|~��L(o��	�/�(0mt���ef��(oH�:R�L7ٮ�9��ˉ�3�44�5أ(Ay�F'���v~-�O�?�UH�y�T1�a�)I�V���**%���,e�Z��i�/%��hp��*����%#Ҫ��K��9��,Jm)O�Z�eY:n�F���o�j ��uQ7vsl�>�R��$��sP^����۷���=x���=���}�����ԕC�Kb_��Ε;�\�>;ӄ�/�-?;�j�jơ9�y%�1jW���~��<W��V˵rI^^VU��}�aM_t_��y]�����G	-5S�"���9�F���<� ��0��M���HRl��3��9O�`W�����HS�T����7���a��s-V`>m�Ԝ#Y�h��[a�Ge�S>m�.<�V��/��ۏ���	X�,���y!�|O���d>���0�
L��4o���L�;0��F_�^�h갽6�d��V����#��",$����bU�E%ymԃ��	�q*M�B�E��v�K�U���������:$�S���HpWix��Jj�>M��SnK�9X�4�o�#    ��?���9@�w���������p R��E���]H���{ ���e(���94_�7Z��d�3�@�W���s��-_��nN��q�;�4��:ļ9��^3�s�����E7�B��h'<LC�V)aG��ᇭӤ����]D,�[�NoMmJ�-O&���xg�< ;E�h5.!��+�{�#&��f�Y�����4�,=��_}��n�1TǞ,�^�T�5��+o�J[Fa�6,�[�'�R�2�	�ս�p�^�E����"nLk-��Idɟ�L�g��m/B?���k�M�$��LFv���rZ���U�s囔29�$/��R��^U�[ �1O��S�?Kd7؛���&m��9CnS"���u���ܿ��O>�����LK�|7ȥ*$d���-%�xi��o���|��l��'�m��Vӯ�"�]/tčd�cr�L̛r�a?�� �߬��	�kQp�#g!��1�I+E>����V�2Ţ�;�%��x�T��D ����,4P�T����E�#YU�E��)C�e������0�r�}�U �h����ؓ4�V�5(��tcj�~S�$A�\&��+f>/304�Xp��9�IS%2;o�\_�L�ّ�O���v�:���õ I�@M�|���1�ɇ�O~I���Y$-���S�f��P�Z��r� +�M� ��ր�"ٌVP���l����@��W�o[��]���*���A-�Δ��Y�F\�7ғ�r4��r�h5)C�jF�s���gc�me��^Օ��\�l��>���0Ħ�<S��k�ܛ���ӹ��LJ���-��aL��cK���!ҿ�-�X<���W��;��j3��,n���P;�K�Utrj"�4�=��z�}��u����?�n���v'R8����Z	V�c�(��p���Zf���ڼ��mRQ�?߭$�)�:��o����+Ѥαb������'��$�N��UxA._���T�'R�����8����椶��b����w{�IE�L+��C��i�������k@�w<�}nF�k19�lV�-a0��ẺT��
�X{�AӉTOOCMi���OW3�ע�����<M�����g�gw#�V��W� ��+8��̓�Q�~2�ƙ�O�^[^I�v��a��|R��{i��m�[���l�������4��t���~w�1��Įz���/v=���z�$�R�EvHuq�
6
~<So"�S*��Q�T�o�{�uc� n����O$JG7�sEE�����vnE�������8�'=ܩ�o�m��/p}(۫�7�F��޹
$�S},}R7�+BZ:Р�W��G	� %��B����g!��5*��A%�D)'5�<w*	��֬��Z�ݠ���ExY��U���c!�t݈2ePEJ����> �@P��>���JW�"i ���\]٪��b΅ȷ< ޑ^�x�����,����:2���w'W��&�����޵�ۊ��;�Q�Z>[�U%䳄�Y�vR�����A�畜����/sA�Ro�O�oh�S#�SS����oi�m��K��Lx��Y��G�Q��$V,�Q��N���{�]����o��R�]�ɝ�D�/g�f�Zh�5�~�.�ܽ�� ���e|5`^.�貥B�h���_���u�ɝs�b�E.,�IL� �s�-_���r��\�|�m�n��j��v'�Ć^��rֵ�c3s[���[*}�6I�'���h�%9	f�`E(.z��;A�4h��i�Vi��>���]jӷ�+5$q�9P�]�)hʏ�6�R��P<%}|���;�~�(;��`c
��/�6��I���Rm����i�v�������,�b�]�Ó��̟D��Ԥ<�m�j2$�_y�)ƞb��@2��!�wi�BW������d`6̏�y��=O�G��<c��2s�]�99�.;?���u$��s�Y�'_���5����1��~��]A��l�+�����XǱ���q0�<�m��K�w-�ʪ�����sP�h�nt��#���w�������H�����.��#����L�"i	�8��7���j��ëv`�Z��H70��a,r�6����{n��h��.㶯�kj��6��Z��q�c5Bv�զ{q�ԄSc�����n�j���oa�L�׹�f���'�Ym��AO
���-�����8�?���ֽTW�r�TlCA�d�@3o��m� �N�J��]z�<2͞��/��Q�ɘ���ƈ�t��_+|L�_�M��	s?	BC�5[r �FAn㦖���?yu��9�e�	�)���C{Ǚ�<m'7��4�X�՞D�܂�N��Xz�i������g��:��>���7����@�{.u�>��-���%<���EQg�nu����z5Q�ˆ0Ϫ%:����m����}OX?˯���&)sbJ�S����i��B���?�zv�T�{M���o���|��m�ה&p�ϙJ<1@�}�o=�Ɔ�fs�mZ�:N�,19�Ƃ�R��G2�$�.�>q�o�[���,GY1��[?�)���b)��&�.|ޙ!��.~�Ks�hWs#T�lZh��rk����ج��ήM��p�p���=��DQr�M�y�i[�{�e�j�<�7�x�y�,���t�2;0�˟��% Siˑ�կ��L�����	Gy�#gD��4xH>���ȩi�0���ٍ���6��aU��bqkN�̽����OC$x%U�s��m9o��CH
�Ƥ�L�?���_M�&h"�Y|���xA�0_�����m��Mh�fY�'c��$`s�88Y�a0�5�b+5]�}�t���}��ҒR���@��K�����o�s��B��䲩�[_�'؃?��)Z�$��B&�;��$u�zȋd�:wpW5g�p���g�i&��xN6�'Q¥�g�Ѵe+@��V���V�:����K�L�+w���)�>D�y��;^A�<�l�B(�)�ti�7�ߨ�3ǀ�ב�l@��5v�)�^;׮w3�șK�����lb�<�h;���U��Mnk{E�5���{��wQ��=ɥ�K�w�!ܦF�(/L��:��W5� 7'
k-4�k-%*C�X�o8�����d��;j��jN�N��{K�(��A!�̄&/G~���%�l���IH>���5	#����s�ov�d��*=EA������vuEcKRJ���������F��s��ۜ7�7+����=nl�q��b��/��e|f�����,mP��`R�m�@�	-^��v�d� ���
A�F��Hdy�e��=�`zg�s/�Cym���0�?�k�8m&4i�ڠ	
=n}��.[�ۀ�g�ԏ�J��k�(�8�V�̵�N	v�	ϫ»����Z_j,M=�� �/�{��O��N]�-m��������d�Yu�<��J��������^Z<��|Y3�GP��װ3�i�z�&��w��L�̝v[櫕��Y�{��?`׳
k(�  �8���T24J�bx�RA�����<,�?`Q&VP�-O>��&�am��Ns����i>Wo#ە�v�s7-�깕���L*YΝ��{Es��6���g�aj�^M�p�VC�w�i�=�n��}��ʔ�RDzs��0�wP��	�p�l�ve����Rq�8g��Ľ��!�_����}�B�)�'ks��Wą{'EI������k�'�ǿ��s������0�+��J��~>+R�*$ze߽c�wE�^���m���
��V>X�\�]����1�����j�G�x[�ɷ��2����a�\��f-����o+���W�2�n�}$��3�!���*{7�4i6N,�8�h��/�V�`��.���s�w���e��"���燁���Nk�Xzڵ�g*m	�C#Q��i� )�u�Ѥ:z��^���������W�x b�3����ЫM���V�2{V��o=����R�p�"#������|�R�`��IX�f�S��(;���}��r�H��]�~|M�w�qЮ�X��U��%���/9f�#��^�Ŗ*��E��K�Ȯ*e�[�]y��Ӥ����J�� �  ��wT#���yF�%9�We�G��M���M���	��"�Y��r25X.�����K��<�7��7�Do��`qqIy&����]hE�gj�$:���z�V�3P�a�@}�P3��Z�l��<�XH5NM���f���Դ2I�|Z�p�k5��âkaއ,Cq�������5M�S������L�/���{�Q׾������/S���J��J!�ؖ��S�t�R��a-%�Ӕ�������bM�������%�݁�Ƒ�?h��W'�,�>�E�Li�s�|�ۏ ����i�~J����|ec���"|�*�����Zb�)���jz���?��O�M���"-�cz���1O��n�9�_����j#[Gp��Z�T�L,qj��آ`�,C)Z%\'�U�L�h�O]�:?�
�{������6���\�k%��P/�;rD���Li!�~nJ����o�C~��݌�AW�n[�_:��NئB���5��9$�����)�lO�~�Nj�����i�9�o]���o�%�b�Pe"�᭚���?��\�a��b��*���~���cL

4�\$�����kے~�C=��Ћ\���HU7|��b,��'��8��7I��#���~�����vrv�Nt>g�1s�x�i��M4���cysK�=���5�����
��I�����_�������@{�w}�	U��C)+��/��y�۷M��d�s���sZg��o��K�t���3%�,t�O���ǴiH��tnK�2VwNb���*9Rb�gVΔRF%��S1(3��&�t����'���'e�2�R��a\ڷҫ�.�vi���.����R*���'��$��	��΁~���_�o��	,��Io���Eb���?C�@��$П�c���BF��o~)N�9ߨt�7]Ç�8��E'z%9�WE�|�7��~j"n��p�A����H�l?���YsK9�_d\ĕaO�H�['�э�tW4�6��ouq�^�R=/v�8����T�t傒�y���WE���A����&��ȁ��ѯ������Rr��l.X�϶�h+M;,e� ����I�&ЧZ�bd��z9��ȋX��??��$ ���J�-�b�]�9/�N����c!��x���O���U.*容�x�I~�2��E���4�e������zu���-U���'��������L��4Ӯ��-'䖧���UxF���-����-?r2�~@S?'�J\^Dݵ�;3w�sֺ�d���`��a���+!������<�9��l��A3W�Ƒ�}Ķ&����M�f#k/���tb���=���s�A��Q:�Π��0�K��x����$^-����[�6�3[,�?1�HN�+��ꤲ��]N��I����t�*����FB��.þϾ�"'�o;3-�B�#��[9��*���,��!dSp�[~?��k��38��BYv�qx`���w���iH�^���02��	�Δ=| fہӘ"cټ��4ڒ�
ZY<&ݯ�?H��B�5�������~݇<ә�Ȳ4gv.q�F�i�8���1.p���-��ꭝ�G�*I#���ݖr���=�=jM����j�)��A+)m�7&��9�~�����y�O�x�t��Og�z��/)��0[��M�)Y�eh��T0Zz��h��}�7����`�&��
<i��;�> YÙ/��d��ć�q�����',����_�d��z]xb��IS]c�Y��L2�5
[��b�ݞT��֩�Ga�-�\V��G+��:���T��'�ŧ��QQ�⡟�n=u׏|��gG��`��R��.?�y�h�%�]�����{{@:T�;^V���pQr�OU���2����!��ѐ&����y�yΊ�Y%��ޝi�T�k����	�Z�w�X~�!E������!:���aĢ�_�����������]HN�7�)�D&�g��4V�[ꅇ��%و��������y�;��_<�����g�G�<���{64��
$T��+�����3���6�ϲ��?·�m��e�y����O�$��v��_����u�_֑~|SRB��Q�~����Ry(����%P�w�:����_�(y����7���qϻޓvzj���#G+׉߫n����b�-��Ã	0X����W}�%��>�Uu1���v}�)��~��X�T�禡��}�R-mo���}gC�g}���d��sb���}�{.χ��o����Kf���~�)��y��m��	�>��w��w�� D�s�-��#`q���ܗ'���8~$X�����|��>
�Kǈ��MUI�ݺ�#��?�jM�p|��AQ�x�Sk~�fs՘%����n��HUa�o�T�\�V��@[��v��w�"�eܧ��'��I��DU�<�~������Y��H�_��8��d��o׽����mغ��W���?���1O���(���c8~\�mU���?5�,c����a����7��+�G��$����2A��%2����"���X�����v�Jb���P>+�@;����A��V��YS��Ԃ�g48�5��Q���{Js͓���{ĝ�:���d����$n'p��p�G�?�qۧ�#�_��6�f{��r`iH��2|1�:c��kno�̿�ׁe��ޯs��~�L�����'��rR��t��Fi�S��~}�~��D(⻭~A,4�m�����?Q-dݷ^������o ��X��+�A��i�z�C��g���g���{�C��[H��jS��[v,��e&t�������t�~4-��$�R� �<ݯF���~ꋸ�������k����ǒݏ\����d��,q����7sq~[�?��F���i�.��o������A�U��z�,����S���~��������%�f0���v����ݖo[>�|6����v�)j��z�)J�\��	{��#f�*�h�}�|��a�mk��13���;ߩ����Ěu�3wg�Ȼ�Ww ����'M��r��6�y��d��{
�`���d�TF5RN��ѷ-��\3��� c���:����+��c�X
ſO��y<�J�^'�@r���g�\�����Ҽ��ؿ*�/4���'?,M_�5��߆-�o2����Y���.!�H��ԅ���ޣ�_h�G���?��9M���#�A�m��*&I����`�Taq��_����.����F��o�Ha^���3a9���A��G�bJ~�}�on6:�����_��ؒ�=�A�5 �'��蔁 ��F���1��ۖH;��nۑ�#%��O&^�i%��@���X	c~[0���{�߻g����=	�#:Q.���CW(YMF^��mu�?���=��k�PT���f�*��J_��El6��7��+s����7���h����?=f���7��y��N�@�Z2���>~��^���%��]SA�,��r���gm�,-j��^/Sݟ�s:z8����ٟq뷎�p�u�|���Ԡ ��N��.j`9����������~�p� x+��l���~�?w�6kl��T��f̼�O�9/����k^�}?+�&�h��k�9G��f�0������R�,Ϟ�}_C��I
������͎Q����7w�J��I8���޽e��k2�Ԟ���|�V���F�>�i��?Ʊݪ������fn�ւ�`��Ϥ���D�{��+�B�m�O�µm��u��p%�%C�vd�ps@j�O}`�v���z��l�Xf������<�q��2�����mt���X�g*�mD����.��&��W�В��\���4�5ˠY:�����X9$������N�E��Q��%��)��q�;���R=��n��#���x���!����=ɻ����rT��<�U�y,�̲�W��Z3�	j���GJ$|Y�=��krN����(��tŒA�d�mgu��oZ�v��e"��?����|����\������o��_��� #��4      �      x������ � �      �   O  x�mR�r� <���H���c�=�Bm�0��E�N��ŏ����V�Vgj�c�kt1�A0��MFCd��":�4�qa�뽋�,�'�} #\���3{[���hb�3vٰ�-����H����܀�
q�2�9�@��00��[QQ�^E�>[�b>B�ǂ�~HY���jf�+�w2��%N�D~) �4�f���6��6�~^��0�WoI��J����h�!w�#-��u-m}��Z��r�{2�m� � ���D���X�{O?i�^ �*���M&�6�ZZ��������K��zղr������|r=���@�޷�����+�|���       �   �  x���ώ�0���)�A3��On=��c%�"^b	05f�y��K��.�� �>�����ko� P����� !g`g? /�.�(�x~"E�`���(�HJV����(!K��M	Z��`��Ku�RP��w���F77���%��b"�X�����H�O��չ6��w�M�ލ�vJ_��eB�'�z"bL�&X7��N���9�D�(B9������b�*�Q���.JH�h���6�(���h|o�)Ք ���3C��cɊ�|�peUk��bzm�CLM���C������m�9���NO!ٷ�ls��v��y������_g�*i;��+�/����^up~�`�w^�f�t���KAA��#[qb�η���4Ey���$���K(�u�(J|�T��<����8����j�"�F�>��c��Z��Toֿx���S��`1�e׃�K����)O��??L�6      �   U  x���r�0  �s���@����XDc��6�q0(�� �|}��ӻ,����ZDd��'	���8|�ϻѿ��n�d�	��l�����ڏ߅�#s�I><�l�Y?R�mveH�����K��V�JV$*������Iv��{�� �V�D�j�ⶁx�E�q��աYD7O%K��y�@��{���W4�`}osGsC�`Ma:��'~��w�Tk>E`n�Ž��̕us��hxI��
�w;���ƒ�󣶮��Sx���r)��3�+�u3X��t@n��F���7} z'3H�M�.7�S0�`_" �|C��&������o>�����{      {     x���oO�H�_��/k�{�WpW
��H�t�x�4��ı���r����&��ZPNA@��d��g�J$��|�l7U��0�L�1p�|XmL^D_��$�3JfTA�!�����Ɠ�����W�(�%����vi������m�1++fu��=�+0�M^#�ψ��䘐���'arF��ЈB�Z|U{������>�r�-�`�3Q�tFc�H���8��bm���'������o$Ӹ�(�b�l�ɘ#��dW&��,�J����V3�f�a����(�ϔ�ڔ_�ʛ�ዩי) �\��J��%��T� *	�pG��4�y��ܛ��7�ps?FKfD�uh�q�vd�,����  �:|#K���LB<�vP	4�va�>5xo�2w�O�#�(�e�J0�D�*��ѿ�}����	��cYE��'I��Dt$��I���5\c�<8��:П����#{��XX�eB^�"R�"M�Q���C�{��<�ֶp���&���1���1T�XH*�����j�
&�2�DM2<�rLl�4�ֶɰ�����~^h�R���\���:� R)����I"թVY_p�#�Âî) ?�����H�k�I�I���wG�	�g)qj ~���צ�A�9<��~�n�AT��"�a��t�#�Umgw��KS��5k8�0ſ�v��u��"�DO��Ɗy_�ĥL�Uee��O���[�����I�5B�AE�y��8���\oK�_p֙�4Y�*(���	����Ee0&�	O��'Q��
80��df�2_"�Eu���ц�tg&&�X�Áa�p��L���`�$a�U��Op��w�T%d������͆�F"2�� ��l�܎�Osgq�5��?K�
d��[9��c��(��d� O�&`Gve����6�"���(a�/G�Rጜx0o2z��ʑ[�m�k�nJ�&��K�&h���(�s9��z���Zo��B[m���݅;�:�4��� ���M�E���նX���
�(W�BI:O�u�<�s��R��V�˗-�nF{��I�R16��Q��r�"�7Tۦ��Nr{׍g�zq���pۂE"��Q��r�����_�]tf�����U�`\,�:b!p\̙U~_�k[c�V�ίC`Ꝕ#�v��#�Bu�k��r����(K|��,G�~�[|��"_.CY{��w��G<��L ��9���6�l���ej[��G�uY�^��-;SA���x0~t� 3�9         L   x�32�����LI��J-(M��LVprb�@(1%73�����X��T��R��������D���D�������+F��� �}�      }   :   x�%ƹ�0�X[�qGB_/��D�9T�k��-���Nv��.�]���ʄ���>� �      �   ]  x�UR�N�0<���_��}EpC	q���F�)�x�=��s�����A�XF0F�&p�̠;�X��t��D��_��X�G,���vk&��G� +�d�Y�#�����`쭌��e�V����8s=�.m6��+�p����<қA?}��~9^�c9�ce3��峿N3k��9��W�V��N��HwY*K(3ɒ���$�-��x��t�Pl���������j#���=���q���⪒��W%u��2%ݺX1��ۺ")�u��[+�u%Rb�b%�.R��矏i>љ蓺����5̷q����u���������B;�%S���)���;���K�w      �   3   x�3�/�,)I��,�LL����4202�50�54��2��u$Je� a��      �     x���ώ�0���S����$>V�P���؋	�Mb�V�}��%Ɋ[<���72���X1Laq0^��թ�nA��1$��OS��7�)0���Զ��N���"�T	TB��S�=	P$4U�+�$M/�0	�Ho<�yskly��޽G01N�J0�"�S�5�Y+��`��NV�5Mi��O�ES�ƀ�"i�8���GA�/`�BK�������h��M���/*�)�-�-<
.bB~��R��v�����͹b�dGя�K�%��u�YW���ʍ!p]��)&p�6T�+�D�L/.I.�=S�v��
�x�`]%3��]s����X]A�l8q�s�8%�Lݓ�s�B�_�N���u~t�S��{�����~)ƭ�J�鸕GAg���{!�m�]k�_[����\���C�����ѡ?�Y��b�I�fa@����\�&xWU��ί�c�s�T�����\Ǿ��<����p\l�(Gɏ��d�q���3��!��\�?�p"�%��<r�dB�b���}�"�A�����d�z��n      �   T   x�-���0�e���1Iw��s����L^�t�(0��(pw�:h�^=m�S7�P�����8w��n!j6z�j�Q��� >���      �   S   x�-���0�w\�N�^�ֆ�H��H�=\a�7�>��c�&��մ��4	/L�iJ�w���]��w�6���|3{{�      �   {  x�5���0��g1q�^�#���C	�Ǿ�ӛ?U�k`�G���$�O����Ē���4ٽ�7�d�,q,�����@'U�K��rڒI�d�W�Ȕ�GS���H)�G�ifRL3�
2�.��T�%UdJ5�{�l��VR��4i�I�5�i}�p,�+]dJ7��!G�%�7�{��#���2LC�l���"1m�C^�s肕N����z�V��3]�|�3m�q�#����FU����N#W�F������9��ht��r���٘�=����6����i���w��ȵ��ߊFg��͵�����������>������n����UOz��;M���>qh<K���Ѹ3�F��g|���ݞ����N�����:������l�g      �   P   x�-��� C�3�"!1�K���N��r>�wxax����>r�W^�ѻI'ݻ�����%���-{(�=���a���1��      �      x������ � �      �      x������ � �      �     x�u��R�0���y�dv7l��W��662�� �
��C�8�6��~�%
�B<�c����uSF_��<�s�w1��T�F��e����5�B9Îrm�LA�]��@g�,��SY}^v�Ǻ�Z�~�4w���h���Ys�O3/ �40�9�6v�$_~�X7KA��x������6����&�^C�5�X�f{�G�`@HW�J�Π�T��Fa"0��o���@�s}hw��-���P.ɸ���D�d���$I~�M��      �   !  x����N�@���}63�`���S/&M<yA�.�Tӷ�E�.4���v�1g��C�ۢi���eM� e(|S} #�uJv��:��T�bv;@h���F�޿��[9Da�g�i`�-l��S(v~�׵#%�y~��O����P.Mm�08��4@���pW캷qd����P*�ŧ�����«h�˼�Vd�.�c��zW���h׃0V�t�kt\�2¦����8�lD;}jS���8�F4l��_�٬�8)�mRl#"�qs��Wv�bٯ�V��� �LE�$?�{�      �   �   x����n1E��W��<{mw)�h#�4��%�]��q�B�%%�Ϲ�^�`�`��y����[n�<|鷲.:��o�g�g�e����=w@�xd��X#'
ɱib|R���]���X�e�%%�dI�qt��y�'�z��"}rb|p�Ex ����Ј�&��`Q|h��g|��tu	���ݍ��B���
3H$X�8L�b�R�2Q��      �   O  x���Kn�0���)|� �_/S��Ԥ�K]u�����H���z��6�E�j@0���l��m㊬�mzGکn��7��p���ָ�4�h���XY�lK�}�B��#Ee��P.i
�;���e|A�S�R3�\ĸL�R)�e��Ae�碶�����z?����8��P��:��sS����B� "z�4�c%fЦԣap�ڦ$��6��a��́�t��������O���1e�S�a�^���m=y;�G��o�Wor�1�����D�9��өpq�r��.X�|��uy �rX� #�4O4��R�t=�Q� ��b      �   �   x�m�K!C���T��.��9jڪH5b1ON��_�ƥ�O.U�ܰ;�@IZ?���+LnxA�[������8+�-HRal����+ㄬ�vB�f�e��X�n������-�<k���B�`{���V��_�Q�ǩ5��3؂^���?	�K�+p j�	��S�QR��p"�@:��i�hR��եN�2�*/#�Zc_�z6|�����qm      �   �   x�u�]� ���a���p���s�J[%��''`Cհ:�����0U�%�m�q�F���H�&ʨ�U��I�E��GJҹ��ט�~5�������N�Eׯ���z\��x��Қ��c�5W�ܸ�vu�n����(�M�னdR�<$7�B⠮aNWمB�D�N���������.D�#ل2�٘�S�fq�OIn�N~�&ʍC�̓�R�b[�?���$M��m�~��Py�
      �   }   x�]��D1C�q1#�,�L�u�H��l�P}4R%�m#Y�J�~�E�3�l�y|#"4���������P�5ǠV\*Ч�&ԫF��tT��K��QQN��*�ׅ|�%s���23�      �   B   x�3�,�4�44 aNCCC.s��\�M����"��!T����MȀ˂3,b�	Q���� Y]<      �   w   x�U̱� ���ܧ�.�P������Q,F
���)�E��|9��qv��`!���ч��Y�͂��������/!F�$�����s����~ʹ��
��MӇ�RU]U���SCDk&�      �   >   x�34�LL�/-�� �eh�$PPX�eh�$�����eh��+�K�LI�22AR������� w�     