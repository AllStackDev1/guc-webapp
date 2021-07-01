import React from 'react'
import { createIcon } from '@chakra-ui/icon'

export const OpenMenuIcon = createIcon({
  displayName: 'OpenMenuIcon',
  viewBox: '0 0 28 20',
  path: (
    <div>
      <path
        d='M1.75 14.6668H9.40625M1.75 1.3335H19.25H1.75ZM1.75 8.00016H19.25H1.75Z'
        stroke='#0A2240'
        strokeWidth='2.22222'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </div>
  )
})

export const CloseMenuIcon = createIcon({
  displayName: 'CloseMenuIcon',
  viewBox: '0 0 20 20',
  path: (
    <div>
      <path
        d='M1 1L19 19'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 19L19 1'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </div>
  )
})

export const ScrollDown = createIcon({
  displayName: 'ScrollDown',
  viewBox: '0 0 21 46',
  path: (
    <div>
      <mask id='path-1-inside-1' fill='white'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21 10.5C21 10.6676 20.9961 10.8343 20.9883 11H21V35.5V36H20.9883C20.7273 41.5668 16.1314 46 10.5 46C4.86862 46 0.272672 41.5668 0.0116951 36H0V35.5V11H0.0116951C0.00392737 10.8343 0 10.6676 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5Z'
        />
      </mask>
      <path
        d='M20.9883 11L19.9894 10.9532L19.9403 12H20.9883V11ZM21 11H22V10H21V11ZM21 36V37H22V36H21ZM20.9883 36V35H20.0341L19.9894 35.9532L20.9883 36ZM0.0116951 36L1.0106 35.9532L0.965913 35H0.0116951V36ZM0 36H-1V37H0V36ZM0 11V10H-1V11H0ZM0.0116951 11V12H1.05967L1.0106 10.9532L0.0116951 11ZM21.9872 11.0468C21.9957 10.8655 22 10.6832 22 10.5H20C20 10.652 19.9964 10.8031 19.9894 10.9532L21.9872 11.0468ZM21 10H20.9883V12H21V10ZM22 35.5V11H20V35.5H22ZM22 36V35.5H20V36H22ZM20.9883 37H21V35H20.9883V37ZM19.9894 35.9532C19.7533 40.989 15.5948 45 10.5 45V47C16.668 47 21.7013 42.1446 21.9872 36.0468L19.9894 35.9532ZM10.5 45C5.40522 45 1.24668 40.989 1.0106 35.9532L-0.987208 36.0468C-0.701339 42.1446 4.33202 47 10.5 47V45ZM0 37H0.0116951V35H0V37ZM-1 35.5V36H1V35.5H-1ZM-1 11V35.5H1V11H-1ZM0.0116951 10H0V12H0.0116951V10ZM-1 10.5C-1 10.6832 -0.995706 10.8655 -0.987208 11.0468L1.0106 10.9532C1.00356 10.8031 1 10.652 1 10.5H-1ZM10.5 -1C4.14873 -1 -1 4.14873 -1 10.5H1C1 5.25329 5.25329 1 10.5 1V-1ZM22 10.5C22 4.14873 16.8513 -1 10.5 -1V1C15.7467 1 20 5.25329 20 10.5H22Z'
        fill='white'
        fillOpacity='0.5'
        mask='url(#path-1-inside-1)'
      />
      <path
        d='M10.6464 37.3536C10.8417 37.5488 11.1583 37.5488 11.3536 37.3536L14.5355 34.1716C14.7308 33.9763 14.7308 33.6597 14.5355 33.4645C14.3403 33.2692 14.0237 33.2692 13.8284 33.4645L11 36.2929L8.17157 33.4645C7.97631 33.2692 7.65973 33.2692 7.46447 33.4645C7.2692 33.6597 7.2692 33.9763 7.46447 34.1716L10.6464 37.3536ZM10.5 10L10.5 37H11.5L11.5 10H10.5Z'
        fill='#FCFCFC'
      />
    </div>
  )
})

