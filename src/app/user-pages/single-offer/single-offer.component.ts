import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserOffersService } from 'src/app/services/user-offers.service';


@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.scss']
})
export class SingleOfferComponent implements OnInit {

  offer: any;
  newComment = [];
  enabledComments = [];
  commentForm: FormGroup;
  show_reply_box: boolean = false;
  auth_user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserStoreAdminsService,
    private userOfferService: UserOffersService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.findOffer();
    this.createCommentForm();
    this.userService.findOneUser(localStorage.getItem('userId')).subscribe(response => {
      this.auth_user = response.user;
    })
  }

  findOffer() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('offerId')) {
        this.userOfferService.finOneOffer(paramMap.get('offerId')).subscribe(result => {
          this.offer = result.offer;
        })
      }
    })
  }


  toggle() {
    this.show_reply_box = !this.show_reply_box;
  }

   // Create form for posting comments
   createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ])]
    })
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }

  // Function to post a new comment on offer
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.userOfferService.postOfferComment(id, comment).subscribe(data => {
      this.findOffer();
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current offer id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }





}
