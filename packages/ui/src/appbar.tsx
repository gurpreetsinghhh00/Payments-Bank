import { Button } from "./button";

interface AppbarProps{
  user? : {
    name? : string | null,
  }
  onSignin : ()=>void,
  onSignout : ()=>void
}

export const Appbar = ({
  user,
  onSignin,
  onSignout
} : AppbarProps) => {
  return (
    <div className="flex justify-between items-center shadow px-4 py-3">
      <div className="font-bold text-lg">
        Atlas Payments Bank
      </div>
      <div>
        <Button onClick={user ? onSignout : onSignin} >{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};
