import { Menu } from './menu.model';


// Admin menu
export const verticalMenuItems = [ 
    new Menu (1, 'Dashboard', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'Users', '/users', null, 'supervisor_account', null, false, 0),
    new Menu (3, 'Products', null, null, 'featured_play_list', null, true, 0),
    new Menu (4, 'List', '/home/product/all', null, 'list', null, false, 3),
    new Menu (5, 'Create', '/home/product/create', null, 'library_add', null, false, 3),
    new Menu (6, 'Offers', null, null, 'card_giftcard', null, true, 0),
    new Menu (7, 'List', '/home/offer/list', null, 'list', null, false, 6),
    new Menu (8, 'Create', '/home/offer/add', null, 'add', null, false, 6),
    new Menu (9, 'Jobs', '/home/jobs', null, 'work', null, false, 0),
    new Menu (10, 'Chat', '/home/chat', null, 'chat', null, false, 0),
]

// Client menu
export const horizontalMenuItems = [ 
    new Menu (1, 'Products', '/account/products', null, 'list', null, false, 0),
    new Menu (2, 'Offers', '/account/offers', null, 'card_giftcard', null, false, 0),
    new Menu (3, 'Jobs', '/account/jobs', null, 'work', null, false, 0),
    new Menu (4, 'Store Admins', '/account/admins', null, 'supervisor_account', null, false, 0),
]