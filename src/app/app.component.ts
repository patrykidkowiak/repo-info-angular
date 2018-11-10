import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RepositoryService} from './repository/repository.service';
import {Repository} from './models/Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Repository Info';
  repositoryForm: FormGroup;
  repository: Repository;
  hasErrors = false;

  constructor(private repositoryService: RepositoryService) {
  }


  ngOnInit(): void {
    this.repositoryForm = new FormGroup({
      gitHubUser: new FormControl(''),
      repositoryName: new FormControl('')
    });
  }

  getRepositoryInfo() {
    this.hasErrors = false;
    this.repositoryService
      .getRepository(this.repositoryForm.value.gitHubUser, this.repositoryForm.value.repositoryName)
      .subscribe(repository => {
        this.repository = repository;
      }, err => this.hasErrors = true);
  }
}
