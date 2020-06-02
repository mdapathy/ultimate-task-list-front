import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ProjectService } from '../_services/project/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../_models/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { TasksService } from '../_services/task/tasks.service';
import { Task } from '../_models/task';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-landing-auth',
  templateUrl: './landing-auth.component.html',
  styleUrls: ['./landing-auth.component.css']
})
export class LandingAuthComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loaded: boolean;
  projects: Project[];
  tasks: Task[];
  currentProject: Project;
  taskName: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TasksService,
    private modalService: NgbModal
  ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue === undefined ||
      this.authenticationService.currentUserValue === null) {
      this.router.navigateByUrl('login');
    }

    this.subscriptions.push(this.projectService.getAllProjects().subscribe(
      (res) => {
        this.projects = res,
          this.loaded = true;
      },
      (error) => console.log(error)
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openProject(project: Project) {
    this.currentProject = project;
    this.loadTasks(project.projectId);
  }

  newProject() {
    const modalRef = this.modalService.open(ModalComponent, { size: 'small' });
  }


  loadTasks(projectId: string) {
    this.loaded = false;
    this.subscriptions.push(this.projectService.getTasksByProjectId(projectId).subscribe(
      (res) => {
        this.tasks = res,
          this.loaded = true;
      },
      (error) => console.log(error)
    ));
  }

  addTask(event) {
    if (event.keyCode === 13) {
      const task = new Task();

      task.userId = this.authenticationService.currentUserValue.id;
      task.name = this.taskName;
      task.projectId = this.currentProject.projectId;
      task.priorityId = '4';

      this.tasks.push(task);

      this.taskName = '';
      const pos = this.tasks.length - 1;
      this.subscriptions.push(this.taskService.addTask(task).subscribe(
        (res) => {
          this.tasks[pos].taskId = res.taskId,
            this.loaded = true;
        },
        (error) => console.log(error)
      ));
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((taskInArray) => {
      return JSON.stringify(task) !== JSON.stringify(taskInArray);
    });

    this.subscriptions.push(this.taskService.deleteTask(task.taskId).subscribe(
      (res) => {
      },
      (error) => console.log(error)
    ));

  }

  completeTask(task: Task) {
    this.tasks = this.tasks.filter((taskInArray) => {
      return JSON.stringify(task) !== JSON.stringify(taskInArray);
    });

    this.subscriptions.push(this.taskService.markDoneTask(task.taskId).subscribe(
      (res) => {
      },
      (error) => console.log(error)
    ));

  }
}
