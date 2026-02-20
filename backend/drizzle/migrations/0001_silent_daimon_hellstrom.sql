CREATE TYPE "public"."role" AS ENUM('owner', 'admin', 'tecnico', 'recepcionista');--> statement-breakpoint
CREATE TABLE "funcionarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"senha" text NOT NULL,
	"numero" varchar(20),
	"role" "role" DEFAULT 'tecnico' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "funcionarios_email_unique" UNIQUE("email"),
	CONSTRAINT "funcionarios_numero_unique" UNIQUE("numero")
);
--> statement-breakpoint
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;