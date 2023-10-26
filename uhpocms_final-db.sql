PGDMP                     	    {            uhpocms    14.6    14.6 N    V           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            W           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            X           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Y           1262    201670    uhpocms    DATABASE     c   CREATE DATABASE uhpocms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE uhpocms;
                postgres    false            �            1255    201772 ;   add_question_with_answers_mcq(json, json, json, json, json) 	   PROCEDURE     �  CREATE PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer)
    LANGUAGE plpgsql
    AS $$
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
$$;
 �   DROP PROCEDURE public.add_question_with_answers_mcq(IN question json, IN option1 json, IN option2 json, IN option3 json, IN option4 json, OUT generatedid integer);
       public          postgres    false            �            1255    201773 )   delete_question_with_answers_mcq(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.delete_question_with_answers_mcq(IN question_id_to_delete integer, OUT deleted_answers_count integer, OUT deleted_question_id integer)
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
       public          postgres    false            �            1259    201785    Teacher_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Teacher_answer_id_seq";
       public          postgres    false            �            1259    201774    Teacher_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Teacher_question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Teacher_question_id_seq";
       public          postgres    false            �            1259    201694    admin_department    TABLE     s  CREATE TABLE public.admin_department (
    departmentid integer NOT NULL,
    createdby character varying(255),
    createdon timestamp without time zone,
    description character varying(255),
    institutionid integer NOT NULL,
    isactive boolean,
    modifiedby character varying(255),
    modifiedon timestamp without time zone,
    name character varying(255)
);
 $   DROP TABLE public.admin_department;
       public         heap    postgres    false            �            1259    201671 !   admin_department_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_department_departmentid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 8   DROP SEQUENCE public.admin_department_departmentid_seq;
       public          postgres    false    216            Z           0    0 !   admin_department_departmentid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.admin_department_departmentid_seq OWNED BY public.admin_department.departmentid;
          public          postgres    false    209            �            1259    201712    admin_institution    TABLE     u  CREATE TABLE public.admin_institution (
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
       public         heap    postgres    false            �            1259    201675 #   admin_institution_institutionid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_institution_institutionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 :   DROP SEQUENCE public.admin_institution_institutionid_seq;
       public          postgres    false    218            [           0    0 #   admin_institution_institutionid_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.admin_institution_institutionid_seq OWNED BY public.admin_institution.institutionid;
          public          postgres    false    213            �            1259    201702 
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
       public         heap    postgres    false            �            1259    201673    admin_role_roleid_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_role_roleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 ,   DROP SEQUENCE public.admin_role_roleid_seq;
       public          postgres    false    217            \           0    0    admin_role_roleid_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.admin_role_roleid_seq OWNED BY public.admin_role.role_id;
          public          postgres    false    211            �            1259    201725    auth_module    TABLE     m   CREATE TABLE public.auth_module (
    id bigint NOT NULL,
    module_name character varying(255) NOT NULL
);
    DROP TABLE public.auth_module;
       public         heap    postgres    false            �            1259    201724    auth_module_id_seq    SEQUENCE     {   CREATE SEQUENCE public.auth_module_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.auth_module_id_seq;
       public          postgres    false    220            ]           0    0    auth_module_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.auth_module_id_seq OWNED BY public.auth_module.id;
          public          postgres    false    219            �            1259    201735    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);
 #   DROP TABLE public.auth_permission;
       public         heap    postgres    false            �            1259    201734    auth_permission_id_seq    SEQUENCE        CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public          postgres    false    222            ^           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
          public          postgres    false    221            �            1259    201684 	   auth_user    TABLE     o  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    created_by character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    date_joined timestamp without time zone NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    last_login timestamp without time zone,
    last_name character varying(255) NOT NULL,
    modified_by character varying(255) NOT NULL,
    modified_on timestamp without time zone NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.auth_user;
       public         heap    postgres    false            �            1259    201674    auth_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public          postgres    false    215            _           0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
          public          postgres    false    212            �            1259    201745    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    module_id bigint,
    permission_id bigint,
    user_id bigint,
    role_id bigint
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         heap    postgres    false            �            1259    201744 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public          postgres    false    224            `           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
          public          postgres    false    223            �            1259    201672    instituteadmin_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.instituteadmin_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.instituteadmin_profile_id_seq;
       public          postgres    false            �            1259    201676    instituteadmin_profile    TABLE     {  CREATE TABLE public.instituteadmin_profile (
    id integer DEFAULT nextval('public.instituteadmin_profile_id_seq'::regclass) NOT NULL,
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
    userrole character varying(255),
    userroleid integer
);
 *   DROP TABLE public.instituteadmin_profile;
       public         heap    postgres    false    210            �            1259    201786    teacher_answer    TABLE     �   CREATE TABLE public.teacher_answer (
    id integer DEFAULT nextval('public."Teacher_answer_id_seq"'::regclass) NOT NULL,
    content character varying(255),
    correct boolean,
    questionid integer,
    questionorderno integer
);
 "   DROP TABLE public.teacher_answer;
       public         heap    postgres    false    227            �            1259    201775    teacher_question    TABLE     N  CREATE TABLE public.teacher_question (
    id integer DEFAULT nextval('public."Teacher_question_id_seq"'::regclass) NOT NULL,
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
    modified_on timestamp without time zone NOT NULL
);
 $   DROP TABLE public.teacher_question;
       public         heap    postgres    false    225            �           2604    201697    admin_department departmentid    DEFAULT     �   ALTER TABLE ONLY public.admin_department ALTER COLUMN departmentid SET DEFAULT nextval('public.admin_department_departmentid_seq'::regclass);
 L   ALTER TABLE public.admin_department ALTER COLUMN departmentid DROP DEFAULT;
       public          postgres    false    209    216    216            �           2604    201715    admin_institution institutionid    DEFAULT     �   ALTER TABLE ONLY public.admin_institution ALTER COLUMN institutionid SET DEFAULT nextval('public.admin_institution_institutionid_seq'::regclass);
 N   ALTER TABLE public.admin_institution ALTER COLUMN institutionid DROP DEFAULT;
       public          postgres    false    218    213    218            �           2604    201705    admin_role role_id    DEFAULT     w   ALTER TABLE ONLY public.admin_role ALTER COLUMN role_id SET DEFAULT nextval('public.admin_role_roleid_seq'::regclass);
 A   ALTER TABLE public.admin_role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    217    211    217            �           2604    201728    auth_module id    DEFAULT     p   ALTER TABLE ONLY public.auth_module ALTER COLUMN id SET DEFAULT nextval('public.auth_module_id_seq'::regclass);
 =   ALTER TABLE public.auth_module ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    201738    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    201687    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    212    215            �           2604    201748    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            G          0    201694    admin_department 
   TABLE DATA           �   COPY public.admin_department (departmentid, createdby, createdon, description, institutionid, isactive, modifiedby, modifiedon, name) FROM stdin;
    public          postgres    false    216   ��       I          0    201712    admin_institution 
   TABLE DATA           �   COPY public.admin_institution (institutionid, createdby, createdon, description, isactive, modifiedby, modifiedon, name, picture) FROM stdin;
    public          postgres    false    218   ׁ       H          0    201702 
   admin_role 
   TABLE DATA           �   COPY public.admin_role (role_id, created_by, created_on, isactive, modified_by, modified_on, role_description, role_name) FROM stdin;
    public          postgres    false    217   %�       K          0    201725    auth_module 
   TABLE DATA           6   COPY public.auth_module (id, module_name) FROM stdin;
    public          postgres    false    220   i�       M          0    201735    auth_permission 
   TABLE DATA           @   COPY public.auth_permission (id, name, description) FROM stdin;
    public          postgres    false    222   "�       F          0    201684 	   auth_user 
   TABLE DATA           �   COPY public.auth_user (id, created_by, created_on, date_joined, email, first_name, is_active, last_login, last_name, modified_by, modified_on, username, password) FROM stdin;
    public          postgres    false    215   q�       O          0    201745    auth_user_user_permissions 
   TABLE DATA           d   COPY public.auth_user_user_permissions (id, module_id, permission_id, user_id, role_id) FROM stdin;
    public          postgres    false    224   ʃ       E          0    201676    instituteadmin_profile 
   TABLE DATA             COPY public.instituteadmin_profile (id, isactive, address1, address2, city, department, email, gender, state, zip, createdby, createddate, dob, first_name, institutionid_id, last_name, mobileno, updatedby, updateddate, profile_pics, user_id, userrole, userroleid) FROM stdin;
    public          postgres    false    214   u�       S          0    201786    teacher_answer 
   TABLE DATA           [   COPY public.teacher_answer (id, content, correct, questionid, questionorderno) FROM stdin;
    public          postgres    false    228   �       Q          0    201775    teacher_question 
   TABLE DATA           �   COPY public.teacher_question (id, figure, content, explanation, questionorderno, ismcq, quizid_id, category_id, is_active, created_by, created_on, modified_by, modified_on) FROM stdin;
    public          postgres    false    226   *�       a           0    0    Teacher_answer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Teacher_answer_id_seq"', 1, false);
          public          postgres    false    227            b           0    0    Teacher_question_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Teacher_question_id_seq"', 1, false);
          public          postgres    false    225            c           0    0 !   admin_department_departmentid_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.admin_department_departmentid_seq', 2, true);
          public          postgres    false    209            d           0    0 #   admin_institution_institutionid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.admin_institution_institutionid_seq', 2, true);
          public          postgres    false    213            e           0    0    admin_role_roleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.admin_role_roleid_seq', 2, true);
          public          postgres    false    211            f           0    0    auth_module_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.auth_module_id_seq', 1, false);
          public          postgres    false    219            g           0    0    auth_permission_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.auth_permission_id_seq', 5, true);
          public          postgres    false    221            h           0    0    auth_user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);
          public          postgres    false    212            i           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 50, true);
          public          postgres    false    223            j           0    0    instituteadmin_profile_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.instituteadmin_profile_id_seq', 2, true);
          public          postgres    false    210            �           2606    201782 &   teacher_question Teacher_question_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT "Teacher_question_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT "Teacher_question_pkey";
       public            postgres    false    226            �           2606    201701 &   admin_department admin_department_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_department
    ADD CONSTRAINT admin_department_pkey PRIMARY KEY (departmentid);
 P   ALTER TABLE ONLY public.admin_department DROP CONSTRAINT admin_department_pkey;
       public            postgres    false    216            �           2606    201719 (   admin_institution admin_institution_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.admin_institution
    ADD CONSTRAINT admin_institution_pkey PRIMARY KEY (institutionid);
 R   ALTER TABLE ONLY public.admin_institution DROP CONSTRAINT admin_institution_pkey;
       public            postgres    false    218            �           2606    201709    admin_role admin_role_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT admin_role_pkey PRIMARY KEY (role_id);
 D   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT admin_role_pkey;
       public            postgres    false    217            �           2606    201730    auth_module auth_module_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT auth_module_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT auth_module_pkey;
       public            postgres    false    220            �           2606    201742 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public            postgres    false    222            �           2606    201691    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public            postgres    false    215            �           2606    201750 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public            postgres    false    224            �           2606    201683 2   instituteadmin_profile instituteadmin_profile_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.instituteadmin_profile
    ADD CONSTRAINT instituteadmin_profile_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.instituteadmin_profile DROP CONSTRAINT instituteadmin_profile_pkey;
       public            postgres    false    214            �           2606    201791 "   teacher_answer teacher_answer_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.teacher_answer
    ADD CONSTRAINT teacher_answer_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.teacher_answer DROP CONSTRAINT teacher_answer_pkey;
       public            postgres    false    228            �           2606    201784 ,   teacher_question teacher_question_figure_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.teacher_question
    ADD CONSTRAINT teacher_question_figure_key UNIQUE (figure);
 V   ALTER TABLE ONLY public.teacher_question DROP CONSTRAINT teacher_question_figure_key;
       public            postgres    false    226            �           2606    201711 '   admin_role uk_96hyed6ttsaookaqmdmxldkr9 
   CONSTRAINT     g   ALTER TABLE ONLY public.admin_role
    ADD CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9 UNIQUE (role_name);
 Q   ALTER TABLE ONLY public.admin_role DROP CONSTRAINT uk_96hyed6ttsaookaqmdmxldkr9;
       public            postgres    false    217            �           2606    201732 (   auth_module uk_rsb8pvftbmtut85ct3jlbuuun 
   CONSTRAINT     j   ALTER TABLE ONLY public.auth_module
    ADD CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun UNIQUE (module_name);
 R   ALTER TABLE ONLY public.auth_module DROP CONSTRAINT uk_rsb8pvftbmtut85ct3jlbuuun;
       public            postgres    false    220            �           2606    201693 &   auth_user uk_t1iph3dfc25ukwcl9xemtnojn 
   CONSTRAINT     e   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT uk_t1iph3dfc25ukwcl9xemtnojn UNIQUE (username);
 P   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT uk_t1iph3dfc25ukwcl9xemtnojn;
       public            postgres    false    215            �           2606    201751 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public          postgres    false    224    3240    222            �           2606    201756 D   auth_user_user_permissions auth_user_user_permissions_module_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.auth_module(id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_module_id_fkey;
       public          postgres    false    220    3236    224            �           2606    201761 B   auth_user_user_permissions auth_user_user_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.admin_role(role_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_role_id_fkey;
       public          postgres    false    217    3230    224            �           2606    201766 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public          postgres    false    3224    224    215            G   ?   x�3�LL����4202�50�54R02�22�24�345�LI-(�4�,!�,��$75��+F��� ~��      I   >   x�3�LL����4202�50�54R02�22�24�345�LI-N�,!�(1)���
ҹb���� k�       H   4   x�3�LL����4202�50�54R02�22�24�345�,! ��\1z\\\ �j�      K   �   x�-�K�0D��a��Oi��	;ET�r�[�E�l��f�A�3a>�T�P�������"c�>�B�x�>�$�,q��|?�r�x��Aw�I��g���9�"a���������z�E4foR�9f���s�$�N-$z�NGS��Wc��u�y��~/��$,8N      M   ?   x�3�truq�R\F�.�>�@>��2�p�C(.NG��0���e���&�b���� Z��      F   I   x�3�LL����4202�5��5�P00�#�b`�鹉�9z�������E�%X�:�M�m>D� ���+F��� 7�!�      O   �   x�5��!Dѳ]L�^`�����3����d�_qG��o8b��sk�'��g��:}�XW��j���r+U��A����E�d�v�x4��JB%��PI�$v;�Nb%g�I�=ԀJB%���I�d{:��\M'��P�P�$t;��l/'ۿWf���G�      E   �   x�3�,��sE"9Sr3��s3s���s9�RssR9}=8M��!
8���u�u����L���M�q�k�Zp��-qt���㴴03032232!`hiqjQ|N~z�^VAj:̑��\1z\\\ ,�0S      S      x������ � �      Q      x������ � �     