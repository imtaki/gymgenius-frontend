<?php

namespace App\Policies;

use App\Models\User;

class UserSettingsPolicy
{
    /**
     * Create a new policy instance.
     */
   public function viewAny(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }

    /**
     * Determine if the user can update settings
     */
    public function update(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }

    /**
     * Determine if the user can create settings
     */
    public function create(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }



}
