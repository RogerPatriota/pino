CREATE TABLE "servicos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"nome" varchar(255) NOT NULL,
	"descricao" text,
	"preco_base" numeric(10, 2) DEFAULT '0.00',
	"tempo_estimado" varchar(50),
	"ativo" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;