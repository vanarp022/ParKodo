import React from 'react';
import { Menu, User, Clock, CircleParking, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import ParkingHistory from './ParkingHistory';
import SavedParkings from './SavedParkings';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { getInitials } from '@/utils/helpers';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from './SignInForm';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, isAuthenticated, signIn, signOut } = useUser();
  const [showSignInDialog, setShowSignInDialog] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  // Reference to the sidebar sheet close button
  const sidebarCloseRef = React.useRef<HTMLButtonElement>(null);

  const handleSignInSuccess = () => {
    // Sign in the user with default data
    signIn({
      id: '1',
      name: 'Rakesh',
      phone: '1234567890',
      email: 'Priyanka@Avinash.com',
      rating: 4.9,
      bookingCount: 3,
      memberSince: 'April 2025'
    });
    
    setShowSignInDialog(false);
    toast({
      title: "Signed in successfully",
      description: "Welcome back!"
    });
  };

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully"
    });
  };

  // Function to open the parking history sheet
  const openParkingHistory = () => {
    // Close the sidebar first
    if (sidebarCloseRef.current) {
      sidebarCloseRef.current.click();
    }
    
    // Small delay to allow the sidebar to close
    setTimeout(() => {
      const historyButton = document.querySelector<HTMLButtonElement>('[aria-label="Open parking history"]');
      if (historyButton) {
        historyButton.click();
      }
    }, 100);
  };
  
  // Function to open the saved parkings sheet
  const openSavedParkings = () => {
    // Close the sidebar first
    if (sidebarCloseRef.current) {
      sidebarCloseRef.current.click();
    }
    
    // Small delay to allow the sidebar to close
    setTimeout(() => {
      const savedButton = document.querySelector<HTMLButtonElement>('[aria-label="Open saved parkings"]');
      if (savedButton) {
        savedButton.click();
      }
    }, 100);
  };

  // Create a component for the sheet content
  const SidebarContent = React.memo(() => {
    return (
      <>
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-2">
          {isAuthenticated ? (
            <div className="flex items-center p-3 border rounded-lg mb-4 bg-accent/50">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="bg-primary text-white">
                  {getInitials(user?.name || 'User')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.bookingCount} bookings</p>
              </div>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="justify-start mb-4"
              onClick={() => {
                if (sidebarCloseRef.current) {
                  sidebarCloseRef.current.click();
                }
                setShowSignInDialog(true);
              }}
            >
              <User className="h-4 w-4 mr-3" />
              Sign In
            </Button>
          )}
          
          
          
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={() => {
              if (sidebarCloseRef.current) {
                sidebarCloseRef.current.click();
              }
              navigate('/profile');
            }}
          >
            <User className="h-4 w-4 mr-3" />
            Profile
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={openParkingHistory}
          >
            <Clock className="h-4 w-4 mr-3" />
            Parking History
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={openSavedParkings}
          >
            <Bookmark className="h-4 w-4 mr-3" />
            Saved Parkings
          </Button>

          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={() => {
              if (sidebarCloseRef.current) {
                sidebarCloseRef.current.click();
              }
              navigate('/');
            }}
          >
            <CircleParking className="h-4 w-4 mr-3" />
            Find Parking
          </Button>
          
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              className="justify-start text-red-500"
              onClick={() => {
                if (sidebarCloseRef.current) {
                  sidebarCloseRef.current.click();
                }
                handleSignOut();
              }}
            >
              Sign Out
            </Button>
          )}
        </div>
      </>
    );
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary mr-2">ParKodo</h1>
          {/* <span className="text-xs text-muted-foreground">beta</span> */}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {!isMobile && (
          <div className="flex gap-2">
            <ParkingHistory />
            <SavedParkings />
            
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => setShowSignInDialog(true)}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
            
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => navigate('/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            )}
          </div>
        )}
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            {/* Use the component directly */}
            <button 
              ref={sidebarCloseRef} 
              onClick={() => {}} // Will be handled by SheetClose
              className="hidden" 
              aria-label="Close sidebar"
            />
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Sign in to your account to continue</DialogDescription>
          <SignInForm 
            onSuccess={handleSignInSuccess}
            onCancel={() => setShowSignInDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
