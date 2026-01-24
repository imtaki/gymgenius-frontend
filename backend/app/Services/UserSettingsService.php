<?php

namespace App\Services;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserSettingsService {

    public function getSettingsByUser($userId) {

        return Cache::remember("user_{$userId}_settings", 1800, function () use ($userId) {
                return UserSettings::where('user_id', $userId)->firstOrFail();
        });
    }

    public function updateSettings($userId, $data) {
        try {
            $settings = UserSettings::where('user_id', $userId)->firstOrFail();
            $settings->update($data);
            return $settings->fresh(); 
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Settings not found for User ID: {$userId}");
        } catch (\Exception $e) {
            throw new \Exception("Failed to update settings: {$e->getMessage()}");
        }
    }

}