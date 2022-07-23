<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnualyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate',
        'bulan',
        'tahun',
        'tanggal',
        'id_ret_ad',
        'id_murex',
        'buy_sell',
        'sales_code',
        'portfolio',
        'profit_center',
        'main_branch_name',
        'rmcif',
        'rmacc',
        'usd_volume_end',
        'idr_profit_end',
        'grouping_product',
        'area',
        'snd_area',
        'snd_head',
        'e_channels',
        'segm',
        'map_whsle',
        'map_msme',
        'map_clstr',
    ];
}
