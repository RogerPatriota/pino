CREATE TABLE "os_produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"os_id" uuid NOT NULL,
	"produto_id" uuid NOT NULL,
	"valor_cobrado" numeric(10, 2) NOT NULL,
	"quantidade" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "os_produtos" ADD CONSTRAINT "os_produtos_os_id_ordens_servico_id_fk" FOREIGN KEY ("os_id") REFERENCES "public"."ordens_servico"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "os_produtos" ADD CONSTRAINT "os_produtos_produto_id_produtos_id_fk" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "os_produtos_os_produto_unique" ON "os_produtos" USING btree ("os_id","produto_id");--> statement-breakpoint
CREATE UNIQUE INDEX "os_servicos_os_servico_unique" ON "os_servicos" USING btree ("os_id","servico_id");