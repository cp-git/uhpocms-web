PGDMP         2                {            uhpocms    14.7    14.7 -   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    uhpocms    DATABASE     k   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE uhpocms;
                postgres    false            �            1259    16395    admin_department    TABLE       CREATE TABLE public.admin_department (
    isactive boolean,
    departmentid integer NOT NULL,
    name text,
    description text,
    createdby text,
    createdon timestamp with time zone,
    modifiedby text,
    modifiedon timestamp with time zone,
    institutionid_id integer
);
 $   DROP TABLE public.admin_department;
       public         heap    postgres    false            �            1259    16400 !   Admin_department_DepartmentId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_department_DepartmentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public."Admin_department_DepartmentId_seq";
       public          postgres    false    209            �           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Admin_department_DepartmentId_seq" OWNED BY public.admin_department.departmentid;
          public          postgres    false    210            �            1259    16401    Admin_institution    TABLE     9  CREATE TABLE public."Admin_institution" (
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
       public         heap    postgres    false            �            1259    16406 #   Admin_institution_InstitutionId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_institution_InstitutionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Admin_institution_InstitutionId_seq";
       public          postgres    false    211            �           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Admin_institution_InstitutionId_seq" OWNED BY public."Admin_institution"."InstitutionId";
          public          postgres    false    212            �            1259    16407 
   Admin_role    TABLE     E  CREATE TABLE public."Admin_role" (
    "isActive" boolean,
    "RoleId" integer NOT NULL,
    "RoleName" text NOT NULL,
    "RoleDescription" text NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL
);
     DROP TABLE public."Admin_role";
       public         heap    postgres    false            �            1259    16412    Admin_role_RoleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_role_RoleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Admin_role_RoleId_seq";
       public          postgres    false    213            �           0    0    Admin_role_RoleId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Admin_role_RoleId_seq" OWNED BY public."Admin_role"."RoleId";
          public          postgres    false    214            �            1259    16413    Admin_userinstitutionmap    TABLE     5  CREATE TABLE public."Admin_userinstitutionmap" (
    "isActive" boolean,
    "Id" integer NOT NULL,
    "CreatedBy" text NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL,
    "InstitutionId_id" integer NOT NULL
);
 .   DROP TABLE public."Admin_userinstitutionmap";
       public         heap    postgres    false            �            1259    16418    Admin_userinstitutionmap_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_userinstitutionmap_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Admin_userinstitutionmap_Id_seq";
       public          postgres    false    215            �           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Admin_userinstitutionmap_Id_seq" OWNED BY public."Admin_userinstitutionmap"."Id";
          public          postgres    false    216            �            1259    16419    InstituteAdmin_profile    TABLE     �  CREATE TABLE public."InstituteAdmin_profile" (
    "isActive" boolean,
    id integer NOT NULL,
    "UserRole" text NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(100),
    "Dob" character varying(100),
    "MobileNo" text,
    gender text,
    department integer,
    "Address1" text,
    "Address2" text,
    "City" text,
    "State" text,
    "Zip" text,
    profile_pics character varying(100),
    "CreatedBy" text,
    "CreatedDate" timestamp with time zone,
    "UpdatedBy" text,
    "UpdatedDate" timestamp with time zone,
    "InstitutionId_id" integer,
    user_id integer NOT NULL
);
 ,   DROP TABLE public."InstituteAdmin_profile";
       public         heap    postgres    false            �            1259    16424    InstituteAdmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InstituteAdmin_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."InstituteAdmin_profile_id_seq";
       public          postgres    false    217            �           0    0    InstituteAdmin_profile_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."InstituteAdmin_profile_id_seq" OWNED BY public."InstituteAdmin_profile".id;
          public          postgres    false    218            �            1259    16425    Teacher_announcements    TABLE        CREATE TABLE public."Teacher_announcements" (
    id integer NOT NULL,
    "Announcement_title" character varying(100),
    "Announcement_message" text,
    "To" character varying(50),
    "ReadBy" character varying(50),
    "CreatedBy" text,
    "Created_On" timestamp with time zone
);
 +   DROP TABLE public."Teacher_announcements";
       public         heap    postgres    false            �            1259    16430    Teacher_announcements_To_List    TABLE     �   CREATE TABLE public."Teacher_announcements_To_List" (
    id integer NOT NULL,
    announcements_id integer NOT NULL,
    profile_id integer NOT NULL
);
 3   DROP TABLE public."Teacher_announcements_To_List";
       public         heap    postgres    false            �            1259    16433 $   Teacher_announcements_To_List_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_To_List_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_announcements_To_List_id_seq";
       public          postgres    false    220            �           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_announcements_To_List_id_seq" OWNED BY public."Teacher_announcements_To_List".id;
          public          postgres    false    221            �            1259    16434    Teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_announcements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."Teacher_announcements_id_seq";
       public          postgres    false    219            �           0    0    Teacher_announcements_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_announcements_id_seq" OWNED BY public."Teacher_announcements".id;
          public          postgres    false    222            �            1259    16435    Teacher_answer    TABLE     0  CREATE TABLE public."Teacher_answer" (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    correct boolean NOT NULL,
    "questionOrderNo" integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    CONSTRAINT "Teacher_answer_questionOrderNo_check" CHECK (("questionOrderNo" >= 0))
);
 $   DROP TABLE public."Teacher_answer";
       public         heap    postgres    false            �            1259    16441    Teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Teacher_answer_id_seq";
       public          postgres    false    223            �           0    0    Teacher_answer_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Teacher_answer_id_seq" OWNED BY public."Teacher_answer".id;
          public          postgres    false    224            �            1259    16442    Teacher_assignment    TABLE       CREATE TABLE public."Teacher_assignment" (
    "CourseId" integer,
    "Assignment_id" integer NOT NULL,
    "Assignment_Name" character varying(200),
    "File" character varying(100),
    "Created_on" timestamp with time zone NOT NULL,
    "ModuleId_id" integer
);
 (   DROP TABLE public."Teacher_assignment";
       public         heap    postgres    false            �            1259    16445 $   Teacher_assignment_Assignment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignment_Assignment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_assignment_Assignment_id_seq";
       public          postgres    false    225            �           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_assignment_Assignment_id_seq" OWNED BY public."Teacher_assignment"."Assignment_id";
          public          postgres    false    226            �            1259    16446    Teacher_assignmentupload    TABLE     �  CREATE TABLE public."Teacher_assignmentupload" (
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
       public         heap    postgres    false            �            1259    16451 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq";
       public          postgres    false    227            �           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Teacher_assignmentupload_AssignmentUpload_id_seq" OWNED BY public."Teacher_assignmentupload"."AssignmentUpload_id";
          public          postgres    false    228            �            1259    16452    Teacher_category    TABLE     i   CREATE TABLE public."Teacher_category" (
    id integer NOT NULL,
    category character varying(250)
);
 &   DROP TABLE public."Teacher_category";
       public         heap    postgres    false            �            1259    16455    Teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_category_id_seq";
       public          postgres    false    229            �           0    0    Teacher_category_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_category_id_seq" OWNED BY public."Teacher_category".id;
          public          postgres    false    230            �            1259    16456    teacher_course_assigntoteacher    TABLE     �   CREATE TABLE public.teacher_course_assigntoteacher (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_assigntoteacher;
       public         heap    postgres    false            �            1259    16459 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_AssignToTeacher_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_AssignToTeacher_id_seq";
       public          postgres    false    231            �           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_course_AssignToTeacher_id_seq" OWNED BY public.teacher_course_assigntoteacher.id;
          public          postgres    false    232            �            1259    16460    teacher_course_departmentid    TABLE     �   CREATE TABLE public.teacher_course_departmentid (
    id integer NOT NULL,
    course_id integer NOT NULL,
    department_id integer NOT NULL
);
 /   DROP TABLE public.teacher_course_departmentid;
       public         heap    postgres    false            �            1259    16463 "   Teacher_course_DepartmentId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_DepartmentId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_course_DepartmentId_id_seq";
       public          postgres    false    233            �           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Teacher_course_DepartmentId_id_seq" OWNED BY public.teacher_course_departmentid.id;
          public          postgres    false    234            �            1259    16464    Teacher_course_EnrollToStudent    TABLE     �   CREATE TABLE public."Teacher_course_EnrollToStudent" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 4   DROP TABLE public."Teacher_course_EnrollToStudent";
       public         heap    postgres    false            �            1259    16467 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_EnrollToStudent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Teacher_course_EnrollToStudent_id_seq";
       public          postgres    false    235            �           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."Teacher_course_EnrollToStudent_id_seq" OWNED BY public."Teacher_course_EnrollToStudent".id;
          public          postgres    false    236            �            1259    16468    Teacher_course_InstitutionId    TABLE     �   CREATE TABLE public."Teacher_course_InstitutionId" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    institution_id integer NOT NULL
);
 2   DROP TABLE public."Teacher_course_InstitutionId";
       public         heap    postgres    false            �            1259    16471 #   Teacher_course_InstitutionId_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_course_InstitutionId_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."Teacher_course_InstitutionId_id_seq";
       public          postgres    false    237            �           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Teacher_course_InstitutionId_id_seq" OWNED BY public."Teacher_course_InstitutionId".id;
          public          postgres    false    238            �            1259    16472    Teacher_courseassessment    TABLE     `  CREATE TABLE public."Teacher_courseassessment" (
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
       public         heap    postgres    false            �            1259    16477    Teacher_courseregistration    TABLE     �  CREATE TABLE public."Teacher_courseregistration" (
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
       public         heap    postgres    false            �            1259    16482    Teacher_coursesyllabus    TABLE     �   CREATE TABLE public."Teacher_coursesyllabus" (
    "Id" integer NOT NULL,
    "syllabusFile" character varying(100),
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_coursesyllabus";
       public         heap    postgres    false            �            1259    16485    Teacher_coursesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_coursesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_coursesyllabus_Id_seq";
       public          postgres    false    241            �           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_coursesyllabus_Id_seq" OWNED BY public."Teacher_coursesyllabus"."Id";
          public          postgres    false    242            �            1259    16486    Teacher_csvupload    TABLE     �   CREATE TABLE public."Teacher_csvupload" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    file character varying(100) NOT NULL,
    completed boolean NOT NULL,
    user_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_csvupload";
       public         heap    postgres    false            �            1259    16489    Teacher_csvupload_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_csvupload_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_csvupload_id_seq";
       public          postgres    false    243            �           0    0    Teacher_csvupload_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_csvupload_id_seq" OWNED BY public."Teacher_csvupload".id;
          public          postgres    false    244            �            1259    16490    Teacher_email    TABLE     �  CREATE TABLE public."Teacher_email" (
    "EmailId" integer NOT NULL,
    "Title" text NOT NULL,
    "Subject" text NOT NULL,
    "Content" character varying(500) NOT NULL,
    "CreatedOn" timestamp with time zone NOT NULL,
    "CreatedBy" text NOT NULL,
    "ModifiedOn" timestamp with time zone NOT NULL,
    "ModifiedBy" text NOT NULL,
    status boolean NOT NULL,
    "readStatus" boolean NOT NULL,
    "AttachFile" character varying(100) NOT NULL,
    "Email_From_id" integer
);
 #   DROP TABLE public."Teacher_email";
       public         heap    postgres    false            �            1259    16495    Teacher_email_BCC    TABLE     �   CREATE TABLE public."Teacher_email_BCC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 '   DROP TABLE public."Teacher_email_BCC";
       public         heap    postgres    false            �            1259    16498    Teacher_email_BCC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_BCC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_email_BCC_id_seq";
       public          postgres    false    246            �           0    0    Teacher_email_BCC_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Teacher_email_BCC_id_seq" OWNED BY public."Teacher_email_BCC".id;
          public          postgres    false    247            �            1259    16499    Teacher_email_CC    TABLE     �   CREATE TABLE public."Teacher_email_CC" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_email_CC";
       public         heap    postgres    false            �            1259    16502    Teacher_email_CC_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_CC_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_email_CC_id_seq";
       public          postgres    false    248            �           0    0    Teacher_email_CC_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_email_CC_id_seq" OWNED BY public."Teacher_email_CC".id;
          public          postgres    false    249            �            1259    16503    Teacher_email_EmailId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_EmailId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_email_EmailId_seq";
       public          postgres    false    245            �           0    0    Teacher_email_EmailId_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Teacher_email_EmailId_seq" OWNED BY public."Teacher_email"."EmailId";
          public          postgres    false    250            �            1259    16504    Teacher_email_Email_To    TABLE     �   CREATE TABLE public."Teacher_email_Email_To" (
    id integer NOT NULL,
    email_id integer NOT NULL,
    profile_id integer NOT NULL
);
 ,   DROP TABLE public."Teacher_email_Email_To";
       public         heap    postgres    false            �            1259    16507    Teacher_email_Email_To_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_email_Email_To_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_email_Email_To_id_seq";
       public          postgres    false    251            �           0    0    Teacher_email_Email_To_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."Teacher_email_Email_To_id_seq" OWNED BY public."Teacher_email_Email_To".id;
          public          postgres    false    252            �            1259    16508    Teacher_folder    TABLE     }   CREATE TABLE public."Teacher_folder" (
    "FolderId" integer NOT NULL,
    "Name" text NOT NULL,
    "UserId_id" integer
);
 $   DROP TABLE public."Teacher_folder";
       public         heap    postgres    false            �            1259    16513    Teacher_folder_FolderId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_folder_FolderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_folder_FolderId_seq";
       public          postgres    false    253            �           0    0    Teacher_folder_FolderId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_folder_FolderId_seq" OWNED BY public."Teacher_folder"."FolderId";
          public          postgres    false    254            �            1259    16514    Teacher_module    TABLE     �  CREATE TABLE public."Teacher_module" (
    "isActive" boolean,
    "ModuleId" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" character varying(100) NOT NULL,
    "StartDate" date,
    "EndDate" date,
    course integer,
    "ModuleOrderNo" integer,
    "CreatedBy" text,
    "CreatedDate" timestamp with time zone NOT NULL,
    "UpdatedBy" text,
    "UpdatedDate" timestamp with time zone NOT NULL,
    "CourseId_id" integer
);
 $   DROP TABLE public."Teacher_module";
       public         heap    postgres    false                        1259    16519    Teacher_module_ModuleId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_module_ModuleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Teacher_module_ModuleId_seq";
       public          postgres    false    255            �           0    0    Teacher_module_ModuleId_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Teacher_module_ModuleId_seq" OWNED BY public."Teacher_module"."ModuleId";
          public          postgres    false    256                       1259    16520    Teacher_modulefile    TABLE     M  CREATE TABLE public."Teacher_modulefile" (
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
       public         heap    postgres    false                       1259    16525    Teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Teacher_modulefile_id_seq";
       public          postgres    false    257                        0    0    Teacher_modulefile_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_modulefile_id_seq" OWNED BY public."Teacher_modulefile".id;
          public          postgres    false    258                       1259    16526    Teacher_modulefilecontent    TABLE       CREATE TABLE public."Teacher_modulefilecontent" (
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
       public         heap    postgres    false                       1259    16531     Teacher_modulefilecontent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulefilecontent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Teacher_modulefilecontent_id_seq";
       public          postgres    false    259                       0    0     Teacher_modulefilecontent_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Teacher_modulefilecontent_id_seq" OWNED BY public."Teacher_modulefilecontent".id;
          public          postgres    false    260                       1259    16532    Teacher_modulesyllabus    TABLE     7  CREATE TABLE public."Teacher_modulesyllabus" (
    "Id" integer NOT NULL,
    "oneDriveLink" character varying(1000),
    "syllabusFile" character varying(100),
    "imgFilePath" character varying(1000),
    "imgCount" integer NOT NULL,
    "fileOrderNo" integer NOT NULL,
    "courseId_id" integer NOT NULL
);
 ,   DROP TABLE public."Teacher_modulesyllabus";
       public         heap    postgres    false                       1259    16537    Teacher_modulesyllabus_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_modulesyllabus_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Teacher_modulesyllabus_Id_seq";
       public          postgres    false    261                       0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Teacher_modulesyllabus_Id_seq" OWNED BY public."Teacher_modulesyllabus"."Id";
          public          postgres    false    262                       1259    16538    Teacher_progress    TABLE     �   CREATE TABLE public."Teacher_progress" (
    id integer NOT NULL,
    score character varying(1024) NOT NULL,
    correct_answer character varying(10) NOT NULL,
    wrong_answer character varying(10) NOT NULL,
    user_id integer NOT NULL
);
 &   DROP TABLE public."Teacher_progress";
       public         heap    postgres    false                       1259    16543    Teacher_progress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_progress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_progress_id_seq";
       public          postgres    false    263                       0    0    Teacher_progress_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_progress_id_seq" OWNED BY public."Teacher_progress".id;
          public          postgres    false    264            	           1259    16544    Teacher_question    TABLE     �  CREATE TABLE public."Teacher_question" (
    id integer NOT NULL,
    figure character varying(100),
    content character varying(1000) NOT NULL,
    explanation text NOT NULL,
    "questionOrderNo" integer NOT NULL,
    "isMCQ" boolean NOT NULL,
    "QuizId_id" integer NOT NULL,
    category_id integer,
    CONSTRAINT "Teacher_question_questionOrderNo_check" CHECK (("questionOrderNo" >= 0))
);
 &   DROP TABLE public."Teacher_question";
       public         heap    postgres    false            
           1259    16550    Teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_question_id_seq";
       public          postgres    false    265                       0    0    Teacher_question_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Teacher_question_id_seq" OWNED BY public."Teacher_question".id;
          public          postgres    false    266                       1259    16551    teacher_quiz    TABLE     �  CREATE TABLE public.teacher_quiz (
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
    modifiedby character varying(255),
    createdby character varying(255),
    createdon timestamp without time zone,
    modifiedon timestamp without time zone,
    CONSTRAINT "Teacher_quiz_max_questions_check" CHECK ((max_questions >= 0)),
    CONSTRAINT "Teacher_quiz_quizorderno_check" CHECK ((quizorderno >= 0))
);
     DROP TABLE public.teacher_quiz;
       public         heap    postgres    false                       1259    16558    Teacher_quiz_QuizId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_quiz_QuizId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_quiz_QuizId_seq";
       public          postgres    false    267                       0    0    Teacher_quiz_QuizId_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_quiz_QuizId_seq" OWNED BY public.teacher_quiz.quizid;
          public          postgres    false    268                       1259    16559    Teacher_sitting    TABLE     �  CREATE TABLE public."Teacher_sitting" (
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
       public         heap    postgres    false                       1259    16564    Teacher_sitting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_sitting_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Teacher_sitting_id_seq";
       public          postgres    false    269                       0    0    Teacher_sitting_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Teacher_sitting_id_seq" OWNED BY public."Teacher_sitting".id;
          public          postgres    false    270                       1259    16565    Teacher_studentcourseprogress    TABLE     3  CREATE TABLE public."Teacher_studentcourseprogress" (
    id integer NOT NULL,
    "Grade" numeric(5,2) NOT NULL,
    "CurrentModuleNo" integer NOT NULL,
    "CurrentUnitNo" integer NOT NULL,
    "CurrentAssignNo" integer NOT NULL,
    "CourseId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentcourseprogress";
       public         heap    postgres    false                       1259    16568 $   Teacher_studentcourseprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentcourseprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentcourseprogress_id_seq";
       public          postgres    false    271                       0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentcourseprogress_id_seq" OWNED BY public."Teacher_studentcourseprogress".id;
          public          postgres    false    272                       1259    16569 !   Teacher_studentmodulefileprogress    TABLE       CREATE TABLE public."Teacher_studentmodulefileprogress" (
    id integer NOT NULL,
    "fileCompleted" boolean NOT NULL,
    "CurrentFilePageNo" integer NOT NULL,
    "FileId_id" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 7   DROP TABLE public."Teacher_studentmodulefileprogress";
       public         heap    postgres    false                       1259    16572 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmodulefileprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public."Teacher_studentmodulefileprogress_id_seq";
       public          postgres    false    273                       0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public."Teacher_studentmodulefileprogress_id_seq" OWNED BY public."Teacher_studentmodulefileprogress".id;
          public          postgres    false    274                       1259    16573    Teacher_studentmoduleprogress    TABLE     �   CREATE TABLE public."Teacher_studentmoduleprogress" (
    id integer NOT NULL,
    "CurrentFileNo" integer NOT NULL,
    "CurrentQuizNo" integer NOT NULL,
    "ModuleId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL
);
 3   DROP TABLE public."Teacher_studentmoduleprogress";
       public         heap    postgres    false                       1259    16576 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentmoduleprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."Teacher_studentmoduleprogress_id_seq";
       public          postgres    false    275            	           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."Teacher_studentmoduleprogress_id_seq" OWNED BY public."Teacher_studentmoduleprogress".id;
          public          postgres    false    276                       1259    16577    Teacher_studentquizprogress    TABLE     W  CREATE TABLE public."Teacher_studentquizprogress" (
    id integer NOT NULL,
    score numeric(5,2) NOT NULL,
    completed boolean NOT NULL,
    num_attempts integer NOT NULL,
    "QuizId_id" integer NOT NULL,
    "StudentId_id" integer NOT NULL,
    CONSTRAINT "Teacher_studentquizprogress_num_attempts_check" CHECK ((num_attempts >= 0))
);
 1   DROP TABLE public."Teacher_studentquizprogress";
       public         heap    postgres    false                       1259    16581 "   Teacher_studentquizprogress_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_studentquizprogress_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Teacher_studentquizprogress_id_seq";
       public          postgres    false    277            
           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public."Teacher_studentquizprogress_id_seq" OWNED BY public."Teacher_studentquizprogress".id;
          public          postgres    false    278                       1259    16582    Teacher_units    TABLE     �  CREATE TABLE public."Teacher_units" (
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
       public         heap    postgres    false                       1259    16587    Teacher_units_UnitId_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_units_UnitId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Teacher_units_UnitId_seq";
       public          postgres    false    279                       0    0    Teacher_units_UnitId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Teacher_units_UnitId_seq" OWNED BY public."Teacher_units"."UnitId";
          public          postgres    false    280            G           1259    17253    accesscontrol    TABLE     t  CREATE TABLE public.accesscontrol (
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
       public         heap    postgres    false            F           1259    17252    accesscontrol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accesscontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.accesscontrol_id_seq;
       public          postgres    false    327                       0    0    accesscontrol_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.accesscontrol_id_seq OWNED BY public.accesscontrol.id;
          public          postgres    false    326                       1259    16591    admin_institution    TABLE     �  CREATE TABLE public.admin_institution (
    institutionid integer NOT NULL,
    createdby character varying(255) NOT NULL,
    createdon timestamp without time zone NOT NULL,
    description character varying(255) NOT NULL,
    isactive boolean NOT NULL,
    modifiedby character varying(255) NOT NULL,
    modifiedon timestamp without time zone NOT NULL,
    name character varying(255) NOT NULL,
    picture character varying(255) NOT NULL
);
 %   DROP TABLE public.admin_institution;
       public         heap    postgres    false                       1259    16596 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    281                       0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    282                       1259    16597 
   admin_role    TABLE     R  CREATE TABLE public.admin_role (
    role_id integer NOT NULL,
    created_by character varying(255),
    created_on timestamp without time zone,
    isactive boolean,
    modified_by character varying(255),
    modified_on timestamp without time zone,
    role_description character varying(255),
    role_name character varying(255)
);
    DROP TABLE public.admin_role;
       public         heap    postgres    false                       1259    16602    admin_role_role_id_seq    SEQUENCE        CREATE SEQUENCE public.admin_role_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.admin_role_role_id_seq;
       public          postgres    false    283                       0    0    admin_role_role_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.admin_role_role_id_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    284                       1259    16603 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         heap    postgres    false                       1259    16606    auth_group_id_seq    SEQUENCE     z   CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public          postgres    false    285                       0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
          public          postgres    false    286                       1259    16607    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         heap    postgres    false                        1259    16610    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public          postgres    false    287                       0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
          public          postgres    false    288            !           1259    16611    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    routes character varying(100) NOT NULL,
    component character varying(100)
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            "           1259    16614    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    289                       0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    290            #           1259    16615 	   auth_user    TABLE     �  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    date_joined timestamp without time zone NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    is_superuser boolean NOT NULL,
    last_login timestamp without time zone,
    last_name character varying(255) NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.auth_user;
       public         heap    postgres    false            $           1259    16620    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         heap    postgres    false            %           1259    16623    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public          postgres    false    292                       0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
          public          postgres    false    293            &           1259    16624    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    291                       0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    294            '           1259    16625    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false            (           1259    16628 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    295                       0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    296            )           1259    16629    django_admin_log    TABLE     �  CREATE TABLE public.django_admin_log (
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
       public         heap    postgres    false            *           1259    16635    django_admin_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public          postgres    false    297                       0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
          public          postgres    false    298            +           1259    16636    django_content_type    TABLE     �   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         heap    postgres    false            ,           1259    16639    django_content_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public          postgres    false    299                       0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
          public          postgres    false    300            -           1259    16640    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap    postgres    false            .           1259    16645    django_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public          postgres    false    301                       0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
          public          postgres    false    302            /           1259    16646    django_session    TABLE     �   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         heap    postgres    false            0           1259    16651    instituteadmin_profile    TABLE     !  CREATE TABLE public.instituteadmin_profile (
    id integer NOT NULL,
    isactive boolean,
    address1 character varying(255),
    address2 character varying(255),
    city character varying(255),
    department integer,
    email character varying(255),
    gender character varying(255),
    state character varying(255),
    zip character varying(255),
    createdby character varying(255),
    createddate timestamp without time zone,
    dob character varying(255),
    first_name character varying(255),
    institutionid_id integer,
    last_name character varying(255),
    mobileno character varying(255),
    updatedby character varying(255),
    updateddate timestamp without time zone,
    profile_pics character varying(255),
    user_id integer,
    userrole character varying(255)
);
 *   DROP TABLE public.instituteadmin_profile;
       public         heap    postgres    false            1           1259    16656    instituteadmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.instituteadmin_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.instituteadmin_profile_id_seq;
       public          postgres    false    304                       0    0    instituteadmin_profile_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.instituteadmin_profile_id_seq OWNED BY public.instituteadmin_profile.id;
          public          postgres    false    305            2           1259    16657    teacher_announcements    TABLE     =  CREATE TABLE public.teacher_announcements (
    id integer NOT NULL,
    createdby character varying(255),
    created_on timestamp without time zone,
    announcement_message character varying(255),
    readby character varying(255),
    announcement_title character varying(255),
    "to" character varying(255)
);
 )   DROP TABLE public.teacher_announcements;
       public         heap    postgres    false            3           1259    16662    teacher_announcements_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.teacher_announcements_id_seq;
       public          postgres    false    306                       0    0    teacher_announcements_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.teacher_announcements_id_seq OWNED BY public.teacher_announcements.id;
          public          postgres    false    307            4           1259    16663    teacher_announcements_to_list    TABLE     �   CREATE TABLE public.teacher_announcements_to_list (
    id integer NOT NULL,
    announcements_id integer,
    profile_id integer
);
 1   DROP TABLE public.teacher_announcements_to_list;
       public         heap    postgres    false            5           1259    16666 $   teacher_announcements_to_list_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_announcements_to_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.teacher_announcements_to_list_id_seq;
       public          postgres    false    308                       0    0 $   teacher_announcements_to_list_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.teacher_announcements_to_list_id_seq OWNED BY public.teacher_announcements_to_list.id;
          public          postgres    false    309            6           1259    16667    teacher_category    TABLE     !  CREATE TABLE public.teacher_category (
    id integer NOT NULL,
    category character varying(255),
    createdby character varying(255),
    createdon timestamp without time zone,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone
);
 $   DROP TABLE public.teacher_category;
       public         heap    postgres    false            7           1259    16672    teacher_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teacher_category_id_seq;
       public          postgres    false    310                       0    0    teacher_category_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teacher_category_id_seq OWNED BY public.teacher_category.id;
          public          postgres    false    311            8           1259    16673    teacher_course    TABLE     �  CREATE TABLE public.teacher_course (
    courseid integer NOT NULL,
    coursecode character varying(255),
    createdby character varying(255),
    createddate timestamp without time zone NOT NULL,
    description character varying(255) NOT NULL,
    isactive boolean,
    name character varying(255) NOT NULL,
    coursetype character varying(255),
    updatedby character varying(255),
    updateddate timestamp without time zone NOT NULL,
    instid integer,
    passingscore character varying(255)
);
 "   DROP TABLE public.teacher_course;
       public         heap    postgres    false            9           1259    16678    teacher_course_courseid_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_courseid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.teacher_course_courseid_seq;
       public          postgres    false    312                       0    0    teacher_course_courseid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.teacher_course_courseid_seq OWNED BY public.teacher_course.courseid;
          public          postgres    false    313            :           1259    16679    teacher_course_enrolltostudent    TABLE     �   CREATE TABLE public.teacher_course_enrolltostudent (
    id integer NOT NULL,
    course_id integer NOT NULL,
    profile_id integer NOT NULL
);
 2   DROP TABLE public.teacher_course_enrolltostudent;
       public         heap    postgres    false            ;           1259    16682 %   teacher_course_enrolltostudent_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_enrolltostudent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.teacher_course_enrolltostudent_id_seq;
       public          postgres    false    314                       0    0 %   teacher_course_enrolltostudent_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.teacher_course_enrolltostudent_id_seq OWNED BY public.teacher_course_enrolltostudent.id;
          public          postgres    false    315            <           1259    16683    teacher_course_institutionid    TABLE     �   CREATE TABLE public.teacher_course_institutionid (
    id integer NOT NULL,
    course_id integer,
    institution_id integer
);
 0   DROP TABLE public.teacher_course_institutionid;
       public         heap    postgres    false            =           1259    16686 #   teacher_course_institutionid_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_course_institutionid_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.teacher_course_institutionid_id_seq;
       public          postgres    false    316                       0    0 #   teacher_course_institutionid_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.teacher_course_institutionid_id_seq OWNED BY public.teacher_course_institutionid.id;
          public          postgres    false    317            >           1259    16687    teacher_email    TABLE     �  CREATE TABLE public.teacher_email (
    emailid integer NOT NULL,
    attachfile character varying(255),
    content character varying(255),
    createdby character varying(255),
    createdon timestamp without time zone,
    email_from_id integer,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    readstatus boolean,
    status boolean,
    subject character varying(255),
    title character varying(255)
);
 !   DROP TABLE public.teacher_email;
       public         heap    postgres    false            ?           1259    16692    teacher_email_emailid_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_email_emailid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.teacher_email_emailid_seq;
       public          postgres    false    318                       0    0    teacher_email_emailid_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.teacher_email_emailid_seq OWNED BY public.teacher_email.emailid;
          public          postgres    false    319            @           1259    16693    teacher_module    TABLE       CREATE TABLE public.teacher_module (
    moduleid integer NOT NULL,
    isactive boolean,
    courseid_id integer,
    course integer,
    createdby character varying(255),
    createddate timestamp without time zone NOT NULL,
    description character varying(255) NOT NULL,
    enddate timestamp without time zone,
    name character varying(255) NOT NULL,
    moduleorderno integer,
    startdate timestamp without time zone,
    updatedby character varying(255),
    updateddate timestamp without time zone NOT NULL
);
 "   DROP TABLE public.teacher_module;
       public         heap    postgres    false            A           1259    16698    teacher_module_moduleid_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_module_moduleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.teacher_module_moduleid_seq;
       public          postgres    false    320                        0    0    teacher_module_moduleid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.teacher_module_moduleid_seq OWNED BY public.teacher_module.moduleid;
          public          postgres    false    321            B           1259    16699    teacher_modulefile    TABLE     n  CREATE TABLE public.teacher_modulefile (
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
       public         heap    postgres    false            C           1259    16704    teacher_modulefile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_modulefile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.teacher_modulefile_id_seq;
       public          postgres    false    322            !           0    0    teacher_modulefile_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.teacher_modulefile_id_seq OWNED BY public.teacher_modulefile.id;
          public          postgres    false    323            D           1259    16705    teacher_question    TABLE     <  CREATE TABLE public.teacher_question (
    id integer NOT NULL,
    category_id integer NOT NULL,
    content character varying(255) NOT NULL,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    explanation character varying(255) NOT NULL,
    figure character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    ismcq boolean NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    questionorderno integer NOT NULL,
    quizid_id integer NOT NULL
);
 $   DROP TABLE public.teacher_question;
       public         heap    postgres    false            E           1259    16710    teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teacher_question_id_seq;
       public          postgres    false    324            "           0    0    teacher_question_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teacher_question_id_seq OWNED BY public.teacher_question.id;
          public          postgres    false    325            �           2604    16711    Admin_institution InstitutionId    DEFAULT     �   ALTER TABLE ONLY public."Admin_institution" ALTER COLUMN "InstitutionId" SET DEFAULT nextval('public."Admin_institution_InstitutionId_seq"'::regclass);
 R   ALTER TABLE public."Admin_institution" ALTER COLUMN "InstitutionId" DROP DEFAULT;
       public          postgres    false    212    211            �           2604    16712    Admin_role RoleId    DEFAULT     |   ALTER TABLE ONLY public."Admin_role" ALTER COLUMN "RoleId" SET DEFAULT nextval('public."Admin_role_RoleId_seq"'::regclass);
 D   ALTER TABLE public."Admin_role" ALTER COLUMN "RoleId" DROP DEFAULT;
       public          postgres    false    214    213            �           2604    16713    Admin_userinstitutionmap Id    DEFAULT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_userinstitutionmap_Id_seq"'::regclass);
 N   ALTER TABLE public."Admin_userinstitutionmap" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    216    215            �           2604    16714    InstituteAdmin_profile id    DEFAULT     �   ALTER TABLE ONLY public."InstituteAdmin_profile" ALTER COLUMN id SET DEFAULT nextval('public."InstituteAdmin_profile_id_seq"'::regclass);
 J   ALTER TABLE public."InstituteAdmin_profile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    16715    Teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_announcements" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_id_seq"'::regclass);
 I   ALTER TABLE public."Teacher_announcements" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    219            �           2604    16716     Teacher_announcements_To_List id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_announcements_To_List" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_announcements_To_List_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_announcements_To_List" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    16717    Teacher_answer id    DEFAULT     z   ALTER TABLE ONLY public."Teacher_answer" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_answer_id_seq"'::regclass);
 B   ALTER TABLE public."Teacher_answer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    16718     Teacher_assignment Assignment_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignment" ALTER COLUMN "Assignment_id" SET DEFAULT nextval('public."Teacher_assignment_Assignment_id_seq"'::regclass);
 S   ALTER TABLE public."Teacher_assignment" ALTER COLUMN "Assignment_id" DROP DEFAULT;
       public          postgres    false    226    225            �           2604    16719 ,   Teacher_assignmentupload AssignmentUpload_id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" SET DEFAULT nextval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"'::regclass);
 _   ALTER TABLE public."Teacher_assignmentupload" ALTER COLUMN "AssignmentUpload_id" DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16720    Teacher_category id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_category" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_category_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_category" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    16721 !   Teacher_course_EnrollToStudent id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_EnrollToStudent_id_seq"'::regclass);
 R   ALTER TABLE public."Teacher_course_EnrollToStudent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    16722    Teacher_course_InstitutionId id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_course_InstitutionId" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_InstitutionId_id_seq"'::regclass);
 P   ALTER TABLE public."Teacher_course_InstitutionId" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    16723    Teacher_coursesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_coursesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_coursesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_coursesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    242    241            �           2604    16724    Teacher_csvupload id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_csvupload" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_csvupload_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_csvupload" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    16725    Teacher_email EmailId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email" ALTER COLUMN "EmailId" SET DEFAULT nextval('public."Teacher_email_EmailId_seq"'::regclass);
 H   ALTER TABLE public."Teacher_email" ALTER COLUMN "EmailId" DROP DEFAULT;
       public          postgres    false    250    245            �           2604    16726    Teacher_email_BCC id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_BCC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_BCC_id_seq"'::regclass);
 E   ALTER TABLE public."Teacher_email_BCC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246            �           2604    16727    Teacher_email_CC id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_email_CC" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_CC_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_email_CC" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            �           2604    16728    Teacher_email_Email_To id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_email_Email_To" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_email_Email_To_id_seq"'::regclass);
 J   ALTER TABLE public."Teacher_email_Email_To" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    251            �           2604    16729    Teacher_folder FolderId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_folder" ALTER COLUMN "FolderId" SET DEFAULT nextval('public."Teacher_folder_FolderId_seq"'::regclass);
 J   ALTER TABLE public."Teacher_folder" ALTER COLUMN "FolderId" DROP DEFAULT;
       public          postgres    false    254    253            �           2604    16730    Teacher_module ModuleId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_module" ALTER COLUMN "ModuleId" SET DEFAULT nextval('public."Teacher_module_ModuleId_seq"'::regclass);
 J   ALTER TABLE public."Teacher_module" ALTER COLUMN "ModuleId" DROP DEFAULT;
       public          postgres    false    256    255            �           2604    16731    Teacher_modulefile id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulefile" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefile_id_seq"'::regclass);
 F   ALTER TABLE public."Teacher_modulefile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            �           2604    16732    Teacher_modulefilecontent id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_modulefilecontent_id_seq"'::regclass);
 M   ALTER TABLE public."Teacher_modulefilecontent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            �           2604    16733    Teacher_modulesyllabus Id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus" ALTER COLUMN "Id" SET DEFAULT nextval('public."Teacher_modulesyllabus_Id_seq"'::regclass);
 L   ALTER TABLE public."Teacher_modulesyllabus" ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    262    261            �           2604    16734    Teacher_progress id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_progress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_progress_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_progress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263            �           2604    16735    Teacher_question id    DEFAULT     ~   ALTER TABLE ONLY public."Teacher_question" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_question_id_seq"'::regclass);
 D   ALTER TABLE public."Teacher_question" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265            �           2604    16736    Teacher_sitting id    DEFAULT     |   ALTER TABLE ONLY public."Teacher_sitting" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_sitting_id_seq"'::regclass);
 C   ALTER TABLE public."Teacher_sitting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    270    269            �           2604    16737     Teacher_studentcourseprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentcourseprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentcourseprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            �           2604    16738 $   Teacher_studentmodulefileprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmodulefileprogress_id_seq"'::regclass);
 U   ALTER TABLE public."Teacher_studentmodulefileprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    274    273            �           2604    16739     Teacher_studentmoduleprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentmoduleprogress_id_seq"'::regclass);
 Q   ALTER TABLE public."Teacher_studentmoduleprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    276    275            �           2604    16740    Teacher_studentquizprogress id    DEFAULT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress" ALTER COLUMN id SET DEFAULT nextval('public."Teacher_studentquizprogress_id_seq"'::regclass);
 O   ALTER TABLE public."Teacher_studentquizprogress" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    277            �           2604    16741    Teacher_units UnitId    DEFAULT     �   ALTER TABLE ONLY public."Teacher_units" ALTER COLUMN "UnitId" SET DEFAULT nextval('public."Teacher_units_UnitId_seq"'::regclass);
 G   ALTER TABLE public."Teacher_units" ALTER COLUMN "UnitId" DROP DEFAULT;
       public          postgres    false    280    279            �           2604    17256    accesscontrol id    DEFAULT     t   ALTER TABLE ONLY public.accesscontrol ALTER COLUMN id SET DEFAULT nextval('public.accesscontrol_id_seq'::regclass);
 ?   ALTER TABLE public.accesscontrol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    326    327    327            �           2604    16742    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public."Admin_department_DepartmentId_seq"'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    210    209            �           2604    16743    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    282    281            �           2604    16744    admin_role role_id    DEFAULT     x   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_role_id_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    284    283            �           2604    16745    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    286    285            �           2604    16746    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            �           2604    16747    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            �           2604    16748    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    294    291            �           2604    16749    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    293    292            �           2604    16750    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    295            �           2604    16751    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            �           2604    16752    django_content_type id    DEFAULT     �   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            �           2604    16753    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    302    301            �           2604    16754    instituteadmin_profile id    DEFAULT     �   ALTER TABLE ONLY public.instituteadmin_profile ALTER COLUMN id SET DEFAULT nextval('public.instituteadmin_profile_id_seq'::regclass);
 H   ALTER TABLE public.instituteadmin_profile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    305    304            �           2604    16755    teacher_announcements id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements ALTER COLUMN id SET DEFAULT nextval('public.teacher_announcements_id_seq'::regclass);
 G   ALTER TABLE public.teacher_announcements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    307    306            �           2604    16756     teacher_announcements_to_list id    DEFAULT     �   ALTER TABLE ONLY public.teacher_announcements_to_list ALTER COLUMN id SET DEFAULT nextval('public.teacher_announcements_to_list_id_seq'::regclass);
 O   ALTER TABLE public.teacher_announcements_to_list ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    309    308            �           2604    16757    teacher_category id    DEFAULT     z   ALTER TABLE ONLY public.teacher_category ALTER COLUMN id SET DEFAULT nextval('public.teacher_category_id_seq'::regclass);
 B   ALTER TABLE public.teacher_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    311    310            �           2604    16758    teacher_course courseid    DEFAULT     �   ALTER TABLE ONLY public.teacher_course ALTER COLUMN courseid SET DEFAULT nextval('public.teacher_course_courseid_seq'::regclass);
 F   ALTER TABLE public.teacher_course ALTER COLUMN courseid DROP DEFAULT;
       public          postgres    false    313    312            �           2604    16759 !   teacher_course_assigntoteacher id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_AssignToTeacher_id_seq"'::regclass);
 P   ALTER TABLE public.teacher_course_assigntoteacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    16760    teacher_course_departmentid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_departmentid ALTER COLUMN id SET DEFAULT nextval('public."Teacher_course_DepartmentId_id_seq"'::regclass);
 M   ALTER TABLE public.teacher_course_departmentid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    16761 !   teacher_course_enrolltostudent id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent ALTER COLUMN id SET DEFAULT nextval('public.teacher_course_enrolltostudent_id_seq'::regclass);
 P   ALTER TABLE public.teacher_course_enrolltostudent ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    315    314            �           2604    16762    teacher_course_institutionid id    DEFAULT     �   ALTER TABLE ONLY public.teacher_course_institutionid ALTER COLUMN id SET DEFAULT nextval('public.teacher_course_institutionid_id_seq'::regclass);
 N   ALTER TABLE public.teacher_course_institutionid ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    317    316            �           2604    16763    teacher_email emailid    DEFAULT     ~   ALTER TABLE ONLY public.teacher_email ALTER COLUMN emailid SET DEFAULT nextval('public.teacher_email_emailid_seq'::regclass);
 D   ALTER TABLE public.teacher_email ALTER COLUMN emailid DROP DEFAULT;
       public          postgres    false    319    318            �           2604    16764    teacher_module moduleid    DEFAULT     �   ALTER TABLE ONLY public.teacher_module ALTER COLUMN moduleid SET DEFAULT nextval('public.teacher_module_moduleid_seq'::regclass);
 F   ALTER TABLE public.teacher_module ALTER COLUMN moduleid DROP DEFAULT;
       public          postgres    false    321    320            �           2604    16765    teacher_modulefile id    DEFAULT     ~   ALTER TABLE ONLY public.teacher_modulefile ALTER COLUMN id SET DEFAULT nextval('public.teacher_modulefile_id_seq'::regclass);
 D   ALTER TABLE public.teacher_modulefile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    323    322            �           2604    16766    teacher_question id    DEFAULT     z   ALTER TABLE ONLY public.teacher_question ALTER COLUMN id SET DEFAULT nextval('public.teacher_question_id_seq'::regclass);
 B   ALTER TABLE public.teacher_question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    325    324            �           2604    16767    teacher_quiz quizid    DEFAULT     |   ALTER TABLE ONLY public.teacher_quiz ALTER COLUMN quizid SET DEFAULT nextval('public."Teacher_quiz_QuizId_seq"'::regclass);
 B   ALTER TABLE public.teacher_quiz ALTER COLUMN quizid DROP DEFAULT;
       public          postgres    false    268    267            n          0    16401    Admin_institution 
   TABLE DATA           �   COPY public."Admin_institution" ("isActive", "InstitutionId", "Name", "Description", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", picture) FROM stdin;
    public          postgres    false    211   �      p          0    16407 
   Admin_role 
   TABLE DATA           �   COPY public."Admin_role" ("isActive", "RoleId", "RoleName", "RoleDescription", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn") FROM stdin;
    public          postgres    false    213         r          0    16413    Admin_userinstitutionmap 
   TABLE DATA           �   COPY public."Admin_userinstitutionmap" ("isActive", "Id", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn", "InstitutionId_id") FROM stdin;
    public          postgres    false    215   �      t          0    16419    InstituteAdmin_profile 
   TABLE DATA           &  COPY public."InstituteAdmin_profile" ("isActive", id, "UserRole", first_name, last_name, email, "Dob", "MobileNo", gender, department, "Address1", "Address2", "City", "State", "Zip", profile_pics, "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "InstitutionId_id", user_id) FROM stdin;
    public          postgres    false    217   �      v          0    16425    Teacher_announcements 
   TABLE DATA           �   COPY public."Teacher_announcements" (id, "Announcement_title", "Announcement_message", "To", "ReadBy", "CreatedBy", "Created_On") FROM stdin;
    public          postgres    false    219   �!      w          0    16430    Teacher_announcements_To_List 
   TABLE DATA           [   COPY public."Teacher_announcements_To_List" (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    220   "      z          0    16435    Teacher_answer 
   TABLE DATA           `   COPY public."Teacher_answer" (id, content, correct, "questionOrderNo", "QuizId_id") FROM stdin;
    public          postgres    false    223   E"      |          0    16442    Teacher_assignment 
   TABLE DATA           �   COPY public."Teacher_assignment" ("CourseId", "Assignment_id", "Assignment_Name", "File", "Created_on", "ModuleId_id") FROM stdin;
    public          postgres    false    225   b"      ~          0    16446    Teacher_assignmentupload 
   TABLE DATA           �   COPY public."Teacher_assignmentupload" ("AssignmentUpload_id", "Assignment_Name", "CourseId", "InstitutionId", "DepartmentId", "ModuleId", "Upload_Assignment", "AssignmentId_id") FROM stdin;
    public          postgres    false    227   "      �          0    16452    Teacher_category 
   TABLE DATA           :   COPY public."Teacher_category" (id, category) FROM stdin;
    public          postgres    false    229   �"      �          0    16464    Teacher_course_EnrollToStudent 
   TABLE DATA           U   COPY public."Teacher_course_EnrollToStudent" (id, course_id, profile_id) FROM stdin;
    public          postgres    false    235   �"      �          0    16468    Teacher_course_InstitutionId 
   TABLE DATA           W   COPY public."Teacher_course_InstitutionId" (id, course_id, institution_id) FROM stdin;
    public          postgres    false    237   "#      �          0    16472    Teacher_courseassessment 
   TABLE DATA           �   COPY public."Teacher_courseassessment" ("isActive", "CourseAssessmentId", "Score", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id") FROM stdin;
    public          postgres    false    239   a#      �          0    16477    Teacher_courseregistration 
   TABLE DATA           �   COPY public."Teacher_courseregistration" ("isActive", "Student_Name", "Instructor_Name", "CourseRegistrationId", "EnrollmentStatus", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "Name_id") FROM stdin;
    public          postgres    false    240   ~#      �          0    16482    Teacher_coursesyllabus 
   TABLE DATA           W   COPY public."Teacher_coursesyllabus" ("Id", "syllabusFile", "courseId_id") FROM stdin;
    public          postgres    false    241   �#      �          0    16486    Teacher_csvupload 
   TABLE DATA           R   COPY public."Teacher_csvupload" (id, title, file, completed, user_id) FROM stdin;
    public          postgres    false    243   c$      �          0    16490    Teacher_email 
   TABLE DATA           �   COPY public."Teacher_email" ("EmailId", "Title", "Subject", "Content", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", status, "readStatus", "AttachFile", "Email_From_id") FROM stdin;
    public          postgres    false    245   �$      �          0    16495    Teacher_email_BCC 
   TABLE DATA           G   COPY public."Teacher_email_BCC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    246   U%      �          0    16499    Teacher_email_CC 
   TABLE DATA           F   COPY public."Teacher_email_CC" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    248   x%      �          0    16504    Teacher_email_Email_To 
   TABLE DATA           L   COPY public."Teacher_email_Email_To" (id, email_id, profile_id) FROM stdin;
    public          postgres    false    251   �%      �          0    16508    Teacher_folder 
   TABLE DATA           K   COPY public."Teacher_folder" ("FolderId", "Name", "UserId_id") FROM stdin;
    public          postgres    false    253   �%      �          0    16514    Teacher_module 
   TABLE DATA           �   COPY public."Teacher_module" ("isActive", "ModuleId", "Name", "Description", "StartDate", "EndDate", course, "ModuleOrderNo", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id") FROM stdin;
    public          postgres    false    255   �%      �          0    16520    Teacher_modulefile 
   TABLE DATA           �   COPY public."Teacher_modulefile" ("isActive", id, "File", "FileOrderNo", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleId_id") FROM stdin;
    public          postgres    false    257   3&      �          0    16526    Teacher_modulefilecontent 
   TABLE DATA           �   COPY public."Teacher_modulefilecontent" ("isActive", id, "Slide", "SlideOrderNo", "TextContent", "SlideText", "SlideImage", "SlideVideos", "SlideAudio", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "ModuleFileId_id") FROM stdin;
    public          postgres    false    259   �&      �          0    16532    Teacher_modulesyllabus 
   TABLE DATA           �   COPY public."Teacher_modulesyllabus" ("Id", "oneDriveLink", "syllabusFile", "imgFilePath", "imgCount", "fileOrderNo", "courseId_id") FROM stdin;
    public          postgres    false    261   �'      �          0    16538    Teacher_progress 
   TABLE DATA           ^   COPY public."Teacher_progress" (id, score, correct_answer, wrong_answer, user_id) FROM stdin;
    public          postgres    false    263   �'      �          0    16544    Teacher_question 
   TABLE DATA           �   COPY public."Teacher_question" (id, figure, content, explanation, "questionOrderNo", "isMCQ", "QuizId_id", category_id) FROM stdin;
    public          postgres    false    265   (      �          0    16559    Teacher_sitting 
   TABLE DATA           �   COPY public."Teacher_sitting" (id, question_order, question_list, incorrect_questions, current_score, complete, user_answers, start, "end", quiz_id, user_id) FROM stdin;
    public          postgres    false    269   .(      �          0    16565    Teacher_studentcourseprogress 
   TABLE DATA           �   COPY public."Teacher_studentcourseprogress" (id, "Grade", "CurrentModuleNo", "CurrentUnitNo", "CurrentAssignNo", "CourseId_id", "StudentId_id") FROM stdin;
    public          postgres    false    271   K(      �          0    16569 !   Teacher_studentmodulefileprogress 
   TABLE DATA           �   COPY public."Teacher_studentmodulefileprogress" (id, "fileCompleted", "CurrentFilePageNo", "FileId_id", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    273   �(      �          0    16573    Teacher_studentmoduleprogress 
   TABLE DATA           ~   COPY public."Teacher_studentmoduleprogress" (id, "CurrentFileNo", "CurrentQuizNo", "ModuleId_id", "StudentId_id") FROM stdin;
    public          postgres    false    275   �(      �          0    16577    Teacher_studentquizprogress 
   TABLE DATA           x   COPY public."Teacher_studentquizprogress" (id, score, completed, num_attempts, "QuizId_id", "StudentId_id") FROM stdin;
    public          postgres    false    277   �(      �          0    16582    Teacher_units 
   TABLE DATA           �   COPY public."Teacher_units" ("isActive", "UnitId", "Name", "Description", "StartDate", "EndDate", "File", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate", "CourseId_id", "ModuleId_id") FROM stdin;
    public          postgres    false    279   �(      �          0    17253    accesscontrol 
   TABLE DATA           �   COPY public.accesscontrol (id, admininstitute, announcement, assigncourse, authuser, category, course, department, email, enrollment, module, question, quiz, role, userid) FROM stdin;
    public          postgres    false    327   )      l          0    16395    admin_department 
   TABLE DATA           �   COPY public.admin_department (isactive, departmentid, name, description, createdby, createdon, modifiedby, modifiedon, institutionid_id) FROM stdin;
    public          postgres    false    209   C)      �          0    16591    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    281   �,      �          0    16597 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    283   �-      �          0    16603 
   auth_group 
   TABLE DATA           .   COPY public.auth_group (id, name) FROM stdin;
    public          postgres    false    285   �-      �          0    16607    auth_group_permissions 
   TABLE DATA           M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public          postgres    false    287   !.      �          0    16611    auth_permission 
   TABLE DATA           W   COPY public.auth_permission (id, name, content_type_id, routes, component) FROM stdin;
    public          postgres    false    289   T0      �          0    16615 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, created_by, created_on, date_joined, email, first_name, is_active, is_staff, is_superuser, last_login, last_name, modified_by, modified_on, username, password) FROM stdin;
    public          postgres    false    291   G6      �          0    16620    auth_user_groups 
   TABLE DATA           A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public          postgres    false    292   [7      �          0    16625    auth_user_user_permissions 
   TABLE DATA           P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public          postgres    false    295   �7      �          0    16629    django_admin_log 
   TABLE DATA           �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public          postgres    false    297   �?      �          0    16636    django_content_type 
   TABLE DATA           C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public          postgres    false    299   �E      �          0    16640    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public          postgres    false    301   OG      �          0    16646    django_session 
   TABLE DATA           P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public          postgres    false    303   <I      �          0    16651    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (id, isactive, address1, address2, city, department, email, gender, state, zip, createdby, createddate, dob, first_name, institutionid_id, last_name, mobileno, updatedby, updateddate, profile_pics, user_id, userrole) FROM stdin;
    public          postgres    false    304   �P      �          0    16657    teacher_announcements 
   TABLE DATA           �   COPY public.teacher_announcements (id, createdby, created_on, announcement_message, readby, announcement_title, "to") FROM stdin;
    public          postgres    false    306   fT      �          0    16663    teacher_announcements_to_list 
   TABLE DATA           Y   COPY public.teacher_announcements_to_list (id, announcements_id, profile_id) FROM stdin;
    public          postgres    false    308   �T      �          0    16667    teacher_category 
   TABLE DATA           p   COPY public.teacher_category (id, category, createdby, createdon, isactive, modifiedby, modifiedon) FROM stdin;
    public          postgres    false    310   �T      �          0    16673    teacher_course 
   TABLE DATA           �   COPY public.teacher_course (courseid, coursecode, createdby, createddate, description, isactive, name, coursetype, updatedby, updateddate, instid, passingscore) FROM stdin;
    public          postgres    false    312   �U      �          0    16456    teacher_course_assigntoteacher 
   TABLE DATA           S   COPY public.teacher_course_assigntoteacher (id, course_id, profile_id) FROM stdin;
    public          postgres    false    231   �W      �          0    16460    teacher_course_departmentid 
   TABLE DATA           S   COPY public.teacher_course_departmentid (id, course_id, department_id) FROM stdin;
    public          postgres    false    233   (X      �          0    16679    teacher_course_enrolltostudent 
   TABLE DATA           S   COPY public.teacher_course_enrolltostudent (id, course_id, profile_id) FROM stdin;
    public          postgres    false    314   �X      �          0    16683    teacher_course_institutionid 
   TABLE DATA           U   COPY public.teacher_course_institutionid (id, course_id, institution_id) FROM stdin;
    public          postgres    false    316   �X      �          0    16687    teacher_email 
   TABLE DATA           �   COPY public.teacher_email (emailid, attachfile, content, createdby, createdon, email_from_id, isactive, modifiedby, modifiedon, readstatus, status, subject, title) FROM stdin;
    public          postgres    false    318   �X      �          0    16693    teacher_module 
   TABLE DATA           �   COPY public.teacher_module (moduleid, isactive, courseid_id, course, createdby, createddate, description, enddate, name, moduleorderno, startdate, updatedby, updateddate) FROM stdin;
    public          postgres    false    320   �X      �          0    16699    teacher_modulefile 
   TABLE DATA           �   COPY public.teacher_modulefile (id, file, createdby, createddate, isactive, fileorderno, updatedby, updateddate, moduleid_id) FROM stdin;
    public          postgres    false    322   uY      �          0    16705    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, category_id, content, created_by, created_on, explanation, figure, is_active, ismcq, modified_by, modified_on, questionorderno, quizid_id) FROM stdin;
    public          postgres    false    324   �Y      �          0    16551    teacher_quiz 
   TABLE DATA           %  COPY public.teacher_quiz (quizid, title, description, url, random_order, max_questions, answers_at_end, exam_paper, single_attempt, pass_mark, success_text, fail_text, draft, quizorderno, courseid_id, module_id, category_id, isactive, modifiedby, createdby, createdon, modifiedon) FROM stdin;
    public          postgres    false    267   Z      #           0    0 !   Admin_department_DepartmentId_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Admin_department_DepartmentId_seq"', 38, true);
          public          postgres    false    210            $           0    0 #   Admin_institution_InstitutionId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Admin_institution_InstitutionId_seq"', 6, true);
          public          postgres    false    212            %           0    0    Admin_role_RoleId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Admin_role_RoleId_seq"', 4, true);
          public          postgres    false    214            &           0    0    Admin_userinstitutionmap_Id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."Admin_userinstitutionmap_Id_seq"', 1, true);
          public          postgres    false    216            '           0    0    InstituteAdmin_profile_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."InstituteAdmin_profile_id_seq"', 13, true);
          public          postgres    false    218            (           0    0 $   Teacher_announcements_To_List_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."Teacher_announcements_To_List_id_seq"', 2, true);
          public          postgres    false    221            )           0    0    Teacher_announcements_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_announcements_id_seq"', 2, true);
          public          postgres    false    222            *           0    0    Teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Teacher_answer_id_seq"', 12, true);
          public          postgres    false    224            +           0    0 $   Teacher_assignment_Assignment_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_assignment_Assignment_id_seq"', 1, false);
          public          postgres    false    226            ,           0    0 0   Teacher_assignmentupload_AssignmentUpload_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public."Teacher_assignmentupload_AssignmentUpload_id_seq"', 1, false);
          public          postgres    false    228            -           0    0    Teacher_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_category_id_seq"', 4, true);
          public          postgres    false    230            .           0    0 %   Teacher_course_AssignToTeacher_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Teacher_course_AssignToTeacher_id_seq"', 10, true);
          public          postgres    false    232            /           0    0 "   Teacher_course_DepartmentId_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Teacher_course_DepartmentId_id_seq"', 16, true);
          public          postgres    false    234            0           0    0 %   Teacher_course_EnrollToStudent_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Teacher_course_EnrollToStudent_id_seq"', 10, true);
          public          postgres    false    236            1           0    0 #   Teacher_course_InstitutionId_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Teacher_course_InstitutionId_id_seq"', 8, true);
          public          postgres    false    238            2           0    0    Teacher_coursesyllabus_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_coursesyllabus_Id_seq"', 8, true);
          public          postgres    false    242            3           0    0    Teacher_csvupload_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_csvupload_id_seq"', 1, false);
          public          postgres    false    244            4           0    0    Teacher_email_BCC_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_email_BCC_id_seq"', 1, true);
          public          postgres    false    247            5           0    0    Teacher_email_CC_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_email_CC_id_seq"', 1, false);
          public          postgres    false    249            6           0    0    Teacher_email_EmailId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_email_EmailId_seq"', 5, true);
          public          postgres    false    250            7           0    0    Teacher_email_Email_To_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Teacher_email_Email_To_id_seq"', 1, true);
          public          postgres    false    252            8           0    0    Teacher_folder_FolderId_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Teacher_folder_FolderId_seq"', 1, false);
          public          postgres    false    254            9           0    0    Teacher_module_ModuleId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Teacher_module_ModuleId_seq"', 1, true);
          public          postgres    false    256            :           0    0    Teacher_modulefile_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_modulefile_id_seq"', 1, true);
          public          postgres    false    258            ;           0    0     Teacher_modulefilecontent_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Teacher_modulefilecontent_id_seq"', 1, true);
          public          postgres    false    260            <           0    0    Teacher_modulesyllabus_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Teacher_modulesyllabus_Id_seq"', 1, false);
          public          postgres    false    262            =           0    0    Teacher_progress_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_progress_id_seq"', 1, false);
          public          postgres    false    264            >           0    0    Teacher_question_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_question_id_seq"', 18, true);
          public          postgres    false    266            ?           0    0    Teacher_quiz_QuizId_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_quiz_QuizId_seq"', 46, true);
          public          postgres    false    268            @           0    0    Teacher_sitting_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Teacher_sitting_id_seq"', 1, false);
          public          postgres    false    270            A           0    0 $   Teacher_studentcourseprogress_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_studentcourseprogress_id_seq"', 10, true);
          public          postgres    false    272            B           0    0 (   Teacher_studentmodulefileprogress_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."Teacher_studentmodulefileprogress_id_seq"', 1, false);
          public          postgres    false    274            C           0    0 $   Teacher_studentmoduleprogress_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Teacher_studentmoduleprogress_id_seq"', 1, false);
          public          postgres    false    276            D           0    0 "   Teacher_studentquizprogress_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Teacher_studentquizprogress_id_seq"', 3, true);
          public          postgres    false    278            E           0    0    Teacher_units_UnitId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Teacher_units_UnitId_seq"', 1, false);
          public          postgres    false    280            F           0    0    accesscontrol_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.accesscontrol_id_seq', 6, true);
          public          postgres    false    326            G           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 6, true);
          public          postgres    false    282            H           0    0    admin_role_role_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.admin_role_role_id_seq', 1, true);
          public          postgres    false    284            I           0    0    auth_group_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);
          public          postgres    false    286            J           0    0    auth_group_permissions_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 145, true);
          public          postgres    false    288            K           0    0    auth_permission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_permission_id_seq', 145, true);
          public          postgres    false    290            L           0    0    auth_user_groups_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 4, true);
          public          postgres    false    293            M           0    0    auth_user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.auth_user_id_seq', 7, true);
          public          postgres    false    294            N           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 638, true);
          public          postgres    false    296            O           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 62, true);
          public          postgres    false    298            P           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 36, true);
          public          postgres    false    300            Q           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 21, true);
          public          postgres    false    302            R           0    0    instituteadmin_profile_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.instituteadmin_profile_id_seq', 18, true);
          public          postgres    false    305            S           0    0    teacher_announcements_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.teacher_announcements_id_seq', 2, true);
          public          postgres    false    307            T           0    0 $   teacher_announcements_to_list_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.teacher_announcements_to_list_id_seq', 2, true);
          public          postgres    false    309            U           0    0    teacher_category_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.teacher_category_id_seq', 6, true);
          public          postgres    false    311            V           0    0    teacher_course_courseid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.teacher_course_courseid_seq', 15, true);
          public          postgres    false    313            W           0    0 %   teacher_course_enrolltostudent_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.teacher_course_enrolltostudent_id_seq', 92, true);
          public          postgres    false    315            X           0    0 #   teacher_course_institutionid_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.teacher_course_institutionid_id_seq', 1, false);
          public          postgres    false    317            Y           0    0    teacher_email_emailid_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.teacher_email_emailid_seq', 1, false);
          public          postgres    false    319            Z           0    0    teacher_module_moduleid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.teacher_module_moduleid_seq', 1, false);
          public          postgres    false    321            [           0    0    teacher_modulefile_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.teacher_modulefile_id_seq', 1, false);
          public          postgres    false    323            \           0    0    teacher_question_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.teacher_question_id_seq', 2, true);
          public          postgres    false    325            �           2606    16769 &   admin_department Admin_department_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT "Admin_department_pkey" PRIMARY KEY (departmentid);
 R   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT "Admin_department_pkey";
       public            postgres    false    209            �           2606    16771 (   Admin_institution Admin_institution_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public."Admin_institution"
    ADD CONSTRAINT "Admin_institution_pkey" PRIMARY KEY ("InstitutionId");
 V   ALTER TABLE ONLY public."Admin_institution" DROP CONSTRAINT "Admin_institution_pkey";
       public            postgres    false    211            �           2606    16773    Admin_role Admin_role_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Admin_role"
    ADD CONSTRAINT "Admin_role_pkey" PRIMARY KEY ("RoleId");
 H   ALTER TABLE ONLY public."Admin_role" DROP CONSTRAINT "Admin_role_pkey";
       public            postgres    false    213            �           2606    16775 6   Admin_userinstitutionmap Admin_userinstitutionmap_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutionmap_pkey" PRIMARY KEY ("Id");
 d   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutionmap_pkey";
       public            postgres    false    215            �           2606    16777 2   InstituteAdmin_profile InstituteAdmin_profile_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."InstituteAdmin_profile"
    ADD CONSTRAINT "InstituteAdmin_profile_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."InstituteAdmin_profile" DROP CONSTRAINT "InstituteAdmin_profile_pkey";
       public            postgres    false    217            �           2606    16779 9   InstituteAdmin_profile InstituteAdmin_profile_user_id_key 
   CONSTRAINT     {   ALTER TABLE ONLY public."InstituteAdmin_profile"
    ADD CONSTRAINT "InstituteAdmin_profile_user_id_key" UNIQUE (user_id);
 g   ALTER TABLE ONLY public."InstituteAdmin_profile" DROP CONSTRAINT "InstituteAdmin_profile_user_id_key";
       public            postgres    false    217            �           2606    16781 @   Teacher_announcements_To_List Teacher_announcements_To_List_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_announcements_To_List"
    ADD CONSTRAINT "Teacher_announcements_To_List_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_announcements_To_List" DROP CONSTRAINT "Teacher_announcements_To_List_pkey";
       public            postgres    false    220            �           2606    16783 ]   Teacher_announcements_To_List Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_announcements_To_List"
    ADD CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq" UNIQUE (announcements_id, profile_id);
 �   ALTER TABLE ONLY public."Teacher_announcements_To_List" DROP CONSTRAINT "Teacher_announcements_To_announcements_id_profile_99b8bc84_uniq";
       public            postgres    false    220    220            �           2606    16785 0   Teacher_announcements Teacher_announcements_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."Teacher_announcements"
    ADD CONSTRAINT "Teacher_announcements_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public."Teacher_announcements" DROP CONSTRAINT "Teacher_announcements_pkey";
       public            postgres    false    219            �           2606    16787 "   Teacher_answer Teacher_answer_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_pkey";
       public            postgres    false    223            �           2606    16789 *   Teacher_assignment Teacher_assignment_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_pkey" PRIMARY KEY ("Assignment_id");
 X   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_pkey";
       public            postgres    false    225            �           2606    16791 6   Teacher_assignmentupload Teacher_assignmentupload_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentupload_pkey" PRIMARY KEY ("AssignmentUpload_id");
 d   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentupload_pkey";
       public            postgres    false    227            �           2606    16793 .   Teacher_category Teacher_category_category_key 
   CONSTRAINT     q   ALTER TABLE ONLY public."Teacher_category"
    ADD CONSTRAINT "Teacher_category_category_key" UNIQUE (category);
 \   ALTER TABLE ONLY public."Teacher_category" DROP CONSTRAINT "Teacher_category_category_key";
       public            postgres    false    229            �           2606    16795 &   Teacher_category Teacher_category_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_category"
    ADD CONSTRAINT "Teacher_category_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_category" DROP CONSTRAINT "Teacher_category_pkey";
       public            postgres    false    229            �           2606    16797 Z   teacher_course_assigntoteacher Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToT_course_id_profile_id_116eb528_uniq";
       public            postgres    false    231    231            �           2606    16799 B   teacher_course_assigntoteacher Teacher_course_AssignToTeacher_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT "Teacher_course_AssignToTeacher_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT "Teacher_course_AssignToTeacher_pkey";
       public            postgres    false    231            �           2606    16801 Z   teacher_course_departmentid Teacher_course_Departmen_course_id_department_id_1d652380_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq" UNIQUE (course_id, department_id);
 �   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_Departmen_course_id_department_id_1d652380_uniq";
       public            postgres    false    233    233            �           2606    16803 <   teacher_course_departmentid Teacher_course_DepartmentId_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_pkey";
       public            postgres    false    233            �           2606    16805 Z   Teacher_course_EnrollToStudent Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq" UNIQUE (course_id, profile_id);
 �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToS_course_id_profile_id_47f52ce9_uniq";
       public            postgres    false    235    235            �           2606    16807 B   Teacher_course_EnrollToStudent Teacher_course_EnrollToStudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_EnrollToStudent_pkey" PRIMARY KEY (id);
 p   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_EnrollToStudent_pkey";
       public            postgres    false    235            �           2606    16809 \   Teacher_course_InstitutionId Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq" UNIQUE (course_id, institution_id);
 �   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_Instituti_course_id_institution_id_d4150f5c_uniq";
       public            postgres    false    237    237                       2606    16811 >   Teacher_course_InstitutionId Teacher_course_InstitutionId_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_InstitutionId_pkey" PRIMARY KEY (id);
 l   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_InstitutionId_pkey";
       public            postgres    false    237                       2606    16813 6   Teacher_courseassessment Teacher_courseassessment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseassessment"
    ADD CONSTRAINT "Teacher_courseassessment_pkey" PRIMARY KEY ("CourseAssessmentId");
 d   ALTER TABLE ONLY public."Teacher_courseassessment" DROP CONSTRAINT "Teacher_courseassessment_pkey";
       public            postgres    false    239                       2606    16815 :   Teacher_courseregistration Teacher_courseregistration_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_courseregistration"
    ADD CONSTRAINT "Teacher_courseregistration_pkey" PRIMARY KEY ("CourseRegistrationId");
 h   ALTER TABLE ONLY public."Teacher_courseregistration" DROP CONSTRAINT "Teacher_courseregistration_pkey";
       public            postgres    false    240                       2606    16817 2   Teacher_coursesyllabus Teacher_coursesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_coursesyllabus"
    ADD CONSTRAINT "Teacher_coursesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_coursesyllabus" DROP CONSTRAINT "Teacher_coursesyllabus_pkey";
       public            postgres    false    241                       2606    16819 (   Teacher_csvupload Teacher_csvupload_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_csvupload"
    ADD CONSTRAINT "Teacher_csvupload_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_csvupload" DROP CONSTRAINT "Teacher_csvupload_pkey";
       public            postgres    false    243                       2606    16821 E   Teacher_email_BCC Teacher_email_BCC_email_id_profile_id_79a54781_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq" UNIQUE (email_id, profile_id);
 s   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_profile_id_79a54781_uniq";
       public            postgres    false    246    246                       2606    16823 (   Teacher_email_BCC Teacher_email_BCC_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_pkey";
       public            postgres    false    246                       2606    16825 C   Teacher_email_CC Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq" UNIQUE (email_id, profile_id);
 q   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_profile_id_09f8a5d9_uniq";
       public            postgres    false    248    248                       2606    16827 &   Teacher_email_CC Teacher_email_CC_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_pkey";
       public            postgres    false    248                        2606    16829 O   Teacher_email_Email_To Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq" UNIQUE (email_id, profile_id);
 }   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_email_id_profile_id_37e0ea1b_uniq";
       public            postgres    false    251    251            "           2606    16831 2   Teacher_email_Email_To Teacher_email_Email_To_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email_To_pkey" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email_To_pkey";
       public            postgres    false    251                       2606    16833     Teacher_email Teacher_email_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public."Teacher_email"
    ADD CONSTRAINT "Teacher_email_pkey" PRIMARY KEY ("EmailId");
 N   ALTER TABLE ONLY public."Teacher_email" DROP CONSTRAINT "Teacher_email_pkey";
       public            postgres    false    245            &           2606    16835 "   Teacher_folder Teacher_folder_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_pkey" PRIMARY KEY ("FolderId");
 P   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_pkey";
       public            postgres    false    253            )           2606    16837 "   Teacher_module Teacher_module_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_module"
    ADD CONSTRAINT "Teacher_module_pkey" PRIMARY KEY ("ModuleId");
 P   ALTER TABLE ONLY public."Teacher_module" DROP CONSTRAINT "Teacher_module_pkey";
       public            postgres    false    255            ,           2606    16839 *   Teacher_modulefile Teacher_modulefile_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_pkey";
       public            postgres    false    257            /           2606    16841 8   Teacher_modulefilecontent Teacher_modulefilecontent_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefilecontent_pkey" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefilecontent_pkey";
       public            postgres    false    259            2           2606    16843 2   Teacher_modulesyllabus Teacher_modulesyllabus_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllabus_pkey" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllabus_pkey";
       public            postgres    false    261            4           2606    16845 &   Teacher_progress Teacher_progress_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_pkey";
       public            postgres    false    263            6           2606    16847 -   Teacher_progress Teacher_progress_user_id_key 
   CONSTRAINT     o   ALTER TABLE ONLY public."Teacher_progress"
    ADD CONSTRAINT "Teacher_progress_user_id_key" UNIQUE (user_id);
 [   ALTER TABLE ONLY public."Teacher_progress" DROP CONSTRAINT "Teacher_progress_user_id_key";
       public            postgres    false    263            :           2606    16849 &   Teacher_question Teacher_question_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_question"
    ADD CONSTRAINT "Teacher_question_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Teacher_question" DROP CONSTRAINT "Teacher_question_pkey";
       public            postgres    false    265            ?           2606    16851    teacher_quiz Teacher_quiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT "Teacher_quiz_pkey" PRIMARY KEY (quizid);
 J   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT "Teacher_quiz_pkey";
       public            postgres    false    267            E           2606    16853 $   Teacher_sitting Teacher_sitting_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_pkey";
       public            postgres    false    269            K           2606    16855 @   Teacher_studentcourseprogress Teacher_studentcourseprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcourseprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcourseprogress_pkey";
       public            postgres    false    271            P           2606    16857 H   Teacher_studentmodulefileprogress Teacher_studentmodulefileprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodulefileprogress_pkey" PRIMARY KEY (id);
 v   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodulefileprogress_pkey";
       public            postgres    false    273            T           2606    16859 @   Teacher_studentmoduleprogress Teacher_studentmoduleprogress_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmoduleprogress_pkey" PRIMARY KEY (id);
 n   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmoduleprogress_pkey";
       public            postgres    false    275            X           2606    16861 <   Teacher_studentquizprogress Teacher_studentquizprogress_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizprogress_pkey" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizprogress_pkey";
       public            postgres    false    277            \           2606    16863     Teacher_units Teacher_units_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_pkey" PRIMARY KEY ("UnitId");
 N   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_pkey";
       public            postgres    false    279            �           2606    17258     accesscontrol accesscontrol_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_pkey;
       public            postgres    false    327            ^           2606    16867 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    281            b           2606    16869    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    283            g           2606    16871    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public            postgres    false    285            l           2606    16873 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public            postgres    false    287    287            o           2606    16875 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public            postgres    false    287            i           2606    16877    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public            postgres    false    285            r           2606    16879 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, routes);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public            postgres    false    289    289            t           2606    16881 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    289            {           2606    16883 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public            postgres    false    292            ~           2606    16885 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public            postgres    false    292    292            v           2606    16887    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    291            �           2606    16889 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    295            �           2606    16891 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public            postgres    false    297            �           2606    16893 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public            postgres    false    299    299            �           2606    16895 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public            postgres    false    299            �           2606    16897 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public            postgres    false    301            �           2606    16899 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public            postgres    false    303            �           2606    16901 2   instituteadmin_profile instituteadmin_profile_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT instituteadmin_profile_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT instituteadmin_profile_pkey;
       public            postgres    false    304            �           2606    16903 0   teacher_announcements teacher_announcements_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.teacher_announcements
    ADD CONSTRAINT teacher_announcements_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.teacher_announcements DROP CONSTRAINT teacher_announcements_pkey;
       public            postgres    false    306            �           2606    16905 @   teacher_announcements_to_list teacher_announcements_to_list_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.teacher_announcements_to_list
    ADD CONSTRAINT teacher_announcements_to_list_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.teacher_announcements_to_list DROP CONSTRAINT teacher_announcements_to_list_pkey;
       public            postgres    false    308            �           2606    16907 &   teacher_category teacher_category_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher_category
    ADD CONSTRAINT teacher_category_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.teacher_category DROP CONSTRAINT teacher_category_pkey;
       public            postgres    false    310            �           2606    16909 B   teacher_course_enrolltostudent teacher_course_enrolltostudent_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_enrolltostudent
    ADD CONSTRAINT teacher_course_enrolltostudent_pkey PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.teacher_course_enrolltostudent DROP CONSTRAINT teacher_course_enrolltostudent_pkey;
       public            postgres    false    314            �           2606    16911 >   teacher_course_institutionid teacher_course_institutionid_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.teacher_course_institutionid
    ADD CONSTRAINT teacher_course_institutionid_pkey PRIMARY KEY (id);
 h   ALTER TABLE ONLY public.teacher_course_institutionid DROP CONSTRAINT teacher_course_institutionid_pkey;
       public            postgres    false    316            �           2606    16913 "   teacher_course teacher_course_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT teacher_course_pkey PRIMARY KEY (courseid);
 L   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT teacher_course_pkey;
       public            postgres    false    312            �           2606    16915     teacher_email teacher_email_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.teacher_email
    ADD CONSTRAINT teacher_email_pkey PRIMARY KEY (emailid);
 J   ALTER TABLE ONLY public.teacher_email DROP CONSTRAINT teacher_email_pkey;
       public            postgres    false    318            �           2606    16917 "   teacher_module teacher_module_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT teacher_module_pkey PRIMARY KEY (moduleid);
 L   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT teacher_module_pkey;
       public            postgres    false    320            �           2606    16919 *   teacher_modulefile teacher_modulefile_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT teacher_modulefile_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT teacher_modulefile_pkey;
       public            postgres    false    322            �           2606    16921 &   teacher_question teacher_question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_pkey;
       public            postgres    false    324            C           2606    16923 #   teacher_quiz teacher_quiz_title_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_title_key UNIQUE (title);
 M   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_title_key;
       public            postgres    false    267            �           2606    16925 +   teacher_course uk_8w9n280uj18jhtv8pmjh3p8rm 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_course
    ADD CONSTRAINT uk_8w9n280uj18jhtv8pmjh3p8rm UNIQUE (name);
 U   ALTER TABLE ONLY public.teacher_course DROP CONSTRAINT uk_8w9n280uj18jhtv8pmjh3p8rm;
       public            postgres    false    312            d           2606    16927 '   admin_role uk_96hyed6ttsaookaqmdmxldkr9 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9 UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9;
       public            postgres    false    283            �           2606    16929 +   teacher_module uk_gxoab7u4ictewcvo59cj4vx98 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_module
    ADD CONSTRAINT uk_gxoab7u4ictewcvo59cj4vx98 UNIQUE (name);
 U   ALTER TABLE ONLY public.teacher_module DROP CONSTRAINT uk_gxoab7u4ictewcvo59cj4vx98;
       public            postgres    false    320            �           2606    16931 /   teacher_modulefile uk_jv00uppswv3gd0olovl33i78g 
   CONSTRAINT     j   ALTER TABLE ONLY public.teacher_modulefile
    ADD CONSTRAINT uk_jv00uppswv3gd0olovl33i78g UNIQUE (file);
 Y   ALTER TABLE ONLY public.teacher_modulefile DROP CONSTRAINT uk_jv00uppswv3gd0olovl33i78g;
       public            postgres    false    322            �           2606    16933 -   teacher_question uk_n00u6ndp73b6aod0bba9k66dc 
   CONSTRAINT     j   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT uk_n00u6ndp73b6aod0bba9k66dc UNIQUE (figure);
 W   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT uk_n00u6ndp73b6aod0bba9k66dc;
       public            postgres    false    324            `           2606    16935 .   admin_institution uk_r7p6t07od89mvlpktjjiqcdm6 
   CONSTRAINT     i   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT uk_r7p6t07od89mvlpktjjiqcdm6 UNIQUE (name);
 X   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT uk_r7p6t07od89mvlpktjjiqcdm6;
       public            postgres    false    281            x           2606    16937 &   auth_user uk_t1iph3dfc25ukwcl9xemtnojn 
   CONSTRAINT     e   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT uk_t1iph3dfc25ukwcl9xemtnojn UNIQUE (username);
 P   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT uk_t1iph3dfc25ukwcl9xemtnojn;
       public            postgres    false    291            �           1259    16938 *   Admin_department_InstitutionId_id_3ace7e32    INDEX     u   CREATE INDEX "Admin_department_InstitutionId_id_3ace7e32" ON public.admin_department USING btree (institutionid_id);
 @   DROP INDEX public."Admin_department_InstitutionId_id_3ace7e32";
       public            postgres    false    209            �           1259    16939 2   Admin_userinstitutionmap_InstitutionId_id_8c9feb65    INDEX     �   CREATE INDEX "Admin_userinstitutionmap_InstitutionId_id_8c9feb65" ON public."Admin_userinstitutionmap" USING btree ("InstitutionId_id");
 H   DROP INDEX public."Admin_userinstitutionmap_InstitutionId_id_8c9feb65";
       public            postgres    false    215            �           1259    16940 0   InstituteAdmin_profile_InstitutionId_id_32474369    INDEX     �   CREATE INDEX "InstituteAdmin_profile_InstitutionId_id_32474369" ON public."InstituteAdmin_profile" USING btree ("InstitutionId_id");
 F   DROP INDEX public."InstituteAdmin_profile_InstitutionId_id_32474369";
       public            postgres    false    217            �           1259    16941 7   Teacher_announcements_To_List_announcements_id_cc6864cc    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_announcements_id_cc6864cc" ON public."Teacher_announcements_To_List" USING btree (announcements_id);
 M   DROP INDEX public."Teacher_announcements_To_List_announcements_id_cc6864cc";
       public            postgres    false    220            �           1259    16942 1   Teacher_announcements_To_List_profile_id_f1306085    INDEX     �   CREATE INDEX "Teacher_announcements_To_List_profile_id_f1306085" ON public."Teacher_announcements_To_List" USING btree (profile_id);
 G   DROP INDEX public."Teacher_announcements_To_List_profile_id_f1306085";
       public            postgres    false    220            �           1259    16943 !   Teacher_answer_QuizId_id_8a8f554b    INDEX     g   CREATE INDEX "Teacher_answer_QuizId_id_8a8f554b" ON public."Teacher_answer" USING btree ("QuizId_id");
 7   DROP INDEX public."Teacher_answer_QuizId_id_8a8f554b";
       public            postgres    false    223            �           1259    16944 '   Teacher_assignment_ModuleId_id_10a5fe63    INDEX     s   CREATE INDEX "Teacher_assignment_ModuleId_id_10a5fe63" ON public."Teacher_assignment" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_assignment_ModuleId_id_10a5fe63";
       public            postgres    false    225            �           1259    16945 1   Teacher_assignmentupload_AssignmentId_id_a4c12c1c    INDEX     �   CREATE INDEX "Teacher_assignmentupload_AssignmentId_id_a4c12c1c" ON public."Teacher_assignmentupload" USING btree ("AssignmentId_id");
 G   DROP INDEX public."Teacher_assignmentupload_AssignmentId_id_a4c12c1c";
       public            postgres    false    227            �           1259    16946 '   Teacher_category_category_2d59e72d_like    INDEX     �   CREATE INDEX "Teacher_category_category_2d59e72d_like" ON public."Teacher_category" USING btree (category varchar_pattern_ops);
 =   DROP INDEX public."Teacher_category_category_2d59e72d_like";
       public            postgres    false    229            �           1259    16947 1   Teacher_course_AssignToTeacher_course_id_6e23d5c6    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_course_id_6e23d5c6" ON public.teacher_course_assigntoteacher USING btree (course_id);
 G   DROP INDEX public."Teacher_course_AssignToTeacher_course_id_6e23d5c6";
       public            postgres    false    231            �           1259    16948 2   Teacher_course_AssignToTeacher_profile_id_c7bc3de8    INDEX     �   CREATE INDEX "Teacher_course_AssignToTeacher_profile_id_c7bc3de8" ON public.teacher_course_assigntoteacher USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_AssignToTeacher_profile_id_c7bc3de8";
       public            postgres    false    231            �           1259    16949 .   Teacher_course_DepartmentId_course_id_e2919890    INDEX     }   CREATE INDEX "Teacher_course_DepartmentId_course_id_e2919890" ON public.teacher_course_departmentid USING btree (course_id);
 D   DROP INDEX public."Teacher_course_DepartmentId_course_id_e2919890";
       public            postgres    false    233            �           1259    16950 2   Teacher_course_DepartmentId_department_id_dcd4b073    INDEX     �   CREATE INDEX "Teacher_course_DepartmentId_department_id_dcd4b073" ON public.teacher_course_departmentid USING btree (department_id);
 H   DROP INDEX public."Teacher_course_DepartmentId_department_id_dcd4b073";
       public            postgres    false    233            �           1259    16951 1   Teacher_course_EnrollToStudent_course_id_7b22b175    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_course_id_7b22b175" ON public."Teacher_course_EnrollToStudent" USING btree (course_id);
 G   DROP INDEX public."Teacher_course_EnrollToStudent_course_id_7b22b175";
       public            postgres    false    235            �           1259    16952 2   Teacher_course_EnrollToStudent_profile_id_65e9bc96    INDEX     �   CREATE INDEX "Teacher_course_EnrollToStudent_profile_id_65e9bc96" ON public."Teacher_course_EnrollToStudent" USING btree (profile_id);
 H   DROP INDEX public."Teacher_course_EnrollToStudent_profile_id_65e9bc96";
       public            postgres    false    235            �           1259    16953 /   Teacher_course_InstitutionId_course_id_3244cce7    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_course_id_3244cce7" ON public."Teacher_course_InstitutionId" USING btree (course_id);
 E   DROP INDEX public."Teacher_course_InstitutionId_course_id_3244cce7";
       public            postgres    false    237            �           1259    16954 4   Teacher_course_InstitutionId_institution_id_b4bf5de3    INDEX     �   CREATE INDEX "Teacher_course_InstitutionId_institution_id_b4bf5de3" ON public."Teacher_course_InstitutionId" USING btree (institution_id);
 J   DROP INDEX public."Teacher_course_InstitutionId_institution_id_b4bf5de3";
       public            postgres    false    237                       1259    16955 -   Teacher_courseassessment_CourseId_id_893c01bd    INDEX        CREATE INDEX "Teacher_courseassessment_CourseId_id_893c01bd" ON public."Teacher_courseassessment" USING btree ("CourseId_id");
 C   DROP INDEX public."Teacher_courseassessment_CourseId_id_893c01bd";
       public            postgres    false    239                       1259    16956 /   Teacher_courseregistration_CourseId_id_9e1bb196    INDEX     �   CREATE INDEX "Teacher_courseregistration_CourseId_id_9e1bb196" ON public."Teacher_courseregistration" USING btree ("CourseId_id");
 E   DROP INDEX public."Teacher_courseregistration_CourseId_id_9e1bb196";
       public            postgres    false    240                       1259    16957 +   Teacher_courseregistration_Name_id_92c9d933    INDEX     {   CREATE INDEX "Teacher_courseregistration_Name_id_92c9d933" ON public."Teacher_courseregistration" USING btree ("Name_id");
 A   DROP INDEX public."Teacher_courseregistration_Name_id_92c9d933";
       public            postgres    false    240            	           1259    16958 +   Teacher_coursesyllabus_courseId_id_6d1f2a8b    INDEX     {   CREATE INDEX "Teacher_coursesyllabus_courseId_id_6d1f2a8b" ON public."Teacher_coursesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_coursesyllabus_courseId_id_6d1f2a8b";
       public            postgres    false    241                       1259    16959 "   Teacher_csvupload_user_id_42769c97    INDEX     g   CREATE INDEX "Teacher_csvupload_user_id_42769c97" ON public."Teacher_csvupload" USING btree (user_id);
 8   DROP INDEX public."Teacher_csvupload_user_id_42769c97";
       public            postgres    false    243                       1259    16960 #   Teacher_email_BCC_email_id_5ed1e5b8    INDEX     i   CREATE INDEX "Teacher_email_BCC_email_id_5ed1e5b8" ON public."Teacher_email_BCC" USING btree (email_id);
 9   DROP INDEX public."Teacher_email_BCC_email_id_5ed1e5b8";
       public            postgres    false    246                       1259    16961 %   Teacher_email_BCC_profile_id_bde0e3ff    INDEX     m   CREATE INDEX "Teacher_email_BCC_profile_id_bde0e3ff" ON public."Teacher_email_BCC" USING btree (profile_id);
 ;   DROP INDEX public."Teacher_email_BCC_profile_id_bde0e3ff";
       public            postgres    false    246                       1259    16962 "   Teacher_email_CC_email_id_a52b181b    INDEX     g   CREATE INDEX "Teacher_email_CC_email_id_a52b181b" ON public."Teacher_email_CC" USING btree (email_id);
 8   DROP INDEX public."Teacher_email_CC_email_id_a52b181b";
       public            postgres    false    248                       1259    16963 $   Teacher_email_CC_profile_id_8a708682    INDEX     k   CREATE INDEX "Teacher_email_CC_profile_id_8a708682" ON public."Teacher_email_CC" USING btree (profile_id);
 :   DROP INDEX public."Teacher_email_CC_profile_id_8a708682";
       public            postgres    false    248                       1259    16964 $   Teacher_email_Email_From_id_acc54e41    INDEX     m   CREATE INDEX "Teacher_email_Email_From_id_acc54e41" ON public."Teacher_email" USING btree ("Email_From_id");
 :   DROP INDEX public."Teacher_email_Email_From_id_acc54e41";
       public            postgres    false    245                       1259    16965 (   Teacher_email_Email_To_email_id_789297dd    INDEX     s   CREATE INDEX "Teacher_email_Email_To_email_id_789297dd" ON public."Teacher_email_Email_To" USING btree (email_id);
 >   DROP INDEX public."Teacher_email_Email_To_email_id_789297dd";
       public            postgres    false    251            #           1259    16966 *   Teacher_email_Email_To_profile_id_4ade4937    INDEX     w   CREATE INDEX "Teacher_email_Email_To_profile_id_4ade4937" ON public."Teacher_email_Email_To" USING btree (profile_id);
 @   DROP INDEX public."Teacher_email_Email_To_profile_id_4ade4937";
       public            postgres    false    251            $           1259    16967 !   Teacher_folder_UserId_id_25ea40b7    INDEX     g   CREATE INDEX "Teacher_folder_UserId_id_25ea40b7" ON public."Teacher_folder" USING btree ("UserId_id");
 7   DROP INDEX public."Teacher_folder_UserId_id_25ea40b7";
       public            postgres    false    253            '           1259    16968 #   Teacher_module_CourseId_id_50aa9262    INDEX     k   CREATE INDEX "Teacher_module_CourseId_id_50aa9262" ON public."Teacher_module" USING btree ("CourseId_id");
 9   DROP INDEX public."Teacher_module_CourseId_id_50aa9262";
       public            postgres    false    255            *           1259    16969 '   Teacher_modulefile_ModuleId_id_9e8dce7d    INDEX     s   CREATE INDEX "Teacher_modulefile_ModuleId_id_9e8dce7d" ON public."Teacher_modulefile" USING btree ("ModuleId_id");
 =   DROP INDEX public."Teacher_modulefile_ModuleId_id_9e8dce7d";
       public            postgres    false    257            -           1259    16970 2   Teacher_modulefilecontent_ModuleFileId_id_72056622    INDEX     �   CREATE INDEX "Teacher_modulefilecontent_ModuleFileId_id_72056622" ON public."Teacher_modulefilecontent" USING btree ("ModuleFileId_id");
 H   DROP INDEX public."Teacher_modulefilecontent_ModuleFileId_id_72056622";
       public            postgres    false    259            0           1259    16971 +   Teacher_modulesyllabus_courseId_id_05c97e90    INDEX     {   CREATE INDEX "Teacher_modulesyllabus_courseId_id_05c97e90" ON public."Teacher_modulesyllabus" USING btree ("courseId_id");
 A   DROP INDEX public."Teacher_modulesyllabus_courseId_id_05c97e90";
       public            postgres    false    261            7           1259    16972 #   Teacher_question_QuizId_id_f3ba643e    INDEX     k   CREATE INDEX "Teacher_question_QuizId_id_f3ba643e" ON public."Teacher_question" USING btree ("QuizId_id");
 9   DROP INDEX public."Teacher_question_QuizId_id_f3ba643e";
       public            postgres    false    265            8           1259    16973 %   Teacher_question_category_id_52ec7234    INDEX     m   CREATE INDEX "Teacher_question_category_id_52ec7234" ON public."Teacher_question" USING btree (category_id);
 ;   DROP INDEX public."Teacher_question_category_id_52ec7234";
       public            postgres    false    265            ;           1259    16974 !   Teacher_quiz_CourseId_id_7da107e9    INDEX     c   CREATE INDEX "Teacher_quiz_CourseId_id_7da107e9" ON public.teacher_quiz USING btree (courseid_id);
 7   DROP INDEX public."Teacher_quiz_CourseId_id_7da107e9";
       public            postgres    false    267            <           1259    16975    Teacher_quiz_Module_id_3b34f714    INDEX     _   CREATE INDEX "Teacher_quiz_Module_id_3b34f714" ON public.teacher_quiz USING btree (module_id);
 5   DROP INDEX public."Teacher_quiz_Module_id_3b34f714";
       public            postgres    false    267            =           1259    16976 !   Teacher_quiz_category_id_5d444d9d    INDEX     c   CREATE INDEX "Teacher_quiz_category_id_5d444d9d" ON public.teacher_quiz USING btree (category_id);
 7   DROP INDEX public."Teacher_quiz_category_id_5d444d9d";
       public            postgres    false    267            @           1259    16977    Teacher_quiz_url_fda39535    INDEX     S   CREATE INDEX "Teacher_quiz_url_fda39535" ON public.teacher_quiz USING btree (url);
 /   DROP INDEX public."Teacher_quiz_url_fda39535";
       public            postgres    false    267            A           1259    16978    Teacher_quiz_url_fda39535_like    INDEX     l   CREATE INDEX "Teacher_quiz_url_fda39535_like" ON public.teacher_quiz USING btree (url varchar_pattern_ops);
 4   DROP INDEX public."Teacher_quiz_url_fda39535_like";
       public            postgres    false    267            F           1259    16979     Teacher_sitting_quiz_id_280a1446    INDEX     c   CREATE INDEX "Teacher_sitting_quiz_id_280a1446" ON public."Teacher_sitting" USING btree (quiz_id);
 6   DROP INDEX public."Teacher_sitting_quiz_id_280a1446";
       public            postgres    false    269            G           1259    16980     Teacher_sitting_user_id_a53fd1db    INDEX     c   CREATE INDEX "Teacher_sitting_user_id_a53fd1db" ON public."Teacher_sitting" USING btree (user_id);
 6   DROP INDEX public."Teacher_sitting_user_id_a53fd1db";
       public            postgres    false    269            H           1259    16981 2   Teacher_studentcourseprogress_CourseId_id_fe404be7    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_CourseId_id_fe404be7" ON public."Teacher_studentcourseprogress" USING btree ("CourseId_id");
 H   DROP INDEX public."Teacher_studentcourseprogress_CourseId_id_fe404be7";
       public            postgres    false    271            I           1259    16982 3   Teacher_studentcourseprogress_StudentId_id_838739dd    INDEX     �   CREATE INDEX "Teacher_studentcourseprogress_StudentId_id_838739dd" ON public."Teacher_studentcourseprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentcourseprogress_StudentId_id_838739dd";
       public            postgres    false    271            L           1259    16983 4   Teacher_studentmodulefileprogress_FileId_id_e2bc8595    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_FileId_id_e2bc8595" ON public."Teacher_studentmodulefileprogress" USING btree ("FileId_id");
 J   DROP INDEX public."Teacher_studentmodulefileprogress_FileId_id_e2bc8595";
       public            postgres    false    273            M           1259    16984 6   Teacher_studentmodulefileprogress_ModuleId_id_41c42264    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_ModuleId_id_41c42264" ON public."Teacher_studentmodulefileprogress" USING btree ("ModuleId_id");
 L   DROP INDEX public."Teacher_studentmodulefileprogress_ModuleId_id_41c42264";
       public            postgres    false    273            N           1259    16985 7   Teacher_studentmodulefileprogress_StudentId_id_12135e51    INDEX     �   CREATE INDEX "Teacher_studentmodulefileprogress_StudentId_id_12135e51" ON public."Teacher_studentmodulefileprogress" USING btree ("StudentId_id");
 M   DROP INDEX public."Teacher_studentmodulefileprogress_StudentId_id_12135e51";
       public            postgres    false    273            Q           1259    16986 2   Teacher_studentmoduleprogress_ModuleId_id_c9fdad01    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_ModuleId_id_c9fdad01" ON public."Teacher_studentmoduleprogress" USING btree ("ModuleId_id");
 H   DROP INDEX public."Teacher_studentmoduleprogress_ModuleId_id_c9fdad01";
       public            postgres    false    275            R           1259    16987 3   Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae    INDEX     �   CREATE INDEX "Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae" ON public."Teacher_studentmoduleprogress" USING btree ("StudentId_id");
 I   DROP INDEX public."Teacher_studentmoduleprogress_StudentId_id_5cbeb3ae";
       public            postgres    false    275            U           1259    16988 .   Teacher_studentquizprogress_QuizId_id_a04a2235    INDEX     �   CREATE INDEX "Teacher_studentquizprogress_QuizId_id_a04a2235" ON public."Teacher_studentquizprogress" USING btree ("QuizId_id");
 D   DROP INDEX public."Teacher_studentquizprogress_QuizId_id_a04a2235";
       public            postgres    false    277            V           1259    16989 1   Teacher_studentquizprogress_StudentId_id_4e5596d2    INDEX     �   CREATE INDEX "Teacher_studentquizprogress_StudentId_id_4e5596d2" ON public."Teacher_studentquizprogress" USING btree ("StudentId_id");
 G   DROP INDEX public."Teacher_studentquizprogress_StudentId_id_4e5596d2";
       public            postgres    false    277            Y           1259    16990 "   Teacher_units_CourseId_id_f67d8790    INDEX     i   CREATE INDEX "Teacher_units_CourseId_id_f67d8790" ON public."Teacher_units" USING btree ("CourseId_id");
 8   DROP INDEX public."Teacher_units_CourseId_id_f67d8790";
       public            postgres    false    279            Z           1259    16991 "   Teacher_units_ModuleId_id_14dc3af9    INDEX     i   CREATE INDEX "Teacher_units_ModuleId_id_14dc3af9" ON public."Teacher_units" USING btree ("ModuleId_id");
 8   DROP INDEX public."Teacher_units_ModuleId_id_14dc3af9";
       public            postgres    false    279            e           1259    16992    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public            postgres    false    285            j           1259    16993 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public            postgres    false    287            m           1259    16994 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public            postgres    false    287            p           1259    16995 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public            postgres    false    289            y           1259    16996 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public            postgres    false    292            |           1259    16997 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public            postgres    false    292                       1259    16998 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public            postgres    false    295            �           1259    16999 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public            postgres    false    295            �           1259    17000 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public            postgres    false    297            �           1259    17001 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public            postgres    false    297            �           1259    17002 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public            postgres    false    303            �           1259    17003 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public            postgres    false    303            �           2606    17004 H   admin_department Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins" FOREIGN KEY (institutionid_id) REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 t   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT "Admin_department_InstitutionId_id_3ace7e32_fk_Admin_ins";
       public          postgres    false    211    209    3529            �           2606    17009 T   Admin_userinstitutionmap Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Admin_userinstitutionmap"
    ADD CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Admin_userinstitutionmap" DROP CONSTRAINT "Admin_userinstitutio_InstitutionId_id_8c9feb65_fk_Admin_ins";
       public          postgres    false    211    3529    215            �           2606    17014 R   InstituteAdmin_profile InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."InstituteAdmin_profile"
    ADD CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins" FOREIGN KEY ("InstitutionId_id") REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."InstituteAdmin_profile" DROP CONSTRAINT "InstituteAdmin_profi_InstitutionId_id_32474369_fk_Admin_ins";
       public          postgres    false    217    211    3529            �           2606    17019 Y   Teacher_announcements_To_List Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_announcements_To_List"
    ADD CONSTRAINT "Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a" FOREIGN KEY (announcements_id) REFERENCES public."Teacher_announcements"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_announcements_To_List" DROP CONSTRAINT "Teacher_announcement_announcements_id_cc6864cc_fk_Teacher_a";
       public          postgres    false    219    3541    220            �           2606    17024 S   Teacher_announcements_To_List Teacher_announcement_profile_id_f1306085_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_announcements_To_List"
    ADD CONSTRAINT "Teacher_announcement_profile_id_f1306085_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_announcements_To_List" DROP CONSTRAINT "Teacher_announcement_profile_id_f1306085_fk_Institute";
       public          postgres    false    217    3537    220            �           2606    17029 G   Teacher_answer Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_answer"
    ADD CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_answer" DROP CONSTRAINT "Teacher_answer_QuizId_id_8a8f554b_fk_Teacher_quiz_QuizId";
       public          postgres    false    3647    267    223            �           2606    17034 G   Teacher_assignment Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignment"
    ADD CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_assignment" DROP CONSTRAINT "Teacher_assignment_ModuleId_id_10a5fe63_fk_Teacher_m";
       public          postgres    false    3625    225    255            �           2606    17039 S   Teacher_assignmentupload Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_assignmentupload"
    ADD CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a" FOREIGN KEY ("AssignmentId_id") REFERENCES public."Teacher_assignment"("Assignment_id") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_assignmentupload" DROP CONSTRAINT "Teacher_assignmentup_AssignmentId_id_a4c12c1c_fk_Teacher_a";
       public          postgres    false    3553    225    227            �           2606    17044 F   teacher_course_departmentid Teacher_course_DepartmentId_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 r   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_course_id_fkey";
       public          postgres    false    233    3738    312            �           2606    17049 J   teacher_course_departmentid Teacher_course_DepartmentId_department_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_departmentid
    ADD CONSTRAINT "Teacher_course_DepartmentId_department_id_fkey" FOREIGN KEY (department_id) REFERENCES public.admin_department(departmentid) NOT VALID;
 v   ALTER TABLE ONLY public.teacher_course_departmentid DROP CONSTRAINT "Teacher_course_DepartmentId_department_id_fkey";
       public          postgres    false    209    3527    233            �           2606    17054 T   Teacher_course_EnrollToStudent Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent"
    ADD CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_EnrollToStudent" DROP CONSTRAINT "Teacher_course_Enrol_profile_id_65e9bc96_fk_Institute";
       public          postgres    false    235    3537    217            �           2606    17059 V   Teacher_course_InstitutionId Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_course_InstitutionId"
    ADD CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins" FOREIGN KEY (institution_id) REFERENCES public."Admin_institution"("InstitutionId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_course_InstitutionId" DROP CONSTRAINT "Teacher_course_Insti_institution_id_b4bf5de3_fk_Admin_ins";
       public          postgres    false    211    3529    237            �           2606    17064 N   Teacher_email_BCC Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public."Teacher_email"("EmailId") DEFERRABLE INITIALLY DEFERRED;
 |   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_email_id_5ed1e5b8_fk_Teacher_email_EmailId";
       public          postgres    false    246    3601    245            �           2606    17069 D   Teacher_email_BCC Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_BCC"
    ADD CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 r   ALTER TABLE ONLY public."Teacher_email_BCC" DROP CONSTRAINT "Teacher_email_BCC_profile_id_bde0e3ff_fk_Institute";
       public          postgres    false    246    217    3537            �           2606    17074 L   Teacher_email_CC Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId" FOREIGN KEY (email_id) REFERENCES public."Teacher_email"("EmailId") DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_email_id_a52b181b_fk_Teacher_email_EmailId";
       public          postgres    false    245    248    3601            �           2606    17079 B   Teacher_email_CC Teacher_email_CC_profile_id_8a708682_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_CC"
    ADD CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 p   ALTER TABLE ONLY public."Teacher_email_CC" DROP CONSTRAINT "Teacher_email_CC_profile_id_8a708682_fk_Institute";
       public          postgres    false    248    3537    217            �           2606    17084 ?   Teacher_email Teacher_email_Email_From_id_acc54e41_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email"
    ADD CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute" FOREIGN KEY ("Email_From_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 m   ALTER TABLE ONLY public."Teacher_email" DROP CONSTRAINT "Teacher_email_Email_From_id_acc54e41_fk_Institute";
       public          postgres    false    217    245    3537            �           2606    17089 J   Teacher_email_Email_To Teacher_email_Email__email_id_789297dd_fk_Teacher_e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e" FOREIGN KEY (email_id) REFERENCES public."Teacher_email"("EmailId") DEFERRABLE INITIALLY DEFERRED;
 x   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__email_id_789297dd_fk_Teacher_e";
       public          postgres    false    245    3601    251            �           2606    17094 L   Teacher_email_Email_To Teacher_email_Email__profile_id_4ade4937_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_email_Email_To"
    ADD CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute" FOREIGN KEY (profile_id) REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public."Teacher_email_Email_To" DROP CONSTRAINT "Teacher_email_Email__profile_id_4ade4937_fk_Institute";
       public          postgres    false    3537    251    217            �           2606    17099 M   Teacher_folder Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_folder"
    ADD CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id" FOREIGN KEY ("UserId_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_folder" DROP CONSTRAINT "Teacher_folder_UserId_id_25ea40b7_fk_InstituteAdmin_profile_id";
       public          postgres    false    253    217    3537            �           2606    17104 G   Teacher_modulefile Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulefile"
    ADD CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_modulefile" DROP CONSTRAINT "Teacher_modulefile_ModuleId_id_9e8dce7d_fk_Teacher_m";
       public          postgres    false    257    255    3625            �           2606    17109 T   Teacher_modulefilecontent Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulefilecontent"
    ADD CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m" FOREIGN KEY ("ModuleFileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_modulefilecontent" DROP CONSTRAINT "Teacher_modulefileco_ModuleFileId_id_72056622_fk_Teacher_m";
       public          postgres    false    3628    259    257            �           2606    17114 M   Teacher_modulesyllabus Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_modulesyllabus"
    ADD CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m" FOREIGN KEY ("courseId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_modulesyllabus" DROP CONSTRAINT "Teacher_modulesyllab_courseId_id_05c97e90_fk_Teacher_m";
       public          postgres    false    255    3625    261            �           2606    17119 K   Teacher_question Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_question"
    ADD CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_question" DROP CONSTRAINT "Teacher_question_QuizId_id_f3ba643e_fk_Teacher_quiz_QuizId";
       public          postgres    false    267    265    3647            �           2606    17124 M   Teacher_question Teacher_question_category_id_52ec7234_fk_Teacher_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_question"
    ADD CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id" FOREIGN KEY (category_id) REFERENCES public."Teacher_category"(id) DEFERRABLE INITIALLY DEFERRED;
 {   ALTER TABLE ONLY public."Teacher_question" DROP CONSTRAINT "Teacher_question_category_id_52ec7234_fk_Teacher_category_id";
       public          postgres    false    229    265    3561            �           2606    17129 G   Teacher_sitting Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_sitting"
    ADD CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId" FOREIGN KEY (quiz_id) REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 u   ALTER TABLE ONLY public."Teacher_sitting" DROP CONSTRAINT "Teacher_sitting_quiz_id_280a1446_fk_Teacher_quiz_QuizId";
       public          postgres    false    269    3647    267            �           2606    17134 U   Teacher_studentcourseprogress Teacher_studentcours_StudentId_id_838739dd_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentcourseprogress"
    ADD CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentcourseprogress" DROP CONSTRAINT "Teacher_studentcours_StudentId_id_838739dd_fk_Institute";
       public          postgres    false    271    217    3537            �           2606    17139 V   Teacher_studentmodulefileprogress Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m" FOREIGN KEY ("FileId_id") REFERENCES public."Teacher_modulefile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_FileId_id_e2bc8595_fk_Teacher_m";
       public          postgres    false    3628    257    273            �           2606    17144 X   Teacher_studentmodulefileprogress Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_41c42264_fk_Teacher_m";
       public          postgres    false    273    3625    255            �           2606    17149 T   Teacher_studentmoduleprogress Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m" FOREIGN KEY ("ModuleId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_ModuleId_id_c9fdad01_fk_Teacher_m";
       public          postgres    false    275    3625    255            �           2606    17154 Y   Teacher_studentmodulefileprogress Teacher_studentmodul_StudentId_id_12135e51_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmodulefileprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_12135e51_fk_Institute";
       public          postgres    false    3537    273    217            �           2606    17159 U   Teacher_studentmoduleprogress Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress"
    ADD CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentmoduleprogress" DROP CONSTRAINT "Teacher_studentmodul_StudentId_id_5cbeb3ae_fk_Institute";
       public          postgres    false    3537    275    217            �           2606    17164 P   Teacher_studentquizprogress Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q" FOREIGN KEY ("QuizId_id") REFERENCES public.teacher_quiz(quizid) DEFERRABLE INITIALLY DEFERRED;
 ~   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_QuizId_id_a04a2235_fk_Teacher_q";
       public          postgres    false    3647    277    267            �           2606    17169 S   Teacher_studentquizprogress Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_studentquizprogress"
    ADD CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute" FOREIGN KEY ("StudentId_id") REFERENCES public."InstituteAdmin_profile"(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public."Teacher_studentquizprogress" DROP CONSTRAINT "Teacher_studentquizp_StudentId_id_4e5596d2_fk_Institute";
       public          postgres    false    217    3537    277            �           2606    17174 K   Teacher_units Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_units"
    ADD CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId" FOREIGN KEY ("ModuleId_id") REFERENCES public."Teacher_module"("ModuleId") DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public."Teacher_units" DROP CONSTRAINT "Teacher_units_ModuleId_id_14dc3af9_fk_Teacher_module_ModuleId";
       public          postgres    false    279    255    3625            �           2606    17259 '   accesscontrol accesscontrol_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.accesscontrol
    ADD CONSTRAINT accesscontrol_userid_fkey FOREIGN KEY (userid) REFERENCES public.instituteadmin_profile(id) NOT VALID;
 Q   ALTER TABLE ONLY public.accesscontrol DROP CONSTRAINT accesscontrol_userid_fkey;
       public          postgres    false    327    304    3730            �           2606    17184 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public          postgres    false    287    289    3700            �           2606    17189 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public          postgres    false    285    287    3689            �           2606    17194 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public          postgres    false    3722    299    289            �           2606    17199 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public          postgres    false    292    3689    285            �           2606    17204 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    289    295    3700            �           2606    17209 B   auth_user_user_permissions auth_user_user_permissions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.instituteadmin_profile(id) NOT VALID;
 l   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_fkey;
       public          postgres    false    304    3730    295            �           2606    17214 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public          postgres    false    3722    299    297            �           2606    17219 C   instituteadmin_profile instituteadmin_profile_institutionid_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT instituteadmin_profile_institutionid_id_fkey FOREIGN KEY (institutionid_id) REFERENCES public.admin_institution(institutionid) NOT VALID;
 m   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT instituteadmin_profile_institutionid_id_fkey;
       public          postgres    false    281    3678    304            �           2606    17224 :   instituteadmin_profile instituteadmin_profile_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT instituteadmin_profile_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.auth_user(id) NOT VALID;
 d   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT instituteadmin_profile_user_id_fkey;
       public          postgres    false    3702    291    304            �           2606    17229 M   teacher_course_assigntoteacher teacher_course_assigntoteacher_profile_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_course_assigntoteacher
    ADD CONSTRAINT teacher_course_assigntoteacher_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.instituteadmin_profile(id) NOT VALID;
 w   ALTER TABLE ONLY public.teacher_course_assigntoteacher DROP CONSTRAINT teacher_course_assigntoteacher_profile_id_fkey;
       public          postgres    false    304    231    3730            �           2606    17234 *   teacher_quiz teacher_quiz_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.teacher_category(id) NOT VALID;
 T   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_category_id_fkey;
       public          postgres    false    310    3736    267            �           2606    17239 *   teacher_quiz teacher_quiz_courseid_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher_quiz
    ADD CONSTRAINT teacher_quiz_courseid_id_fkey FOREIGN KEY (courseid_id) REFERENCES public.teacher_course(courseid) NOT VALID;
 T   ALTER TABLE ONLY public.teacher_quiz DROP CONSTRAINT teacher_quiz_courseid_id_fkey;
       public          postgres    false    3738    267    312            n   8  x���Ao�0���S���������e�zp,NO&��H�}�Չ:�&�k�}�_�,$J�$�MB��fK��m]W���l_���C�+��hT O\i��MLcK�m�8:�EY�χo4n��lw�x� y��}nls�i�N���B��t�� @)��;���C!���Ht,�:���/�)r�@���K�/s+v_&�,�Ňj�$���F�/:}�/���jv��)GC�7�!�la�d�Z~.+�>m�OO�r\4h�L0���: �ٻM�t�v���d E��=�����Tu��]Qފy�����      p   �   x����
�0F��)�K��ɍ���G��El@+H|#bAl�����é;O�r�_/�! � w �H�5q�L+e����R���0�d��%����
lv�ї����(�"�!�8W��Z!����[et����$��9����	�[�      r   ;   x�+�4�tL����4202�5��50U02�25�24�330264�60�26 V�1W� `�      t   �  x��V]��H|n�
���{f�z�*Qe��u��)�l���8��1^v��ҽj����j��M\d%�Ss|�O�1�*�۷Q^�����I�EƎ�$Z(,�}�Җr�EJܙ<�������i�S�o��<~Q%ª��Y���,j����$)۴�B��r D�p,KQ���zZ��)��B�E�HL�&��WÖy�����d��҉��]K)&����@f�j�Ӯ��,+�g���Zy��^�5-C �%���I�Am��ݾ0Ͱ����a�a�����g+��t�55�(Jm��`���I������UZ�<vn��`Jڞ'�GxM�b0z�����e�����%���@y�$�w� s5��8'3�G�����^��]D��\�4I�g%yP���ڗ	��R��4�M�ƀBR���ڴ��`�4ۤa��w[oNh�%��d��+�f�:��+�$x��=u�6&N�L���o3��I��|����ޥY��*+�&X��\��ա�+��u�~	�L^?Ŧa�*�7�w�� tGsݘw�uԦ�~��9��J��v$j5���v��O��ɍ������������Hm����K,�e�Q3K�~�k�6-�"ӗ�e�"1Ǉ�<o�;q��b6��k9��UJ~�M����UgQ�o�w�rDJ%�䡸����!y�_Q��dg�H��q�:?��2�L�&��8yJ�Il��Y���&�֯b�R_S}n����~��ۧ��䪺����s�k�$�o��i���T��~��֏��"��C1A��`��r����_((']�|�ʬo��1ۉ����Y+��N����T#��?Hc �����^;�3�77�h�=���xe�oRަ�3^�I� �x`E�m������O{�X�z�W      v   {   x�=��
� E���/�8с�?��l$&��V���#���/8ש״ֺp�y?��{����yյ�|L��� B '��e����AԤRL�	�-��eQ�V��y��gA��0��??Z��>K(�      w      x�3�4�4�2�4�4����� ;      z      x������ � �      |      x������ � �      ~      x������ � �      �   /   x�3��u�2���L��2�t�2�t��/IM�����O������ �,
,      �   7   x���	�@��o��p{�����0�QQ�t�\&SK7��9��r�j��=I~(��      �   /   x�Ĺ 0�x)�3�y�q�u��q܂�I���E��0zY���}��Y      �      x������ � �      �      x������ � �      �   �   x���M�0�Ͼ?ƚ��1�G��BC���Z�����]=X��XT]���x4����	UD�����ԝ��U�Jb�>��V�/.,�f���7�t��T�Vޱԍ�M�{����j
/1������"�7,,1,�1�XewZX,��E͞�Z��V���[�ip0�����gVgf����/99��      �      x������ � �      �   �   x�����@E�ٯ�pgf7����/ !��y$�$~������Lq����5�˦�$���g<`dHM���J�6,��B�$h-F_�ZhTh��(�LK������z��[�"�d�ݜ(D���&�^�����XI��÷AXH�B�C72���sIT.�6����w���)���ͺ"��]Ô�i(���$B� ��d�      �      x�3�4������� 	 b      �      x������ � �      �      x�3�4������ 	'c      �      x������ � �      �   N   x�+�4���O)�I5��ӜFFF�f@gY �r&��f�!���L�����L̍�L���Te����� s�z      �   B   x�+�4�t��I5҉)��y�FFF�f�F
F�VFfV&fzffF�&��V��*3����� (�S      �   B  x����N�0E��W�D�(E�v]�BB�=�-O�#i��Y��!ْ5g��	�zq0Z`��reɐ�@{`�����c :��R�	<�J��9(��#9�M�;�(�C��Qi��c?�cV=h+��dV�΃�����K؇<45�a��������K��4ٕ;��8fE�IV4��|RvI�43��:f���]<r1Z��1���9�b��~��)�� �ј�߬(㑜@�r�����!�G���쭜Ѿc�-l��3]���+|�B��ٖ�N�ES5ͪڬ�
�z���^���}�^vm�߶��*���9�/      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   H   x�]ʱ� C���6�K��#*hĩһ-�N�8+�S�ʩD�i���=N��嶔훔�n[Y�6u_����      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x�3�,A�iHl#.���xec���� )�      l   ;  x��VMo�0=�_��
�3����}hW�z[�B!��%T�=��~Ǧ�P� �*P�</��|xΤf�ޟ��l2[�C�r,`,t6(r��A��00�30��z�g��k�m[7�bV���pH1
�@1����$�Dbo#A�ѝe2�I$�FϵPH��D�$(� �d�[��<YL�Q��g�|�l�Uٜ2�}&��8����pm�	I�4��fZ����kV�X;(�TA#w��o���
�>H��r���{��Ֆ���p^逆i29t0�q+e��ͦ��Fð)'��#o�QA�pГ��C������ ����$�w�G9��օ���Q��ؼYLz}}��k�`���LL`U��h��k�D�f��������f?�m������V\��P9&1�������C�ؾ�reۇ���v������äQW�'u��������K���\"0q�����I���f#�4���/���>	�XH���.�9��#<l�Ʒm���r[��C�kύ��C��Z��v�	ĕ�� Լ���2����}��m9������ͪY���t�݃��s�����tE��ģC��|���y](��δ;����~W'd�-��e���ZV˗�eQ�O�Ft\��3��Q� �q;I3FQ��i?p g��#��}+�����{���gٯv�G.HZ��q�ߝ���;4��q�GiXYR"m�L�A w�l�`�Bұ�j�����'��v��_�zݜ��Q)�A�Nf��01�+��'+����>L�E�]�a���wo�+��\r}��m���o�6�{N00z���?wQO      �   �   x����N�0D������^H|B�8!q�,��9��~��L�}�W]U~?�	H�*$RqD��ӥ�,�b��:T�iw���_wq�h��0�2U��X��Z
2��4nӘ�_�b:n�1���cFIVX��$���p�A�w�����C�C��,f"�̭����Ǯ�"4�\��Å�j�89�B+w/��h��=���hr2�����k?�Ù��.;���7~��      �   d   x�3�LL����4202�54�52T04�22�2��343�,A�7��Z���Ad2J33JA0"�eD������E0�˘B�KJSR�J`4W� ��>�      �      x�3�t/�/-0�2�0��b���� Q�      �   #  x�%�˕#1�F0�ďH*��?�����m�d?���f ��˼(f���a���~v`�O�	`�&�%L�0��`BY���	g.��x���r�xp�<�������.�\<�� �C�|�}�@��/.B�(�x��b��C��)^R�t�x��l��D��)^R�l�x9H���w�x�pŻ�+�\�.Oa���wW�۸����>�xuP╡�+G�W��%^�\�`%^5J��x����A�׆�-^Z�N�x}��5��Ui�x=h��aě�o#�8F�	�x���bě7�ޖo0����<���O�x���]<�^��O��6o����l��Jv�l�[}�և�>[��f���a�ϖ���g�}��?l�ي���Yk>m��G�|�ȝO���#>�dЧ��$�E�F��V$&���r�;V'&��A�l�br���V+&��A�l�b���A�l�br����c%cr���V4&��A�lecr���V8&��A�l�cr��{�h�c�cr��I���� ̱�      �   �  x�}�͎�6�Ϛ���Z��t�$@r[ Pl�W�-9�����G$��*�ޛ%}�S���m��{;l��es��nX���,���kw��׷�R�o�p�t���-{�n�¬�E�β�����q����M�~��q(*kn���+N?�W��,�'�K���h_���(jk�}^�[4��T��<%֔�Ԗg�#%���9wS��f�G�t�^+�٣a�H`�Ck#<?�qX�/w�|<�bo��-{��'4�b.�4�1���HRm�r$��c�+�;�U�yeʊb�IJ��bIȉr�!R��~��~y.���:�;���0.Nce��8V@\���cZ3���8Y���i*��h`(-��@V��f�sN
����Gф����h�e䐫L�$e�
��L�(�}�dF�	�t�vZ��?��*�h�cP�'Ӳ�H@�d�,�;�&�v��l�@\Ǻ���ʴ8��S��H qe�:�`M�{�t�ќ��h;�k�Q`���a�*¾"1E�5@���i��m��9����аXr��`h���C{L�s�4����\�\�#N�B�TJ�HTP�QS�:�9�|��{��aO�ŀ�ϠhR�AA��ⰍM�ZS�����(�i���lS�<!ND��$�#�O 4%ϡ_�tǚ�0 �#0����0�S��k��4���b&cv����E�N0yh��Gf򤤼�৆E(E/����EH��n�xQ�NvB���B�{�R�]n72Ux?2�����=�:���)���)r|�3&aZ�ڦ�c�u��%�r��Tl~�WI�܆�Oۗ���Kw.�V&��Z>�)q��S*Q�6-S��+S���U�oS��.ݢLܝL�s�,�p-*72�KQGίPꊀ�� 
�@�0��5w�p�?L�˦���ϟbܮ���I���GAU�i#�+��Q2�: W|�(N�k<��S�]p���ߚ9�{j�h7��+	T�s��o%PqT�	�^L }����vk�~�8�$��4��e4����n3
JiHai�L*(�i�eUn��?��^����/0�'�UؽȰB2�Q�}v@C}4���V�u�]���ܜ$W�9�*��!y��()@�Q��Y�@�������r#����;@b8�v��p��@Y[�h������q�KQ��e�#7,Jyf���ař�� ͌��<k��	Q���ˌRR�3:��FҊҜ�ү7�B�3B�=ǲ*^��]�y�Zێ�VIO��ά4��j��̊����>Yy\ V�����y�g_���[�1�z���c�)�r�Ӻcy���Ű�HZk��7%>u�с8��<����ʩ�d����C�Ɋ�w?(���0�X�e�f��]Y�Z�b~E@R�Qқ��r�'P�e�a�ù3�����$޴
j1�(X�u;�/�., �AsIT��D��e������8����QPG7e�W �C������r�|��ּ�s��}��y�k^]n/�~(����nr��:w�ú�/������r	      �     x����j�0D��W�lVR,7:��[���K.K"E�b�пo��V5�Ptvgb[gz�xbŤ\�,��g�V_�7�G��+�ώl�A|xs[/�M�p1&'��N>��Ə��)|�à�h������;��O�!6���
cr*'Ӽ�Rq^n6�Y��ۼ���ʙ�MW���p��AQh�kZl�b��R+��S�R �8��n�D�&o���Bt��RZ���[��(��M�^�`4hB�����KJ�'+�      �   "   x�3��4�2�44R@dq�pW� C�      �   �  x�-�˕1��`��_I�8�8���y�fWB����?��3,�L+<�϶�s��y��y����?~�3w����0g��9C���m� sF�1g�_s���`^|�|}��`^��,�m���ű`^\�ųd^~��K�d^�'ԏ���˲d^�%�r,��ǒyy-��ϊy�Y1�܊yV�+���K++�U[1�Ɗyu��W׊y���ן5�ڭ��aͼNk�5VA�����f^k���f^?��güq�M�0o҆yS6���vl�7ǆysm�7���g�y��0�杴üSv�w��v��ʱüs�0�<�̻�]�]�˼v�w�.�n�e�m�̻c�y{O���e�}���>{�{n�y/�1�=潲Ǽ������ޱǼ�ݬ����;�Ӗ���?m���Ӷ���?m�;������?m��������?m�;�����Ҩ5[0�8l�V����=[�g�m�ء-[�5B�\E���nn9�P���$����@�\���h��Zx��b�]�z�I��V`�dxb=sOLb�k���I��U8<1��ιJ�'&1��Yр���i����G?q5�O��i�'PCN�V("'|+T����	�
uĄ�z���z���z���z������4�谏h��豏h��貏h��賏h���1�j?b=+��Gtۏh�1�o?b��~�@������=�+��Wtݯ�6}�+�Wtޯh�_1�{�b��~�@��������'�O��w���?1�b��Ā���>�O!>1���Ā�^�O��7�TC|�#�O�������vH���#P;��#`^;��Ks�
�K�/�_<�4�"bi0E�Ҡ����K�,"�Ʒn,�/�X�޽K��7��7p,�/�\�ù4��si|���BΥ��K�8"�sD.-��_��4�#ji�G�Ҡ����QK�@���D-
�4��4]M��N7��tC�N7��tC�N7��tC�N7��tC�pC�pC�pC�pC��ӌpC�pC�pC�pC�pC�pC�pC�pC1��8b�q���Ā�7�n�#�G�!�pC1���b�qŀ�7���d&�W�!�pC\1���b�qŀ�7�n�'�O�!���?1��xb��Ā�7�n�O�!?1���Ā�n�O�!?1O�b���q���8n~oGp�9�!�w�cG�<w�kG��w͗�<�.nH_ܐ�4�!cipC�������K�2�7d,n�Xܐ���9zipC����̥��K�2�7d.n�\ܐ�4��si<���xjϥ��4�ݗ��{-�'�Z�4��ki<���������B��{��p�i�;�p%jn�⭈��x1�)܍���p=n�F0$�K�8�����l��|
�bͧt��|��R���+�����4.�i\,�胼:�/F_�6�8m�?���`�&��M��%�+4!hB�τ8�K�0X���E��`m&���L����3)�eR,ˤX�I1��&w-x��mR��u��ׅ��N]�(�ԥ��ν��&\�(��Ռ�N]�(�����N�(��kĀ�kĀ�kĀ�kĀ�k�h^�Ā�kĀ�kĀ�kĀ�kĀ����:�#t^G輎�t1?+��g�8������+4]Wh���T1��b@�uŀ��M���+4]Wh���t=1��zb@��ĸ��M���'4]Oh���t=1���Ā����Oh�?1����x�l�AM�7;����=��h��vH'	i�%i�=v�sG��di�}i�����������KC�ۗ��w,��X�߱4��ci�������A K�9ai�M��Л���8�K�:�t.�\$й4X�si�@����Υ%�~�4��siPA������A]K���t->�Z�е4jzw �4�;G���#M��2��'���1�b��=      �   T  x���Ko�F��ҧ |j�z��;�⩉�D�Ĉ�C�������"�j`��Ճ�%;N âd�7;�3��Y.�1�ǂG�1�X
f �߸�%��ʋQ֔Et>��}���Q��YzG_�}��E�r1 ���i^6�h\�7��mt�����JĊ3�4׺�?I'yG�q��g���Ԅ�N�b��X@�K��ϒ�8��(M����s2�j����qR\-�G�yv�������$�o�~�������i�)��ޔ��eV�Y埞�i��5l<�|�7����I��?��O��YU^&��z��*�/�O�_�0M�o.Z�T蜊A0�Qk�:7�&�ug�����Jh$�ɎN�)�έ�M�ɗ���'�d:bPL*n�X�q0�����n��Xj��pg��9-��r��s6j�_��m��i.����h/�DED��M���QD2 �܂<)�&+�~�� �&�d,��,���5��M�j��Σ;J��\X�;�*���+���6��yp��!Ȁ* DU����NҬH�W�ոO��!�D0��k��]����g��%c0�j+@��uV�.�&ofM^�ɴ��<Y�dc ��U9��6m�"L�(I���v0�)g�̋F�?����Q9�BDO�Qzq�*!�U��}�"��&*H�����l����O�����kD;����EZ���� +�JE��J�����J��X�%�ca# _҄a�)�vg��y��f�~�գ*���X���K@`V�Ғ�;4����)i�ɎC"���9sڑZ߅<�v����"�<N9�j�i���*<dCs*��L�*0�3����z�.��!(��V��y�`��6.HQӶ)���&�I=��	�	�)e��w?�'��~�b�[�r�Λ)yG�eQ�V�'��m>.rӅP�Ė��R�V��ng�Y���JĜ)y�����q��r��}��i�.�� ����z�ٿ3�(�$�$-N�*�#[�� u Hn2-�D�#���C�j��c<�j�K8jrh�N��;7�:`IRMIQ������NVW�o�Rǃ`�.E&eY5��=] �l�T\%sԚ`���Ƣ�˨��h�j�ʅ�ұ�����˚/�ԼXB2��t4(jhSC�!0��	[F�a� 5_Z[��b@'}��PCe�R�#k%�4�X��c����R��7x���ɫ�������w�_��zݮ�Dŀ�Ò��z����/֦Th�Np������Cs^Z��w 7<[)�}<�F��l:gk���0ͅujf�<����*�;��� �hå�E�B�N�;��"�-�*���A���xH��� ����5(	��Rj��=�΍P{	D�EǾ�-ɿ`�w6S��tmS�l��!�('�jװ[�p{��0a�Ab�Qem��U�9�m���TH��7�i?�z���+V� yt�.{7R��'7ل�^݆�9йI<-Ӝ��|w���Y�37oaXha����������E��z�<)���� ��z6I�ΛW�d���S����A�;zCq �'�>$�ۭ=`r���>�$UL龯�tk&�S��-��Z�J��Й�<^���6�r�M���y�.���_6���ñ      �   W  x�mR�r� ����$N2�2u�؅ڊÝA{��l���l�鉧'�3Սڰ��h��`*�s�GM��9#����~"��k�	�,<�6��N��|���OJ�P�!��������iT�n�u�c���'������Л+ڪ��M��,����~EF��$�r�mV����G�?� �إ2�y��d��Nϟ��{M���k�l��i�!hӃ��Α�i�⺔־�1�;�L�b"ˎA�A\�Хce8*=�(�[��n����V��I^e<���WS�RTٴ����r)_�S�XV�~S��A�����O4�c�:��m�]&���5Y�� �0��      �   �  x���Oo�0���S�}U4c��m�{ﱒe�X�S5�~M����6�p���g�<�_��� �v����B^�����H���5p�Bs�p U��h�/���0B�&��Y���HՀ��D��=���%ڧ
V�d�0��T�ִg�Չ#4�`�r��xe�&�5Q\p���MEt�dT��`�auj�ks:�b8(TE�(�FIJm�����{����]�f�K#L���23�K��z�G3�]�T@Y6�L�h�G�d���y�le��|�ގ]�j��@UpXpt�-sz����!�!������=i}\��S�w�_�-��=�7s\��R�K���%9y�
�'��,.ï�Ы�Op��[A�w'}����!��;Ϧ�O �d�r ���u�[۱�5]9�(
L}��)���)��LC�h]���)�<o*T��z��]VO�^���U�H���W�侽w��/-&s�	V���~�Z�f�G����p8�(�A      �   �  x�E���DϞ����sЍ9�I�H��s��[�3k}ot�ꪶ��i#w�(��ķ<Y�m9���G��ʔ�k�v:n�*[���]ps��9�U��i<o�l���h��� ���9��g���P��Ʀ�Tv��:>%��[TH�c��0��l�}9o����̌W?�p�^(~�=�7S]��H̺95�� �%��a�Ӹ{q�as�^̘��9x]i��G��6I���)���jh��D:7�较qn�\E�j7J�l���s�u;`GX=U{�y?������_b]�O�؈������So�[� �M��,��x����	��Uk�v�b�}V�6U�k(��/�����+�����r���7P�n���S�����eڧ�*��G����A@ ��
�B(ň����1�c5��xXC4Y�=�b1���r��oȻ;k̯�4m����� P�R�brvv�2����F�{?̅���0�7O_����w��}��PO#�Ye�@/�A�	z���f�O'z��京Dx(t�lY7����x�cը�y-�Qކ�a�ޙ|�n�)���	lG�QC#ڣ7 5x\K]�Rt8=~�w�RؽoD4zI���V��;Y�1t֤��_��8�~�s2t�0���vSީ��
-s����"��2KY�/.!�Ǧ�/s��ᅐ�,D�I�E�����O/U��Rtl���\�Oz`�D��P�\pvT��{�s��T�mS�a�tP�ƿ���h�6(Vr��0X�Aq՗ސ[Z���S���S�|~��4g���� ��mK�Ν/�e�@����!g_i�C��#�$�g��}�2'7�$��Nr�T�	��+�:��k�%ݠI,B� ��v�<_�<��n9G ��dF+ �q�N��gdއF�h����W��P Q?!�k��q���|]�x�c�~�2yD(���5��
���@h+���'��e�.h�[��s������А�=["jWq�=��s� ��d���i3F��6r�=�h�D.q�6{�[��ޫ#u�b ��9��a�� �.� 7�ݯ��3K����$�Ɨ<K�����d��&���k�ٓ
��z�wꦣ(y�K�p��-�z�Ǥ��n���@��0�\H���`t	Ԋfdb0���W�;�%U}v���l�<5|>6]��X���5UNs\��9Q�op�)?�Є��y6�'m��R��T�Ɣ �%�C\!F*������O~`�$�8�#�p�~9�AK�c'-)5��8x�3��n��^���pז>BЁ�QGۂP�O�4�v���÷�S�^��8�n��VO��8�El���~fT�j�}��9���v7�[�~	,�	�&��%&�O$.���<��Ld�i�̭;"�c��VB���m|��g�:)���r$�C∛6��	D��44��-�Ⱦ��`���wd{{��������4�U�/Μ�Ĺ�6¡d��'�j�gj�(Nb�����@�B݌B��!t_�S�l�]�u��y�	���4ȋ �s	;��X'�;�fyZ*D>svU�[%�d��1�����.���� �	a}@�/���u��6!�ڛ5E�4��n=p��+��w�4�j��3��W9�wd(������nM������M�YS���Ft 7�$��`p��`�U��Y*4�W��EJf1u+�kg����2U�T���R��}jɒ�:�����_�\D�h�s�g���h���S^N\|� ��f�C�J��
 �P�@�+�_�:����TU]e�`�A�5X2�]�X�n�4�rR
L�:7G��ᝑ�z��2�c����]1�(��OLb`c��(n��+T�7�7�ە���AU$�/@T-�Wx)��f�^�W3�4��n'	�����w>'����K�;*B>���O���׏?���P�      �   d  x���ko�J�?/��P;�]�o�IDr$�T���x�.� �Ф���MK\%'��XHH�����;�3�d ��{�>tϔN���o<�� %��RA��"��UBd�$	(� WEĦ��@��0�1�2�[]��,jz�G(=���w�u%��W*�˳�τϙ@!M�M�eZt�1}�&�e*���t����MY���Mz��3ޥV ܀��𑞝X�I�/9�5Q�
���g~�Ҁ[��/(�R�������>�)��x�U�YY�Kx�;�D�gXִ�����������&���<L�K6�|{��:H���v���UAQ�8�|~Y@-�	paz��~&�V܇t���
�uN�}P��
���6�G�W;h���o��/n��\�SU��2WI���@SQƵ��y	s%����5���T�Wj}�^`râ���qNMn���tPo&���9L�wlW���gv��&��j[!N�:�����+���;��ks�t�">����x��m݅F�l
%���ۄ����)ڄ&����<��i�qP���]�n�����.D�U�4�ނ�cX���ǚ�w������F('�&��8�8?s�1��G�՞�[kW=Ӧ��=��y&e:�uQf�Xǐ�|,X�ݯ2��|�0>�����}�����eaO^Lf�ϗ��1�6[g���~㈧��koַ�F[-����S�=N�����ڌ訟���ģ�l5]�כ�df<ή�t3t�&"Rnl�O7\-�OIoJ�c�R�07�4���α��2�8��O��n&#�{�:]w?8��s��SsT��xL�i�G&�S�qR�&���M� ���"����q��y�Wi���>�/f��� �s�      �   R   x�3�LL����4202�50�52V04�24�2��3�0��K-O��H�H�,�(�O�(�K-WH�/-*NUHLIIM������� HB$      �      x�3�4�4�2�B�=... %      �   �   x���Kn1���)r�����t4HQ�Pf��~#6,6x�?��gxl������L̋ᅲ�,.�H!���ۅ�b�6V�N�RV�����Kѷ{�{��}��QLD�;�z�(��?ʦk�ǭ�9=���#�>/��V��轴����7	�PF��8k�3:���z��|0Z
��ͩ m��4�	c���d��J�?��lm      �     x��Tˎ�0<3_�� �i��Em��)���O$�"������n;	v<CR�a$�r@!��y�\�5k.3�Nr��~���C��:�}�r� ���0�m��:��:)�LY�������ӷ,�Z���TP3�yޏ~�*Ua,�s0��P�6\7c2D'��d�����)1���>>eְ���s4/�Rf�����vh^��͚���6^T��_���xN!�(A�]��n�8%'h*QC�z�����f#��.8��!�-I[RޱiI�2�D���
Bu�G��Y�:CE
;�Y!������U#����8�e�$U>�fy��Iô��K_��j�4�:)��{�If �:_Dj�a���$��]?���ڧ������F�T
N}�H�	1��y�."���dg&m��R���SN���V�aR ��kbL��)y����i�𢡄��Sڲm�R�J�S�
�Vi99_���4sǶ;lB��Mx������?o-���",�E1Yj�V��?�<k      �   8   x�˱  ��va�9xY��
1OML%.-��xt�Tx���D�5��3      �   N   x����0�0LUL⦻t�9�?w�I b�B��
�;4+�	�'4_��QQ�Lz���%n<g4n�̢�]$���      �   (   x��0�4�4�4�4�44�4�4�4�4R�\1z\\\ T�      �      x������ � �      �      x������ � �      �   m   x���K
�@��)��M>��Yf#4�g�Yyt)�"�,x�6�����?��$#���U�j"3X��u=:��i����3��4YEyu�Z<��;xLX/�:Y*:�'!���7�      �      x������ � �      �   x   x�u�M
� D��)r��3��M!�!4�ޟj	:o;o��(u�����x&�<q��Ɛt�g�ZNP��Z��Υ��n�Ėc��A��uv�~���a蒉�%��hߠ�91��y�ι[�3      �   �   x���A� E��)zf`h�ܙx 7�!�jl��ݙ����#8����~v��`��mp��&_��/k��%C��h���p�<�v򞚲ڈu��S Q�*��k����vr���g���R��:)�:�J�7w�:z     