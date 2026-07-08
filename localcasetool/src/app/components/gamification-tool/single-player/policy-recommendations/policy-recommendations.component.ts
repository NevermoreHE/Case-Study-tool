import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GamificationMissionsService } from 'src/app/components/services/gamificationMissions/gamification-missions.service';
import { QuestionaireService } from 'src/app/components/services/questionaire/questionaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-recommendations',
  templateUrl: './policy-recommendations.component.html',
  styleUrls: ['./policy-recommendations.component.css'],
})
export class PolicyRecommendationsComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  currentQuestion: string = '';
  questionIndex: number = 0;
  answers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private questionaireService: QuestionaireService,
    private userProgress: GamificationMissionsService,
    private router: Router
  ) {
    translate.setDefaultLang('EN');
  }

  ngOnInit() {
    this.timestamp = new Date().toISOString();
    this.initializeUserAnswers();

    this.questionaireService
      .getQuestionAndAnswersForSpecificQuestion()
      .subscribe(data => {
        this.questionAndAnswersReceived = JSON.parse(data);
      });

    this.form = this.fb.group({
      answer: [''],
    });

    this.loadNextQuestion();
  }

  ngAfterViewInit() {}

  resetToCCgame(): any {
    this.userProgress.setUserProgressMission1(false);
  }

  /* ------------------------------------------ */
  /* QUESTIONS DATA */
  /* ------------------------------------------ */

  questions = Array.from({ length: 11 }, (_, i) => ({
    question_index: i + 1,
    question: `QUESTION_${i + 1}`,
    answers: ['ANSWER_1', 'ANSWER_2', 'ANSWER_3'],
    relevantInfo: 'a'
  }));

  questionAndAnswersReceived: any = [];

  /* ------------------------------------------ */
  /* USER ANSWERS TRACKING */
  /* ------------------------------------------ */

  timestamp: string = '';
  userAnswersRecord: any = {
    timestamp: '',
    answers: [] as { question: string; answer: string | null }[],
  };

  initializeUserAnswers() {
    this.userAnswersRecord.timestamp = this.timestamp;
    this.userAnswersRecord.answers = this.questions.map((q) => ({
      question: q.question_index.toString(),
      answer: null,
    }));
  }

  savedAnswers: { [key: number]: string } = {};

  /* ------------------------------------------ */
  /* NAVIGATION LOGIC */
  /* ------------------------------------------ */

  private currentQuestionIndex = 0;
  showNextQuestionButton: boolean = true;
  previousQuestionButtonStatus: boolean = true;
  questionAnsweredStatus: boolean = true;

  loadNextQuestion() {
    if (this.form.value.answer) {
      this.savedAnswers[this.questionIndex] = this.form.value.answer;
    }

    this.selectedAnswer = '';
    this.questionAnsweredStatus = true;

    this.previousQuestionButtonStatus = this.currentQuestionIndex <= 0;

    if (this.currentQuestionIndex < this.questions.length) {

      const questionData = this.questions[this.currentQuestionIndex];

      this.currentQuestion = questionData.question;
      this.questionIndex = questionData.question_index;
      this.answers = questionData.answers;

      this.form.reset();

      const previousAnswer = this.savedAnswers[this.questionIndex];
      if (previousAnswer) {
        this.form.patchValue({ answer: previousAnswer });
        this.selectedAnswer = previousAnswer;
        this.questionAnsweredStatus = false;
      }

      this.currentQuestionIndex++;

    } else {
      this.showNextQuestionButton = false;
    }
  }

  loadPreviousQuestion() {
    if (this.currentQuestionIndex > 1) {
      this.currentQuestionIndex -= 2;
      this.loadNextQuestion();
    }
  }

  onSubmit(): void {
    this.loadNextQuestion();
  }

  /* ------------------------------------------ */
  /* LAST QUESTION CHECK */
  /* ------------------------------------------ */

  isLastQuestion(): boolean {
    return this.questionIndex === this.questions.length;
  }

  goToResults(): void {

    // Save last answer
    if (this.form.value.answer) {
      this.savedAnswers[this.questionIndex] = this.form.value.answer;
    }

    // Create final answer list
    const answer_list = this.userAnswersRecord.answers.map(
      (a: { question: string; answer: string | null }) => a.answer
    );

    this.questionaireService.setAnswerList(answer_list);

    // Navigate directly
    this.router.navigate(['/gamificationMissionResults']);
  }

  /* ------------------------------------------ */
  /* ANSWER HANDLING */
  /* ------------------------------------------ */

  selectedAnswer: string = '';

  getAnswerLetter(answerIndex: number): string {
    const letters = ['a', 'b', 'c', 'd'];
    return letters[answerIndex] || 'null';
  }

  getAnswer(answer: any, index: number) {
    this.selectedAnswer = answer;
    this.form.patchValue({ answer });
    this.savedAnswers[this.questionIndex] = answer;

    const answerLetter = this.getAnswerLetter(index);
    this.updateUserAnswersRecord(this.questionIndex, answerLetter);

    if (this.selectedAnswer !== '') {
      this.questionAnsweredStatus = false;
    }
  }

  updateUserAnswersRecord(questionIndex: number, answerLetter: string | null) {
    const index = this.userAnswersRecord.answers.findIndex(
      (q: any) => q.question === questionIndex.toString()
    );

    if (index !== -1) {
      this.userAnswersRecord.answers[index].answer = answerLetter;
    }
  }

}
