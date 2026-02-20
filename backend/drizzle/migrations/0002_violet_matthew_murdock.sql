CREATE TABLE "clientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"nome" varchar(255) NOT NULL,
	"numero" varchar(20),
	"cpf_cnpj" varchar(20),
	"endereco" text,
	"observacoes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;