export const ArrowBtnRightIcon = createIcon({
  displayName: 'ArrowBtnRightIcon',
  viewBox: '0 0 48 48',
  path: (
    <div>
      <circle cx='24' cy='24' r='24' fill='#C4C4C4' fillOpacity='0.5' />
      <circle
        cx='24'
        cy='24'
        r='23'
        fill='transparent'
        stroke='white'
        strokeWidth='2'
        strokeOpacity='0.5'
      />
      <path
        d='M31.7071 24.7071C32.0976 24.3166 32.0976 23.6834 31.7071 23.2929L25.3431 16.9289C24.9526 16.5384 24.3195 16.5384 23.9289 16.9289C23.5384 17.3195 23.5384 17.9526 23.9289 18.3431L29.5858 24L23.9289 29.6569C23.5384 30.0474 23.5384 30.6805 23.9289 31.0711C24.3195 31.4616 24.9526 31.4616 25.3431 31.0711L31.7071 24.7071ZM17 25H31V23H17V25Z'
        fill='#FCFCFC'
      />
    </div>
  )
})

export const QuoteIcon = createIcon({
  displayName: 'QuoteIcon',
  viewBox: '0 0 35 26',
  path: (
    <path
      d='M3.59313 23.4768C1.66188 21.4256 0.625 19.125 0.625 15.3956C0.625 8.83309 5.23187 2.95122 11.9312 0.0430908L13.6056 2.62684C7.3525 6.00934 6.13 10.3987 5.6425 13.1662C6.64938 12.645 7.9675 12.4631 9.25937 12.5831C12.6419 12.8962 15.3081 15.6731 15.3081 19.125C15.3081 20.8654 14.6167 22.5346 13.386 23.7654C12.1553 24.9961 10.4861 25.6875 8.74562 25.6875C6.73375 25.6875 4.81 24.7687 3.59313 23.4768ZM22.3431 23.4768C20.4119 21.4256 19.375 19.125 19.375 15.3956C19.375 8.83309 23.9819 2.95122 30.6813 0.0430908L32.3556 2.62684C26.1025 6.00934 24.88 10.3987 24.3925 13.1662C25.3994 12.645 26.7175 12.4631 28.0094 12.5831C31.3919 12.8962 34.0581 15.6731 34.0581 19.125C34.0581 20.8654 33.3667 22.5346 32.136 23.7654C30.9053 24.9961 29.2361 25.6875 27.4956 25.6875C25.4837 25.6875 23.56 24.7687 22.3431 23.4768Z'
      fill='#E0E0E0'
    />
  )
})

export const TrophyIcon = createIcon({
  displayName: 'TrophyIcon',
  viewBox: '0 0 84 106',
  path: (
    <div>
      <path
        d='M38.0617 24.924C39.3921 36.8573 49.5133 46.1358 61.8017 46.1358C62.7065 46.1358 63.5995 46.0855 64.4781 45.9876L64.4787 46.8185C65.1415 46.501 65.7718 46.1263 66.3631 45.7008C68.8238 45.225 71.1496 44.3717 73.2781 43.2036C71.4043 46.702 68.2678 49.4244 64.4782 50.7641L64.4772 51.6779C64.4772 64.622 55.285 75.4192 43.0722 77.8977L43.0714 94.4856H53.7752C56.7305 94.4856 59.1262 96.8813 59.1262 99.8366V102.703C59.1262 104.075 58.0139 105.188 56.6418 105.188H18.8029C17.4308 105.188 16.3185 104.075 16.3185 102.703V99.8366C16.3185 96.8813 18.7142 94.4856 21.6695 94.4856H32.3712L32.3725 77.8977C20.1598 75.4192 10.9675 64.622 10.9675 51.6779L10.9665 50.7641C4.73216 48.5601 0.265625 42.6142 0.265625 35.625V32.7584C0.265625 31.3864 1.37792 30.2741 2.75 30.2741L10.9658 30.272L10.9675 27.4075C10.9675 26.0354 12.0798 24.9231 13.4519 24.9231L38.0617 24.924ZM10.9658 33.9215L5.61659 33.9224C4.76176 33.9224 4.05407 34.5524 3.93247 35.3734L3.91401 35.625C3.91401 40.5591 6.79472 44.8203 10.966 46.8185L10.9658 33.9215Z'
        fill='#2F80ED'
      />
      <path
        d='M61.8016 0.84375C73.6226 0.84375 83.2054 10.4266 83.2054 22.2476C83.2054 34.0686 73.6226 43.6514 61.8016 43.6514C49.9805 43.6514 40.3977 34.0686 40.3977 22.2476C40.3977 10.4266 49.9805 0.84375 61.8016 0.84375ZM72.5609 13.9933C71.5907 13.0231 70.0177 13.0231 69.0475 13.9933L59.9014 23.1394L54.5763 17.8143C53.6061 16.8441 52.0331 16.8441 51.0629 17.8143C50.0927 18.7846 50.0927 20.3576 51.0629 21.3278L58.1446 28.4096C59.1149 29.3798 60.6879 29.3798 61.6581 28.4096L72.5609 17.5067C73.5311 16.5365 73.5311 14.9635 72.5609 13.9933Z'
        fill='#6FCF97'
      />
    </div>
  )
})

