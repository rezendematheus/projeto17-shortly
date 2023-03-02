--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shortUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url character varying(255) NOT NULL,
    "shortUrl" character varying(20) NOT NULL,
    visits bigint NOT NULL
);


--
-- Name: shortUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shortUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shortUrls_id_seq" OWNED BY public."shortUrls".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls" ALTER COLUMN id SET DEFAULT nextval('public."shortUrls_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'ace96bc1-267a-4d56-8d94-495b6bdb86f1');
INSERT INTO public.sessions VALUES (2, 1, '6320b5ac-1b1f-43fd-9795-4f00e4a4b2ce');
INSERT INTO public.sessions VALUES (3, 2, 'bef0fd44-072b-40a9-833c-74dde8669a19');
INSERT INTO public.sessions VALUES (4, 1, 'a019ee35-acde-43d5-9010-38502964fb63');
INSERT INTO public.sessions VALUES (5, 2, '96d55a4b-5e48-4603-957f-486b2f6c0f0e');
INSERT INTO public.sessions VALUES (6, 2, '0da46784-e5f4-45d0-b72f-fbf0cc4704c7');
INSERT INTO public.sessions VALUES (7, 1, 'eb47caf8-400d-4741-a24d-6cff20b4740b');
INSERT INTO public.sessions VALUES (8, 1, '55f231b8-f817-48ea-9836-c1311595e1fd');
INSERT INTO public.sessions VALUES (9, 2, 'f37c96a5-7f0a-450c-9161-8c9e1fe96943');


--
-- Data for Name: shortUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."shortUrls" VALUES (1, 1, 'www.driven.com.br', 'gXw9K_7K', 0);
INSERT INTO public."shortUrls" VALUES (6, 1, 'www.driven3.com.br', 'BK063IM9', 0);
INSERT INTO public."shortUrls" VALUES (8, 1, 'http://www.driven.com.br', 'vyDpDUu6', 0);
INSERT INTO public."shortUrls" VALUES (7, 1, 'http://www.driven3.com.br', 'UFFKPc_e', 4);
INSERT INTO public."shortUrls" VALUES (9, 2, 'http://www.driven.com.br', 'gAMXhRba', 2);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'matheus', 'matheus@matheus.com', '$2b$10$TtG8YuLjgjwNtOzJpUpLp.W/vwPc2WVpdTYK7uKyXi0IHXSVQ2ZkS');
INSERT INTO public.users VALUES (2, 'matheus', 'matheus2@matheus.com', '$2b$10$tf8Vu/5SRWB682.c6jXSY.K/FKZ.GGOSymfHApLTh2v9p.IydFKum');
INSERT INTO public.users VALUES (3, 'matheus', 'matheus3@matheus.com', '$2b$10$5Gyyc.yfja.xHNGeld71M.mw5hujbMwpsQYLxKYNMapkTDGk4BGf6');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: shortUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shortUrls_id_seq"', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: shortUrls shortUrls_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_pk" PRIMARY KEY (id);


--
-- Name: shortUrls shortUrls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortUrls shortUrls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_fk0" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

