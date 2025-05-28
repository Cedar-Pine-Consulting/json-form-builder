// TODO: when editing a dropdown options in this
// also update BE constants files dropdownOptions

export const dropdownOptions = {
  clientType: [
    { label: "Parent or Guardian of a PLN student", value: "legal-guardian" },
    { label: "Student at PLN", value: "student" },
    { label: "Community Participant", value: "community-participant" },
  ],
  gender: [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    {
      label: "Nonbinary, genderfluid or genderqueer",
      value: "nonbinary-genderfluid-genderqueer",
    },
    { label: "Prefer Not To Respond", value: "prefer-not-to-respond" },
    {
      label: "I use other words to describe my gender identity.",
      value: "use-other-words-to-describe-gender",
    },
  ],
  selfIdentifiedDisability: [
    { label: "A mental disability", value: "mental-disability" },
    { label: "A physical disability", value: "physical-disability" },
    { label: "A developmental disability", value: "developmental-disability" },
    {
      label: "A chronic health condition",
      value: "chronic-health-condition",
    },
    { label: "Difficulty seeing", value: "difficulty-seeing" },
    { label: "Difficulty hearing", value: "difficulty-hearing" },
    {
      label: "Another communication disability",
      value: "another-communication-disability",
    },
    {
      label: "Another type of disability",
      value: "another-type-of-disability",
    },
  ],
  specialPopulation: [
    { label: "Parenting youth", value: "parenting-youth" },
    {
      label: "Involved in child welfare system",
      value: "involved-in-child-welfare-system",
    },
    {
      label: "Survivor of domestic violence",
      value: "survivor-of-domestic-violence",
    },
    {
      label: "Involved in justice system",
      value: "involved-in-justice-system",
    },
    {
      label: "Experiencing food Insecurity",
      value: "experiencing-food-insecurity",
    },
  ],
  sexualOrientation: [
    { label: "Heterosexual or straight", value: "heterosexual/straight" },
    { label: "Gay or lesbian", value: "gay-or-lesbian" },
    {
      label: "Bisexual, pansexual, or queer",
      value: "bisexual-pansexual-queer",
    },
    { label: "Asexual", value: "asexual" },
    {
      label: "I use other words to describe my sexual orientation.",
      value: "uses-other-words-to-describe",
    },
    { label: "I prefer not to answer", value: "prefer-not-to-answer" },
  ],
  maritalStatus: [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Domestic Partnership", value: "domestic-partnership" },
    { label: "Separated", value: "separated" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
    { label: "I prefer not to answer", value: "prefer-not-to-answer" },
  ],
  ethnicityRace: [
    {
      label: "Black/African American",
      value: "black-or-african-american",
    },
    {
      label:
        "East Asian (Chinese, Japanese, Korean, Mongolian, Taiwanese, etc.)",
      value: "east-asian",
    },
    {
      label:
        "South and/or Southeast Asian (Bangladeshi, Indian, Cambodian, Filipino, Indonesian, Malaysian, Thai, Vietnamese, etc.)",
      value: "south-or-southeast-asian",
    },
    {
      label:
        "Native Hawaiian and/or Pacific Islander (Samoan, Chamorro, Tongan, Fijian, etc.)",
      value: "native-hawaiian-or-pacific-islander",
    },
    {
      label:
        "Mexican|Central American (Salvadorian, Guatemalan, Honduran, Nicaraguan, etc.)",
      value: "mexican-central-american",
    },
    {
      label:
        "South American (Columbian, Brazilian, Ecuadorian, Venezuelan, etc.)",
      value: "south-american",
    },
    { label: "Caribbean (Cuban, Dominican, Puerto Rican)", value: "caribbean" },
    {
      label:
        "Indigenous and/or Native American (Navajo, Blackfeet Tribe, Mayan, Aztec, etc.)",
      value: "indigenous-or-native-american",
    },
    {
      label:
        "Middle Eastern and/or North African (Lebanese, Iranian, Egyptian, Syrian, etc.)",
      value: "middle-eastern-or-north-african",
    },
    {
      label: "White (German, Irish, English, Italian, Polish, French, etc.)",
      value: "white",
    },
    {
      label: "Biracial or Multiracial",
      value: "multi-racial",
    },
    { label: "Other", value: "other" },
    { label: "Prefer Not To Respond", value: "prefer-not-to-respond" },
    {
      label: "I don't know what this question means",
      value: "i-dont-know-what-this-question-means",
    },
  ],
  englishLanguageStatus: [
    { label: "None", value: "None", info: "No proficiency in English" },
    {
      label: "Basic",
      value: "basic",
      info: "Limited understanding, able to communicate simple phrases",
    },
    {
      label: "Intermediate",
      value: "intermediate",
      info: "Can hold basic conversations and understand common phrases",
    },
    {
      label: "Advanced",
      value: "advanced",
      info: "Highly proficient in reading, writing, and speaking",
    },
    {
      label: "Fluent",
      value: "fluent",
      info: "Proficient in English, able to communicate comfortably in most situations",
    },
    {
      label: "Native",
      value: "native",
      info: "English is the first language or native language",
    },
  ],
  freeReducedLunch: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ],
  isTk12Student: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ],
  schools: [
    { label: "Charter Middle School", value: "charter-middle-school" },
    { label: "Charter Elementary School", value: "charter-elementary-school" },
    { label: "Caruso EEC", value: "caruso-eec" },
    { label: "Keck EEC", value: "keck-eec" },
    { label: "Cypress Park Head Start", value: "cypress-park-head-start" },
    { label: "Hollywood Head Start", value: "hollywood-head-start" },
    { label: "Magnolia Head Start", value: "magnolia-head-start" },
    { label: "Vine Early Head Start", value: "vine-early-head-start" },
    { label: "Western Early Head Start", value: "western-early-head-start" },
  ],
  typeOfSchool: [
    { label: "LAUSD operated school", value: "lausd-operated-school" },
    { label: "Other District school", value: "other-district-school" },
    { label: "Private school", value: "private-school" },
    { label: "Home school", value: "home-school" },
    { label: "Other", value: "other" },
  ],
  homelessStatus: [
    {
      label: "Car or RV",
      value: "car-or-rv",
    },
    {
      label: "Crisis shelter",
      value: "crisis-shelter",
    },
    {
      label: "Domestic violence shelter",
      value: "domestic-violence-shelter",
    },
    {
      label: "Transitional shelter",
      value: "transitional-shelter",
    },
    {
      label: "Hotel/hotel voucher",
      value: "hotel/voucher",
    },
    {
      label: "Living on the street",
      value: "living-on-street",
    },
  ],
  specialEducationEligibility: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ],
  militaryConnection: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ],
  immunizationStatus: [
    { label: "Vaccinated", value: "vaccinated" },
    { label: "Not Vaccinated", value: "not-vaccinated" },
  ],
  educationalLevel: [
    { label: "None", value: "none" },
    { label: "Grade 1-4", value: "grade-1-4" },
    { label: "Grade 5-6", value: "grade-5-6" },
    { label: "Grade 7-8", value: "grade-7-8" },
    { label: "Grade 9-11", value: "grade-9-11" },
    {
      label: "High school diploma or equivalent (GED)",
      value: "high-school-or-equivalent-ged",
    },
    {
      label: "Some college but didn't receive degree",
      value: "college-no-degree",
    },
    {
      label: "Associate degree",
      value: "associate-degree",
    },
    {
      label: "Bachelor's degree",
      value: "bachelors-degree",
    },
    {
      label: "Master's degree",
      value: "masters-degree",
    },
    {
      label: "Doctorate",
      value: "doctorate",
    },
    {
      label: "Technical or occupational certificate",
      value: "technical-or-occupational-certificate",
    },
    {
      label: "Currently enrolled in K-12 education",
      value: "currently-in-k12-education",
    },
    {
      label: "Currently enrolled in higher education (college)",
      value: "currently-in-higher-education-college",
    },
    {
      label: "Currently enrolled in higher education (graduate school)",
      value: "currently-in-higher-education-school",
    },
    { label: "Other", value: "other" },
    { label: "I prefer not to answer", value: "prefer-not-to-answer" },
  ],
  howDidYouHear: [
    {
      label: "Referred from other Para Los Niños program",
      value: "referred-from-other-pln-program",
    },
    {
      label: "Referred from other community organization",
      value: "referred-from-other-community-organization",
    },
    {
      label: "Referred from the program funder (DCFS, DMH, DPH etc)",
      value: "referred-from-the-program-funder",
    },
    {
      label: "Heard from a friend/neighbor/family member",
      value: "heard-from-friend-neighbor-family-member",
    },
    {
      label: "Heard at child's school",
      value: "heard-at-childs-school",
    },
    {
      label: "Heard at a public facility (library, city hall, hospital, etc)",
      value: "heard-at-public-facility",
    },
    {
      label: "Saw a flyer",
      value: "saw-a-flyer",
    },
    {
      label: "Saw on social media (Facebook, X, Instagram, etc)",
      value: "saw-on-social-media",
    },
    {
      label: "Saw the Para Los Niños website",
      value: "saw-the-pln-website",
    },
    {
      label: "Walked into an event/meeting",
      value: "walked-into-event-meetings",
    },
    {
      label: "Self referred",
      value: "self-referred",
    },
    {
      label: "Other",
      value: "other",
    },
  ],
  housingStatus: [
    {
      label: "Housed",
      value: "housed",
    },
    {
      label: "Housed but at risk",
      value: "housed-at-risk",
    },
    {
      label: "Housed but formerly homeless",
      value: "housed-formerly-homeless",
    },
    {
      label: "Unhoused/homeless (car, hotel, shelter, on the street)",
      value: "unhoused-homeless",
    },
  ],
  housingType: [
    { label: "Renting Apartment", value: "renting-apartment" },
    { label: "Renting Home", value: "renting-home" },
    { label: "Own Home", value: "own-home" },
    { label: "Own Apartment", value: "own-apartment" },
    {
      label: "Government subsidized housing",
      value: "government-subsidized-housing",
    },
    {
      label: "Staying with Family",
      value: "staying-with-family",
    },
    {
      label: "Staying with Friends",
      value: "staying-with-friends",
    },
    {
      label: "Renting a space in garage, a part of living room, etc",
      value: "renting-a-space-in-garage",
    },
  ],
  householdType: [
    { label: "Single-parent", value: "single-parent" },
    { label: "Two-parent", value: "two-parent" },
    { label: "Relative caregiver(s)", value: "relative-care-givers" },
    { label: "Foster family", value: "foster-family" },
  ],
  lengthOfResidence: [
    { label: "0-3 Months", value: "0-3-months" },
    { label: "4-6 Months", value: "4-6-months" },
    { label: "7-12 Months", value: "7-12-months" },
    { label: "1-2 Years", value: "1-2-years" },
    { label: "2-5 Years", value: "2-5-years" },
    { label: "6-10 Years", value: "6-10-years" },
    { label: "11-15 Years", value: "11-15-years" },
    { label: "16-20 Years", value: "16-20-years" },
    { label: "20+ Years", value: "20+ years" },
  ],
  primaryLanguage: [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "Arabic", value: "arabic" },
    { label: "Armenian", value: "armenian" },
    { label: "Cambodian", value: "cambodian" },
    { label: "Cantonese", value: "cantonese" },
    { label: "Farsi", value: "farsi" },
    { label: "Hmong", value: "hmong" },
    { label: "Korean", value: "korean" },
    { label: "Mandarin", value: "mandarin" },
    { label: "Other Chinese", value: "other-chinese" },
    { label: "Russian", value: "russian" },
    { label: "Tagalog", value: "tagalog" },
    { label: "Vietnamese", value: "vietnamese" },
    { label: "American Sign Language", value: "american-sign-language" },
    { label: "Other", value: "other" },
    { label: "I prefer not to answer", value: "prefer-not-to-answer" },
  ],
  otherLanguages: [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "Arabic", value: "arabic" },
    { label: "Armenian", value: "armenian" },
    { label: "Cambodian", value: "cambodian" },
    { label: "Cantonese", value: "cantonese" },
    { label: "Farsi", value: "farsi" },
    { label: "Hmong", value: "hmong" },
    { label: "Korean", value: "korean" },
    { label: "Mandarin", value: "mandarin" },
    { label: "Other Chinese", value: "other-chinese" },
    { label: "Russian", value: "russian" },
    { label: "Tagalog", value: "tagalog" },
    { label: "Vietnamese", value: "vietnamese" },
    { label: "American Sign Language", value: "american-sign-language" },
    { label: "Náhuatl", value: "nahuatl" },
    { label: "Mam", value: "mam" },
    { label: "Maya Yucateco", value: "maya-yucateco" },
    { label: "Tseltal", value: "tseltal" },
    { label: "Tsotsil", value: "tsotsil" },
    { label: "Mixteco", value: "mixteco" },
    { label: "Zapoteco", value: "zapoteco" },
    { label: "Otomí", value: "otomí" },
    { label: "Totonaco", value: "totonaco" },
    { label: "Chol", value: "chol" },
    { label: "Quiché/K’iche", value: "quiche" },
    { label: "Pipil", value: "pipil" },
    { label: "Q'eqchi", value: "qeqchi" },
    { label: "Garífuna", value: "garífuna" },
    { label: "Other", value: "other" },
  ],
  employmentStatus: [
    {
      label: "Employed full-time (40 hours or more per week)",
      value: "employed-full-time",
    },
    {
      label: "Employed part-time (Up to 39 hours per week)",
      value: "employed-part-time",
    },
    {
      label: "Unemployed and currently looking for work",
      value: "unemployed-looking-for-work",
    },
    {
      label: "Unemployed and currently not looking for work",
      value: "unemployed-not-looking-for-work",
    },
    { label: "Student", value: "student" },
    { label: "Retired", value: "retired" },
    { label: "Self-employed", value: "self-employed" },
    { label: "Unable to work", value: "unable-to-work" },
    { label: "Other", value: "other" },
    { label: "I prefer not to answer", value: "prefer-not-to-answer" },
  ],
  insuranceStatus: [
    { label: "Medicare", value: "medicare" },
    { label: "Medical", value: "medical" },
    { label: "Emergency Medical", value: "emergency-medical" },
    { label: "Private Insurance", value: "private-insurance" },
    { label: "Other Insurance", value: "other" },
    { label: "No Insurance", value: "no-insurance" },
  ],
  managedCarePlan: [
    { label: "Health Net", value: "health-net" },
    { label: "Kaiser Permanente", value: "kaiser-ermanente" },
    { label: "L.A. Care Health Plan", value: "la-care-health-plan" },
    { label: "Molina Health Care of California", value: "molina-health-care" },
    {
      label: "Blue Shield of California Promise Health Plan",
      value: "blue-shield-of-california",
    },
    { label: "Anthem Blue Cross", value: "anthem-blue-cross" },
  ],
  homeInternet: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
  firstGeneration: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
  publicSupportReceived: [
    { label: "CalFresh", value: "cal-fresh" },
    { label: "CalWorks", value: "cal-works" },
    { label: "FDPIR", value: "fdpir" },
    { label: "SSI/SD/SSD", value: "ssi-sd-ssd" },
    { label: "Kin-Gap", value: "kin-gap" },
    { label: "Unemployment", value: "unemployment" },
    { label: "Other Public Support", value: "other-public-support" },
  ],
};

