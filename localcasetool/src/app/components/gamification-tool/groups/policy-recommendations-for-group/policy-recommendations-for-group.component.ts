import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ClimateQuestion } from 'src/app/climate_questions/climate-questions';
import { ClimateQuestions } from 'src/app/climate_questions/climate_control_questions';
import { QuestionaireService } from 'src/app/components/services/questionaire/questionaire.service';

@Component({
  selector: 'app-policy-recommendations-for-group',
  templateUrl: './policy-recommendations-for-group.component.html',
  styleUrls: ['./policy-recommendations-for-group.component.css'],
})
export class PolicyRecommendationsForGroupComponent {
  form!: FormGroup;
  currentQuestion: string = '';
  questionIndex: number = 0;
  answers: string[] = [];
  totalQuestions: number = 10; // Set total number of questions

  //  questions = [
  //   {
  //     question_index:1,
  //     question: '1. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:2,
  //     question: '2.According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:3,
  //     question: '3. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:4,
  //     question: '4. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:5,
  //     question: '5. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:6,
  //     question: '6. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:7,
  //     question: '7. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:8,
  //     question: '8. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:9,
  //     question: '9. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   },
  //   {
  //     question_index:10,
  //     question: '10. According to your knowledge, do you consider it necessary to apply policies that influence the transport demand in participation model?',
  //     answers: ['1. Policy to modify transport share is not required ', '2.It is necessary to implement a policy with medium values', '3.It is necessary to implement a policy with high values '],
  //   }
  // ];

  questions = [
    {
      question_index: 1,
      question: 'QUESTION_1',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 2,
      question: 'QUESTION_2',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 3,
      question: 'QUESTION_3',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 4,
      question: 'QUESTION_4',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 5,
      question: 'QUESTION_5',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 6,
      question: 'QUESTION_6',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 7,
      question: 'QUESTION_7',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 8,
      question: 'QUESTION_8',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 9,
      question: 'QUESTION_9',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
    {
      question_index: 10,
      question: 'QUESTION_10',
      answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    },
  ];

  private currentQuestionIndex = 0;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private questionaireService: QuestionaireService
  ) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


  questionAndAnswersReceived = [
    {
      question: ['question_text'],
      answers: ['answer1', '2', '3'],
    },
  ];

  
  ngOnInit() {
    this.questionaireService
      .getQuestionAndAnswersForSpecificQuestion()
      .subscribe(
        (data) => (this.questionAndAnswersReceived = JSON.parse(data))
      );

    this.form = this.fb.group({
      answer: [''], // Form control for answer
    });

    this.loadNextQuestion();
  }

  // Get the next question from the list
  loadNextQuestion() {
    const questionData = this.questions[this.currentQuestionIndex];
    this.currentQuestion = questionData.question;
    this.questionIndex = questionData.question_index;
    this.answers = questionData.answers;
    this.form.reset(); // Reset form for new question
    this.currentQuestionIndex =
      (this.currentQuestionIndex + 1) % this.questions.length; // Loop back to start if we reach the end
  }

  // Ensure the method is correctly defined
  onSubmit(): void {
    console.log('QuestionIndex:', this.currentQuestionIndex);
    console.log('Answer submitted:', this.form.value.answer);
    this.loadNextQuestion();
  }

  getQuestionaireList: any = [];

  getListOfQuestions() {
    this.getQuestionaireList = this.questionAndAnswersReceived;
    return this.getQuestionaireList;
  }
}
