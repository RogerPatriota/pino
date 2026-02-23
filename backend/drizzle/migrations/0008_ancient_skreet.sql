CREATE TYPE "public"."tipo_movimentacao" AS ENUM('entrada', 'saida_venda', 'ajuste_manual', 'devolucao');--> statement-breakpoint
CREATE TABLE "estoque_movimentacoes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"produto_id" uuid NOT NULL,
	"funcionario_id" uuid NOT NULL,
	"tipo" "tipo_movimentacao" NOT NULL,
	"quantidade" integer NOT NULL,
	"motivo" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "preco_venda" numeric(10, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "quantidade_estoque" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "estoque_movimentacoes" ADD CONSTRAINT "estoque_movimentacoes_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estoque_movimentacoes" ADD CONSTRAINT "estoque_movimentacoes_produto_id_produtos_id_fk" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estoque_movimentacoes" ADD CONSTRAINT "estoque_movimentacoes_funcionario_id_funcionarios_id_fk" FOREIGN KEY ("funcionario_id") REFERENCES "public"."funcionarios"("id") ON DELETE no action ON UPDATE no action;