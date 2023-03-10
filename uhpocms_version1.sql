PGDMP     %         
            {            uhpoc    14.6    14.6 ?   ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    28492    uhpoc    DATABASE     a   CREATE DATABASE uhpoc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE uhpoc;
                postgres    false            ?            1259    28493    Admin_department    TABLE     3  CREATE TABLE public."Admin_department" (
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
       public         heap    postgres    false            ?            1259    28498 !   Admin_department_DepartmentId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Admin_department_DepartmentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."Admin_department_DepartmentId_seq";
       public          postgres    false    209            ?           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Admin_department_DepartmentId_seq" OWNED BY public."Admin_department"."DepartmentId";
          public          postgres    false    210            ?            1259    28499    Admin_institution    TABLE     9  CREATE TABLE public."Admin_institution" (
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
       public         heap    postgres    false            ?            1259    28504 #   Admin_institution_InstitutionId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Admin_institution_InstitutionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Admin_institution_InstitutionId_seq";
       public          postgres    false    211            ?           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Admin_institution_InstitutionId_seq" OWNED BY public."Admin_institution"."InstitutionId";
          public          postgres    false    212            ?            1259    28505    Admin_userinstitutionmap    TABLE     5  CREATE TABLE public."Admin_userinstitutionmap" (
    "isActive" boolean,
    "Id" integer NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL,
    "InstitutionId_id" integer NOT NULL
);
 .   DROP TABLE public."Admin_userinstitutionmap";
       public         heap    postgres    false            ?            1259    28510    Admin_userinstitutionmap_Id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Admin_userinstitutionmap_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Admin_userinstitutionmap_Id_seq";
       public          postgres    false    213            ?           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Admin_userinstitutionmap_Id_seq" OWNED BY public."Admin_userinstitutionmap"."Id";
          public          postgres    false    214            ?            1259    28511    instituteadmin_profile    TABLE     y  CREATE TABLE public.instituteadmin_profile (
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
       public         heap    postgres    false            ?            1259    28516    InstituteAdmin_profile_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    215            ?           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    216            ?            1259    28517    teacher_announcements_to_list    TABLE     ?   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer NOT NULL,
    profile_id integer NOT NULL
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            ?            1259    28520 $   Teacher_announcements_To_List_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_announcements_To_List_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_announcements_To_List_id_seq";
       public          postgres    false    217            ?           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_announcements_To_List_id_seq" OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    218            ?            1259    28521    teacher_announcements    TABLE       CREATE TABLE public.teacher_announcements (
    id integer NOT NULL,
    announcement_title character varying(100),
    announcement_message text,
    "to" character varying(50),
    readby character varying(50),
    createdby text,
    created_on timestamp with time zone
);
 )   DROP TABLE public.teacher_announcements;
       public         heap    postgres    false            ?            1259    28526    Teacher_announcements_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_announcements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."Teacher_announcements_id_seq";
       public          postgres    false    219            ?           0    0    Teacher_announcements_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Teacher_announcements_id_seq" OWNED BY public.teacher_announcements.id;
          public          postgres    false    220            ?            1259    28527    Teacher_answer    TABLE     0  CREATE TABLE public."Teacher_answer" (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    correct boolean NOT NULL,
    "questionOrderNo" integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    CONSTRAINT "Teacher_answer_questionOrderNo_check" CHECK (("questionOrderNo" >= 0))
);
 $   DROP TABLE public."Teacher_answer";
       public         heap    postgres    false            ?            1259    28533    Teacher_answer_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Teacher_answer_id_seq";
       public          postgres    false    221            ?           0    0    Teacher_answer_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Teacher_answer_id_seq" OWNED BY public."Teacher_answer".id;
          public          postgres    false    222            ?            1259    28534    Teacher_assignment    TABLE       CREATE TABLE public."Teacher_assignment" (
    "CourseId" integer,
    "Assignment_id" integer NOT NULL,
    "Assignment_Name" character varying(200),
    "File" character varying(100),
    "Created_on" timestamp with time zone NOT NULL,
    "ModuleId_id" integer
);
 (   DROP TABLE public."Teacher_assignment";
       public         heap    postgres    false            ?            1259    28537 $   Teacher_assignment_Assignment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_assignment_Assignment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_assignment_Assignment_id_seq";
       public          postgres    false    223            ?           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_assignment_Assignment_id_seq" OWNED BY public."Teacher_assignment"."Assignment_id";
          public          postgres    false    224            ?            1259    28538    Teacher_assignmentupload    TABLE     ?  CREATE TABLE public."Teacher_assignmentupload" (
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
       public         heap    postgres    false            ?            1259    28543 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq";
       public          postgres    false    225            ?           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq" OWNED BY public."Teacher_assignmentupload"."AssignmentUpload_id";
          public          postgres    false    226            ?            1259    28544    teacher_category    TABLE     ?   CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(250),
    isactive boolean,
    createdby character varying,
    createdon date,
    modifiedby character varying,
    modifiedon date
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            ?            1259    28549    Teacher_category_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    227            ?           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public.teacher_category.id;
          public          postgres    false    228            ?            1259    28550    Teacher_course_AssignToTeacher    TABLE     ?   CREATE TABLE public."Teacher_course_AssignToTeacher" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 4   DROP TABLE public."Teacher_course_AssignToTeacher";
       public         heap    postgres    false            ?            1259    28553 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    229            ?           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public."Teacher_course_AssignToTeacher".id;
          public          postgres    false    230            ?            1259    28554    teacher_course    TABLE     u  CREATE TABLE public.teacher_course (
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
       public         heap    postgres    false            ?            1259    28559    Teacher_course_CourseId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_course_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_course_CourseId_seq";
       public          postgres    false    231            ?           0    0    Teacher_course_CourseId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_course_CourseId_seq" OWNED BY public.teacher_course.courseid;
          public          postgres    false    232            ?            1259    28560    Teacher_course_DepartmentId    TABLE     ?   CREATE TABLE public."Teacher_course_DepartmentId" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 1   DROP TABLE public."Teacher_course_DepartmentId";
       public         heap    postgres    false            ?            1259    28563 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    233            ?           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public."Teacher_course_DepartmentId".id;
          public          postgres    false    234            ?            1259    28564    Teacher_course_EnrollToStudent    TABLE     ?   CREATE TABLE public."Teacher_course_EnrollToStudent" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 4   DROP TABLE public."Teacher_course_EnrollToStudent";
       public         heap    postgres    false            ?            1259    28567 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    235            ?           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public."Teacher_course_EnrollToStudent".id;
          public          postgres    false    236            ?            1259    28568    Teacher_course_InstitutionId    TABLE     ?   CREATE TABLE public."Teacher_course_InstitutionId" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 2   DROP TABLE public."Teacher_course_InstitutionId";
       public         heap    postgres    false            ?            1259    28571 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    237            ?           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public."Teacher_course_InstitutionId".id;
          public          postgres    false    238            ?            1259    28572    Teacher_courseassessment    TABLE     `  CREATE TABLE public."Teacher_courseassessment" (
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
       public         heap    postgres    false            ?            1259    28577    Teacher_courseregistration    TABLE     ?  CREATE TABLE public."Teacher_courseregistration" (
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
       public         heap    postgres    false            ?            1259    28582    Teacher_coursesyllabus    TABLE     ?   CREATE TABLE public."Teacher_coursesyllabus" (
    "Id" integer NOT NULL,
    "syllabusFile" character varying(100),
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_coursesyllabus";
       public         heap    postgres    false            ?            1259    28585    Teacher_coursesyllabus_Id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_coursesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_coursesyllabus_Id_seq";
       public          postgres    false    241            ?           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_coursesyllabus_Id_seq" OWNED BY public."Teacher_coursesyllabus"."Id";
          public          postgres    false    242            ?            1259    28586    Teacher_csvupload    TABLE     ?   CREATE TABLE public."Teacher_csvupload" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    file character varying(100) NOT NULL,
    completed boolean NOT NULL,
    user_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_csvupload";
       public         heap    postgres    false            ?            1259    28589    Teacher_csvupload_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_csvupload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_csvupload_id_seq";
       public          postgres    false    243            ?           0    0    Teacher_csvupload_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_csvupload_id_seq" OWNED BY public."Teacher_csvupload".id;
          public          postgres    false    244            ?            1259    28590    Teacher_email_BCC    TABLE     ?   CREATE TABLE public."Teacher_email_BCC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_email_BCC";
       public         heap    postgres    false            ?            1259    28593    Teacher_email_BCC_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_email_BCC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_email_BCC_id_seq";
       public          postgres    false    245            ?           0    0    Teacher_email_BCC_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_BCC_id_seq" OWNED BY public."Teacher_email_BCC".id;
          public          postgres    false    246            ?            1259    28594    Teacher_email_CC    TABLE     ?   CREATE TABLE public."Teacher_email_CC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_email_CC";
       public         heap    postgres    false            ?            1259    28597    Teacher_email_CC_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_email_CC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_email_CC_id_seq";
       public          postgres    false    247            ?           0    0    Teacher_email_CC_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_email_CC_id_seq" OWNED BY public."Teacher_email_CC".id;
          public          postgres    false    248            ?            1259    28598    teacher_email    TABLE     ?  CREATE TABLE public.teacher_email (
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
       public         heap    postgres    false            ?            1259    28603    Teacher_email_EmailId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    249            ?           0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public.teacher_email.emailid;
          public          postgres    false    250            ?            1259    28604    Teacher_email_Email_To    TABLE     ?   CREATE TABLE public."Teacher_email_Email_To" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 ,   DROP TABLE public."Teacher_email_Email_To";
       public         heap    postgres    false            ?            1259    28607    Teacher_email_Email_To_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_email_Email_To_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_email_Email_To_id_seq";
       public          postgres    false    251            ?           0    0    Teacher_email_Email_To_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."Teacher_email_Email_To_id_seq" OWNED BY public."Teacher_email_Email_To".id;
          public          postgres    false    252            ?            1259    28608    Teacher_folder    TABLE     }   CREATE TABLE public."Teacher_folder" (
    "FolderId" integer NOT NULL,
    "Name" text NOT NULL,
    "UserId_id" integer
);
 $   DROP TABLE public."Teacher_folder";
       public         heap    postgres    false            ?            1259    28613    Teacher_folder_FolderId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_folder_FolderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_folder_FolderId_seq";
       public          postgres    false    253            ?           0    0    Teacher_folder_FolderId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_folder_FolderId_seq" OWNED BY public."Teacher_folder"."FolderId";
          public          postgres    false    254            ?            1259    28614    teacher_module    TABLE     ?  CREATE TABLE public.teacher_module (
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
       public         heap    postgres    false                        1259    28619    Teacher_module_ModuleId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    255            ?           0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public.teacher_module.moduleid;
          public          postgres    false    256                       1259    28620    Teacher_modulefile    TABLE     M  CREATE TABLE public."Teacher_modulefile" (
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
       public         heap    postgres    false                       1259    28625    Teacher_modulefile_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    257            ?           0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public."Teacher_modulefile".id;
          public          postgres    false    258                       1259    28626    Teacher_modulefilecontent    TABLE       CREATE TABLE public."Teacher_modulefilecontent" (
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
       public         heap    postgres    false                       1259    28631     Teacher_modulefilecontent_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_modulefilecontent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Teacher_modulefilecontent_id_seq";
       public          postgres    false    259            ?           0    0     Teacher_modulefilecontent_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Teacher_modulefilecontent_id_seq" OWNED BY public."Teacher_modulefilecontent".id;
          public          postgres    false    260                       1259    28632    Teacher_modulesyllabus    TABLE     7  CREATE TABLE public."Teacher_modulesyllabus" (
    "Id" integer NOT NULL,
    "oneDriveLink" character varying(1000),
    "syllabusFile" character varying(100),
    "imgFilePath" character varying(1000),
    "imgCount" integer NOT NULL,
    "fileOrderNo" integer NOT NULL,
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_modulesyllabus";
       public         heap    postgres    false                       1259    28637    Teacher_modulesyllabus_Id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_modulesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_modulesyllabus_Id_seq";
       public          postgres    false    261            ?           0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_modulesyllabus_Id_seq" OWNED BY public."Teacher_modulesyllabus"."Id";
          public          postgres    false    262                       1259    28638    Teacher_progress    TABLE     ?   CREATE TABLE public."Teacher_progress" (
    id integer NOT NULL,
    score character varying(1024) NOT NULL,
    correct_answer character varying(10) NOT NULL,
    wrong_answer character varying(10) NOT NULL,
    user_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_progress";
       public         heap    postgres    false                       1259    28643    Teacher_progress_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_progress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_progress_id_seq";
       public          postgres    false    263            ?           0    0    Teacher_progress_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_progress_id_seq" OWNED BY public."Teacher_progress".id;
          public          postgres    false    264            	           1259    28644    teacher_question    TABLE     h  CREATE TABLE public.teacher_question (
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
    created_on timestamp without time zone NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    CONSTRAINT "Teacher_question_questionOrderNo_check" CHECK ((questionorderno >= 0))
);
 $   DROP TABLE public.teacher_question;
       public         heap    postgres    false            
           1259    28650    Teacher_question_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_question_id_seq";
       public          postgres    false    265            ?           0    0    Teacher_question_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_question_id_seq" OWNED BY public.teacher_question.id;
          public          postgres    false    266                       1259    28651    teacher_quiz    TABLE     ?  CREATE TABLE public.teacher_quiz (
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
       public         heap    postgres    false                       1259    28658    Teacher_quiz_QuizId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    267            ?           0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    268                       1259    28659    Teacher_sitting    TABLE     ?  CREATE TABLE public."Teacher_sitting" (
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
       public         heap    postgres    false                       1259    28664    Teacher_sitting_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_sitting_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Teacher_sitting_id_seq";
       public          postgres    false    269            ?           0    0    Teacher_sitting_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_sitting_id_seq" OWNED BY public."Teacher_sitting".id;
          public          postgres    false    270                       1259    28665    Teacher_studentcourseprogress    TABLE     3  CREATE TABLE public."Teacher_studentcourseprogress" (
    id integer NOT NULL,
    "Grade" numeric(5,2) NOT NULL,
    "CurrentModuleNo" integer NOT NULL,
    "CurrentUnitNo" integer NOT NULL,
    "CurrentAssignNo" integer NOT NULL,
    "CourseId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentcourseprogress";
       public         heap    postgres    false                       1259    28668 $   Teacher_studentcourseprogress_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_studentcourseprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentcourseprogress_id_seq";
       public          postgres    false    271            ?           0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentcourseprogress_id_seq" OWNED BY public."Teacher_studentcourseprogress".id;
          public          postgres    false    272                       1259    28669 !   Teacher_studentmodulefileprogress    TABLE       CREATE TABLE public."Teacher_studentmodulefileprogress" (
    id integer NOT NULL,
    "fileCompleted" boolean NOT NULL,
    "CurrentFilePageNo" integer NOT NULL,
    "FileId_id" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 7   DROP TABLE public."Teacher_studentmodulefileprogress";
       public         heap    postgres    false                       1259    28672 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_studentmodulefileprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public."Teacher_studentmodulefileprogress_id_seq";
       public          postgres    false    273            ?           0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public."Teacher_studentmodulefileprogress_id_seq" OWNED BY public."Teacher_studentmodulefileprogress".id;
          public          postgres    false    274                       1259    28673    Teacher_studentmoduleprogress    TABLE     ?   CREATE TABLE public."Teacher_studentmoduleprogress" (
    id integer NOT NULL,
    "CurrentFileNo" integer NOT NULL,
    "CurrentQuizNo" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentmoduleprogress";
       public         heap    postgres    false                       1259    28676 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_studentmoduleprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentmoduleprogress_id_seq";
       public          postgres    false    275            ?           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentmoduleprogress_id_seq" OWNED BY public."Teacher_studentmoduleprogress".id;
          public          postgres    false    276                       1259    28677    Teacher_studentquizprogress    TABLE     W  CREATE TABLE public."Teacher_studentquizprogress" (
    id integer NOT NULL,
    score numeric(5,2) NOT NULL,
    completed boolean NOT NULL,
    num_attempts integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL,
    CONSTRAINT "Teacher_studentquizprogress_num_attempts_check" CHECK ((num_attempts >= 0))
);
 1   DROP TABLE public."Teacher_studentquizprogress";
       public         heap    postgres    false                       1259    28681 "   Teacher_studentquizprogress_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_studentquizprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_studentquizprogress_id_seq";
       public          postgres    false    277            ?           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_studentquizprogress_id_seq" OWNED BY public."Teacher_studentquizprogress".id;
          public          postgres    false    278                       1259    28682    Teacher_units    TABLE     ?  CREATE TABLE public."Teacher_units" (
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
       public         heap    postgres    false                       1259    28687    Teacher_units_UnitId_seq    SEQUENCE     ?   CREATE SEQUENCE public."Teacher_units_UnitId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_units_UnitId_seq";
       public          postgres    false    279            ?           0    0    Teacher_units_UnitId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_units_UnitId_seq" OWNED BY public."Teacher_units"."UnitId";
          public          postgres    false    280                       1259    28688    admin_department    TABLE     m  CREATE TABLE public.admin_department (
    departmentid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255),
    institutionid_id integer,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255)
);
 $   DROP TABLE public.admin_department;
       public         heap    postgres    false                       1259    28693 !   admin_department_departmentid_seq    SEQUENCE     ?   CREATE SEQUENCE public.admin_department_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    281            ?           0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    282                       1259    28694    admin_institution    TABLE     u  CREATE TABLE public.admin_institution (
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
       public         heap    postgres    false                       1259    28699 #   admin_institution_institutionid_seq    SEQUENCE     ?   CREATE SEQUENCE public.admin_institution_institutionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    283            ?           0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    284                       1259    28700 
   admin_role    TABLE     ?  CREATE TABLE public.admin_role (
    roleid integer NOT NULL,
    createdby character varying(255) NOT NULL,
    createdon timestamp without time zone NOT NULL,
    isactive boolean NOT NULL,
    modifiedby character varying(255) NOT NULL,
    modifiedon timestamp without time zone NOT NULL,
    roledescription character varying(255) NOT NULL,
    rolename character varying(255) NOT NULL
);
    DROP TABLE public.admin_role;
       public         heap    postgres    false                       1259    28705    admin_role_roleid_seq    SEQUENCE     ?   CREATE SEQUENCE public.admin_role_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.admin_role_roleid_seq;
       public          postgres    false    285            ?           0    0    admin_role_roleid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.admin_role_roleid_seq OWNED BY public.admin_role.roleid;
          public          postgres    false    286                       1259    28706 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false                        1259    28709    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    287            ?           0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    288            !           1259    28710    auth_group_permissions    TABLE     ?   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false            "           1259    28713    auth_group_permissions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    289            ?           0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    290            #           1259    28714    auth_permission    TABLE     ?   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            $           1259    28717    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    291            ?           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    292            %           1259    28718 	   auth_user    TABLE     w  CREATE TABLE public.auth_user (
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
       public         heap    postgres    false            &           1259    28723    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            '           1259    28726    auth_user_groups_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    294            ?           0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    295            (           1259    28727    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    293            ?           0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    296            )           1259    28728    auth_user_user_permissions    TABLE     ?   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false            *           1259    28731 !   auth_user_user_permissions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    297            ?           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    298            +           1259    28732    django_admin_log    TABLE     ?  CREATE TABLE public.django_admin_log (
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
       public         heap    postgres    false            ,           1259    28738    django_admin_log_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public          postgres    false    299            ?           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
          public          postgres    false    300            -           1259    28739    django_content_type    TABLE     ?   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         heap    postgres    false            .           1259    28742    django_content_type_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public          postgres    false    301            ?           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
          public          postgres    false    302            /           1259    28743    django_migrations    TABLE     ?   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap    postgres    false            0           1259    28748    django_migrations_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public          postgres    false    303            ?           0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
          public          postgres    false    304            1           1259    28749    django_session    TABLE     ?   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         heap    postgres    false            N           2604    28754    Admin_department DepartmentId    DEFAULT     ?   ALTER TABLE ONLY public."Admin_department" ALTER COLUMN "DepartmentId" SET DEFAULT nextval('public."Admin_department_DepartmentId_seq"'::regclass);
 P   ALTER TABLE public."Admin_department" ALTER COLUMN "DepartmentId" DROP DEFAULT;
       public          postgres    false    210    209            O           2604    28755    Admin_institution InstitutionId    DEFAULT     ?   ALTER TABLE ONLY public."Admin_institution" ALTER COLUMN "InstitutionId" SET DEFAULT nextval('public."Admin_institution_InstitutionId_seq"'::regclass);
 R   ALTER TABLE public."Admin_institution" ALTER COLUMN "InstitutionId" DROP DEFAULT;
       public          postgres    false    212    211            P           2604    28756    Admin_userinstitutionmap Id    DEFAULT     ?   ALTER TABLE ONLY public."Admin_userinstitutionmap" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_userinstitutionmap_Id_seq"'::regclass);
 N   ALTER TABLE public."Admin_userinstitutionmap" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    214    213            T           2604    28757    Teacher_answer id    DEFAULT     z   ALTER TABLE ONLY public."Teacher_answer" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_answer_id_seq"'::regclass);
 B   ALTER TABLE public."Teacher_answer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            V           2604    28758     Teacher_assignment Assignment_id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_assignment" ALTER COLUMN "Assignment_id" SET DEFAULT nextval('public."Teacher_assignment_Assignment_id_seq"'::regclass);
 S   ALTER TABLE public."Teacher_assignment" ALTER COLUMN "Assignment_id" DROP DEFAULT;
       public          postgres    false    224    223            W           2604    28759 ,   Teacher_assignmentupload AssignmentUpload_id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" SET DEFAULT nextval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"'::regclass);
 _   ALTER TABLE public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" DROP DEFAULT;
       public          postgres    false    226    225            Y           2604    28760 !   Teacher_course_AssignToTeacher id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 R   ALTER TABLE public."Teacher_course_AssignToTeacher" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            [           2604    28761    Teacher_course_DepartmentId id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 O   ALTER TABLE public."Teacher_course_DepartmentId" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            \           2604    28762 !   Teacher_course_EnrollToStudent id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 R   ALTER TABLE public."Teacher_course_EnrollToStudent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            ]           2604    28763    Teacher_course_InstitutionId id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 P   ALTER TABLE public."Teacher_course_InstitutionId" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237            ^           2604    28764    Teacher_coursesyllabus Id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_coursesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_coursesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_coursesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    242    241            _           2604    28765    Teacher_csvupload id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_csvupload" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_csvupload_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_csvupload" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            `           2604    28766    Teacher_email_BCC id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_email_BCC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_BCC_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_email_BCC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245            a           2604    28767    Teacher_email_CC id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_email_CC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_CC_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_email_CC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            c           2604    28768    Teacher_email_Email_To id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_email_Email_To" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_Email_To_id_seq"'::regclass);
 J   ALTER TABLE public."Teacher_email_Email_To" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    251            d           2604    28769    Teacher_folder FolderId    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_folder" ALTER COLUMN "FolderId" SET DEFAULT nextval('public."Teacher_folder_FolderId_seq"'::regclass);
 J   ALTER TABLE public."Teacher_folder" ALTER COLUMN "FolderId" DROP DEFAULT;
       public          postgres    false    254    253            f           2604    28770    Teacher_modulefile id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_modulefile" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 F   ALTER TABLE public."Teacher_modulefile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            g           2604    28771    Teacher_modulefilecontent id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_modulefilecontent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefilecontent_id_seq"'::regclass);
 M   ALTER TABLE public."Teacher_modulefilecontent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            h           2604    28772    Teacher_modulesyllabus Id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_modulesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_modulesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_modulesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    262    261            i           2604    28773    Teacher_progress id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_progress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_progress_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_progress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263            o           2604    28774    Teacher_sitting id    DEFAULT     |   ALTER TABLE ONLY public."Teacher_sitting" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_sitting_id_seq"'::regclass);
 C   ALTER TABLE public."Teacher_sitting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            p           2604    28775     Teacher_studentcourseprogress id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentcourseprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentcourseprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            q           2604    28776 $   Teacher_studentmodulefileprogress id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmodulefileprogress_id_seq"'::regclass);
 U   ALTER TABLE public."Teacher_studentmodulefileprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    274    273            r           2604    28777     Teacher_studentmoduleprogress id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmoduleprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentmoduleprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    276    275            s           2604    28778    Teacher_studentquizprogress id    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_studentquizprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentquizprogress_id_seq"'::regclass);
 O   ALTER TABLE public."Teacher_studentquizprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    277            u           2604    28779    Teacher_units UnitId    DEFAULT     ?   ALTER TABLE ONLY public."Teacher_units" ALTER COLUMN "UnitId" SET DEFAULT nextval('public."Teacher_units_UnitId_seq"'::regclass);
 G   ALTER TABLE public."Teacher_units" ALTER COLUMN "UnitId" DROP DEFAULT;
       public          postgres    false    280    279            v           2604    28780    admin_department departmentid    DEFAULT     ?   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    282    281            w           2604    28781    admin_institution institutionid    DEFAULT     ?   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    284    283            x           2604    28782    admin_role roleid    DEFAULT     v   ALTER TABLE ONLY public.admin_role ALTER COLUMN roleid SET DEFAULT nextval('public.admin_role_roleid_seq'::regclass);
 @   ALTER TABLE public.admin_role ALTER COLUMN roleid DROP DEFAULT;
       public          postgres    false    286    285            y           2604    28783    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            z           2604    28784    auth_group_permissions id    DEFAULT     ?   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            {           2604    28785    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    292    291            |           2604    28786    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    293            }           2604    28787    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    295    294            ~           2604    28788    auth_user_user_permissions id    DEFAULT     ?   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297                       2604    28789    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            ?           2604    28790    django_content_type id    DEFAULT     ?   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    302    301            ?           2604    28791    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    304    303            Q           2604    28792    instituteadmin_profile id    DEFAULT     ?   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            S           2604    28793    teacher_announcements id    DEFAULT     ?   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_id_seq"'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            R           2604    28794     teacher_announcements_to_list id    DEFAULT     ?   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_To_List_id_seq"'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            X           2604    28795    teacher_category id    DEFAULT     |   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            Z           2604    28796    teacher_course courseid    DEFAULT     ?   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public."Teacher_course_CourseId_seq"'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    232    231            b           2604    28797    teacher_email emailid    DEFAULT     ?   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    250    249            e           2604    28798    teacher_module moduleid    DEFAULT     ?   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    256    255            j           2604    28799    teacher_question id    DEFAULT     |   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public."Teacher_question_id_seq"'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265            l           2604    28800    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    268    267            #          0    28493    Admin_department 
   TABLE DATA           ?   COPY public."Admin_department" ("isActive", "DepartmentId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    209    ?      %          0    28499    Admin_institution 
   TABLE DATA           ?   COPY public."Admin_institution" ("isActive", "InstitutionId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", picture) FROM stdin;
    public          postgres    false    211   b?      '          0    28505    Admin_userinstitutionmap 
   TABLE DATA           ?   COPY public."Admin_userinstitutionmap" ("isActive", "Id", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    213   ??      /          0    28527    Teacher_answer 
   TABLE DATA           `   COPY public."Teacher_answer" (id, content, correct, "questionOrderNo", "QuizId_id") FROM stdin;
    public          postgres    false    221   ??      1          0    28534    Teacher_assignment 
   TABLE DATA           ?   COPY public."Teacher_assignment" ("CourseId", "Assignment_id", "Assignment_Name", "File", "Created_on", "ModuleId_id") FROM stdin;
    public          postgres    false    223   ?      3          0    28538    Teacher_assignmentupload 
   TABLE DATA           ?   COPY public."Teacher_assignmentupload" ("AssignmentUpload_id", "Assignment_Name", "CourseId", "InstitutionId", "DepartmentId", "ModuleId", "Upload_Assignment", "AssignmentId_id") FROM stdin;
    public          postgres    false    225   9?      7          0    28550    Teacher_course_AssignToTeacher 
   TABLE DATA           U   COPY public."Teacher_course_AssignToTeacher" (id, course_id, profile_id) FROM stdin;
    public          postgres    false    229   V?      ;          0    28560    Teacher_course_DepartmentId 
   TABLE DATA           U   COPY public."Teacher_course_DepartmentId" (id, course_id, department_id) FROM stdin;
    public          postgres    false    233   s?      =          0    28564    Teacher_course_EnrollToStudent 
   TABLE DATA           U   COPY public."Teacher_course_EnrollToStudent" (id, course_id, profile_id) FROM stdin;
    public          postgres    false    235   ??      ?          0    28568    Teacher_course_InstitutionId 
   TABLE DATA           W   COPY public."Teacher_course_InstitutionId" (id, course_id, institution_id) FROM stdin;
    public          postgres    false    237   ??      A          0    28572    Teacher_courseassessment 
   TABLE DATA           ?   COPY public."Teacher_courseassessment" ("isActive", "CourseAssessmentId", "Score", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id") FROM stdin;
    public          postgres    false    239   ??      B          0    28577    Teacher_courseregistration 
   TABLE DATA           ?   COPY public."Teacher_courseregistration" ("isActive", "Student_Name", "Instructor_Name", "CourseRegistrationId", "EnrollmentStatus", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "Name_id") FROM stdin;
    public          postgres    false    240   ??      C          0    28582    Teacher_coursesyllabus 
   TABLE DATA           W   COPY public."Teacher_coursesyllabus" ("Id", "syllabusFile", "courseId_id") FROM stdin;
    public          postgres    false    241   ?      E          0    28586    Teacher_csvupload 
   TABLE DATA           R   COPY public."Teacher_csvupload" (id, title, file, completed, user_id) FROM stdin;
    public          postgres    false    243   g?      G          0    28590    Teacher_email_BCC 
   TABLE DATA           G   COPY public."Teacher_email_BCC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    245   ??      I          0    28594    Teacher_email_CC 
   TABLE DATA           F   COPY public."Teacher_email_CC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    247   ??      M          0    28604    Teacher_email_Email_To 
   TABLE DATA           L   COPY public."Teacher_email_Email_To" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    251   ??      O          0    28608    Teacher_folder 
   TABLE DATA           K   COPY public."Teacher_folder" ("FolderId", "Name", "UserId_id") FROM stdin;
    public          postgres    false    253   ??      S          0    28620    Teacher_modulefile 
   TABLE DATA           ?   COPY public."Teacher_modulefile" ("isActive", id, "File", "FileOrderNo", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleId_id") FROM stdin;
    public          postgres    false    257   ??      U          0    28626    Teacher_modulefilecontent 
   TABLE DATA           ?   COPY public."Teacher_modulefilecontent" ("isActive", id, "Slide", "SlideOrderNo", "TextContent", "SlideText", "SlideImage", "SlideVideos", "SlideAudio", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleFileId_id") FROM stdin;
    public          postgres    false    259   ?      W          0    28632    Teacher_modulesyllabus 
   TABLE DATA           ?   COPY public."Teacher_modulesyllabus" ("Id", "oneDriveLink", "syllabusFile", "imgFilePath", "imgCount", "fileOrderNo", "courseId_id") FROM stdin;
    public          postgres    false    261   2?      Y          0    28638    Teacher_progress 
   TABLE DATA           ^   COPY public."Teacher_progress" (id, score, correct_answer, wrong_answer, user_id) FROM stdin;
    public          postgres    false    263   O?      _          0    28659    Teacher_sitting 
   TABLE DATA           ?   COPY public."Teacher_sitting" (id, question_order, question_list, incorrect_questions, current_score, complete, user_answers, start, "end", quiz_id, user_id) FROM stdin;
    public          postgres    false    269   l?      a          0    28665    Teacher_studentcourseprogress 
   TABLE DATA           ?   COPY public."Teacher_studentcourseprogress" (id, "Grade", "CurrentModuleNo", "CurrentUnitNo", "CurrentAssignNo", "CourseId_id", "StudentId_id") FROM stdin;
    public          postgres    false    271   ??      c          0    28669 !   Teacher_studentmodulefileprogress 
   TABLE DATA           ?   COPY public."Teacher_studentmodulefileprogress" (id, "fileCompleted", "CurrentFilePageNo", "FileId_id", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    273   ??      e          0    28673    Teacher_studentmoduleprogress 
   TABLE DATA           ~   COPY public."Teacher_studentmoduleprogress" (id, "CurrentFileNo", "CurrentQuizNo", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    275   ??      g          0    28677    Teacher_studentquizprogress 
   TABLE DATA           x   COPY public."Teacher_studentquizprogress" (id, score, completed, num_attempts, "QuizId_id", "StudentId_id") FROM stdin;
    public          postgres    false    277   ??      i          0    28682    Teacher_units 
   TABLE DATA           ?   COPY public."Teacher_units" ("isActive", "UnitId", "Name", "Description", "StartDate", "EndDate", "File", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "ModuleId_id") FROM stdin;
    public          postgres    false    279   ??      k          0    28688    admin_department 
   TABLE DATA           ?   COPY public.admin_department (departmentid, createdby, createdon, description, institutionid_id, isactive, modifiedby, modifiedon, name) FROM stdin;
    public          postgres    false    281   ?      m          0    28694    admin_institution 
   TABLE DATA           ?   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    283   ??      o          0    28700 
   admin_role 
   TABLE DATA              COPY public.admin_role (roleid, createdby, createdon, isactive, modifiedby, modifiedon, roledescription, rolename) FROM stdin;
    public          postgres    false    285   W?      q          0    28706 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    287   ??      s          0    28710    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          postgres    false    289   ??      u          0    28714    auth_permission 
   TABLE DATA           N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public          postgres    false    291   ??      w          0    28718 	   auth_user 
   TABLE DATA           ?   COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    293   ??      x          0    28723    auth_user_groups 
   TABLE DATA           A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public          postgres    false    294   T?      {          0    28728    auth_user_user_permissions 
   TABLE DATA           P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public          postgres    false    297   q?      }          0    28732    django_admin_log 
   TABLE DATA           ?   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          postgres    false    299   ??                0    28739    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          postgres    false    301   ??      ?          0    28743    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          postgres    false    303   
?      ?          0    28749    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          postgres    false    305   ??      )          0    28511    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (isactive, id, userrole, first_name, last_name, email, dob, mobileno, gender, department, address1, address2, city, state, zip, profile_pics, createdby, createddate, updatedby, updateddate, institutionid_id, user_id) FROM stdin;
    public          postgres    false    215   _?      -          0    28521    teacher_announcements 
   TABLE DATA           ?   COPY public.teacher_announcements (id, announcement_title, announcement_message, "to", readby, createdby, created_on) FROM stdin;
    public          postgres    false    219   ??      +          0    28517    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    217   T?      5          0    28544    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    227   w?      9          0    28554    teacher_course 
   TABLE DATA           ?   COPY public.teacher_course (isactive, courseid, coursecode, name, description, coursetype, passingscore, instid, createdby, createddate, updatedby, updateddate) FROM stdin;
    public          postgres    false    231   ??      K          0    28598    teacher_email 
   TABLE DATA           ?   COPY public.teacher_email (emailid, title, subject, content, createdon, createdby, modifiedon, modifiedby, status, readstatus, attachfile, email_from_id, isactive) FROM stdin;
    public          postgres    false    249   V?      Q          0    28614    teacher_module 
   TABLE DATA           ?   COPY public.teacher_module (isactive, moduleid, name, description, startdate, enddate, course, moduleorderno, createdby, createddate, updatedby, updateddate, courseid_id) FROM stdin;
    public          postgres    false    255   ??      [          0    28644    teacher_question 
   TABLE DATA           ?   COPY public.teacher_question (id, figure, content, explanation, questionorderno, ismcq, quizid_id, category_id, is_active, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    265   ??      ]          0    28651    teacher_quiz 
   TABLE DATA           %  COPY public.teacher_quiz (quizid, title, description, url, random_order, max_questions, answers_at_end, exam_paper, single_attempt, pass_mark, success_text, fail_text, draft, quizorderno, courseid_id, module_id, category_id, isactive, createdby, createdon, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    267   r?      ?           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."Admin_department_DepartmentId_seq"', 1, true);
          public          postgres    false    210            ?           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Admin_institution_InstitutionId_seq"', 1, true);
          public          postgres    false    212            ?           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Admin_userinstitutionmap_Id_seq"', 1, false);
          public          postgres    false    214            ?           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 42, true);
          public          postgres    false    216            ?           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_announcements_To_List_id_seq"', 1, true);
          public          postgres    false    218            ?           0    0    Teacher_announcements_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_announcements_id_seq"', 1, true);
          public          postgres    false    220            ?           0    0    Teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Teacher_answer_id_seq"', 10, true);
          public          postgres    false    222            ?           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_assignment_Assignment_id_seq"', 1, false);
          public          postgres    false    224            ?           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"', 1, false);
          public          postgres    false    226            ?           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 3, true);
          public          postgres    false    228            ?           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 1, true);
          public          postgres    false    230            ?           0    0    Teacher_course_CourseId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Teacher_course_CourseId_seq"', 2, true);
          public          postgres    false    232            ?           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 1, true);
          public          postgres    false    234            ?           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 1, true);
          public          postgres    false    236            ?           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 1, true);
          public          postgres    false    238            ?           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_coursesyllabus_Id_seq"', 1, true);
          public          postgres    false    242            ?           0    0    Teacher_csvupload_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_csvupload_id_seq"', 1, false);
          public          postgres    false    244            ?           0    0    Teacher_email_BCC_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_email_BCC_id_seq"', 1, false);
          public          postgres    false    246            ?           0    0    Teacher_email_CC_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_email_CC_id_seq"', 1, false);
          public          postgres    false    248            ?           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 22, true);
          public          postgres    false    250            ?           0    0    Teacher_email_Email_To_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_email_Email_To_id_seq"', 1, false);
          public          postgres    false    252            ?           0    0    Teacher_folder_FolderId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_folder_FolderId_seq"', 1, false);
          public          postgres    false    254            ?           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 31, true);
          public          postgres    false    256            ?           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 1, true);
          public          postgres    false    258            ?           0    0     Teacher_modulefilecontent_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Teacher_modulefilecontent_id_seq"', 1, true);
          public          postgres    false    260            ?           0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_modulesyllabus_Id_seq"', 1, false);
          public          postgres    false    262            ?           0    0    Teacher_progress_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_progress_id_seq"', 1, false);
          public          postgres    false    264            ?           0    0    Teacher_question_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_question_id_seq"', 32, true);
          public          postgres    false    266            ?           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 89, true);
          public          postgres    false    268            ?           0    0    Teacher_sitting_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_sitting_id_seq"', 1, false);
          public          postgres    false    270            ?           0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_studentcourseprogress_id_seq"', 1, true);
          public          postgres    false    272            ?           0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."Teacher_studentmodulefileprogress_id_seq"', 1, false);
          public          postgres    false    274            ?           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_studentmoduleprogress_id_seq"', 1, false);
          public          postgres    false    276            ?           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Teacher_studentquizprogress_id_seq"', 1, true);
          public          postgres    false    278            ?           0    0    Teacher_units_UnitId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_units_UnitId_seq"', 1, false);
          public          postgres    false    280            ?           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 20, true);
          public          postgres    false    282            ?           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 3, true);
          public          postgres    false    284            ?           0    0    admin_role_roleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_role_roleid_seq', 1, true);
          public          postgres    false    286            ?           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
          public          postgres    false    288            ?           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
          public          postgres    false    290            ?           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    292            ?           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
          public          postgres    false    295            ?           0    0    auth_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.auth_user_id_seq', 49, true);
          public          postgres    false    296            ?           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
          public          postgres    false    298            ?           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 10, true);
          public          postgres    false    300            ?           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 36, true);
          public          postgres    false    302            ?           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 21, true);
          public          postgres    false    304            ?           2606    28802 &   Admin_department Admin_department_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_pkey" PRIMARY KEY ("DepartmentId");
 T   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_pkey";
       public            postgres    false    209            ?           2606    28804 (   Admin_institution Admin_institution_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."Admin_institution"
    ADD CONSTRAINT "Admin_institution_pkey" PRIMARY KEY ("InstitutionId");
 V   ALTER TABLE ONLY public."Admin_institution" DROP CONSTRAINT "Admin_institution_pkey";
       public            postgres    false    211            ?           2606    28806 6   Admin_userinstitutionmap Admin_userinstitutionmap_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutionmap_pkey" PRIMARY KEY ("Id");
 d   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutionmap_pkey";
       public            postgres    false    213            ?           2606    28808 2   instituteadmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    215            ?           2606    28810 9   instituteadmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 e   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    215            ?           2606    28812 @   teacher_announcements_to_list Teacher_announcements_To_List_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_List_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_List_pkey";
       public            postgres    false    217            ?           2606    28814 ]   teacher_announcements_to_list Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq" UNIQUE (announcements_id, profile_id);
 ?   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq";
       public            postgres    false    217    217            ?           2606    28816 0   teacher_announcements Teacher_announcements_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT "Teacher_announcements_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT "Teacher_announcements_pkey";
       public            postgres    false    219            ?           2606    28818 "   Teacher_answer Teacher_answer_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_pkey";
       public            postgres    false    221            ?           2606    28820 *   Teacher_assignment Teacher_assignment_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_pkey" PRIMARY KEY ("Assignment_id");
 X   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_pkey";
       public            postgres    false    223            ?           2606    28822 6   Teacher_assignmentupload Teacher_assignmentupload_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentupload_pkey" PRIMARY KEY ("AssignmentUpload_id");
 d   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentupload_pkey";
       public            postgres    false    225            ?           2606    28824 .   teacher_category Teacher_category_category_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 Z   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    227            ?           2606    28826 &   teacher_category Teacher_category_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    227            ?           2606    28828 Z   Teacher_course_AssignToTeacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    229    229            ?           2606    28830 B   Teacher_course_AssignToTeacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 p   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    229            ?           2606    28832 Z   Teacher_course_DepartmentId Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    233    233            ?           2606    28834 <   Teacher_course_DepartmentId Teacher_course_DepartmentId_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    233            ?           2606    28836 Z   Teacher_course_EnrollToStudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    235    235            ?           2606    28838 B   Teacher_course_EnrollToStudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 p   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    235            ?           2606    28840 \   Teacher_course_InstitutionId Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    237    237            ?           2606    28842 >   Teacher_course_InstitutionId Teacher_course_InstitutionId_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    237            ?           2606    28844 "   teacher_course Teacher_course_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT "Teacher_course_pkey" PRIMARY KEY (courseid);
 N   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT "Teacher_course_pkey";
       public            postgres    false    231            ?           2606    28846 6   Teacher_courseassessment Teacher_courseassessment_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassessment_pkey" PRIMARY KEY ("CourseAssessmentId");
 d   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassessment_pkey";
       public            postgres    false    239            ?           2606    28848 :   Teacher_courseregistration Teacher_courseregistration_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregistration_pkey" PRIMARY KEY ("CourseRegistrationId");
 h   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregistration_pkey";
       public            postgres    false    240            ?           2606    28850 2   Teacher_coursesyllabus Teacher_coursesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllabus_pkey";
       public            postgres    false    241            ?           2606    28852 (   Teacher_csvupload Teacher_csvupload_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_pkey";
       public            postgres    false    243            ?           2606    28854 E   Teacher_email_BCC Teacher_email_BCC_email_id_profile_id_79a54781_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq" UNIQUE (email_id, profile_id);
 s   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq";
       public            postgres    false    245    245            ?           2606    28856 (   Teacher_email_BCC Teacher_email_BCC_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_pkey";
       public            postgres    false    245            ?           2606    28858 C   Teacher_email_CC Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq" UNIQUE (email_id, profile_id);
 q   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq";
       public            postgres    false    247    247            ?           2606    28860 &   Teacher_email_CC Teacher_email_CC_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_pkey";
       public            postgres    false    247            ?           2606    28862 O   Teacher_email_Email_To Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq" UNIQUE (email_id, profile_id);
 }   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq";
       public            postgres    false    251    251            ?           2606    28864 2   Teacher_email_Email_To Teacher_email_Email_To_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_pkey";
       public            postgres    false    251            ?           2606    28866     teacher_email Teacher_email_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY (emailid);
 L   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    249            ?           2606    28868 "   Teacher_folder Teacher_folder_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_pkey" PRIMARY KEY ("FolderId");
 P   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_pkey";
       public            postgres    false    253            ?           2606    28870 "   teacher_module Teacher_module_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY (moduleid);
 N   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    255            ?           2606    28872 *   Teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    257            ?           2606    28874 8   Teacher_modulefilecontent Teacher_modulefilecontent_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefilecontent_pkey" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefilecontent_pkey";
       public            postgres    false    259            ?           2606    28876 2   Teacher_modulesyllabus Teacher_modulesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllabus_pkey";
       public            postgres    false    261            ?           2606    28878 &   Teacher_progress Teacher_progress_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_pkey";
       public            postgres    false    263            ?           2606    28880 -   Teacher_progress Teacher_progress_user_id_key 
   CONSTRAINT     o   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_key" UNIQUE (user_id);
 [   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_key";
       public            postgres    false    263            ?           2606    28882 &   teacher_question Teacher_question_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_pkey";
       public            postgres    false    265                       2606    28884    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    267            	           2606    28886 $   Teacher_sitting Teacher_sitting_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_pkey";
       public            postgres    false    269                       2606    28888 @   Teacher_studentcourseprogress Teacher_studentcourseprogress_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcourseprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcourseprogress_pkey";
       public            postgres    false    271                       2606    28890 H   Teacher_studentmodulefileprogress Teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodulefileprogress_pkey" PRIMARY KEY (id);
 v   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodulefileprogress_pkey";
       public            postgres    false    273                       2606    28892 @   Teacher_studentmoduleprogress Teacher_studentmoduleprogress_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmoduleprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmoduleprogress_pkey";
       public            postgres    false    275                       2606    28894 <   Teacher_studentquizprogress Teacher_studentquizprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizprogress_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizprogress_pkey";
       public            postgres    false    277                        2606    28896     Teacher_units Teacher_units_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_pkey" PRIMARY KEY ("UnitId");
 N   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_pkey";
       public            postgres    false    279            "           2606    28898 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    281            $           2606    28900 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    283            (           2606    28902    admin_role admin_role_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (roleid);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    285            -           2606    28904    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    287            2           2606    28906 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public            postgres    false    289    289            5           2606    28908 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    289            /           2606    28910    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    287            8           2606    28912 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public            postgres    false    291    291            :           2606    28914 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    291            B           2606    28916 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    294            E           2606    28918 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    294    294            <           2606    28920    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    293            H           2606    28922 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    297            K           2606    28924 Y   auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
 ?   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
       public            postgres    false    297    297            ?           2606    28926     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public            postgres    false    293            N           2606    28928 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public            postgres    false    299            Q           2606    28930 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     ?   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public            postgres    false    301    301            S           2606    28932 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public            postgres    false    301            U           2606    28934 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public            postgres    false    303            X           2606    28936 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public            postgres    false    305            ?           2606    28938 %   teacher_email teacher_email_title_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_title_key UNIQUE (title);
 O   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_title_key;
       public            postgres    false    249            ?           2606    28940 &   teacher_module teacher_module_name_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module_name_key UNIQUE (name);
 P   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module_name_key;
       public            postgres    false    255            ?           2606    28942 ,   teacher_question teacher_question_figure_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_figure_key UNIQUE (figure);
 V   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_figure_key;
       public            postgres    false    265                       2606    28944 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    267            *           2606    28946 '   admin_role uk_oaw6skshjf4fahwf7ot87lb8i 
   CONSTRAINT     f   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i UNIQUE (rolename);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_oaw6skshjf4fahwf7ot87lb8i;
       public            postgres    false    285            &           2606    28948 .   admin_institution uk_r7p6t07od89mvlpktjjiqcdm6 
   CONSTRAINT     i   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT uk_r7p6t07od89mvlpktjjiqcdm6 UNIQUE (name);
 X   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT uk_r7p6t07od89mvlpktjjiqcdm6;
       public            postgres    false    283            ?           1259    28949 *   Admin_department_InstitutionId_id_3ace7e32    INDEX     y   CREATE INDEX "Admin_department_InstitutionId_id_3ace7e32" ON public."Admin_department" USING btree ("InstitutionId_id");
 @   DROP INDEX public."Admin_department_InstitutionId_id_3ace7e32";
       public            postgres    false    209            ?           1259    28950 2   Admin_userinstitutionmap_InstitutionId_id_8c9feb65    INDEX     ?   CREATE INDEX "Admin_userinstitutionmap_InstitutionId_id_8c9feb65" ON public."Admin_userinstitutionmap" USING btree ("InstitutionId_id");
 H   DROP INDEX public."Admin_userinstitutionmap_InstitutionId_id_8c9feb65";
       public            postgres    false    213            ?           1259    28951 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     ?   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public.instituteadmin_profile USING btree (institutionid_id);
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    215            ?           1259    28952 7   Teacher_announcements_To_List_announcements_id_cc6864cc    INDEX     ?   CREATE INDEX "Teacher_announcements_To_List_announcements_id_cc6864cc" ON public.teacher_announcements_to_list USING btree (announcements_id);
 M   DROP INDEX public."Teacher_announcements_To_List_announcements_id_cc6864cc";
       public            postgres    false    217            ?           1259    28953 1   Teacher_announcements_To_List_profile_id_f1306085    INDEX     ?   CREATE INDEX "Teacher_announcements_To_List_profile_id_f1306085" ON public.teacher_announcements_to_list USING btree (profile_id);
 G   DROP INDEX public."Teacher_announcements_To_List_profile_id_f1306085";
       public            postgres    false    217            ?           1259    28954 !   Teacher_answer_QuizId_id_8a8f554b    INDEX     g   CREATE INDEX "Teacher_answer_QuizId_id_8a8f554b" ON public."Teacher_answer" USING btree ("QuizId_id");
 7   DROP INDEX public."Teacher_answer_QuizId_id_8a8f554b";
       public            postgres    false    221            ?           1259    28955 '   Teacher_assignment_ModuleId_id_10a5fe63    INDEX     s   CREATE INDEX "Teacher_assignment_ModuleId_id_10a5fe63" ON public."Teacher_assignment" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_assignment_ModuleId_id_10a5fe63";
       public            postgres    false    223            ?           1259    28956 1   Teacher_assignmentupload_AssignmentId_id_a4c12c1c    INDEX     ?   CREATE INDEX "Teacher_assignmentupload_AssignmentId_id_a4c12c1c" ON public."Teacher_assignmentupload" USING btree ("AssignmentId_id");
 G   DROP INDEX public."Teacher_assignmentupload_AssignmentId_id_a4c12c1c";
       public            postgres    false    225            ?           1259    28957 '   Teacher_category_category_2d59e72d_like    INDEX     ~   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public.teacher_category USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    227            ?           1259    28958 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     ?   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public."Teacher_course_AssignToTeacher" USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    229            ?           1259    28959 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     ?   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public."Teacher_course_AssignToTeacher" USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    229            ?           1259    28960 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX        CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public."Teacher_course_DepartmentId" USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    233            ?           1259    28961 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     ?   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public."Teacher_course_DepartmentId" USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    233            ?           1259    28962 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     ?   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public."Teacher_course_EnrollToStudent" USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    235            ?           1259    28963 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     ?   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public."Teacher_course_EnrollToStudent" USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    235            ?           1259    28964 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX     ?   CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public."Teacher_course_InstitutionId" USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    237            ?           1259    28965 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     ?   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public."Teacher_course_InstitutionId" USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    237            ?           1259    28966 -   Teacher_courseassessment_CourseId_id_893c01bd    INDEX        CREATE INDEX "Teacher_courseassessment_CourseId_id_893c01bd" ON public."Teacher_courseassessment" USING btree ("CourseId_id");
 C   DROP INDEX public."Teacher_courseassessment_CourseId_id_893c01bd";
       public            postgres    false    239            ?           1259    28967 /   Teacher_courseregistration_CourseId_id_9e1bb196    INDEX     ?   CREATE INDEX "Teacher_courseregistration_CourseId_id_9e1bb196" ON public."Teacher_courseregistration" USING btree ("CourseId_id");
 E   DROP INDEX public."Teacher_courseregistration_CourseId_id_9e1bb196";
       public            postgres    false    240            ?           1259    28968 +   Teacher_courseregistration_Name_id_92c9d933    INDEX     {   CREATE INDEX "Teacher_courseregistration_Name_id_92c9d933" ON public."Teacher_courseregistration" USING btree ("Name_id");
 A   DROP INDEX public."Teacher_courseregistration_Name_id_92c9d933";
       public            postgres    false    240            ?           1259    28969 +   Teacher_coursesyllabus_courseId_id_6d1f2a8b    INDEX     {   CREATE INDEX "Teacher_coursesyllabus_courseId_id_6d1f2a8b" ON public."Teacher_coursesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_coursesyllabus_courseId_id_6d1f2a8b";
       public            postgres    false    241            ?           1259    28970 "   Teacher_csvupload_user_id_42769c97    INDEX     g   CREATE INDEX "Teacher_csvupload_user_id_42769c97" ON public."Teacher_csvupload" USING btree (user_id);
 8   DROP INDEX public."Teacher_csvupload_user_id_42769c97";
       public            postgres    false    243            ?           1259    28971 #   Teacher_email_BCC_email_id_5ed1e5b8    INDEX     i   CREATE INDEX "Teacher_email_BCC_email_id_5ed1e5b8" ON public."Teacher_email_BCC" USING btree (email_id);
 9   DROP INDEX public."Teacher_email_BCC_email_id_5ed1e5b8";
       public            postgres    false    245            ?           1259    28972 %   Teacher_email_BCC_profile_id_bde0e3ff    INDEX     m   CREATE INDEX "Teacher_email_BCC_profile_id_bde0e3ff" ON public."Teacher_email_BCC" USING btree (profile_id);
 ;   DROP INDEX public."Teacher_email_BCC_profile_id_bde0e3ff";
       public            postgres    false    245            ?           1259    28973 "   Teacher_email_CC_email_id_a52b181b    INDEX     g   CREATE INDEX "Teacher_email_CC_email_id_a52b181b" ON public."Teacher_email_CC" USING btree (email_id);
 8   DROP INDEX public."Teacher_email_CC_email_id_a52b181b";
       public            postgres    false    247            ?           1259    28974 $   Teacher_email_CC_profile_id_8a708682    INDEX     k   CREATE INDEX "Teacher_email_CC_profile_id_8a708682" ON public."Teacher_email_CC" USING btree (profile_id);
 :   DROP INDEX public."Teacher_email_CC_profile_id_8a708682";
       public            postgres    false    247            ?           1259    28975 $   Teacher_email_Email_From_id_acc54e41    INDEX     i   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public.teacher_email USING btree (email_from_id);
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    249            ?           1259    28976 (   Teacher_email_Email_To_email_id_789297dd    INDEX     s   CREATE INDEX "Teacher_email_Email_To_email_id_789297dd" ON public."Teacher_email_Email_To" USING btree (email_id);
 >   DROP INDEX public."Teacher_email_Email_To_email_id_789297dd";
       public            postgres    false    251            ?           1259    28977 *   Teacher_email_Email_To_profile_id_4ade4937    INDEX     w   CREATE INDEX "Teacher_email_Email_To_profile_id_4ade4937" ON public."Teacher_email_Email_To" USING btree (profile_id);
 @   DROP INDEX public."Teacher_email_Email_To_profile_id_4ade4937";
       public            postgres    false    251            ?           1259    28978 !   Teacher_folder_UserId_id_25ea40b7    INDEX     g   CREATE INDEX "Teacher_folder_UserId_id_25ea40b7" ON public."Teacher_folder" USING btree ("UserId_id");
 7   DROP INDEX public."Teacher_folder_UserId_id_25ea40b7";
       public            postgres    false    253            ?           1259    28979 #   Teacher_module_CourseId_id_50aa9262    INDEX     g   CREATE INDEX "Teacher_module_CourseId_id_50aa9262" ON public.teacher_module USING btree (courseid_id);
 9   DROP INDEX public."Teacher_module_CourseId_id_50aa9262";
       public            postgres    false    255            ?           1259    28980 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     s   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public."Teacher_modulefile" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    257            ?           1259    28981 2   Teacher_modulefilecontent_ModuleFileId_id_72056622    INDEX     ?   CREATE INDEX "Teacher_modulefilecontent_ModuleFileId_id_72056622" ON public."Teacher_modulefilecontent" USING btree ("ModuleFileId_id");
 H   DROP INDEX public."Teacher_modulefilecontent_ModuleFileId_id_72056622";
       public            postgres    false    259            ?           1259    28982 +   Teacher_modulesyllabus_courseId_id_05c97e90    INDEX     {   CREATE INDEX "Teacher_modulesyllabus_courseId_id_05c97e90" ON public."Teacher_modulesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_modulesyllabus_courseId_id_05c97e90";
       public            postgres    false    261            ?           1259    28983 #   Teacher_question_QuizId_id_f3ba643e    INDEX     g   CREATE INDEX "Teacher_question_QuizId_id_f3ba643e" ON public.teacher_question USING btree (quizid_id);
 9   DROP INDEX public."Teacher_question_QuizId_id_f3ba643e";
       public            postgres    false    265            ?           1259    28984 %   Teacher_question_category_id_52ec7234    INDEX     k   CREATE INDEX "Teacher_question_category_id_52ec7234" ON public.teacher_question USING btree (category_id);
 ;   DROP INDEX public."Teacher_question_category_id_52ec7234";
       public            postgres    false    265            ?           1259    28985 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    267                        1259    28986    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    267                       1259    28987 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    267                       1259    28988    Teacher_quiz_url_fda39535    INDEX     S   CREATE INDEX "Teacher_quiz_url_fda39535" ON public.teacher_quiz USING btree (url);
 /   DROP INDEX public."Teacher_quiz_url_fda39535";
       public            postgres    false    267                       1259    28989    Teacher_quiz_url_fda39535_like    INDEX     l   CREATE INDEX "Teacher_quiz_url_fda39535_like" ON public.teacher_quiz USING btree (url varchar_pattern_ops);
 4   DROP INDEX public."Teacher_quiz_url_fda39535_like";
       public            postgres    false    267            
           1259    28990     Teacher_sitting_quiz_id_280a1446    INDEX     c   CREATE INDEX "Teacher_sitting_quiz_id_280a1446" ON public."Teacher_sitting" USING btree (quiz_id);
 6   DROP INDEX public."Teacher_sitting_quiz_id_280a1446";
       public            postgres    false    269                       1259    28991     Teacher_sitting_user_id_a53fd1db    INDEX     c   CREATE INDEX "Teacher_sitting_user_id_a53fd1db" ON public."Teacher_sitting" USING btree (user_id);
 6   DROP INDEX public."Teacher_sitting_user_id_a53fd1db";
       public            postgres    false    269                       1259    28992 2   Teacher_studentcourseprogress_CourseId_id_fe404be7    INDEX     ?   CREATE INDEX "Teacher_studentcourseprogress_CourseId_id_fe404be7" ON public."Teacher_studentcourseprogress" USING btree ("CourseId_id");
 H   DROP INDEX public."Teacher_studentcourseprogress_CourseId_id_fe404be7";
       public            postgres    false    271                       1259    28993 3   Teacher_studentcourseprogress_StudentId_id_838739dd    INDEX     ?   CREATE INDEX "Teacher_studentcourseprogress_StudentId_id_838739dd" ON public."Teacher_studentcourseprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentcourseprogress_StudentId_id_838739dd";
       public            postgres    false    271                       1259    28994 4   Teacher_studentmodulefileprogress_FileId_id_e2bc8595    INDEX     ?   CREATE INDEX "Teacher_studentmodulefileprogress_FileId_id_e2bc8595" ON public."Teacher_studentmodulefileprogress" USING btree ("FileId_id");
 J   DROP INDEX public."Teacher_studentmodulefileprogress_FileId_id_e2bc8595";
       public            postgres    false    273                       1259    28995 6   Teacher_studentmodulefileprogress_ModuleId_id_41c42264    INDEX     ?   CREATE INDEX "Teacher_studentmodulefileprogress_ModuleId_id_41c42264" ON public."Teacher_studentmodulefileprogress" USING btree ("ModuleId_id");
 L   DROP INDEX public."Teacher_studentmodulefileprogress_ModuleId_id_41c42264";
       public            postgres    false    273                       1259    28996 7   Teacher_studentmodulefileprogress_StudentId_id_12135e51    INDEX     ?   CREATE INDEX "Teacher_studentmodulefileprogress_StudentId_id_12135e51" ON public."Teacher_studentmodulefileprogress" USING btree ("StudentId_id");
 M   DROP INDEX public."Teacher_studentmodulefileprogress_StudentId_id_12135e51";
       public            postgres    false    273                       1259    28997 2   Teacher_studentmoduleprogress_ModuleId_id_c9fdad01    INDEX     ?   CREATE INDEX "Teacher_studentmoduleprogress_ModuleId_id_c9fdad01" ON public."Teacher_studentmoduleprogress" USING btree ("ModuleId_id");
 H   DROP INDEX public."Teacher_studentmoduleprogress_ModuleId_id_c9fdad01";
       public            postgres    false    275                       1259    28998 3   Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae    INDEX     ?   CREATE INDEX "Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae" ON public."Teacher_studentmoduleprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae";
       public            postgres    false    275                       1259    28999 .   Teacher_studentquizprogress_QuizId_id_a04a2235    INDEX     ?   CREATE INDEX "Teacher_studentquizprogress_QuizId_id_a04a2235" ON public."Teacher_studentquizprogress" USING btree ("QuizId_id");
 D   DROP INDEX public."Teacher_studentquizprogress_QuizId_id_a04a2235";
       public            postgres    false    277                       1259    29000 1   Teacher_studentquizprogress_StudentId_id_4e5596d2    INDEX     ?   CREATE INDEX "Teacher_studentquizprogress_StudentId_id_4e5596d2" ON public."Teacher_studentquizprogress" USING btree ("StudentId_id");
 G   DROP INDEX public."Teacher_studentquizprogress_StudentId_id_4e5596d2";
       public            postgres    false    277                       1259    29001 "   Teacher_units_CourseId_id_f67d8790    INDEX     i   CREATE INDEX "Teacher_units_CourseId_id_f67d8790" ON public."Teacher_units" USING btree ("CourseId_id");
 8   DROP INDEX public."Teacher_units_CourseId_id_f67d8790";
       public            postgres    false    279                       1259    29002 "   Teacher_units_ModuleId_id_14dc3af9    INDEX     i   CREATE INDEX "Teacher_units_ModuleId_id_14dc3af9" ON public."Teacher_units" USING btree ("ModuleId_id");
 8   DROP INDEX public."Teacher_units_ModuleId_id_14dc3af9";
       public            postgres    false    279            +           1259    29003    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    287            0           1259    29004 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public            postgres    false    289            3           1259    29005 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public            postgres    false    289            6           1259    29006 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public            postgres    false    291            @           1259    29007 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    294            C           1259    29008 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    294            F           1259    29009 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     ?   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    297            I           1259    29010 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    297            =           1259    29011     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public            postgres    false    293            L           1259    29012 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public            postgres    false    299            O           1259    29013 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public            postgres    false    299            V           1259    29014 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public            postgres    false    305            Y           1259    29015 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public            postgres    false    305            Z           2606    29016 H   Admin_department Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Admin_department"
    ADD CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 v   ALTER TABLE ONLY public."Admin_department" DROP CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins";
       public          postgres    false    3463    211    209            [           2606    29021 T   Admin_userinstitutionmap Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins";
       public          postgres    false    3463    211    213            \           2606    29026 R   instituteadmin_profile InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins    FK CONSTRAINT     ?   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins" FOREIGN KEY (institutionid_id) REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins";
       public          postgres    false    3463    211    215            ]           2606    29031 N   instituteadmin_profile InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT "InstituteAdmin_profile_user_id_14381fb1_fk_auth_user_id";
       public          postgres    false    3644    293    215            ^           2606    29036 Y   teacher_announcements_to_list Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a" FOREIGN KEY (announcements_id) REFERENCES public.teacher_announcements(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a";
       public          postgres    false    3479    219    217            _           2606    29041 S   teacher_announcements_to_list Teacher_announcement_profile_id_f1306085_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT "Teacher_announcement_profile_id_f1306085_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT "Teacher_announcement_profile_id_f1306085_fk_Institute";
       public          postgres    false    3469    215    217            `           2606    29046 G   Teacher_answer Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId";
       public          postgres    false    3587    267    221            a           2606    29051 G   Teacher_assignment Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m";
       public          postgres    false    3561    255    223            b           2606    29056 S   Teacher_assignmentupload Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a" FOREIGN KEY ("AssignmentId_id") REFERENCES public."Teacher_assignment"("Assignment_id") DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a";
       public          postgres    false    225    3485    223            c           2606    29061 S   Teacher_course_AssignToTeacher Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_Assig_course_id_6e23d5c6_fk_Teacher_c";
       public          postgres    false    231    229    3501            d           2606    29066 T   Teacher_course_AssignToTeacher Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher"
    ADD CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_AssignToTeacher" DROP CONSTRAINT "Teacher_course_Assig_profile_id_c7bc3de8_fk_Institute";
       public          postgres    false    3469    215    229            e           2606    29071 P   Teacher_course_DepartmentId Teacher_course_Depar_course_id_e2919890_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Depar_course_id_e2919890_fk_Teacher_c";
       public          postgres    false    3501    231    233            f           2606    29076 T   Teacher_course_DepartmentId Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId"
    ADD CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep" FOREIGN KEY (department_id) REFERENCES public."Admin_department"("DepartmentId") DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_DepartmentId" DROP CONSTRAINT "Teacher_course_Depar_department_id_dcd4b073_fk_Admin_dep";
       public          postgres    false    3461    209    233            g           2606    29081 S   Teacher_course_EnrollToStudent Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_Enrol_course_id_7b22b175_fk_Teacher_c";
       public          postgres    false    3501    231    235            h           2606    29086 T   Teacher_course_EnrollToStudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    3469    215    235            i           2606    29091 Q   Teacher_course_InstitutionId Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_Insti_course_id_3244cce7_fk_Teacher_c";
       public          postgres    false    3501    231    237            j           2606    29096 V   Teacher_course_InstitutionId Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    3463    211    237            k           2606    29101 O   Teacher_courseassessment Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassess_CourseId_id_893c01bd_fk_Teacher_c";
       public          postgres    false    3501    231    239            l           2606    29106 Q   Teacher_courseregistration Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
    ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_CourseId_id_9e1bb196_fk_Teacher_c";
       public          postgres    false    3501    231    240            m           2606    29111 M   Teacher_courseregistration Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c" FOREIGN KEY ("Name_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregist_Name_id_92c9d933_fk_Teacher_c";
       public          postgres    false    3501    231    240            n           2606    29116 M   Teacher_coursesyllabus Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllab_courseId_id_6d1f2a8b_fk_Teacher_c";
       public          postgres    false    3501    231    241            o           2606    29121 D   Teacher_csvupload Teacher_csvupload_user_id_42769c97_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_user_id_42769c97_fk_auth_user_id";
       public          postgres    false    3644    293    243            p           2606    29126 N   Teacher_email_BCC Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId";
       public          postgres    false    245    3547    249            q           2606    29131 D   Teacher_email_BCC Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute";
       public          postgres    false    215    245    3469            r           2606    29136 L   Teacher_email_CC Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId";
       public          postgres    false    3547    247    249            s           2606    29141 B   Teacher_email_CC Teacher_email_CC_profile_id_8a708682_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute";
       public          postgres    false    247    3469    215            t           2606    29146 ?   teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY (email_from_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 k   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    3469    215    249            u           2606    29151 J   Teacher_email_Email_To Teacher_email_Email__email_id_789297dd_fk_Teacher_e    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e" FOREIGN KEY (email_id) REFERENCES public.teacher_email(emailid) DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e";
       public          postgres    false    3547    249    251            v           2606    29156 L   Teacher_email_Email_To Teacher_email_Email__profile_id_4ade4937_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute";
       public          postgres    false    3469    215    251            w           2606    29161 M   Teacher_folder Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id" FOREIGN KEY ("UserId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id";
       public          postgres    false    3469    215    253            x           2606    29166 M   teacher_module Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT "Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT "Teacher_module_CourseId_id_50aa9262_fk_Teacher_course_CourseId";
       public          postgres    false    3501    231    255            y           2606    29171 G   Teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    3561    255    257            z           2606    29176 T   Teacher_modulefilecontent Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m" FOREIGN KEY ("ModuleFileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m";
       public          postgres    false    3566    257    259            {           2606    29181 M   Teacher_modulesyllabus Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m" FOREIGN KEY ("courseId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m";
       public          postgres    false    3561    255    261            |           2606    29186 B   Teacher_progress Teacher_progress_user_id_dd1966fc_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_dd1966fc_fk_auth_user_id";
       public          postgres    false    3644    293    263            }           2606    29191 K   teacher_question Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId" FOREIGN KEY (quizid_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 w   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId";
       public          postgres    false    3587    267    265            ~           2606    29196 M   teacher_question Teacher_question_category_id_52ec7234_fk_Teacher_category_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id";
       public          postgres    false    265    3493    227                       2606    29201 I   teacher_quiz Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId" FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_CourseId_id_7da107e9_fk_Teacher_course_CourseId";
       public          postgres    false    231    267    3501            ?           2606    29206 G   teacher_quiz Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId" FOREIGN KEY (module_id) REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_Module_id_3b34f714_fk_Teacher_module_ModuleId";
       public          postgres    false    267    3561    255            ?           2606    29211 E   teacher_quiz Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_category_id_5d444d9d_fk_Teacher_category_id";
       public          postgres    false    3493    227    267            ?           2606    29216 G   Teacher_sitting Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId" FOREIGN KEY (quiz_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId";
       public          postgres    false    3587    267    269            ?           2606    29221 @   Teacher_sitting Teacher_sitting_user_id_a53fd1db_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id" FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_user_id_a53fd1db_fk_auth_user_id";
       public          postgres    false    269    3644    293            ?           2606    29226 T   Teacher_studentcourseprogress Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_CourseId_id_fe404be7_fk_Teacher_c";
       public          postgres    false    3501    271    231            ?           2606    29231 U   Teacher_studentcourseprogress Teacher_studentcours_StudentId_id_838739dd_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute";
       public          postgres    false    3469    271    215            ?           2606    29236 V   Teacher_studentmodulefileprogress Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m" FOREIGN KEY ("FileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m";
       public          postgres    false    273    3566    257            ?           2606    29241 X   Teacher_studentmodulefileprogress Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m";
       public          postgres    false    273    3561    255            ?           2606    29246 T   Teacher_studentmoduleprogress Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m";
       public          postgres    false    255    275    3561            ?           2606    29251 Y   Teacher_studentmodulefileprogress Teacher_studentmodul_StudentId_id_12135e51_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute";
       public          postgres    false    3469    273    215            ?           2606    29256 U   Teacher_studentmoduleprogress Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute";
       public          postgres    false    3469    275    215            ?           2606    29261 P   Teacher_studentquizprogress Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q";
       public          postgres    false    267    277    3587            ?           2606    29266 S   Teacher_studentquizprogress Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public.instituteadmin_profile(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute";
       public          postgres    false    3469    215    277            ?           2606    29271 K   Teacher_units Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId" FOREIGN KEY ("CourseId_id") REFERENCES public.teacher_course(courseid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_CourseId_id_f67d8790_fk_Teacher_course_CourseId";
       public          postgres    false    3501    279    231            ?           2606    29276 K   Teacher_units Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId" FOREIGN KEY ("ModuleId_id") REFERENCES public.teacher_module(moduleid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId";
       public          postgres    false    279    3561    255            ?           2606    29281 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public          postgres    false    289    3642    291            ?           2606    29286 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public          postgres    false    289    3631    287            ?           2606    29291 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public          postgres    false    291    3667    301            ?           2606    29296 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    287    3631    294            ?           2606    29301 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public          postgres    false    293    294    3644            ?           2606    29306 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    291    3642    297            ?           2606    29311 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 ?   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    293    3644    297            ?           2606    29316 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     ?   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public          postgres    false    301    299    3667            ?           2606    29321 B   django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
       public          postgres    false    293    3644    299            #   R   x?+?4?t??/IM?????O??L??RRJ8Sr3?8???t?t???-?M?-̍?L???Uf????? m$\      %   p   x?+?4?(??KN-??SN?????,?P?)??y?FFF?f?F
FV??V?FzƆ?&???V??*??+.?,)-I?(?O??I?N.JM?+??/?7?+?K?????? |N(0      '      x?????? ? ?      /      x?????? ? ?      1      x?????? ? ?      3      x?????? ? ?      7      x?????? ? ?      ;      x?3?4?4?????? ?X      =      x?????? ? ?      ?      x?3?4?4?????? ?X      A      x?????? ? ?      B      x?????? ? ?      C   G   x?3?t?/-*N????IL*-?70?w
qu?7462???+)?O)M.??ϋw+4??H?+HI?4?????? ???      E      x?????? ? ?      G      x?????? ? ?      I      x?????? ? ?      M      x?????? ? ?      O      x?????? ? ?      S      x?????? ? ?      U      x?????? ? ?      W      x?????? ? ?      Y      x?????? ? ?      _      x?????? ? ?      a      x?????? ? ?      c      x?????? ? ?      e      x?????? ? ?      g      x?????? ? ?      i      x?????? ? ?      k   ?   x?}?Kn?0D??)t"?/??1?q??Na???R$MQ????0CJ0^?iv????R?~>`^??????k??}n??TT??C?S????8K^??f!???^~??'!??Y%?5*)~??A???R?
??8+9t???????[S,D?թ-??>I?3?$??awVQ??a?zݧ??'??>?3k????;l?      m   X   x?3?tL????4202?54?5?T04?24?25ҳ47?????,I,?TH?K??KM-??KWHI-H,*?M?+?,!V?+B?gVA:W? ??#?      o   I   x?3?LL????4202?50?56P04?24?20?315?L?%ol?gfl???U?OSH,NLI?K???????? ???      q      x?????? ? ?      s      x?????? ? ?      u   ?  x?}?ͮ?6???S?	?e;???h?(?Oj ?S?????+??HJ??b?;ʡBRr??k?????????aږϢ,????????#??}P1h=xæAb????q???c??&8{?s\?q???[??Js
Dw??H?E????EEz??????2???z???)??ͣ/DJ????H?V?.p??:,E?MY???Y?z ??????w???j???o?????j???5?w?Cǈ)??H?!?w?Wģ??Wg??ޮb??z?Wm?a|2??wf?g?T?3??&r?!?* ????n??ou??Ĉ?T?k?)\???ѥ?E?kػU(g?2??????U9??h ??? D???7 ?:ۥ?ӳ]?~1?&?Mj!??˓J??E?????2?PW????6??e{?L.\k9?cU?i㒴?0Mc??E}iֻ?$WW???>'
??Z?Fѭ?U?i?JZ??f?[Ir?}???>?1?ljUt??HUo???HQj??f?N??}Y????Z?'ӜuW%$4T?J?K?
m?JvPb?y????o????x2?*0F?Q???B7D?raƻ!??9}????\S[?U? ?RW&=ޞc?n???m?+J8u?q?M???????@C@???y?f9??i?֢?????V?x ???;0???yhl0??n??8?w??2?w%?$8y?є??l+?S:?????+??[AT?[=??9?M?ǜay'??Y?׹?,?? ^???Bf??*m??5?^?+\???Q.?JuN?? x??O?%Y+?7z??'??,??$????v??????K?ɎAo??r?`??Un?2K?=?W???ɬ??&^?N?%??ܑx?h??m?t/*8???\UW?G??l????MP??Ȟu8??????Nÿ?s??????HVۮ,?l?R?????JL?c?H+?
??? ??~?????????Kt??????V?Lpz???&0???_
??ǣ?kw??Ш????@j?!???9sK?:uS?2?.H??2M????knQ?э'?о??Hmrby??&$?ɍ??M?f$????m?????KQ?e?p??1???*#`M?c?ys??\?óE????U????3@h? Q??V???X????c?oE?7?S5?Qz??*IM?{??EEj????=??=?W??RUdF?^nXW???????Љ?̨???TqT?p?m?}#???L?8??D?U????D?U???I???"?H??Q?i?u????D?<?T?L?Z??U?k&Z?U?*m?D??"N??\???e??????V5??0?S#hU_?j??8?V???2??#踋?2??\ǳp?????}0CQ??cd?0?0o?p???iާ??0슰Acb???M$?`S?j?#Q0?E?A$A?;????7??ta????j??????ȗ$Ea??G???1??*??      w   ?  x???Mo?0???W?}?e{l>|?J{?CϽ??BH?|????촕Hڪݍ"?? ?_?3F?:w|ܳ??l`?Ж}?~.?-88?#왃?0	??Z??i????[z~`B??E?????~?sE[?
c!c%@?Ec??h???#1f=#?Ծ?????m>K?Z?Y?s?_??C.E???`?q????6^Q?vlw?iܝhzC/?2??0?g?X???	BZ?y?g??4??j??}չ???K?H?D??s??ƪ|?μ/݂C?h.^C~aʜk\?X??̿_ %??"??$?iO??@?? a??? 󰊄=?}SҺ?u4n쫺9? OĶ'???Í???fBRh?`뜼???.?c??????U=_??lf?B+?_?Lꏂ-;????$?u0mx???gNF?=?ؗQ=?㟹??~??K?ӋT,U,????R?L?+???JL?I???)5vS??͚@?O	????4??R=1&????T???;Q?r????ǔ??ȵ???k1?N?n<???[?I??S?ꂳC?\?` M?%yy????09?*U&o???????/?rP?ce?3??b?Մ??1eE5?.Į??g?|S?8W??,~5zS1ޔ?????y&??;??E?3!}???y??/???t.???]???xE7M?      x      x?????? ? ?      {      x?????? ? ?      }      x?????? ? ?         O  x?mR?r? <???H???c?=?Bm?0??E?N??ŏ????V?Vgj?c?kt1?A0???MFCd??":?4?qa?뽋?,?'?} #\????3{[???hb?3vٰ?-????H????܀?
q?2?9?@??00??[QQ?^E?>[??b>B?ǂ?~HY???jf?+?w2??%N?D~) ?4?f???6??6?~^???0?WoI??J????h?!w?#-??u-m}??Z??r?{2?m? ? ???D???X?{O?i?^ ?*???M&?6?ZZ?????????K??zղr??????|r=???@?޷???????+?|???       ?   ?  x???Oo?0???S?}U4c??m?{ﱒe?X?S5?~M????6?p???g?<?_??? ?v????B^?????H???5p?Bs?p U??h?/???0B?&??Y???HՀ??D??=???%ڧ
V?d?0??T?ִg?Չ#4?`?r??xe?&?5Q\p???MEt??dT??`?auj?ks:?b8(TE?(?FIJm?????{????]?f?K#L????23?K??z?G3?]?T@Y6?L?h?G?d???y?le??|?ގ]?j??@UpXpt?-sz????!?!??????=i}\??S?w?_?-??=?7s\??R?K???%9y?
?'??,.ï?Ы?Op??[A?w'}????!??;Ϧ?O ?d?r ???u?[۱?5]9?(
L}??)???)??LC?h]???)?<o*T??z??]VO?^????U?H????W??侽w??/-&s?	V???~?Z?f?G?????p8?(?A      ?   X  x??ɒ?0  ?s?s???@??hA?f???0(?? ?|}????u5|>W$7""??j?8?H8g???ky?O????㬘n$?d;?u?&?'??y~K
??M????????D)w؍!Y<1s`??ɖj?Y'۱????$O???? ???2????7??񮏍Ӭ????K??n_j????ɑ?T;?l?-?????Eb+???ln;???M;?ﭹ???*>?7ң??*?M{??d?ig?K^?{?o??ҷ?O?<U/E????5??J??'6?p??@0 ??oY?wTz??
?蟭0Ӷ?????h??}!??@?G??D\c??????_????\,?1F{?      )   ?   x????
?0F盧p???'A???E(??\ll#I-Z?_Aqv????|h_?????????<>???bϷ
D-qK!l`?|`?\RՒޑ?9%?~s؃#B???????AjW??q?h)??G???d?1/?-?      -   Q   x?3?N????)V(.I,*IM???R?b?)??y??B???(Z??X?陙???i?Zp??qqq ?q?      +      x?3?4?4?????? ?X      5   =   x?3?/?,)I??,?LL????4202?50?54??2??????K%J?!??s Q*c???? ?!H      9   ?   x??ͱ
?0????%???$JF}???!Uhޟ
Bq:>?Eѧ?6?V;??ԵT???i??
?Gq????Y?+Ӊ1?c̀?&?.?QK???v??a?f?vǞ:&??*????????Of?????6      K   e   x?3??K-WH?/-*N3??L?Ĕ??N???????????J?LJ*????????????????????????????gbJnf1JJ?0? 5?Ӑ??+F??? w?#?      Q   ?   x???OO?0???O????L?-=?y??^??4Y?@=???]???i?yӼ??^???8?&???5?K???%-?~?b?>??d,??foPR???+???D>?9?qX???m?._?@yb???-??W?
?zC?a??FԹ܁???G?Im?>??q??4t??/??m?8?q????hry'????~׳6W?G?6?X???t?߿?*????YZc?<??rjk?B?OD?;      [   ?   x?u?A
?0EדS??d?T?e??	?K4P?`???????030??? ״?qe?????<??V?????- M3???? ?Qf\dBR?????FF;¥???|=???*/?10?B???b??q?b?VD"?????>ڟ?o?t?????a?\\-X.5)!?	??TH      ]   ?   x???Mn? ???)?@P0gɆ?5?&qD?o?q^T???'???}3
?s??4?^?˒VH5U?R?t??[Z	??L?\hU??ht??r??OR???R??z?0?v?1^K?u?e?yN?/XO?q??t?po???0?w?[??????AQʣ?B????BK?0X???c???c~?)?ymC?y??W??'6??????Vz?0??c?? ??     