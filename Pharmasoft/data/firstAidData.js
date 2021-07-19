export default firstAid = [
    {
      id: 1,
      title: 'Asthma',
      image: 'lung',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Sit the person in a quiet, warm place, away from other people and leaning on a table.',
          'Give the person one puff into their spacer, then 4 breaths through the spacer, repeat 4 times.',
          'Wait 4 minutes, then if there is no improvement give 4 more puffs.',
          'If there is still no improvement or the person’s condition suddenly deteriorates, call an ambulance immediately.',
          'While waiting for medical help to arrive, continue to administer the puffer as described.'
        ]
      }
    },
    {
      id: 2,
      title: 'Bruises',
      image: 'plaster',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Check for injuries, particularly Fractures, Sprains, Dislocations or Strains.',
          ['Rest the casualty, support the injured part and apply a compression bandage. ', 'A heavily bruised arm should be supported with a sling. If the legs or body are bruised, support them with cushions.'],
          'Apply an ice pack (see Sprains or Dislocations).',
          'For the treatment of a black eye, see Eye Injuries',
        ]
      }
    },
    {
      id: 3,
      title: 'Choking',
      image: 'choke',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        notes: [
          'For someone who\'s obese or pregnant, perform thrusts around the chest instead of the abdomen.'
        ],
        steps1: [
          'Stand behind the person and lean them slightly forward',
          'Put your arms around their waist',
          'Clench a fist and place it between their navel and rib cage',
          'Grab your fist with your other hand',
          ['Pull the clenched fist sharply backward and upward under their rib cage in 5 quick thrusts. ', 'Repeat until the object is coughed up.']
        ]
      }
    },
    {
      id: 4,
      title: 'Burns',
      image: 'fire',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 3,
        title1: 'First-degree burn / Minor burns',
        title2: 'Second-degree burn',
        title2: 'Third-degree burn',
        steps1: [
          'Run cool water over the affected area for up to 15 minutes. If that’s not possible, apply a cool compress to the area instead. Avoid applying ice to burned tissue. It can cause more damage.',
          'Over-the-counter pain relievers can help relieve pain. Applying lidocaine or an aloe-vera gel or cream can also reduce discomfort from minor burns.',
          'To help prevent infection, apply an antibiotic ointment and loosely cover the burn with clean gauze.'
        ],
        steps2: [
          ['Calll 911( ambulance service ). ', 'You can use the emergency call button above']
        ],
        steps3: [
          ['Calll 911( ambulance service ). ', 'You can use the emergency call button above']
        ],
      }
    },
    {
      id: 5,
      title: 'Blisters',
      image: '',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 2,
        title1: 'Closed blisters',
        title2: 'Open blisters',
        steps1: [
          'Wash your hands and sterilize a needle with alcohol.',
          'Make small punctures at the edge of the blister.',
          'Gently push the fluid out.',
          'Apply antibiotic ointment.',
          ['Bandage it.', 'Change the bandage any time it gets wet. Take it off when you go to bed so the area can dry.'],
          'If possible, take steps to protect the area from further rubbing or pressure.'
        ],
        steps2: [
          'Gently wash with clean water only.',
          'Smooth the flap of broken skin over the newly exposed skin, unless it\'s dirty, torn, or pus has gathered under it.',
          'Apply petroleum jelly.',
          ['Bandage it.', 'Change the bandage any time it gets wet. Take it off when you go to bed so the area can dry.'],
        ]
      }
    },
    {
      id: 6,
      title: 'CPR',
      image: '',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          ['Calll 911( ambulance service ). ', 'You can use the emergency call button above'],
          'Place both hands on the center of their chest, with one hand on top of the other.',
          ['Press straight down to compress their chest repeatedly, at a rate of about 100 to 120 compressions per minute. ',
           'Compressing the chest to the beat of “Staying Alive” by the Bee Gees or “Crazy in Love” by Beyoncé can help you count at the correct rate. Continue performing chest compressions until professional help arrives.'],
        ]
      }
    },
    {
      id: 7,
      title: 'Bee sting',
      image: 'bee',
      gradient: ['',''],
      description: '',
      steps: {
        notes: [
          'If a person is having an allergic reaction to a bee sting, call 911. ',
          'If they have an epinephrine auto-injector (like an EpiPen), help them find and use it. ',
          'Encourage them to remain calm until help arrives.',
        ],
        categories: 1,
        steps1: [
          'If the stinger is still stuck under the skin, gently scrape a credit card or other flat object across their skin to remove it. ',
          'Then wash the area with soap and water and apply a cool compress for up to 10 minutes at a time to reduce pain and swelling.',
          'To treat itching or pain from the sting, consider applying calamine lotion or a paste of baking soda and water to the area several times a day.',
        ]
      }
    },
    {
      id: 8,
      title: 'Concussion',
      image: 'concussion',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Lay the casualty down in a comfortable position. Do not give any food or drink.',
          'Apply a cold compress to the knocked area.',
          'Watch for any worsening of the condition.',
          'If the casualty loses consciousness, place him or her carefully on their SIDE, check the airway, breathing and pulse and begin CPR if necessary.',
          ['Seek medical advice: anyone who has lost consciousness, even if only briefly, should see a doctor. ', 'You can use the emergency call button above']
        ]
      }
    },
    {
      id: 9,
      title: 'Cramps',
      image: '',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        notes: [
          'Gently stretch and straighten the cramped muscle',
          'For a hand cramp, get the sufferer to straighten the fingers and press down on the tips. ',
          'For foot or calf cramps, have the sufferer stand, pushing down on the heel and toes. ',
          'For a thigh cramp, seat the person, straighten the leg, lift the toes with one of your hands and press down on the knee with your other one.',
          'If the cramp is due to loss of fluid, administer tepid water with added glucose (sugar).',
        ]
      }
    },
    {
      id: 10,
      title: 'Cardiac Arrest',
      image: 'heart-flat',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          ['Calll 911( ambulance service ) or the medical alert system for your location. ', 'You can use the emergency call button above'],
          ['Start chest compressions immediately. ',
           'Push down hard and fast in the center of the chest, allowing the chest to come back up naturally between compressions. Continue until someone with more training has arrived.'],
          'If you\'re trained in CPR, use chest compressions and rescue breathing.',
          ['Use an AED if one is available. ' , 'It\'s important to not delay chest compressions, though, so have someone else find one while you do chest compressions.']
        ]
      }
    },
    {
      id: 11,
      title: 'Cut',
      image: 'cut',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Press firmly over the site with a clean cloth until it stops, from 3-15 minutes',
          'Clean with lukewarm water and gently pat dry',
          'Apply a thin layer of antibiotic ointment, then cover with a bandage or gauze if skin is broken',
          ['Call 911 if bleeding persist. ', 'You can use the emergency call button above'],
        ]
      }
    },
    {
      id: 12,
      title: 'Eye problems',
      image: 'eye',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        notes: [
          'Do not rub affected eye',
          'Simple irritants such as dust or debris can be flushed using water. Any chemical exposure to the eye should be flushed with copious amounts of water.',
          'If a more serious injury to the eye is suspected, call 911 or visit the nearest hospital or eye center. Protect both eyes with a bandage or eye shield',
          'Never leave a person with both eyes bandaged alone. They will require verbal cues about their environment around them as well as reassurance',
        ]
      }
    },
    {
      id: 13,
      title: 'Fracture',
      image: 'bone',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Immobilize the injured part and transport patient to the nearest hospital'
        ]
      }
    },

    {
      id: 14,
      title: 'Nosebleed',
      image: 'nose',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Sit the person down and lean their head forward.',
          'Using the thumb and index finger, firmly press or pinch the nostrils closed.',
          'Continue to apply this pressure continuously for five minutes.',
          'Check and repeat until the bleeding stops.',
        ],
        notes:[
          'If the nosebleed continues for 20 minutes or longer, seek emergency medical care. The person should also receive follow-up care if an injury caused the nosebleed. '
        ]
      }
    },
    {
      id: 15,
      title: 'Heatstroke',
      image: 'heat',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Encourage them to rest in a cool location and remove excess layers of clothing',
          'Cover them with a cool, damp sheet.',
          'Apply a cool, wet towel to the back of their neck.',
          'Sponge them with cool water.',
        ],
        notes: [
          ['Call 911 if they develop signs or symptoms of heatstroke, including any of the following: ', 'nausea or vommiting, mental confusion, fainting, seizures, a fever of 104°F (40°C) or greater'],
          'If they’re not vomiting or unconscious, encourage them to sip cool water or a sports drink. '
        ]
      }
    },
    {
      id: 16,
      title: 'Heart attack',
      image: 'heart',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          ['Call 911. ', 'You can use the emergency call button above'],
          'If they’ve been prescribed nitroglycerin, help them locate and take this medication. ',
          'Cover them with a blanket and comfort them until professional help arrives.',
          'If they have difficulty breathing, loosen any clothing around their chest and neck. Start CPR if they lose consciousness.',
        ]
      }
    },
    {
      id: 17,
      title: 'Hypothermia',
      image: 'cold',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Remove the person from the cold and get them to a warm environment.',
          'Remove any wet clothing and dry the person.',
          'Redress in dry, warm clothing and cover with a blanket.',
          'Cover the head as it is a source of significant heat loss.',
          'Be prepared to perform CPR. Stay with the person until advanced help arrives.',
        ],
        notes:[
          ['Call 911 immediately before you start. ', 'You can use the emergency call button above'],
        ]
      }
    },
    {
      id: 18,
      title: 'Sprains',
      image: 'injury',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          'Immobilize the affected area and elevate it',
          'Apply ice and compression to reduce swelling',
        ]
      }
    },
    {
      id: 19,
      title: 'Teeth injury',
      image: 'tooth',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        notes: [
          'If a tooth is simply loose, have the person bite down on a piece of gauze and call their dentist'
        ]
      }
    },
    {
      id: 20,
      title: 'Poison',
      image: 'poison',
      gradient: ['',''],
      description: '',
      steps: {
        categories: 1,
        steps1: [
          ['Call 911/ EMS. ', 'You can use the emergency call button above'],
          'Ensure the scene is safe and wear personal protective equipment.',
          'Get the first aid kit and the AED.',
          'Tell the dispatcher the chemicals involved if possible.',
          'Remove the person from the toxin or poison and seek a well-ventilated area if possible.',
          'Remove the person from the toxin or poison and seek a well-ventilated area if possible.',
          'Follow any recommendations from the 911/EMS dispatcher or the MSDS sheet.',
          'Stay with the person until advanced help arrives.',
          'If CPR is required, ensure a mask is used if possible.',
        ],
        notes: [
          ['When treating any toxin and poison exposures, the eyes should be flushed with copious amounts of water. ' , 
          'Acids and alkaline solutions are particularly caustic and can lead to permanent vision impairments or loss.']
        ]
      }
    },

  ]