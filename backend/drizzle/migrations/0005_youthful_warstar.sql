CREATE TYPE "public"."condicao_peca" AS ENUM('novo', 'usado', 'retirado_original', 'recondicionado', 'com_detalhe');--> statement-breakpoint
CREATE TYPE "public"."tip" AS ENUM('peça', 'acessorio');--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"exige_modelo" boolean DEFAULT false,
	"tipo" "tip" DEFAULT 'peça' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"categoria_id" uuid NOT NULL,
	"sku" varchar(100),
	"nome_customizado" varchar(255),
	"marca" varchar(100),
	"condicao" "condicao_peca" DEFAULT 'novo' NOT NULL,
	"preco_custo" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE no action ON UPDATE no action;