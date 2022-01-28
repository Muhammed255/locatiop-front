import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserProductsService } from 'src/app/services/user-products.service';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  product: any;
  offer: any;
  newComment = [];
  enabledComments = [];
  commentForm: FormGroup;
  commentReplyForm: FormGroup;
  user: any;
  auth_user: any;
  show_reply_box: boolean = false;

  selectedIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private userProductsService: UserProductsService,
    private userStoresAdminsService: UserStoreAdminsService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.findProduct();
    this.createCommentForm();
    this.createCommentReplyForm();
    this.userStoresAdminsService.findOneUser(localStorage.getItem('userId')).subscribe(result => {
      this.auth_user = result.user;
    })
  }

  findProduct() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("prodId")) {
        this.userProductsService.finOneProduct(paramMap.get("prodId")).subscribe(response => {
          this.product = response.product;
          this.offer = response.offer;
        })
      }
    })
  }

  toggle(evt, index) {
    this.selectedIndex = index;   
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

  createCommentReplyForm() {
    this.commentReplyForm = this.formBuilder.group({
      reply: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ])],
      commentId: [''],
      productId: ['']
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

  // Function to post a new comment on blog post
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
    this.userProductsService.postComment(id, comment).subscribe(data => {
      this.findProduct();
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  postReplyComment(productId) {
    const reply = this.commentReplyForm.get('reply').value;
    const commentId = this.commentReplyForm.get('commentId').value;
    this.userProductsService.postCommentReply(productId, commentId, reply).subscribe(response => {
      this.findProduct();
      this.commentReplyForm.reset();
    })
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current product id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  getDiferenceInDays(theDate : any) : number {
    return Math.abs(theDate.getHours() - new Date().getTime()) / (1000 * 60 * 60 * 24) ;
  }

  onLikeComment(productId, commentId) {
    this.userProductsService.likeProductComment(productId, commentId).subscribe(res => {
      this.findProduct();
    })
  }

  ondislikeComment(productId, commentId) {
    this.userProductsService.dislikeProductComment(productId, commentId).subscribe(res => {
      this.findProduct();
    })
  }


}
