import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import {
  AnswerButton,
  AnswerCheckbox,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
} from "../components/StepWizard";

const INITIAL_STATE = {
  answers: [],
};

const Welcome = props => {
  const onSelectAnswer = (answer) => {
    props.update("symptoms", answer);
    props.nextStep();
  };

  return (
    <WizardStep>
      <h6 className="text-primary">
        Before you start
      </h6>
      <h2 className="mb-5">
        Before you start
      </h2>
      <ol>
        <li>Constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant dizziness or lightheadedness</li>
        <li>Slurred speech</li>
        <li>Difficulty waking up </li>
      </ol>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        <strong>Medical:</strong> I believe I might have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        <strong>Medical:</strong> They do not have symptoms.
      </AnswerButton>
    </WizardStep>
  );
};

const Step1 = props => {
  const onSelectAnswer = (answer) => {
    props.update("age", answer);
    props.nextStep();
  };

  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep -1} / {props.totalSteps -1}
      </h5>
      <h2 className="mb-5">
        How old are they?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("under 18")}>
        under 18
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("18-64")}>
        18-64
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("65+")}>
        65+
      </AnswerButton>
    </WizardStep>
  );
};

const STEP_2_ANSWERS = [
  "Sore throat",
  "Aching throughout the body",
  "Vomiting or diarrhea",
  "Fever, chills or sweating",
  "Difficulty breathing",
  "New or worsening cough",
];

const STEP_2_STATE = {
  answers: STEP_2_ANSWERS.reduce((answersMap, answer) => ({
    ...answersMap,
    [answer]: false,
  })),
  none: false,
};

const Step2 = props => {
  const [state, updateState] = useState(STEP_2_STATE);
  const { answers, none } = state;
  const toggleAnswer = (answer) => {
    console.log("toggleAnswer", answer);
    // props.update("symptoms", { ...answers, [answer]: !answers[answer] });
  };
  const toggleNone = () => {
    updateState({ ...state, none: !none });
    // props.update("symptoms1", {})
  };
  // "None of these",
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep-1} / {props.totalSteps-1}
      </h5>
      <h2 className="mb-5">
        Do you have any of these symptoms? Please, select all that apply?
      </h2>
      {
        Object.entries(answers).map(([answer, checked]) => (
          <AnswerCheckbox
            text={answer}
            onSelect={() => toggleAnswer(answer)}
            checked={checked}
          />
        ))
      }
      <AnswerCheckbox
        text={"None of these"}
        onSelect={toggleNone}
        checked={none}
      />
    </WizardStep>
  );
};

const STEP_3_ANSWERS = [
  "Diseases or conditions that make it hard to cough",
  "Kidney failure that needs dialysis",
  "Cirrhosis of the liver",
  "Asthma or chronic lung disease",
  "Diabetes with complications",
  "Extreme obesity",
  "Weakened immune system",
  "Congestive heart failure",
];

const STEP_3_STATE = {
  answers: STEP_2_ANSWERS.reduce((answersMap, answer) => ({
    ...answersMap,
    [answer]: false,
  })),
  none: false,
};

const Step3 = props => {
  const [state, updateState] = useState(STEP_3_STATE);
  const { answers, none } = state;
  const toggleAnswer = (answer) => {
    console.log("toggleAnswer", answer);
    // props.update("medical conditions", { ...answers, [answer]: !answers[answer] });
  };
  const toggleNone = () => {
    updateState({ ...state, none: !none });
    // props.update("symptoms1", {})
  };

  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep-1} / {props.totalSteps-1}
      </h5>
      <h2 className="mb-5">
        Do you have any of these pre-existing medical conditions? Please, select
        all that apply?
      </h2>
      {
        Object.entries(answers).map(([answer, checked]) => (
          <AnswerCheckbox
            text={answer}
            onSelect={() => toggleAnswer(answer)}
            checked={checked}
          />
        ))
      }
      <AnswerCheckbox
        text={"None of these"}
        onSelect={toggleNone}
        checked={none}
      />
    </WizardStep>
  );
};

const Step4 = props => {
  const onSelectAnswer = (answer) => {
    props.update("traveledLast14Days", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep-1} / {props.totalSteps-1}
      </h5>
      <h2 className="mb-5">
        Have you traveled internationally during the last 2 weeks?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        Yes
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("other, non medical")}>
        No
      </AnswerButton>
    </div>
  );
};

const Step5 = props => {
  const onSelectAnswer = (answer) => {
    props.update("exposureAreaLast2Weeks", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentSte-1p} / {props.totalSteps-1}
      </h5>
      <h2 className="mb-5">
        If so, have you traveled to an area severely affected by the COVID-19
        outbreak?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        I live in an area severely affected by the COVID-19 outbreak
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        I have visited an area severely affected by the COVID-19 outbreak
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        None of these apply
      </AnswerButton>
    </div>
  );
};

const Step6 = props => {
  const onSelectAnswer = (answer) => {
    props.update("exposureLast14Days", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep-1} / {props.totalSteps-1}
      </h5>
      <h2 className="mb-5">
        Accordingly to what you know, have you been exposed to others who are
        known to have COVID-19 during the last 2 weeks? Please, select all that
        apply.
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        I live with someone who has COVID-19
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        I had close contact with someone with COVID-19
        (10 minutes or more spent together within 6 feet from each other or
        were exposed to their sneeze or cough)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        I was near someone with COVID-19 (at least 6-feet away and not exposed to their cough or sneeze)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        No exposure
      </AnswerButton>
    </div>
  );
};

const Step7 = props => {
  const onSelectAnswer = (answer) => {
    props.update("careFacility", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        In your day-to-day life, do you work or live in a care facility? This
        may include hospitals, care homes, emergency rooms, and other medical
        settings?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        &lt; 18: I am less than 18
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        They live in a care facility (This includes nursing homes and assisted living)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        Worked in a care facility in the last 14 days (This includes hospitals, assisted living facilities, etc.
        This includes part-time jobs and volunteering)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        Plan to work in care facility in the next 14 days (This includes hospitals, assisted living facilities, etc.
        This includes part-time jobs and volunteering)"
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        No (They do not live or work in a long-term care facility)
      </AnswerButton>
    </div>
  );
};

export const SymptomsCheck = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("symptomsCheckAnswers", JSON.stringify(updatedAnswers));
    }
  };

  return (
    <div className="mx-auto" style={CONTAINER_STYLES}>
      <StepWizard>
        <Welcome update={updateAnswers} />
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
        <Step4 hashKey={"Step4"} update={updateAnswers} />
        <Step5 hashKey={"Step5"} update={updateAnswers} />
        <Step6 hashKey={"Step6"} update={updateAnswers} />
        <Step7 hashKey={"Step7"} update={updateAnswers} />
      </StepWizard>
    </div>
  );
};
