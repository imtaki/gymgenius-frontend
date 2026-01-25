<?php

namespace App\Jobs;

use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;

class SendRateLimitedEmail implements ShouldQueue
{
    use Queueable;

    public $user;
    public $code;

    public $tries = 5;

    /**
     * Create a new job instance.
     * * @param User $user
     */
    public function __construct(User $user, $code)
    {
        $this->user = $user;
        $this->code = $code;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Redis::throttle('gymgenius-welcome-limiter')
            ->allow(5)        // 5 emails
            ->every(60)       // Per 60 seconds
            ->then(function () {
                
                
                Mail::to($this->user->email)->send(
                    new WelcomeMail($this->user, $this->code)
                );
                
            }, function () {
                return $this->release(60);
            });
    }
}
