package com.salesreg;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.entria.views.RNViewOverflowPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.sentry.RNSentryPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import me.hauvo.thumbnail.RNThumbnailPackage;
import com.arttitude360.reactnative.rnpaystack.RNPaystackPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new ReactNativeConfigPackage(),
            new RNViewOverflowPackage(),
            new RNDeviceInfo(),
            new RNSentryPackage(),
            new SplashScreenReactPackage(),
            new RNThumbnailPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNPaystackPackage(),
            new PickerPackage(),
            new RNFetchBlobPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "build/index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
