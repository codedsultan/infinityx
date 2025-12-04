<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminContactController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/download-cv', [PortfolioController::class, 'downloadCV'])->name('portfolio.download-cv');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');



Route::get('/healthcheck', function () {
    return response()->json(['status' => 'ok'], 200);
});

Route::get('/up', function () {
    return response()->json(['status' => 'ok'], 200);
});


/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Auth Middleware)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth'])->prefix('manage')->name('admin.')->group(function () {
    // Projects Management
    Route::get('/projects', [AdminProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [AdminProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [AdminProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [AdminProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [AdminProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy'])->name('projects.destroy');

    // Toggle featured status
    Route::post('/projects/{project}/toggle-featured', [AdminProjectController::class, 'toggleFeatured'])
        ->name('projects.toggle-featured');

    // Reorder projects
    Route::post('/projects/reorder', [AdminProjectController::class, 'reorder'])->name('projects.reorder');

    // Contacts Management
    Route::get('/contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/{contact}', [AdminContactController::class, 'show'])->name('contacts.show');
    Route::post('/contacts/{contact}/mark-read', [AdminContactController::class, 'markAsRead'])
        ->name('contacts.mark-read');
    Route::post('/contacts/{contact}/mark-replied', [AdminContactController::class, 'markAsReplied'])
        ->name('contacts.mark-replied');
    Route::delete('/contacts/{contact}', [AdminContactController::class, 'destroy'])
        ->name('contacts.destroy');
});

require __DIR__ . '/settings.php';
