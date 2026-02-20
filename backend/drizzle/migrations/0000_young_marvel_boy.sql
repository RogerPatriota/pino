CREATE TABLE "assistencias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"logo_url" text,
	"cnpj" varchar(18),
	"telefone" varchar(20) NOT NULL,
	"endereco" text,
	"prompt_customizado" text,
	"configuracoes" jsonb DEFAULT '{"iaAtiva":true,"notificarClienteAutomaticamente":true,"especialidades":[]}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "assistencias_cnpj_unique" UNIQUE("cnpj")
);