export const states = [{ label: "California", value: "CA" }];

export const activeStatus = { label: "Active", value: true };

export const inactiveStatus = { label: "Inactive", value: false };

export const statusOptions = [activeStatus, inactiveStatus];

export const locations = [
  { label: "Profile", value: "profile" },
  { label: "Interaction", value: "interaction" },
  { label: "Case", value: "case" },
];

export const roles = {
  SUPERUSER: "superuser",
  CASE_MANAGER: "case_manager",
  PROGRAM_MANAGER: "program_manager",
};

export const householdRoles = [
  { label: "Grandfather", value: "grandfather" },
  { label: "Grandmother", value: "grandmother" },
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
  { label: "Son", value: "son" },
  { label: "Daughter", value: "daughter" },
  { label: "Uncle", value: "uncle" },
  { label: "Aunt", value: "aunt" },
  { label: "Cousin", value: "cousin" },
  { label: "Nephew", value: "nephew" },
  { label: "Niece", value: "niece" },
  { label: "Brother", value: "brother" },
  { label: "Sister", value: "sister" },
  { label: "Husband", value: "husband" },
  { label: "Wife", value: "wife" },
  { label: "Partner", value: "partner" },
  { label: "Friend", value: "friend" },
  { label: "Other", value: "other" },
];

export const DRAWER_WIDTH = 400;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
