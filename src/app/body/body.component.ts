import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterContentChecked {

  optionSelected = '';
  diseaseSelected = '';
  symptomSelected: Array<string> = [];
  medicineSelected = '';
  medcompositionSelected = '';
  outputSelected = [];
  newOutputArray: Array<string> = [];
  resultsArray: any = []

  healthcareOptions = ['Diseases', 'Symptoms', 'Medicines', "Medicine Compositions"];
  outputOptions = ['Diseases', 'Symptoms', 'Medicines', 'Severity', 'RiskFactor', "Disease Description", "Precautions", "Occurence", "Medicine Description", "Medicine Compositions"]
  diseases = [
    "Drug Reaction","Malaria","Allergy","Hypothyroidism","Psoriasis","GERD","Chronic cholestasis","hepatitis A","Osteoarthristis",
    "(vertigo) Paroymsal  Positional Vertigo","Hypoglycemia","Acne","Diabetes","Impetigo","Hypertension","Peptic ulcer diseae",
    "Dimorphic hemmorhoids(piles)","Common Cold","Chicken pox","Cervical spondylosis","Hyperthyroidism","Urinary tract infection",
    "Varicose veins","AIDS","Paralysis (brain hemorrhage)","Typhoid","Hepatitis B","Fungal infection","Hepatitis C","Migraine",
    "Bronchial Asthma","Alcoholic hepatitis","Jaundice","Hepatitis E","Dengue","Hepatitis D","Heart attack","Pneumonia","Arthritis",
    "Gastroenteritis","Tuberculosis"
  ]

  medicines= ["Antifungal†cream","Antifungal liquids","Antifungal sprays","Antihistamine","antacid","Antidiarrhoeal","Proton-pump inhibitor",
  "Ursodeoxycholic acid (UDCA)","Steroid","Metformin","Sulfonylureas","Meglitinides","Thiazolidinediones","DPP-4 inhibitors","GLP-1 receptor agonists",
  "SGLT2 inhibitors","Insulin","Proton pump inhibitors","Imodium","Analgesic","Pepto-Bismol","Albuterol","Levalbuterol","Chloroquine phosphate","Artemisinin-based combination therapies",
  "Chloramphenicol","Penicillin","No Medicine","Benazepril (Lotensin)","Acebutolol (Sectral)","antipsychotics","stimulant","Nonsteroidal anti-inflammatory drugs (NSAIDs)",
  "Antihypertensive drug","No medicine (consult doctor immediately)","Isoniazid (antibiotics)","Nasal decongestants","Lidocaine","intravenous",
  "Levothyroxine","Antiviral drugs","no medicine available (consult doctor)","Oseltamivir (Tamiflu)","Selective serotonin reuptake inhibitors (SSRIs)",
  "Lyrics(pregabalin)","diuretic","Abilify (aripiprazole)","polio vaccine (OPV)","tecovirimat (tpoxx)","alteplase","nifedipine",
  "cholinesterase inhibitors","Sedative","Ferrous sulfate","immunosuppressive drug","No medicine....","Statin"]

  symptomString = `itching
  continuous_sneezing
  stomach_pain
  vomiting
  muscle_wasting
  fatigue
  headache
  acidity
  back_pain
  chills
  skin_rash
  joint_pain
  constipation
  muscle_weakness
  burning_micturition
  nodal_skin_eruptions
  ulcers_on_tongue
  yellowish_skin
  loss_of_appetite
  high_fever
  restlessness
  dehydration
  dizziness
  neck_pain
  weakness_of_one_body_side
  lethargy
  nausea
  abdominal_pain
  cough
  pain_in_anal_region
  sweating
  bruising
  cold_hands_and_feets
  anxiety
  knee_pain
  swelling_joints
  blackheads
  foul_smell_of urine
  skin_peeling
  blister
  shivering
  indigestion
  patches_in_throat
  weight_loss
  sunken_eyes
  chest_pain
  weakness_in_limbs
  pain_during_bowel_movements
  breathlessness
  cramps
  weight_gain
  stiff_neck
  pus_filled_pimples
  bladder_discomfort
  dischromic _patches
  watering_from_eyes
  extra_marital_contacts
  diarrhoea
  loss_of_balance
  blurred_and_distorted_vision
  altered_sensorium
  dark_urine
  swelling_of_stomach
  bloody_stool
  obesity
  mood_swings
  hip_joint_pain
  movement_stiffness
  spinning_movements
  scurring
  continuous_feel_of_urine
  silver_like_dusting
  red_sore_around_nose
  spotting_ urination
  passage_of_gases
  irregular_sugar_level
  family_history
  lack_of_concentration
  excessive_hunger
  yellowing_of_eyes
  distention_of_abdomen
  irritation_in_anus
  swollen_legs
  painful_walking
  small_dents_in_nails
  yellow_crust_ooze
  internal_itching
  mucoid_sputum
  history_of_alcohol_consumption
  swollen_blood_vessels
  unsteadiness
  inflammatory_nails
  depression
  fluid_overload
  swelled_lymph_nodes
  malaise
  prominent_veins_on_calf
  puffy_face_and_eyes
  irritability
  muscle_pain
  mild_fever
  yellow_urine
  phlegm
  enlarged_thyroid
  increased_appetite
  visual_disturbances
  pain_behind_the_eyes
  brittle_nails
  drying_and_tingling_lips
  polyuria
  toxic_look_(typhos)
  throat_irritation
  fast_heart_rate
  swollen_extremeties
  slurred_speech
  red_spots_over_body
  belly_pain
  receiving_blood_transfusion
  acute_liver_failure
  redness_of_eyes
  rusty_sputum
  receiving_unsterile_injections
  coma
  sinus_pressure
  palpitations
  stomach_bleeding
  runny_nose
  abnormal_menstruation
  congestion
  blood_in_sputum
  loss_of_smell`;

  symptoms = this.symptomString.split('\n');

  medicineComposition = `clotrimazole, econazole, ketoconazole, miconazole, tioconazole, terbinafine, and amorolfine
  Brompheniramine, Cetirizine, Chlorpheniramine
  calcium carbonate, magnesium hydroxide, aluminum hydroxide and/or sodium bicarbonate
  chloroform, methanol, and aqueous extracts of Bidens odorata Cav.
  esomeprazole, lansoprazole, omeprazole, pantoprazole and rabeprazole
  ursodeoxycholic acid
  17carbon atom, bonded in 4 fused ring, 3 6-member cyclohexane ring
  a refined herbal medicine derived from a flower called French lilac
  a central S-aryl sulfonylurea structure with a p-substituent on the phenyl ring
  belonging to the meglitinide class of antidiabetic agents with hypoglycemic activity
  potent, synthetic ligands for peroxisome proliferator-activated receptor gamma-? activation
  a class of oral hypoglycemics that block the enzyme dipeptidyl peptidase-4
  30 or 31 amino acid long peptide hormone
  canagliflozin ,dapagliflozin, empagliflozin
  composed of two peptide chains referred to as the A chain and B chain
  Prilosec,Prevacid ,Aciphex,Nexium Protonix
  (loperamide hydrochloride), 4-(p-chlorophenyl)-4-hydroxy-N, N-dimethyl- a
  Acetaminophen
  flavor, magnesium aluminum silicate, methylcellulose, saccharin sodium
  molecular weight of albuterol sulfate is 576.7
  0.31 mg of levalbuterol or 0.63 mg of levalbuterol
  150 mg of metaproterenol sulfate as a micronized powder in inert propellants
  500 mg of chloroquine phosphate USP, equivalent to 300 mg chloroquine base
  lumefantrine, mefloquine, amodiaquine, sulfadoxine, piperaquine and chlorproguanil/dapsone
  2,2-dichloro-N- [(aR,bR)-b-hydroxy-a-hydroxymethyl- 4-nitrophenethyl] acetamide
  Penicillin 30
  carboxyl-containing angiotensin-converting enzyme (ACE) inhibitor
  hydrochloride salt of (±)N-[3-Acetyl-4-[2- hydroxy-3-[(1- methylethyl)amino]propoxy]phenyl]
  prochlorperazine, droperidol, haloperidol, and chlorpromazine
  salicylates, and opioid drugs such as morphine and oxycodone
  methylxanthines (methylated purines), cocaine, and nicotine
  ibuprofen, acetylsalicylic acid, naproxen, indomethacin, meloxicam, and piroxicam
  contains drugs
  silicon dioxide, lactose monohydrate, pregelatinized starch (corn), and stearic acid
  decongestants†is pseudoephedrine or phenylephrine
  VK (Penicillin†V Potassium Tablets USP), for oral administration, contain 250 mg
  hydrochloride and epinephrine, with 0.5 mg sodium metabisulfite and 0.2 mg citric acid
  water, electrolytes, and/or glucose,albumin and blood product isotonic, hypotonic, or hypertonic
  L-thyroxine , levothyroxine , 51-48-9 , thyroxine , thyroxin
  antiviral drug
  tetrahydronaphthalene linked to a phenyl group to form N-methyl-4-phenyl-1,2,3,4-tetrahydronaphthalen-1-amine skeleton
  3-isobutyl GABA, (S)-3-isobutyl-?-aminobutyric acid
  Brompheniramine (Dimetane)
  hydrochlorothiazide, chlorthalidone, or indapamide
  rosiglitazone and pioglitazone (Actos)
  cornstarch, hydroxypropyl cellulose, lactose monohydrate, magnesium stearate
  humoral' or serum
  cytochrome P450 (CYP)3A and a weak inhibitor of CYP2C8 and CYP2C19
  arginine, phosphoric acid, polysorbate 80, nitrogen
  VK (Penicillin V Potassium Tablets USP), for oral administration, contain 250 mg
  Dimethyl 1,4-dihydro-2,6-dimethyl-4-(o-nitrophenyl)-3,5-pyridinedicarboxylate
  ?-humulene (46.3%), ?-caryophyllene (9.3%), ?-copaene (8.2%), ?-myrcene (4.3%), Z(E)-?-farnesene (3.7%)
  barbiturates, benzodiazepines, gamma-hydroxybutyrate (GHB)
  Calcium phosphate, cellulose, croscarmellose sodium, FD&C red #40, hypromellose, magnesium stearate
  calcineurin inhibitors, interleukin inhibitors, selective immunosuppressants and TNF alfa inhibitors
  Levacor, Zocor, Pravachol, Lipitor, Crestor`

  medicineCompositionArray = this.medicineComposition.split('\n');

  constructor(private http: HttpClient) { }

  responseObject = {
    Inputs: {
      symptoms: "",
      diseases: "",
      medicines: "",
      medicineCompositions: ""
    },
    outputs: {
      diseases: false,
      severity: false,
      diseaseDescription: false,
      precautions: false,
      medicines: false,
      occurrence: false,
      riskFactor: false,
      medicineCompositions: false,
      medicineDescription: false,
      symptoms: false
    }
  };

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.newOutputArray = []
    this.outputOptions.forEach((value, index) => {
      if(value !== this.optionSelected) {
        this.newOutputArray.push(value)
      }
    })
  }

  onsendData() {
    const postCreated = {
      Inputs: {
        symptoms: <unknown>[],
        diseases: "",
        medicines: "",
        medicineCompositions: ""
      },
      outputs: {
        diseases: false,
        severity: false,
        diseaseDescription: false,
        precautions: false,
        medicines: false,
        occurrence: false,
        riskFactor: false,
        medicineCompositions: false,
        medicineDescription: false,
        symptoms: false
      }
    };

    console.log(this.outputSelected);
    console.log(postCreated)
    if(this.optionSelected === "Diseases") {
      postCreated.Inputs.diseases = this.diseaseSelected.trim();
    } else if(this.optionSelected === "Symptoms") {
      this.symptomSelected.map(ele=>ele.trim());
      postCreated.Inputs.symptoms = this.symptomSelected;
    } else if(this.optionSelected === "Medicines") {
      postCreated.Inputs.medicines = this.medicineSelected.trim();
    } else if(this.optionSelected === "Medicine Compositions") {
      postCreated.Inputs.medicineCompositions = this.medcompositionSelected.trim();
    }
    this.outputSelected.forEach((ele)=>{
      if(ele === "Diseases") {
        postCreated.outputs.diseases = true;
      }
      if(ele === "Symptoms") {
        postCreated.outputs.symptoms = true;
      }
      if(ele === "Medicines") {
        postCreated.outputs.medicines = true;
      }
      if(ele === "Severity") {
        postCreated.outputs.severity = true;
      }
      if(ele === "RiskFactor") {
        postCreated.outputs.riskFactor = true;
      }
      if(ele === "Disease Description") {
        postCreated.outputs.diseaseDescription = true;
      }
      if(ele === "Precautions") {
        postCreated.outputs.precautions = true;
      }
      if(ele === "Medicine Description") {
        postCreated.outputs.medicineDescription = true;
      }
      if(ele === "Occurence") {
        postCreated.outputs.occurrence = true;
      }
      if(ele === "Medicine Compositions") {
        postCreated.outputs.medicineCompositions = true;
      }
    })

    this.http.post('http://localhost:3000/api/posts', postCreated)
      .subscribe((responseData) => {
        console.log('api works!')
        this.resultsArray = responseData;
   });
  }
}
