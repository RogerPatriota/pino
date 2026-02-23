CREATE TYPE "public"."os_status" AS ENUM('orcamento', 'aprovado', 'em_manutencao', 'aguardando_peca', 'pronto', 'entregue', 'cancelado');--> statement-breakpoint
CREATE TABLE "contadores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"tipo" varchar(50) NOT NULL,
	"ultimo_valor" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "log_aparelhos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"modelo_id" uuid NOT NULL,
	"cliente_id" uuid NOT NULL,
	"serial_imei" varchar(100) NOT NULL,
	"cor" varchar(50),
	"observacoes_fisicas" varchar(255),
	"senha" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modelos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"marca" varchar(100) NOT NULL,
	"nome_comercial" varchar(255) NOT NULL,
	"modelo_tecnico" varchar(100),
	"ano_lancamento" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ordens_servico" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assistencia_id" uuid NOT NULL,
	"numero_os" integer NOT NULL,
	"cliente_id" uuid NOT NULL,
	"aparelho_id" uuid NOT NULL,
	"status" "os_status" DEFAULT 'orcamento' NOT NULL,
	"relato_cliente" varchar(255),
	"laudo_tecnico" varchar(255),
	"observacoes_internas" varchar(255),
	"funcionario_id" uuid,
	"data_entrada" timestamp DEFAULT now() NOT NULL,
	"data_inicio_reparo" timestamp,
	"data_saida" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "os_servicos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"os_id" uuid NOT NULL,
	"servico_id" uuid NOT NULL,
	"valor_cobrado" numeric(10, 2) NOT NULL,
	"quantidade" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "funcionarios" DROP CONSTRAINT "funcionarios_email_unique";--> statement-breakpoint
ALTER TABLE "funcionarios" DROP CONSTRAINT "funcionarios_numero_unique";--> statement-breakpoint
ALTER TABLE "funcionarios" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "funcionarios" ALTER COLUMN "role" SET DEFAULT 'tecnico'::text;--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('dono', 'admin', 'tecnico', 'atendente');--> statement-breakpoint
ALTER TABLE "funcionarios" ALTER COLUMN "role" SET DEFAULT 'tecnico'::"public"."role";--> statement-breakpoint
ALTER TABLE "funcionarios" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";--> statement-breakpoint
ALTER TABLE "contadores" ADD CONSTRAINT "contadores_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_aparelhos" ADD CONSTRAINT "log_aparelhos_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_aparelhos" ADD CONSTRAINT "log_aparelhos_modelo_id_modelos_id_fk" FOREIGN KEY ("modelo_id") REFERENCES "public"."modelos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_aparelhos" ADD CONSTRAINT "log_aparelhos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_assistencia_id_assistencias_id_fk" FOREIGN KEY ("assistencia_id") REFERENCES "public"."assistencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_aparelho_id_log_aparelhos_id_fk" FOREIGN KEY ("aparelho_id") REFERENCES "public"."log_aparelhos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_funcionario_id_funcionarios_id_fk" FOREIGN KEY ("funcionario_id") REFERENCES "public"."funcionarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "os_servicos" ADD CONSTRAINT "os_servicos_os_id_ordens_servico_id_fk" FOREIGN KEY ("os_id") REFERENCES "public"."ordens_servico"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "os_servicos" ADD CONSTRAINT "os_servicos_servico_id_servicos_id_fk" FOREIGN KEY ("servico_id") REFERENCES "public"."servicos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "assistencia_tipo_idx" ON "contadores" USING btree ("assistencia_id","tipo");--> statement-breakpoint
CREATE UNIQUE INDEX "numero_os_assistencia_idx" ON "ordens_servico" USING btree ("assistencia_id","numero_os");--> statement-breakpoint
CREATE UNIQUE INDEX "clientes_assistencia_numero_unique" ON "clientes" USING btree ("assistencia_id","numero");--> statement-breakpoint
CREATE UNIQUE INDEX "clientes_assistencia_cpf_cnpj_unique" ON "clientes" USING btree ("assistencia_id","cpf_cnpj");--> statement-breakpoint
CREATE UNIQUE INDEX "funcionarios_assistencia_email_unique" ON "funcionarios" USING btree ("assistencia_id","email");--> statement-breakpoint
CREATE UNIQUE INDEX "funcionarios_assistencia_numero_unique" ON "funcionarios" USING btree ("assistencia_id","numero");--> statement-breakpoint
CREATE UNIQUE INDEX "produtos_assistencia_sku_unique" ON "produtos" USING btree ("assistencia_id","sku");