type ConfettiConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    colors?: string[];
    onAnimationComplete?: () => void;
};

type EmojiConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    emoji?: string[];
    onAnimationComplete?: () => void;
};

type BalloonsConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    colors?: string[];
    onAnimationComplete?: () => void;
};

interface RewardConfigs {
    confetti: ConfettiConfig;
    emoji: EmojiConfig;
    balloons: BalloonsConfig;
}
type RewardType = keyof RewardConfigs;
type RewardFunction = {
    reward: () => void;
    isAnimating: boolean;
};
type UseRewardType = <T extends RewardType>(ref: React.RefObject<HTMLElement | null>, type: T, config?: RewardConfigs[T]) => RewardFunction;

declare const useReward: UseRewardType;

declare const confetti: (root: Element, internalAnimatingCallback: () => void, config?: ConfettiConfig) => void;

declare const balloons: (root: Element, internalAnimatingCallback: () => void, config?: BalloonsConfig) => void;

declare const emoji: (root: Element, internalAnimatingCallback: () => void, config?: EmojiConfig) => void;

export { balloons, confetti, emoji, useReward };
