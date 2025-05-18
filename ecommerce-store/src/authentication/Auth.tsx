const signUp = async () => {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error.message);
  } else {
    console.log("User signed up:", user);
  }
};

const signIn = async () => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error.message);
  } else {
    console.log("User signed in:", user);
  }
};
