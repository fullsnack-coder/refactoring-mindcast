package com.mindcasttwo;

import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mindCastTwo";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme, true); // here
    super.onCreate(null);
  }
}
