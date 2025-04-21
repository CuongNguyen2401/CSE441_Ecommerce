import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui } from 'tamagui';
import {createAnimations} from '@tamagui/animations-react-native';


const animations = createAnimations({
  // Disable complex animations to avoid Reanimated issues
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const headingFont = createInterFont({
    size: {
        6: 15,
        7: 18,
        8: 20,
        9: 23,
        10: 27,
        12: 32,
        14: 38,
        16: 46,
    },
    transform: {
        6: 'uppercase',
        7: 'none',
    },
    weight: {
        6: '400',
        7: '700',
    },
    color: {
        6: '$colorFocus',
        7: '$color',
    },
    letterSpacing: {
        5: 2,
        6: 1,
        7: 0,
        8: -1,
        9: -2,
        10: -3,
        12: -4,
        14: -5,
        16: -6,
    },
    face: {
        700: {normal: 'InterBold'},
        800: {normal: 'InterBold'},
        900: {normal: 'InterBold'},
    },
});

const bodyFont = createInterFont(
    {
        face: {
            700: {normal: 'InterBold'},
        },
    },
    {
        sizeSize: (size) => Math.round(size * 1.1),
        sizeLineHeight: (size) => Math.round(size * 1.5),
    }
);

const config = createTamagui({
    defaultTheme: 'light',
    shouldAddPrefersColorThemes: true,
    themeClassNameOnRoot: true,
    shorthands,
    fonts: {
        heading: headingFont,
        body: bodyFont,
    },
    themes,
    tokens,
    media: {
        xs: {maxWidth: 660},
        sm: {maxWidth: 800},
        md: {maxWidth: 1020},
        lg: {maxWidth: 1280},
        xl: {maxWidth: 1420},
        xxl: {maxWidth: 1600},
        gtXs: {minWidth: 660 + 1},
        gtSm: {minWidth: 800 + 1},
        gtMd: {minWidth: 1020 + 1},
        gtLg: {minWidth: 1280 + 1},
        short: {maxHeight: 820},
        tall: {minHeight: 820},
        hoverNone: {hover: 'none'},
        pointerCoarse: {pointer: 'coarse'},
    },
});



export type AppConfig = typeof config;

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {
    }
}

export default config;