<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import controller lain
use App\Http\Controllers\InputSdmController;
use App\Http\Controllers\RecruitmentController;
use App\Http\Controllers\NaTeamController;
use App\Http\Controllers\NasabahController;
use App\Http\Controllers\ProgressAfpController;
use App\Http\Controllers\TargetTriwulanController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KpiController;
use App\Http\Controllers\RoController;

Route::get('/kpi', [KpiController::class, 'getKpi']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



// ============ Input SDM ============
Route::get('/input-sdm', [InputSdmController::class, 'index']);
Route::post('/input-sdm', [InputSdmController::class, 'store']);
Route::get('/input-sdm/{id}', [InputSdmController::class, 'index']);
Route::put('/input-sdm/{id}', [InputSdmController::class, 'update']);
Route::delete('/input-sdm/{id}', [InputSdmController::class, 'destroy']);

// ============ Recruitment ============
Route::get('/recruitment', [RecruitmentController::class, 'index']);
Route::post('/recruitment', [RecruitmentController::class, 'store']);

// ============ NA Team ============
Route::get('/na-teams', [NaTeamController::class, 'index']);
Route::post('/na-teams', [NaTeamController::class, 'store']);
Route::get('/na-teams/{id}', [NaTeamController::class, 'show']);
Route::put('/na-teams/{id}', [NaTeamController::class, 'update']);
Route::delete('/na-teams/{id}', [NaTeamController::class, 'destroy']);

// ============ Nasabah ============
Route::get('/nasabah', [NasabahController::class, 'index']);
Route::post('/nasabah', [NasabahController::class, 'store']);
Route::get('/nasabah/{id}', [NasabahController::class, 'show']);
Route::put('/nasabah/{id}', [NasabahController::class, 'update']);
Route::delete('/nasabah/{id}', [NasabahController::class, 'destroy']);

// ============ Review Progress AFP (Dashboard Asman) ============

Route::prefix('asman')->group(function () {
    Route::get('/progress-afp', [ProgressAfpController::class, 'review']);
    Route::get('/progress-afp/summary', [ProgressAfpController::class, 'summary']);
    Route::get('/progress-afp/{nama_afp}', [ProgressAfpController::class, 'byAfp']);
    Route::put('/progress-afp/{id}', [ProgressAfpController::class, 'update']);
});



// ===================== Target Triwulan ================================

Route::get('/target-triwulan/latest', [TargetTriwulanController::class, 'latest']);
Route::get('/target-triwulan', [TargetTriwulanController::class, 'index']);
Route::post('/target-triwulan', [TargetTriwulanController::class, 'store']);
Route::put('/target-triwulan/{id}',     [TargetTriwulanController::class, 'update']);
Route::delete('/target-triwulan/{id}',  [TargetTriwulanController::class, 'destroy']);

// ============ Input SDM ============
Route::get('/input-sdm-mm', [InputSdmController::class, 'index']);
Route::post('/input-sdm-mm', [InputSdmController::class, 'store']);
Route::get('/input-sdm-mm/{id}', [InputSdmController::class, 'index']);
Route::put('/input-sdm-mm/{id}', [InputSdmController::class, 'update']);
Route::delete('/input-sdm-mm/{id}', [InputSdmController::class, 'destroy']);

// ============ Recruitment ============
Route::get('/recruitment-mm', [RecruitmentController::class, 'index']);
Route::post('/recruitment-mm', [RecruitmentController::class, 'store']);

// ============ NA Team ============
Route::get('/na-teams-mm', [NaTeamController::class, 'index']);
Route::post('/na-teams-mm', [NaTeamController::class, 'store']);
Route::get('/na-teams-mm/{id}', [NaTeamController::class, 'show']);
Route::put('/na-teams-mm/{id}', [NaTeamController::class, 'update']);
Route::delete('/na-teams-mm/{id}', [NaTeamController::class, 'destroy']);

// ============ Nasabah ============
Route::get('/nasabah-mm', [NasabahController::class, 'index']);
Route::post('/nasabah-mm', [NasabahController::class, 'store']);
Route::get('/nasabah-mm/{id}', [NasabahController::class, 'show']);
Route::put('/nasabah-mm/{id}', [NasabahController::class, 'update']);
Route::delete('/nasabah-mm/{id}', [NasabahController::class, 'destroy']);

// ============ Review Progress AFP (Dashboard Asman) ============

Route::prefix('asman')->group(function () {
    Route::get('/progress-afp-mm', [ProgressAfpController::class, 'review']);
    Route::get('/progress-afp-mm/summary', [ProgressAfpController::class, 'summary']);
    Route::get('/progress-afp-mm/{nama_afp}', [ProgressAfpController::class, 'byAfp']);
    Route::put('/progress-afp-mm/{id}', [ProgressAfpController::class, 'update']);
});



// ===================== Target Triwulan ================================

Route::get('/target-triwulan-mm/latest', [TargetTriwulanController::class, 'latest']);
Route::get('/target-triwulan-mm', [TargetTriwulanController::class, 'index']);
Route::post('/target-triwulan-mm', [TargetTriwulanController::class, 'store']);
Route::put('/target-triwulan-mm/{id}',     [TargetTriwulanController::class, 'update']);
Route::delete('/target-triwulan-mm/{id}',  [TargetTriwulanController::class, 'destroy']);

// ===================== API FROM CMM ================================
Route::get('/input-sdm-cmm', [InputSdmController::class, 'index']);
Route::post('/input-sdm-cmm', [InputSdmController::class, 'store']);
Route::get('/input-sdm-cmm/{id}', [InputSdmController::class, 'index']);
Route::put('/input-sdm-cmm/{id}', [InputSdmController::class, 'update']);
Route::delete('/input-sdm-cmm/{id}', [InputSdmController::class, 'destroy']);

// ============ Recruitment ============
Route::get('/recruitment-cmm', [RecruitmentController::class, 'index']);
Route::post('/recruitment-cmm', [RecruitmentController::class, 'store']);

// ============ NA Team ============
Route::get('/na-teams-cmm', [NaTeamController::class, 'index']);
Route::post('/na-teams-cmm', [NaTeamController::class, 'store']);
Route::get('/na-teams-cmm/{id}', [NaTeamController::class, 'show']);
Route::put('/na-teams-cmm/{id}', [NaTeamController::class, 'update']);
Route::delete('/na-teams-cmm/{id}', [NaTeamController::class, 'destroy']);

// ============ Nasabah ============
Route::get('/nasabah-cmm', [NasabahController::class, 'index']);
Route::post('/nasabah-cmm', [NasabahController::class, 'store']);
Route::get('/nasabah-cmm/{id}', [NasabahController::class, 'show']);
Route::put('/nasabah-cmm/{id}', [NasabahController::class, 'update']);
Route::delete('/nasabah-cmm/{id}', [NasabahController::class, 'destroy']);

// ============ Review Progress AFP (Dashboard Asman) ============

Route::prefix('asman')->group(function () {
    Route::get('/progress-afp-cmm', [ProgressAfpController::class, 'review']);
    Route::get('/progress-afp-cmm/summary', [ProgressAfpController::class, 'summary']);
    Route::get('/progress-afp-cmm/{nama_afp}', [ProgressAfpController::class, 'byAfp']);
    Route::put('/progress-afp-cmm/{id}', [ProgressAfpController::class, 'update']);
});



// ===================== Target Triwulan ================================

Route::get('/target-triwulan-cmm/latest', [TargetTriwulanController::class, 'latest']);
Route::get('/target-triwulan-cmm', [TargetTriwulanController::class, 'index']);
Route::post('/target-triwulan-cmm', [TargetTriwulanController::class, 'store']);
Route::put('/target-triwulan-cmm/{id}',     [TargetTriwulanController::class, 'update']);
Route::delete('/target-triwulan-cmm/{id}',  [TargetTriwulanController::class, 'destroy']);

Route::apiResource('ro', RoController::class);
?>




 


 