<?php
namespace Catpow\AI;
use WP_AI_Client_Ability_Function_Resolver;

class Agent {
    private array $abilities;

    private WP_AI_Client_Ability_Function_Resolver $resolver;

    public function __construct(array $abilities) {
        $this->abilities = $abilities;
        $this->resolver =
            new WP_AI_Client_Ability_Function_Resolver(
                ...$abilities
            );
    }

    public function prompt(string $prompt) {
        return wp_ai_client_prompt($prompt)->using_abilities(...$this->abilities);
    }

    public function has_ability_calls($message): bool {
        return $this->resolver->has_ability_calls($message);
    }

    public function execute_abilities($message) {
        return $this->resolver->execute_abilities($message);
    }
}

?>