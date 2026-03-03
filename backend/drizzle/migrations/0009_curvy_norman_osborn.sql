ALTER TABLE "os_produtos" RENAME COLUMN "valor_cobrado" TO "preco_venda";--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "preco_venda" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "preco_venda" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "estoque_movimentacoes" ADD COLUMN "preco_custo" numeric(10, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD COLUMN "valor_total" numeric(10, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "modelo_id" uuid;--> statement-breakpoint
ALTER TABLE "servicos" ADD COLUMN "modelo_id" uuid;--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_modelo_id_modelos_id_fk" FOREIGN KEY ("modelo_id") REFERENCES "public"."modelos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_modelo_id_modelos_id_fk" FOREIGN KEY ("modelo_id") REFERENCES "public"."modelos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtos" DROP COLUMN "preco_custo";