export const CalendarIcon = createIcon({
  displayName: 'CalendarIcon',
  viewBox: '0 0 18 20',
  path: (
    <div>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 14.87V7.25702H18V14.931C18 18.07 16.0241 20 12.8628 20H5.12733C1.99561 20 0 18.03 0 14.87ZM4.95938 12.41C4.50494 12.431 4.12953 12.07 4.10977 11.611C4.10977 11.151 4.46542 10.771 4.91987 10.75C5.36443 10.75 5.72997 11.101 5.73985 11.55C5.7596 12.011 5.40395 12.391 4.95938 12.41ZM9.01976 12.41C8.56531 12.431 8.1899 12.07 8.17014 11.611C8.17014 11.151 8.5258 10.771 8.98024 10.75C9.42481 10.75 9.79034 11.101 9.80022 11.55C9.81998 12.011 9.46432 12.391 9.01976 12.41ZM13.0505 16.09C12.596 16.08 12.2305 15.7 12.2305 15.24C12.2206 14.78 12.5862 14.401 13.0406 14.391H13.0505C13.5148 14.391 13.8902 14.771 13.8902 15.24C13.8902 15.71 13.5148 16.09 13.0505 16.09ZM8.17014 15.24C8.1899 15.7 8.56531 16.061 9.01976 16.04C9.46432 16.021 9.81998 15.641 9.80022 15.181C9.79034 14.731 9.42481 14.38 8.98024 14.38C8.5258 14.401 8.17014 14.78 8.17014 15.24ZM4.09989 15.24C4.11965 15.7 4.49506 16.061 4.94951 16.04C5.39407 16.021 5.74973 15.641 5.72997 15.181C5.72009 14.731 5.35456 14.38 4.90999 14.38C4.45554 14.401 4.09989 14.78 4.09989 15.24ZM12.2404 11.601C12.2404 11.141 12.596 10.771 13.0505 10.761C13.4951 10.761 13.8507 11.12 13.8705 11.561C13.8804 12.021 13.5247 12.401 13.0801 12.41C12.6257 12.42 12.2503 12.07 12.2404 11.611V11.601Z'
        fill='#C82B38'
      />
      <path
        opacity='0.4'
        d='M0.00335693 7.25693C0.0162 6.66993 0.0655962 5.50493 0.158461 5.12993C0.632665 3.02093 2.24298 1.68093 4.54485 1.48993H13.4559C15.738 1.69093 17.3681 3.03993 17.8423 5.12993C17.9342 5.49493 17.9836 6.66893 17.9964 7.25693H0.00335693Z'
        fill='#C82B38'
      />
      <path
        d='M5.30489 4.59C5.73958 4.59 6.06559 4.261 6.06559 3.82V0.771C6.06559 0.33 5.73958 0 5.30489 0C4.8702 0 4.54419 0.33 4.54419 0.771V3.82C4.54419 4.261 4.8702 4.59 5.30489 4.59Z'
        fill='#C82B38'
      />
      <path
        d='M12.695 4.59C13.1198 4.59 13.4557 4.261 13.4557 3.82V0.771C13.4557 0.33 13.1198 0 12.695 0C12.2603 0 11.9343 0.33 11.9343 0.771V3.82C11.9343 4.261 12.2603 4.59 12.695 4.59Z'
        fill='#C82B38'
      />
    </div>
  )
})

