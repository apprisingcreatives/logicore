CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"domain" varchar(255),
	"logo_url" text,
	"business_type" varchar(50) NOT NULL,
	"registration_number" varchar(100),
	"tin_number" varchar(50),
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"address" jsonb,
	"plan" varchar(50) DEFAULT 'trial' NOT NULL,
	"max_users" varchar(10) DEFAULT '5' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"boc_accreditation_number" varchar(100),
	"peza_registration_number" varchar(100),
	"dti_fteb_accreditation_number" varchar(100),
	"settings" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone" varchar(50),
	"avatar_url" text,
	"role" varchar(50) DEFAULT 'viewer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tracking_number" varchar(20) NOT NULL,
	"reference_number" varchar(100),
	"status" varchar(30) DEFAULT 'draft' NOT NULL,
	"priority" varchar(20) DEFAULT 'standard' NOT NULL,
	"mode" varchar(20) NOT NULL,
	"origin" jsonb NOT NULL,
	"destination" jsonb NOT NULL,
	"sender" jsonb NOT NULL,
	"receiver" jsonb NOT NULL,
	"packages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"total_weight_kg" real NOT NULL,
	"total_declared_value_php" real,
	"shipping_cost_php" real,
	"insurance_cost_php" real,
	"assigned_driver_id" uuid,
	"assigned_vehicle_id" uuid,
	"estimated_delivery" timestamp with time zone,
	"actual_delivery" timestamp with time zone,
	"special_instructions" text,
	"customs_declaration_id" uuid,
	"proof_of_delivery_url" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "shipments_tracking_number_unique" UNIQUE("tracking_number")
);
--> statement-breakpoint
CREATE TABLE "tracking_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"shipment_id" uuid NOT NULL,
	"status" varchar(30) NOT NULL,
	"description" text NOT NULL,
	"location_name" varchar(255),
	"latitude" real,
	"longitude" real,
	"performed_by_user_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"license_number" varchar(50) NOT NULL,
	"license_expiry" timestamp with time zone NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255),
	"assigned_vehicle_id" uuid,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"current_latitude" real,
	"current_longitude" real,
	"rating" real,
	"total_trips" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "maintenance_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"type" varchar(30) NOT NULL,
	"description" text NOT NULL,
	"scheduled_date" timestamp with time zone NOT NULL,
	"completed_date" timestamp with time zone,
	"cost_php" real,
	"odometer_at_service" real NOT NULL,
	"performed_by" varchar(255),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_telemetry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"tenant_id" uuid NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"speed" real DEFAULT 0 NOT NULL,
	"heading" real,
	"fuel_level" real,
	"engine_temp" real,
	"battery_voltage" real,
	"cargo_temp" real,
	"humidity" real,
	"ignition" boolean DEFAULT false NOT NULL,
	"door_status" varchar(10),
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"plate_number" varchar(20) NOT NULL,
	"type" varchar(30) NOT NULL,
	"status" varchar(20) DEFAULT 'available' NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"vin" varchar(50),
	"fuel_type" varchar(20) NOT NULL,
	"fuel_capacity_liters" real NOT NULL,
	"max_payload_kg" real NOT NULL,
	"current_latitude" real,
	"current_longitude" real,
	"odometer_km" real DEFAULT 0 NOT NULL,
	"assigned_driver_id" uuid,
	"iot_device_id" varchar(100),
	"insurance_expiry" timestamp with time zone,
	"registration_expiry" timestamp with time zone,
	"last_maintenance_date" timestamp with time zone,
	"next_maintenance_date" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"zone_id" uuid NOT NULL,
	"sku" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"location_code" varchar(50) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"reserved_quantity" integer DEFAULT 0 NOT NULL,
	"unit_of_measure" varchar(20) DEFAULT 'pcs' NOT NULL,
	"batch_number" varchar(100),
	"serial_number" varchar(100),
	"expiration_date" timestamp with time zone,
	"cost_per_unit" real,
	"weight_kg" real,
	"is_hazardous" boolean DEFAULT false NOT NULL,
	"requires_cold_chain" boolean DEFAULT false NOT NULL,
	"min_stock_level" integer DEFAULT 0 NOT NULL,
	"max_stock_level" integer DEFAULT 0 NOT NULL,
	"reorder_point" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "inventory_movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"inventory_item_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"type" varchar(20) NOT NULL,
	"quantity" integer NOT NULL,
	"from_zone_id" uuid,
	"to_zone_id" uuid,
	"reference_number" varchar(100),
	"shipment_id" uuid,
	"performed_by_user_id" uuid,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouse_zones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(20) NOT NULL,
	"type" varchar(20) NOT NULL,
	"area_sqm" real NOT NULL,
	"temperature_min" real,
	"temperature_max" real,
	"humidity_min" real,
	"humidity_max" real,
	"max_capacity" integer NOT NULL,
	"current_occupancy" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(20) NOT NULL,
	"type" varchar(30) DEFAULT 'general' NOT NULL,
	"address" jsonb NOT NULL,
	"total_area_sqm" real NOT NULL,
	"usable_area_sqm" real NOT NULL,
	"max_capacity_kg" real NOT NULL,
	"current_occupancy_percent" real DEFAULT 0 NOT NULL,
	"operating_hours" varchar(100),
	"manager_user_id" uuid,
	"is_peza_zone" boolean DEFAULT false NOT NULL,
	"bonded_warehouse_license" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "customs_declarations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"booking_id" uuid,
	"declaration_number" varchar(50) NOT NULL,
	"status" varchar(30) DEFAULT 'draft' NOT NULL,
	"entry_type" varchar(10) NOT NULL,
	"declarant_name" varchar(255) NOT NULL,
	"importer_tin" varchar(50),
	"importer_accreditation_number" varchar(100),
	"hs_code" varchar(20) NOT NULL,
	"commodity_description" text NOT NULL,
	"origin_country" varchar(3) NOT NULL,
	"gross_weight_kg" real NOT NULL,
	"declared_value_php" real NOT NULL,
	"dutiable_value_php" real,
	"customs_duty_php" real,
	"vat_php" real,
	"other_charges_php" real,
	"total_assessment_php" real,
	"boc_reference_number" varchar(100),
	"e2m_transaction_number" varchar(100),
	"peza_import_permit_number" varchar(100),
	"release_date" timestamp with time zone,
	"examiner_name" varchar(255),
	"examiner_remarks" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "freight_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"booking_number" varchar(30) NOT NULL,
	"status" varchar(30) DEFAULT 'inquiry' NOT NULL,
	"mode" varchar(20) NOT NULL,
	"incoterms" varchar(10) NOT NULL,
	"shipper" jsonb NOT NULL,
	"consignee" jsonb NOT NULL,
	"notify_party" jsonb,
	"origin" jsonb NOT NULL,
	"destination" jsonb NOT NULL,
	"port_of_loading" varchar(255),
	"port_of_discharge" varchar(255),
	"vessel_name" varchar(255),
	"voyage_number" varchar(50),
	"etd" timestamp with time zone,
	"eta" timestamp with time zone,
	"container_count" real,
	"container_type" varchar(30),
	"gross_weight_kg" real NOT NULL,
	"volume_cbm" real NOT NULL,
	"commodity" varchar(255) NOT NULL,
	"hs_code" varchar(20),
	"freight_charges_php" real,
	"customs_broker_id" uuid,
	"customs_declaration_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "freight_bookings_booking_number_unique" UNIQUE("booking_number")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"shipment_id" uuid,
	"booking_id" uuid,
	"vehicle_id" uuid,
	"type" varchar(50) NOT NULL,
	"document_number" varchar(100),
	"file_name" varchar(255) NOT NULL,
	"file_url" text NOT NULL,
	"file_size_bytes" integer NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_by_user_id" uuid,
	"verified_at" timestamp with time zone,
	"expiration_date" timestamp with time zone,
	"extracted_data" jsonb,
	"ai_confidence_score" real,
	"uploaded_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"channel" varchar(20) DEFAULT 'in_app' NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"entity_type" varchar(50),
	"entity_id" uuid,
	"is_read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid,
	"user_email" varchar(255),
	"ip_address" varchar(45),
	"user_agent" text,
	"action" varchar(50) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" uuid,
	"description" text,
	"previous_values" jsonb,
	"new_values" jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) DEFAULT 'New Conversation' NOT NULL,
	"context" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "ai_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"tenant_id" uuid NOT NULL,
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"model" varchar(100),
	"tokens_used" jsonb,
	"latency_ms" jsonb,
	"sources" jsonb,
	"suggested_actions" jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_performed_by_user_id_users_id_fk" FOREIGN KEY ("performed_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assigned_vehicle_id_vehicles_id_fk" FOREIGN KEY ("assigned_vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_telemetry" ADD CONSTRAINT "vehicle_telemetry_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_telemetry" ADD CONSTRAINT "vehicle_telemetry_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_zone_id_warehouse_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."warehouse_zones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_inventory_item_id_inventory_items_id_fk" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_from_zone_id_warehouse_zones_id_fk" FOREIGN KEY ("from_zone_id") REFERENCES "public"."warehouse_zones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_to_zone_id_warehouse_zones_id_fk" FOREIGN KEY ("to_zone_id") REFERENCES "public"."warehouse_zones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_performed_by_user_id_users_id_fk" FOREIGN KEY ("performed_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_zones" ADD CONSTRAINT "warehouse_zones_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_zones" ADD CONSTRAINT "warehouse_zones_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_manager_user_id_users_id_fk" FOREIGN KEY ("manager_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customs_declarations" ADD CONSTRAINT "customs_declarations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customs_declarations" ADD CONSTRAINT "customs_declarations_booking_id_freight_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."freight_bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freight_bookings" ADD CONSTRAINT "freight_bookings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_verified_by_user_id_users_id_fk" FOREIGN KEY ("verified_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_user_id_users_id_fk" FOREIGN KEY ("uploaded_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversation_id_ai_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."ai_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_users_tenant_id" ON "users" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_shipments_tenant_id" ON "shipments" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_shipments_tracking_number" ON "shipments" USING btree ("tracking_number");--> statement-breakpoint
CREATE INDEX "idx_shipments_status" ON "shipments" USING btree ("tenant_id","status");--> statement-breakpoint
CREATE INDEX "idx_shipments_created_at" ON "shipments" USING btree ("tenant_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_tracking_events_shipment" ON "tracking_events" USING btree ("shipment_id");--> statement-breakpoint
CREATE INDEX "idx_tracking_events_timestamp" ON "tracking_events" USING btree ("shipment_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_drivers_tenant_id" ON "drivers" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_maintenance_vehicle" ON "maintenance_records" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "idx_telemetry_vehicle_time" ON "vehicle_telemetry" USING btree ("vehicle_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_telemetry_tenant" ON "vehicle_telemetry" USING btree ("tenant_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_vehicles_tenant_id" ON "vehicles" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_vehicles_status" ON "vehicles" USING btree ("tenant_id","status");--> statement-breakpoint
CREATE INDEX "idx_vehicles_plate" ON "vehicles" USING btree ("tenant_id","plate_number");--> statement-breakpoint
CREATE INDEX "idx_inventory_tenant" ON "inventory_items" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_inventory_sku" ON "inventory_items" USING btree ("tenant_id","sku");--> statement-breakpoint
CREATE INDEX "idx_inventory_warehouse" ON "inventory_items" USING btree ("warehouse_id");--> statement-breakpoint
CREATE INDEX "idx_movements_item" ON "inventory_movements" USING btree ("inventory_item_id");--> statement-breakpoint
CREATE INDEX "idx_movements_warehouse" ON "inventory_movements" USING btree ("warehouse_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_zones_warehouse" ON "warehouse_zones" USING btree ("warehouse_id");--> statement-breakpoint
CREATE INDEX "idx_warehouses_tenant" ON "warehouses" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_customs_tenant" ON "customs_declarations" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_customs_booking" ON "customs_declarations" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "idx_customs_declaration_number" ON "customs_declarations" USING btree ("declaration_number");--> statement-breakpoint
CREATE INDEX "idx_freight_tenant" ON "freight_bookings" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_freight_status" ON "freight_bookings" USING btree ("tenant_id","status");--> statement-breakpoint
CREATE INDEX "idx_freight_booking_number" ON "freight_bookings" USING btree ("booking_number");--> statement-breakpoint
CREATE INDEX "idx_documents_tenant" ON "documents" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "idx_documents_shipment" ON "documents" USING btree ("shipment_id");--> statement-breakpoint
CREATE INDEX "idx_documents_booking" ON "documents" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "idx_notifications_user" ON "notifications" USING btree ("user_id","is_read");--> statement-breakpoint
CREATE INDEX "idx_notifications_tenant" ON "notifications" USING btree ("tenant_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_audit_tenant_time" ON "audit_log" USING btree ("tenant_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_audit_entity" ON "audit_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "idx_audit_user" ON "audit_log" USING btree ("user_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_ai_conversations_user" ON "ai_conversations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_ai_messages_conversation" ON "ai_messages" USING btree ("conversation_id","timestamp");