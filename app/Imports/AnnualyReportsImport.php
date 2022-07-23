<?php

namespace App\Imports;

use App\Models\AnnualyReport;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithStartRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class AnnualyReportsImport implements ToModel, WithBatchInserts, WithStartRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new AnnualyReport([
            'rate' => $row[0],
            'bulan' => $row[1],
            'tahun' => $row[2],
            'tanggal' => Date::excelToDateTimeObject($row[3]),
            'id_ret_ad' => $row[4] == "null" || $row[4] == "NULL" ? null : $row[4],
            'id_murex' => $row[5] == "null" || $row[5] == "NULL" ? null : $row[5],
            'buy_sell' => $row[6],
            'sales_code' => $row[7] == "null" || $row[7] == "NULL" ? null : $row[7],
            'portfolio' => $row[8],
            'profit_center' => $row[9] == "null" || $row[9] == "NULL" ? null : $row[9],
            'main_branch_name' => $row[10] == "null" || $row[10] == "NULL" ? null : $row[10],
            'rmcif' => $row[11] == "null" || $row[11] == "NULL" ? null : $row[11],
            'rmacc' => $row[12] == "null" || $row[12] == "NULL" ? null : $row[12],
            'usd_volume_end' => $row[13],
            'idr_profit_end' => $row[14],
            'grouping_product' => $row[15],
            'area' => $row[16],
            'snd_area' => $row[17],
            'snd_head' => $row[18],
            'e_channels' => $row[19],
            'segm' => $row[20],
            'map_whsle' => $row[21],
            'map_msme' => $row[22],
            'map_clstr' => $row[23],
        ]);
    }

    public function batchSize(): int
    {
        return 1000;
    }

    public function startRow(): int
    {
        return 2;
    }
}