export const DashboardIcon = createIcon({
  displayName: 'DashboardIcon',
  viewBox: '0 0 49 49',
  path: (
    <div>
      <circle opacity='0.15' cx='24.5' cy='24.5' r='24.5' fill='#C82B38' />
      <path
        opacity='0.4'
        d='M27.5183 16H30.2893C31.4368 16 32.3667 16.9276 32.3667 18.0723V20.8364C32.3667 21.9811 31.4368 22.9087 30.2893 22.9087H27.5183C26.3708 22.9087 25.4409 21.9811 25.4409 20.8364V18.0723C25.4409 16.9276 26.3708 16 27.5183 16Z'
        fill='#C82B38'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.0774 16H20.8484C21.9959 16 22.9258 16.9276 22.9258 18.0723V20.8364C22.9258 21.9811 21.9959 22.9087 20.8484 22.9087H18.0774C16.9299 22.9087 16 21.9811 16 20.8364V18.0723C16 16.9276 16.9299 16 18.0774 16ZM18.0774 25.2813H20.8484C21.9959 25.2813 22.9258 26.2089 22.9258 27.3537V30.1178C22.9258 31.2617 21.9959 32.1901 20.8484 32.1901H18.0774C16.9299 32.1901 16 31.2617 16 30.1178V27.3537C16 26.2089 16.9299 25.2813 18.0774 25.2813ZM30.2893 25.2813H27.5184C26.3708 25.2813 25.4409 26.2089 25.4409 27.3537V30.1178C25.4409 31.2617 26.3708 32.1901 27.5184 32.1901H30.2893C31.4369 32.1901 32.3667 31.2617 32.3667 30.1178V27.3537C32.3667 26.2089 31.4369 25.2813 30.2893 25.2813Z'
        fill='#C82B38'
      />
    </div>
  )
})

export const TrashIcon = createIcon({
  displayName: 'TrashIcon',
  viewBox: '0 0 18 20',
  path: (
    <div>
      <path
        opacity='0.4'
        d='M16.6433 7.48844C16.6433 7.55644 16.1103 14.2972 15.8059 17.1341C15.6153 18.875 14.493 19.931 12.8095 19.961C11.516 19.99 10.2497 20 9.00388 20C7.68121 20 6.38772 19.99 5.13215 19.961C3.50507 19.922 2.38177 18.845 2.20088 17.1341C1.88772 14.2872 1.36448 7.55644 1.35476 7.48844C1.34503 7.28345 1.41117 7.08846 1.54538 6.93046C1.67765 6.78447 1.86827 6.69647 2.06861 6.69647H15.9392C16.1385 6.69647 16.3194 6.78447 16.4624 6.93046C16.5956 7.08846 16.6627 7.28345 16.6433 7.48844Z'
        fill='#C82B38'
      />
      <path
        d='M18 3.97686C18 3.56588 17.6761 3.24389 17.2871 3.24389H14.3714C13.7781 3.24389 13.2627 2.8219 13.1304 2.22692L12.967 1.49795C12.7385 0.616978 11.9498 0 11.0647 0H6.93624C6.0415 0 5.26054 0.616978 5.02323 1.54595L4.87054 2.22792C4.7373 2.8219 4.22185 3.24389 3.62957 3.24389H0.713853C0.32386 3.24389 0 3.56588 0 3.97686V4.35685C0 4.75783 0.32386 5.08982 0.713853 5.08982H17.2871C17.6761 5.08982 18 4.75783 18 4.35685V3.97686Z'
        fill='#C82B38'
      />
    </div>
  )
})

export const ArrowLeftIcon = createIcon({
  displayName: 'ArrowLeftIcon',
  viewBox: '0 0 28 12',
  path: (
    <div>
      <path
        d='M1 6H27'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 6L5 1'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 6L5 11'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </div>
  )
})
