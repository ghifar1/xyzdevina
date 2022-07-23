<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnualyReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annualy_reports', function (Blueprint $table) {
            $table->id();
            $table->string('rate', 150)->nullable();
            $table->string('bulan')->nullable();
            $table->year('tahun', 10)->nullable();
            $table->date('tanggal')->nullable();
            $table->string('id_ret_ad')->nullable();
            $table->string('id_murex')->nullable();
            $table->string('buy_sell')->nullable();
            $table->string('sales_code')->nullable();
            $table->string('portfolio')->nullable();
            $table->string('profit_center')->nullable();
            $table->string('main_branch_name')->nullable();
            $table->string('rmcif')->nullable();
            $table->string('rmacc')->nullable();
            $table->float('usd_volume_end', 200)->nullable();
            $table->float('idr_profit_end', 200)->nullable();
            $table->string('grouping_product')->nullable();
            $table->string('area')->nullable();
            $table->string('snd_area')->nullable();
            $table->string('snd_head')->nullable();
            $table->string('e_channels')->nullable();
            $table->string('segm')->nullable();
            $table->string('map_whsle')->nullable();
            $table->string('map_msme')->nullable();
            $table->string('map_clstr')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annualy_reports');
    }
}
