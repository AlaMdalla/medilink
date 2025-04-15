import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Problem } from './models/Problem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
   problems: Problem[] = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Array', 'HashMap'],
      description: 'Given an array of integers, return indices of the two numbers that add up to a target.',
    },
    {
      id: 2,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      tags: ['Sliding Window', 'String'],
      description: 'Given a string, find the length of the longest substring without repeating characters.',
    },
    {
      id: 3,
      title: 'Merge K Sorted Lists',
      difficulty: 'Hard',
      tags: ['Linked List', 'Heap'],
      description: 'Merge k sorted linked lists and return it as one sorted list.',
    },
  ];


}
