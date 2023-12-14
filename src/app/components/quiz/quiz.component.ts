import { Component, OnInit } from '@angular/core';
import data from '../../..//assets/data/data.json';
import { __values } from 'tslib';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title: string = ""
  questions: any
  questionSelected: any
  quizSelected: any


  answers: string[] = [];
  answersSelected: string = "";
  descriptionSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  goBack = this.answers.length > 0 ? true : false

  constructor(){}

  ngOnInit(): void {
      if(data) {
        this.quizSelected = data.quiz[0]

        this.finished = false;
        this.title = this.quizSelected.title;
        
        this.questions = this.quizSelected.questions;
        this.questionSelected =  this.questions[this.questionIndex]

        this.questionIndex = 0
        this.questionMaxIndex = this.questions.length
        this.goBack = false;
      }
  }

  optionSelected(val:string){
    this.answers.push(val)
    this.nextStep();
    this.goBack = true;
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer: string = await this.CheckResult(this.answers)
      this.goBack = false;
      this.finished = true;
      this.answersSelected = this.quizSelected.results[finalAnswer as keyof typeof this.quizSelected.results].answer
      this.descriptionSelected =  this.quizSelected.results[finalAnswer as keyof typeof this.quizSelected.results].description
    }
  }

  async CheckResult(answers:string[]) {
    const result = answers.map(a=>a.split('')).reduce((a,b) => a.concat(b)).reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }

  return_questions(){
    this.answers.pop();
    this.questionIndex -= 1;
    this.questionSelected = this.questions[this.questionIndex]
    this.goBack = this.answers.length > 0 ? true : false
    console.log(this.answers)
  }

  reset(){
    this.finished = false;
    this.title = this.quizSelected.title

    this.questionMaxIndex = 0

    this.questions = this.quizSelected.questions
    this.questionSelected = this.questionSelected[this.questionIndex]

    this.questionMaxIndex = this.questions.length
    this.goBack = false;
    this.answers = [];
    this.answersSelected = "";
  }

  change(i:number){
    this.quizSelected = data.quiz[i]
    this.finished = false;
    this.title = this.quizSelected.title

    this.questionIndex = 0
    this.questions = this.quizSelected.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionMaxIndex = this.questions.length
    this.goBack = false;
  }
}

